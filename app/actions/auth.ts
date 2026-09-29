"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AuthActionState = {
  error?: string;
  success?: string;
};

function readField(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function safeNextPath(value: string) {
  return value.startsWith("/") && !value.startsWith("//") ? value : "/workspace";
}

function validatePassword(password: string) {
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) return "Password must include a letter and a number.";
  return null;
}

export async function signIn(_previousState: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const email = readField(formData, "email");
  const password = readField(formData, "password");
  const nextPath = safeNextPath(readField(formData, "next"));

  if (!email || !email.includes("@")) return { error: "Enter a valid work email." };
  if (!password) return { error: "Enter your password." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: error.message };

  revalidatePath("/", "layout");
  redirect(nextPath);
}

export async function createAccount(_previousState: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const fullName = readField(formData, "name");
  const email = readField(formData, "email");
  const password = readField(formData, "password");
  const confirmPassword = readField(formData, "confirm_password");

  if (fullName.length < 2) return { error: "Enter your full name." };
  if (!email || !email.includes("@")) return { error: "Enter a valid work email." };
  const passwordError = validatePassword(password);
  if (passwordError) return { error: passwordError };
  if (password !== confirmPassword) return { error: "Passwords do not match." };

  const supabase = await createClient();
  const siteUrl = process.env.MEDBALLAST_SITE_URL ?? "http://localhost:3000";
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${siteUrl}/auth/confirm`,
    },
  });

  if (error) return { error: error.message };

  revalidatePath("/", "layout");
  if (data.session) redirect("/workspace");

  return { success: "Account created. Check your email to confirm access." };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut({ scope: "local" });
  revalidatePath("/", "layout");
  redirect("/");
}

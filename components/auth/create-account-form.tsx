"use client";

import Link from "next/link";
import { useActionState } from "react";
import { createAccount, type AuthActionState } from "@/app/actions/auth";
import { ArrowUpRight } from "@/components/icons";

const initialState: AuthActionState = {};

export function CreateAccountForm() {
  const [state, action, pending] = useActionState(createAccount, initialState);

  return (
    <form className="auth-form create-account-form" action={action}>
      {state.error && <p className="auth-error" role="alert">{state.error}</p>}
      {state.success && <p className="auth-success" role="status">{state.success}</p>}
      <div className="auth-field"><label htmlFor="name">Name</label><input id="name" name="name" type="text" autoComplete="name" placeholder="Your name" required /></div>
      <div className="auth-field"><label htmlFor="email">Work email</label><input id="email" name="email" type="email" autoComplete="email" placeholder="you@organisation.org" required /></div>
      <div className="auth-field"><label htmlFor="password">Password</label><input id="password" name="password" type="password" autoComplete="new-password" placeholder="At least 8 characters" required /></div>
      <div className="auth-field"><label htmlFor="confirm_password">Confirm password</label><input id="confirm_password" name="confirm_password" type="password" autoComplete="new-password" placeholder="Repeat your password" required /></div>
      <button className="button button-dark auth-submit" type="submit" disabled={pending}>{pending ? "Creating account…" : "Create account"} <ArrowUpRight /></button>
      <p className="auth-note">Already have access? <Link href="/sign-in">Sign in</Link>.</p>
    </form>
  );
}

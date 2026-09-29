"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signIn, type AuthActionState } from "@/app/actions/auth";
import { ArrowUpRight } from "@/components/icons";

const initialState: AuthActionState = {};

export function SignInForm({ nextPath, notice }: { nextPath: string; notice?: string }) {
  const [state, action, pending] = useActionState(signIn, initialState);

  return (
    <form className="auth-form" action={action}>
      <input type="hidden" name="next" value={nextPath} />
      {notice && <p className="auth-notice">{notice}</p>}
      {state.error && <p className="auth-error" role="alert">{state.error}</p>}
      <label htmlFor="email">Work email</label>
      <input id="email" name="email" type="email" autoComplete="email" placeholder="you@organisation.org" required />
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" autoComplete="current-password" placeholder="Enter your password" required />
      <div className="form-meta"><span>Use your organisation account.</span><Link href="mailto:access@medballast.example">Need help?</Link></div>
      <button className="button button-dark auth-submit" type="submit" disabled={pending}>{pending ? "Signing in…" : "Sign in"} <ArrowUpRight /></button>
      <p className="auth-note">New to the network? <Link href="/create-account">Create an account</Link>.</p>
    </form>
  );
}

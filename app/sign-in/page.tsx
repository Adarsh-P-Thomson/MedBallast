import Link from "next/link";
import { ArrowUpRight, CrossMark } from "@/components/icons";

export default function SignInPage() {
  return (
    <main className="auth-shell">
      <header className="auth-header page-width">
        <Link className="brand" href="/" aria-label="MedBallast home">
          <span className="brand-mark" aria-hidden="true"><CrossMark /></span>
          <span>MedBallast</span>
        </Link>
        <Link className="header-link" href="/">Back to home <ArrowUpRight /></Link>
      </header>

      <section className="auth-layout page-width" aria-labelledby="sign-in-title">
        <div className="auth-intro">
          <p className="eyebrow"><span className="eyebrow-line" />Network access</p>
          <h1 id="sign-in-title">Welcome back to the network.</h1>
          <p>Sign in with the account connected to your organisation. Your view is shaped by the entities you belong to.</p>
        </div>

        <form className="auth-form" action="#" method="post">
          <label htmlFor="email">Work email</label>
          <input id="email" name="email" type="email" autoComplete="email" placeholder="you@organisation.org" required />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" autoComplete="current-password" placeholder="Enter your password" required />
          <div className="form-meta"><label className="checkbox-label"><input type="checkbox" name="remember" /> <span>Remember this device</span></label><Link href="mailto:access@medballast.example">Forgot password?</Link></div>
          <button className="button button-dark auth-submit" type="submit">Sign in <ArrowUpRight /></button>
          <p className="auth-note">Access is managed by your organisation administrator.</p>
        </form>
      </section>
    </main>
  );
}

import Link from "next/link";
import { ArrowUpRight, CrossMark, LoginIcon } from "@/components/icons";
import { SignInForm } from "@/components/auth/sign-in-form";

export default async function SignInPage({ searchParams }: { searchParams: Promise<{ next?: string; error?: string; message?: string }> }) {
  const params = await searchParams;
  const nextPath = params.next?.startsWith("/") && !params.next.startsWith("//") ? params.next : "/workspace";

  return (
    <main className="auth-shell">
      <header className="auth-header page-width">
        <Link className="brand" href="/" aria-label="MedBallast home">
          <span className="brand-mark" aria-hidden="true"><CrossMark /></span>
          <span>MedBallast</span>
        </Link>
        <Link className="header-link" href="/"><LoginIcon /> Sign in <ArrowUpRight /></Link>
      </header>

      <section className="auth-layout page-width" aria-labelledby="sign-in-title">
        <div className="auth-intro">
          <p className="eyebrow"><span className="eyebrow-line" />Network access</p>
          <h1 id="sign-in-title">Welcome back to the network.</h1>
          <p>Sign in with the account connected to your organisation. Your view is shaped by the entities you belong to.</p>
        </div>

        <SignInForm nextPath={nextPath} notice={params.error ?? params.message} />
      </section>
    </main>
  );
}

import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowUpRight, CrossMark } from "@/components/icons";
import { CreateAccountForm } from "@/components/auth/create-account-form";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function CreateAccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) redirect("/workspace");

  return (
    <main className="auth-shell">
      <header className="auth-header page-width">
        <Link className="brand" href="/" aria-label="MedBallast home"><span className="brand-mark" aria-hidden="true"><CrossMark /></span><span>MedBallast</span></Link>
        <Link className="header-link" href="/sign-in">Already have access <ArrowUpRight /></Link>
      </header>
      <section className="auth-layout page-width" aria-labelledby="create-account-title">
        <div className="auth-intro"><p className="eyebrow"><span className="eyebrow-line" />Network access</p><h1 id="create-account-title">Create your place in the network.</h1><p>Your account will be ready for organisation membership. Confirm your email to continue.</p></div>
        <CreateAccountForm />
      </section>
    </main>
  );
}

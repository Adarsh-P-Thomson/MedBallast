import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "@/app/actions/auth";
import { CrossMark, LogoutIcon } from "@/components/icons";
import { WorkspaceInDevelopment } from "@/components/workspace-in-development";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function WorkspacePage({ searchParams }: { searchParams: Promise<{ verified?: string }> }) {
  const params = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in?next=/workspace");

  const displayName = typeof user.user_metadata?.full_name === "string" && user.user_metadata.full_name.trim() ? user.user_metadata.full_name : user.email?.split("@")[0] ?? "Member";

  return (
    <main className="workspace-shell">
      <aside className="workspace-rail"><Link className="workspace-rail-brand" href="/" aria-label="MedBallast home"><span className="brand-mark"><CrossMark /></span><span>MB</span></Link><form action={signOut}><button className="workspace-logout" type="submit" aria-label="Log out" title="Log out"><LogoutIcon /></button></form></aside>
      <div className="workspace-main">
        <header className="workspace-header"><div><span className="workspace-crumb">MedBallast / Workspace</span><strong>Welcome, {displayName}</strong></div><span className="workspace-user">{user.email}</span></header>
        <WorkspaceInDevelopment displayName={displayName} email={user.email ?? ""} verified={params.verified === "1"} />
      </div>
    </main>
  );
}

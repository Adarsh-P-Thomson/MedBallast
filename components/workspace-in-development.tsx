import { RouteLine, ShieldCheck } from "@/components/icons";

export function WorkspaceInDevelopment({ displayName, email }: { displayName: string; email: string }) {
  return (
    <section className="workspace-dev" aria-labelledby="workspace-title">
      <div className="workspace-dev-heading">
        <p className="eyebrow"><span className="eyebrow-line" />Workspace</p>
        <p className="workspace-index">MB / 00</p>
      </div>
      <h1 id="workspace-title">Your operating view is being assembled.</h1>
      <p className="workspace-lede">The account is connected, but the organisation and entity workspace is still in development. Your future view will be shaped by the memberships attached to this account.</p>
      <div className="workspace-account"><span className="account-initial">{displayName.slice(0, 1).toUpperCase()}</span><div><strong>{displayName}</strong><span>{email}</span></div></div>
      <div className="workspace-status-list">
        <div><ShieldCheck /><span><strong>Identity</strong>Signed in with Supabase Auth</span><b>Connected</b></div>
        <div><RouteLine /><span><strong>Entity access</strong>Supplier, hospital, and pharmacy memberships</span><b>Next</b></div>
      </div>
    </section>
  );
}

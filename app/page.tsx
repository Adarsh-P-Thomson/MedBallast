import Link from "next/link";
import { AccessPaths } from "@/components/access-paths";
import { ArrowUpRight, CrossMark, RouteLine, ShieldCheck } from "@/components/icons";

const roles = [
  { number: "01", title: "Suppliers", text: "Keep stock, fulfilment, and delivery visibility in one place." },
  { number: "02", title: "Hospitals", text: "Coordinate what your teams need with a clearer view of the network." },
  { number: "03", title: "Pharmacies", text: "Stay connected to nearby supply and make every request traceable." },
];

export default function Home() {
  return (
    <main className="site-shell">
      <header className="site-header page-width">
        <Link className="brand" href="/" aria-label="MedBallast home"><span className="brand-mark" aria-hidden="true"><CrossMark /></span><span>MedBallast</span></Link>
        <nav className="primary-nav" aria-label="Main navigation"><Link href="#network">The network</Link><Link href="#roles">For organisations</Link><Link href="#access">Access</Link></nav>
        <Link className="header-link" href="#access">Sign in <ArrowUpRight /></Link>
      </header>

      <section className="hero page-width" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" />A shared operating layer for care</p>
          <h1 id="hero-title">Move the right medicine to the right place.</h1>
          <p className="hero-lede">MedBallast gives suppliers, hospitals, and pharmacies one clear view of the health supply network around them.</p>
          <div className="hero-actions"><Link className="button button-dark" href="#access">Enter the network <ArrowUpRight /></Link><Link className="text-link" href="#network">See how it works <span aria-hidden="true">↓</span></Link></div>
        </div>

        <div className="network-panel" aria-label="Network overview">
          <div className="panel-topline"><span>Network view</span><span className="status-label"><span className="status-dot" />Operational</span></div>
          <div className="route-visual" aria-hidden="true"><div className="route-grid" /><div className="route route-one"><span /><i /></div><div className="route route-two"><span /><i /></div><div className="route route-three"><span /><i /></div><div className="route-node node-north">NORTH</div><div className="route-node node-central">CENTRAL</div><div className="route-node node-south">SOUTH</div></div>
          <div className="panel-footer"><div><span>Last route review</span><strong>09:42 IST</strong></div><div><span>View</span><strong>Connected entities <ArrowUpRight /></strong></div></div>
        </div>
      </section>

      <section className="network-strip page-width" id="network" aria-label="MedBallast principles"><div className="strip-item"><span>01</span><p>One shared view</p></div><div className="strip-item"><span>02</span><p>Three entity types</p></div><div className="strip-item"><span>03</span><p>Access by membership</p></div><p className="strip-note">Built around the way care already moves.</p></section>

      <section className="roles-section page-width" id="roles" aria-labelledby="roles-title"><div className="section-intro"><p className="eyebrow"><span className="eyebrow-line" />One network, distinct roles</p><h2 id="roles-title">A clearer handoff between every point of care.</h2></div><div className="role-list">{roles.map((role) => <div className="role-row" key={role.number}><span className="role-number">{role.number}</span><h3>{role.title}</h3><p>{role.text}</p><span className="role-arrow" aria-hidden="true">↗</span></div>)}</div></section>

      <section className="access-section page-width" id="access" aria-labelledby="access-title"><div className="access-aside"><p className="eyebrow"><span className="eyebrow-line" />Your access point</p><h2 id="access-title">Start with the place you work.</h2><p>Every account sees only the organisations and entities they belong to.</p><div className="aside-rule" /><div className="aside-detail"><ShieldCheck /><span>Membership-based access</span></div><div className="aside-detail"><RouteLine /><span>Proximity-aware routing</span></div></div><AccessPaths /></section>

      <footer className="site-footer page-width"><div className="footer-brand"><span className="brand-mark small" aria-hidden="true"><CrossMark /></span><span>MedBallast</span></div><p>Federated infrastructure for a healthier supply chain.</p><span className="footer-note">© 2026 MedBallast</span></footer>
    </main>
  );
}

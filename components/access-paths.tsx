"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";

const paths = {
  Supplier: { label: "For suppliers", description: "Keep fulfilment visible from your warehouse to the point of care.", details: ["Manage your organisation membership", "Share a clearer supply position", "Coordinate delivery routes"] },
  Hospital: { label: "For hospitals", description: "Bring requests, nearby supply, and your care teams into one view.", details: ["See your connected entities", "Request what your teams need", "Follow movement across the network"] },
  Pharmacy: { label: "For pharmacies", description: "Stay connected to nearby supply with a traceable path for every request.", details: ["Work within your organisation", "Find nearby network support", "Keep every handoff accountable"] },
} as const;
type PathName = keyof typeof paths;

export function AccessPaths() {
  const [activePath, setActivePath] = useState<PathName>("Hospital");
  const current = paths[activePath];
  return <div className="access-console"><div className="access-tabs" role="tablist" aria-label="Choose your role">{(Object.keys(paths) as PathName[]).map((path) => <button className={activePath === path ? "access-tab active" : "access-tab"} key={path} onClick={() => setActivePath(path)} role="tab" aria-selected={activePath === path} type="button">{path}</button>)}</div><div className="access-content" role="tabpanel"><p className="console-kicker">{current.label}</p><h3>{current.description}</h3><ul>{current.details.map((detail) => <li key={detail}>{detail}</li>)}</ul><Link className="button button-dark" href="/sign-in">Continue to sign in <ArrowUpRight /></Link></div><p className="access-footnote">Need an organisation account? <Link href="mailto:access@medballast.example">Contact your network administrator</Link>.</p></div>;
}

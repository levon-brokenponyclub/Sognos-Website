"use client";

import { useState } from "react";

type Role = {
  title: string;
  type: string;
  location: string;
  department: string;
};

const ROLES: Role[] = [
  {
    title: "Dynamics 365 Technical Consultant",
    type: "Full-time",
    location: "Sydney, AU",
    department: "Engineering",
  },
  {
    title: "Senior D365 Solution Architect",
    type: "Full-time",
    location: "Melbourne, AU",
    department: "Engineering",
  },
  {
    title: "Project Manager",
    type: "Full-time",
    location: "Sydney, AU",
    department: "Delivery",
  },
  {
    title: "Business Analyst",
    type: "Full-time",
    location: "Remote, AU",
    department: "Delivery",
  },
  {
    title: "Business Development Manager",
    type: "Full-time",
    location: "Sydney, AU",
    department: "Sales",
  },
];

const DEPARTMENTS = ["All", ...Array.from(new Set(ROLES.map((r) => r.department)))];
const LOCATIONS = ["All", ...Array.from(new Set(ROLES.map((r) => r.location)))];

export default function OpenRoles() {
  const [dept, setDept] = useState("All");
  const [loc, setLoc] = useState("All");

  const filtered = ROLES.filter(
    (r) =>
      (dept === "All" || r.department === dept) &&
      (loc === "All" || r.location === loc),
  );

  return (
    <section className="w-full border-b border-sognos-border-subtle">
      <div className="max-w-7xl w-full mx-auto px-6 py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sognos-text-muted mb-4">
          Open roles
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <h2 className="font-heading text-3xl font-medium text-prussian-blue-800 tracking-tight">
            Current opportunities
          </h2>
          {/* Filters */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={dept}
                onChange={(e) => setDept(e.target.value)}
                className="appearance-none pl-4 pr-9 py-2.5 rounded-full border border-sognos-border-subtle bg-white text-sm text-prussian-blue-800 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-prussian-blue-800/20"
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>
                    {d === "All" ? "Department" : d}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-prussian-blue-800/50"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="relative">
              <select
                value={loc}
                onChange={(e) => setLoc(e.target.value)}
                className="appearance-none pl-4 pr-9 py-2.5 rounded-full border border-sognos-border-subtle bg-white text-sm text-prussian-blue-800 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-prussian-blue-800/20"
              >
                {LOCATIONS.map((l) => (
                  <option key={l} value={l}>
                    {l === "All" ? "Location" : l}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-prussian-blue-800/50"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Role list */}
        {filtered.length > 0 ? (
          <ul>
            {filtered.map((role) => (
              <li key={role.title} className="border-t border-sognos-border-subtle">
                <a
                  href="mailto:careers@sognos.com.au"
                  className="flex items-center justify-between gap-6 py-6 group"
                >
                  <div>
                    <p className="font-heading text-xl font-medium text-prussian-blue-800 tracking-tight group-hover:text-brand transition-colors">
                      {role.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className="text-sm text-sognos-text-muted">{role.type}</span>
                      <span className="text-sognos-text-muted/40 text-xs">•</span>
                      <span className="text-sm text-sognos-text-muted">{role.location}</span>
                      <span className="text-sognos-text-muted/40 text-xs">•</span>
                      <span className="text-sm text-sognos-text-muted">{role.department}</span>
                    </div>
                  </div>
                  <div className="shrink-0 w-10 h-10 rounded-full border border-sognos-border-subtle flex items-center justify-center text-prussian-blue-800 group-hover:bg-prussian-blue-800 group-hover:text-white group-hover:border-prussian-blue-800 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M3 11L11 3M11 3H5M11 3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </a>
              </li>
            ))}
            <li className="border-t border-sognos-border-subtle" />
          </ul>
        ) : (
          <div className="border-t border-sognos-border-subtle pt-12 pb-4">
            <p className="text-sognos-text-muted text-sm">
              No roles match the selected filters.
            </p>
          </div>
        )}

        <p className="mt-10 text-sm text-sognos-text-muted">
          Don&apos;t see a fit?{" "}
          <a
            href="mailto:careers@sognos.com.au"
            className="text-prussian-blue-800 font-medium underline underline-offset-2 hover:opacity-70 transition-opacity"
          >
            Send us your CV anyway
          </a>{" "}
          — we&apos;re always interested in hearing from talented people.
        </p>
      </div>
    </section>
  );
}

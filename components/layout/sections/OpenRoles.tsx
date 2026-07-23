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

export default function OpenRoles() {
  return (
    <section
      id="positions"
      className="w-full scroll-mt-32 border-b border-sognos-line bg-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Left — label rail */}
          <div className="lg:col-span-2 lg:sticky lg:top-[100px] lg:self-start">
            <p className="inline-flex items-center gap-3 text-base font-medium text-sognos-muted">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rounded-full bg-sognos-blue-accent"
              />
              Careers
            </p>
          </div>

          {/* Right — heading + role list */}
          <div className="lg:col-[3/-1]">
            <h2 className="font-heading text-5xl font-normal tracking-tight text-sognos-header text-balance md:text-6xl lg:text-7xl">
              Open positions
            </h2>

            <ul className="mt-16 border-y border-sognos-line lg:mt-20">
              {ROLES.map((role) => (
                <li key={role.title} className="border-t border-sognos-line first:border-t-0">
                  <a
                    href="mailto:careers@sognos.com.au"
                    className="group grid gap-4 py-6 transition-colors duration-200 hover:bg-slate-50 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center lg:py-7"
                  >
                    <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
                      <p className="font-heading text-xl font-medium tracking-tight text-sognos-body transition-colors group-hover:text-sognos-blue-accent lg:text-2xl">
                        {role.title}
                      </p>
                      <span className="rounded-md bg-slate-100 px-3 py-1 text-sm font-medium text-sognos-body">
                        Hybrid / {role.type}
                      </span>
                    </div>
                    <p className="text-base leading-relaxed text-sognos-muted sm:text-right lg:text-xl">
                      {role.location}
                    </p>
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-sm leading-relaxed text-sognos-muted">
              Don&apos;t see a fit?{" "}
              <a
                href="mailto:careers@sognos.com.au"
                className="font-medium text-sognos-body underline underline-offset-2 transition-opacity hover:opacity-70"
              >
                Send us your CV anyway
              </a>{" "}
              - we&apos;re always interested in hearing from talented people.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

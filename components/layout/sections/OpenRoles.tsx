import { AnimatedEyebrow } from "@/components/ui/AnimatedEyebrow";

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
            <AnimatedEyebrow textClassName="text-sognos-muted">
              Careers
            </AnimatedEyebrow>
          </div>

          {/* Right — heading + role list */}
          <div className="lg:col-[3/-1]">
            <h2 className="font-heading text-3xl font-medium tracking-tight text-sognos-navy md:text-4xl">
              Open positions
            </h2>
            <p className="mt-4 text-base leading-relaxed text-sognos-body">
              Explore open roles across teams at Sognos.
            </p>

            <ul className="mt-16 border-y border-sognos-line lg:mt-10">
              {ROLES.map((role) => (
                <li key={role.title} className="border-t border-sognos-line first:border-t-0">
                  <a
                    href="mailto:careers@sognos.com.au"
                    className="group grid gap-4 py-4 transition-[padding-left,padding-right,background-color] duration-[400ms] ease-[cubic-bezier(0.2,0,0.4,1)] hover:bg-slate-50 hover:px-6 focus-visible:bg-slate-50 focus-visible:px-6 focus-visible:outline-none sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center lg:py-6"
                  >
                    <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
                      <p className="font-heading text-xl font-normal tracking-tight text-sognos-body lg:text-xl">
                        {role.title}
                      </p>
                      <span className="rounded-md bg-slate-100 px-3 py-1 text-sm font-medium text-sognos-body">
                        Hybrid / {role.type}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-5 sm:justify-end">
                      <p className="text-base leading-relaxed text-sognos-muted sm:text-right lg:text-base">
                        {role.location}
                      </p>
                      <span className="shrink-0 rounded-full border border-sognos-line px-4 py-2 text-sm font-medium text-sognos-body opacity-100 transition-opacity duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
                        Apply
                      </span>
                    </div>
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

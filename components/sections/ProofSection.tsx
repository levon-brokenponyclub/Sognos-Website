type Stat = {
  value: string;
  label: string;
  context?: string;
};

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  organisation: string;
};

// Placeholder stats — replace with real data when available
const stats: Stat[] = [
  {
    value: "40%",
    label: "Reduction in scheduling time",
    context: "Average across SognosRoster deployments",
  },
  {
    value: "99%",
    label: "Compliance audit pass rate",
    context: "Across SognosCare regulated clients",
  },
  {
    value: "3x",
    label: "Faster reporting cycle",
    context: "Compared to manual reporting processes",
  },
  {
    value: "100%",
    label: "Real-time workforce visibility",
    context: "Live dashboard across all active services",
  },
];

// Placeholder testimonials — replace with real client quotes when available
const testimonials: Testimonial[] = [
  {
    quote:
      "Sognos gave us one system for everything — care management, rostering, compliance. We went from three disconnected tools to one platform that actually reflects how we operate.",
    author: "Operations Director",
    role: "Operations Director",
    organisation: "Health & Social Care Provider",
  },
  {
    quote:
      "SognosRoster cut our manual scheduling from two days a week to a couple of hours. The AI matching means we're not just filling shifts — we're putting the right people in the right place.",
    author: "Workforce Manager",
    role: "Workforce Manager",
    organisation: "NDIS Service Organisation",
  },
];

export default function ProofSection() {
  return (
    <section aria-label="Social proof and results">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <header>
          <h2>Results organisations can point to</h2>
          <p>
            Sognos is deployed across health, care, and service organisations —
            delivering measurable improvements in scheduling efficiency,
            compliance, and operational visibility.
          </p>
        </header>

        {/* Stats */}
        <div aria-label="Key statistics">
          <ul role="list">
            {stats.map((stat) => (
              <li key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
                {stat.context && <small>{stat.context}</small>}
              </li>
            ))}
          </ul>
        </div>

        {/* Testimonials */}
        <div aria-label="Client testimonials">
          {testimonials.map((item) => (
            <blockquote key={item.author}>
              <p>{item.quote}</p>
              <footer>
                <cite>
                  {item.role}, {item.organisation}
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Client logos slot — populated in Phase 5 */}
        <div aria-label="Client organisations" />
      </div>
    </section>
  );
}

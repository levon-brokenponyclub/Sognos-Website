import Link from "next/link";

function SystemFlowDiagram() {
  const nodes = [
    { id: "service-demand", label: "Service Demand" },
    { id: "sognos-platform", label: "Sognos Platform" },
    { id: "workforce-roster", label: "Workforce (Roster)" },
    { id: "service-delivery-care", label: "Service Delivery (Care)" },
    { id: "outcomes-compliance", label: "Outcomes & Compliance" },
    { id: "ai-optimisation", label: "AI Optimisation" },
  ];

  return (
    <div aria-label="System flow diagram" role="img">
      {nodes.map((node) => (
        <div key={node.id} data-node={node.id}>
          {node.label}
        </div>
      ))}
    </div>
  );
}

export default function HowSognosWorksPreview() {
  return (
    <section aria-label="How Sognos works — system overview">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <header>
          <h2>One platform. Every part of your operation.</h2>
          <p>
            Sognos connects service demand, workforce scheduling, delivery, and compliance into a
            single operational loop — powered by AI, built on Microsoft Dynamics 365.
          </p>
        </header>

        <SystemFlowDiagram />

        <Link href="/how-it-works">Learn how it works</Link>
      </div>
    </section>
  );
}

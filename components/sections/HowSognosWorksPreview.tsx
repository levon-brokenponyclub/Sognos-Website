import Link from "next/link";
import LottiePlayer from "@/components/ui/LottiePlayer";

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
    <div
      aria-label="System flow diagram"
      role="img"
      className="flex flex-col gap-4"
    >
      {nodes.map((node) => (
        <div
          key={node.id}
          data-node={node.id}
          className="rounded-md border border-white/20 bg-white/5 p-4 text-lg font-medium text-white transition-colors hover:bg-white/10"
        >
          {node.label}
        </div>
      ))}
    </div>
  );
}

export default function HowSognosWorksPreview() {
  return (
    <section
      aria-label="How Sognos works — system overview"
      className="border-y border-sognos-border-subtle"
    >
      {/* Heading row — border-b spans 100% width, dashed L/R on inner container */}
      <div className="border-b border-sognos-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-dashed border-sognos-border-subtle px-5 pt-20 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <h2 className="text-2xl md:text-4xl text-brand font-heading font-medium tracking-tight">
              One platform.
              <br />
              Every part of your operation.
            </h2>
            <div>
              <p className="font-heading font-medium leading-tigher">
                Sognos connects service demand, workforce scheduling, delivery,
                and compliance into a single operational loop — powered by AI,
                built on Microsoft Dynamics 365.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid — dashed L/R continues below */}
      <div className="mx-auto max-w-7xl border-x border-dashed border-sognos-border-accent">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch justify-center">
          <div className="text-left px-8 py-24 bg-gray-10 border-l-[5px] border-sognos-border-strong side-stack">
            <header className="mb-12 card">
              <h4 className="text-brand font-heading tracking-tight mb-3">
                One platform. Every part of your operation.
              </h4>
              <p className="font-heading leading-tigher mb-10">
                Sognos connects service demand, workforce scheduling, delivery,
                and compliance into a single operational loop — powered by AI,
                built on Microsoft Dynamics 365.
              </p>
              <h5 className="text-brand font-heading tracking-tight mb-10">
                One platform. Every part of your operation.
              </h5>
              <h5 className="text-brand font-heading tracking-tight">
                One platform. Every part of your operation.
              </h5>
            </header>
          </div>

          <div className="flex items-center justify-center p-0 bg-gradient-accent">
            <LottiePlayer
              src="/animations/donut-chart.json"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

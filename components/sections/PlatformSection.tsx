import Link from "next/link";
import { PLATFORM } from "@/lib/constants";

const platformCapabilities = [
  {
    name: "Microsoft Dynamics 365",
    href: "/platform/dynamics-365",
    role: "Foundation",
    description:
      "Sognos is built natively on Dynamics 365 — giving you enterprise-grade data integrity, security, and scalability. Every service record, workforce schedule, and outcome is stored in a single, trusted system.",
    capabilities: [
      "Enterprise data model",
      "Role-based access control",
      "Full audit history",
      "Native Microsoft integrations",
    ],
  },
  {
    name: "Copilot AI",
    href: "/platform/copilot-ai",
    role: "Intelligence",
    description:
      "Microsoft Copilot is embedded across the Sognos platform — surfacing insights, automating repetitive tasks, and giving your team AI-assisted decision-making at every step.",
    capabilities: [
      "AI-assisted scheduling recommendations",
      "Predictive compliance alerts",
      "Automated reporting and summaries",
      "Natural language queries across your data",
    ],
  },
  {
    name: "Power Platform",
    href: "/platform/power-platform",
    role: "Extensibility",
    description:
      "Power Platform gives you the tools to extend, automate, and connect Sognos to the rest of your organisation — without custom development.",
    capabilities: [
      "Power Automate workflow integration",
      "Power BI dashboards and analytics",
      "Custom app extensions via Power Apps",
      "Dataverse-native data sharing",
    ],
  },
];

export default function PlatformSection() {
  return (
    <section aria-label="Platform">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <header>
          <h2>Built on Microsoft. Designed for service organisations.</h2>
          <p>
            The Sognos platform runs on Microsoft's enterprise infrastructure — combining Dynamics
            365, Copilot AI, and Power Platform into a single, integrated system.
          </p>
        </header>

        <ul role="list" aria-label="Platform components">
          {platformCapabilities.map((platform) => (
            <li key={platform.name}>
              <header>
                <span>{platform.role}</span>
                <h3>{platform.name}</h3>
              </header>
              <p>{platform.description}</p>
              <ul role="list" aria-label={`${platform.name} capabilities`}>
                {platform.capabilities.map((cap) => (
                  <li key={cap}>{cap}</li>
                ))}
              </ul>
              <Link href={platform.href}>Learn more about {platform.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

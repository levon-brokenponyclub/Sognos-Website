"use client";

import { useState } from "react";
import Link from "next/link";
import { useBookDemo } from "@/lib/BookDemoContext";

type ProductKey = "sognoscare" | "sognosroster" | "sognosgenogram" | "not-sure";

type Node =
  | { q: string; options: { label: string; to: string }[] }
  | { leaf: true; title: string; product: ProductKey; href: string; hrefLabel: string };

const TREE: Record<string, Node> = {
  root: {
    q: "What do you need help with?",
    options: [
      { label: "Manage care & compliance", to: "care" },
      { label: "Coordinate my workforce", to: "workforce" },
      { label: "See live performance", to: "insights" },
    ],
  },
  care: {
    q: "What kind of service do you run?",
    options: [
      { label: "Disability & mental health", to: "care_dmh" },
      { label: "Support at Home / aged care", to: "care_sah" },
      { label: "Allied health", to: "care_ah" },
      { label: "Child & family services", to: "care_cf" },
    ],
  },
  workforce: {
    q: "What's the priority?",
    options: [
      { label: "Scheduling & staff allocation", to: "wf_roster" },
      { label: "Field & mobile visits", to: "wf_frontline" },
      { label: "Real-time routing & optimisation", to: "wf_roster" },
    ],
  },
  insights: {
    q: "What do you want visibility on?",
    options: [
      { label: "Compliance & service metrics", to: "in_insights" },
      { label: "Family & relationship context", to: "in_geno" },
      { label: "Not sure yet", to: "in_unsure" },
    ],
  },
  care_dmh: { leaf: true, title: "SognosCare — Disability & Mental Health edition is your best fit.", product: "sognoscare", href: "/products/sognoscare/editions/disability-mental-health", hrefLabel: "Explore the edition" },
  care_sah: { leaf: true, title: "SognosCare — Support at Home edition is your best fit.", product: "sognoscare", href: "/products/sognoscare/editions/support-at-home", hrefLabel: "Explore the edition" },
  care_ah: { leaf: true, title: "SognosCare — Allied Health edition is your best fit.", product: "sognoscare", href: "/products/sognoscare/editions/allied-health", hrefLabel: "Explore the edition" },
  care_cf: { leaf: true, title: "SognosCare — Child & Family Services edition is your best fit.", product: "sognoscare", href: "/products/sognoscare/editions/child-and-family-services", hrefLabel: "Explore the edition" },
  wf_roster: { leaf: true, title: "SognosRoster coordinates scheduling, allocation, and routing.", product: "sognosroster", href: "/products/sognosroster", hrefLabel: "Explore SognosRoster" },
  wf_frontline: { leaf: true, title: "The Frontline solution connects mobile teams to the office.", product: "sognosroster", href: "/solutions/frontline", hrefLabel: "Explore Frontline" },
  in_insights: { leaf: true, title: "Customer Insights turns service data into live dashboards.", product: "not-sure", href: "/solutions/customer-insights", hrefLabel: "Explore Customer Insights" },
  in_geno: { leaf: true, title: "Sognos Genogram maps family & relationship context into records.", product: "sognosgenogram", href: "/products/sognosgenogram", hrefLabel: "Explore Sognos Genogram" },
  in_unsure: { leaf: true, title: "Let's find the right fit together.", product: "not-sure", href: "/products", hrefLabel: "Browse all products" },
};

export default function ChatbotFlow() {
  const { openModal } = useBookDemo();
  const [trail, setTrail] = useState<{ id: string; label: string }[]>([]);

  const currentId = trail.length ? trail[trail.length - 1].id : "root";
  const node = TREE[currentId];

  const pick = (to: string, label: string) => {
    const next = [...trail, { id: to, label }];
    setTrail(next);
    if ("leaf" in TREE[to]) console.log("Chatbot path:", next.map((n) => n.label).join(" → "));
  };

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-y-4 rounded-2xl bg-prussian-blue-900 p-6 text-white">
      {"leaf" in node ? (
        <>
          <p className="font-heading text-lg leading-snug">{node.title}</p>
          <button
            onClick={() => openModal(node.product)}
            className="rounded-lg bg-brand px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
          >
            Book a Demo
          </button>
          <Link href={node.href} className="rounded-lg bg-white/10 px-4 py-3 text-sm hover:bg-white/20">
            {node.hrefLabel}
          </Link>
        </>
      ) : (
        <>
          <p className="font-heading text-lg">{node.q}</p>
          {node.options.map((o) => (
            <button
              key={o.label}
              onClick={() => pick(o.to, o.label)}
              className="rounded-lg bg-white/10 px-4 py-3 text-left text-sm transition-colors hover:bg-white/20"
            >
              {o.label}
            </button>
          ))}
        </>
      )}
      {trail.length > 0 && (
        <button
          onClick={() => setTrail(trail.slice(0, -1))}
          className="self-start text-xs text-white/50 hover:text-white"
        >
          ← Back
        </button>
      )}
    </div>
  );
}

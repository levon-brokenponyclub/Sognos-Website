"use client";

import { createContext, useContext } from "react";
import {
  DEFAULT_CTA_CONTENT,
  type CtaSectionContent,
} from "@/lib/content/ctaSection";

const CtaContentContext = createContext<CtaSectionContent>(DEFAULT_CTA_CONTENT);

export function CtaContentProvider({
  value,
  children,
}: {
  value: CtaSectionContent;
  children: React.ReactNode;
}) {
  return (
    <CtaContentContext.Provider value={value}>
      {children}
    </CtaContentContext.Provider>
  );
}

export function useCtaContent(): CtaSectionContent {
  return useContext(CtaContentContext);
}

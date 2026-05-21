import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Sognos",
  description:
    "Get in touch with Sognos. Contact us to discuss how we can assist your organisation and foster a valuable partnership.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}

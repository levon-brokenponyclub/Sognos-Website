"use client";

import { useCallback, useRef } from "react";

// Renders exported email HTML in a sandboxed iframe so the email's CSS can't
// leak into the site. Scripts are blocked; links open in a new tab.
export default function NewsletterFrame({
  html,
  title,
}: {
  html: string;
  title: string;
}) {
  const ref = useRef<HTMLIFrameElement>(null);

  const resize = useCallback(() => {
    const frame = ref.current;
    const doc = frame?.contentDocument;
    if (!frame || !doc) return;
    const fit = () => {
      frame.style.height = `${doc.documentElement.scrollHeight}px`;
    };
    fit();
    // Images can finish loading after onLoad - refit as they arrive.
    doc.querySelectorAll("img").forEach((img) => {
      if (!img.complete) img.addEventListener("load", fit, { once: true });
    });
  }, []);

  return (
    <iframe
      ref={ref}
      title={title}
      srcDoc={html}
      onLoad={resize}
      sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      className="block w-full border-0"
      style={{ height: "100vh" }}
    />
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Collection Notice | Sognos",
  description:
    "How Sognos collects and handles your personal information when you make an enquiry.",
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default function PrivacyCollectionNoticePage() {
  return (
    <main className="w-full bg-white">
      {/* Hero */}
      <section className="bg-gradient-hero w-full border-b border-sognos-border-subtle">
        <div className="max-w-7xl w-full mx-auto px-6 pb-18 pt-40 flex flex-col items-center text-center">
          <div className="">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1 text-sm border-white/30 text-white font-medium mb-6">
              <span className="w-2 h-2 bg-[#1D96FC] rounded-full"></span>
              Privacy Collection Notice
            </div>
          </div>
          <h1 className="mx-auto max-w-5xl font-heading text-3xl font-normal leading-heading tracking-heading text-white sm:text-4xl lg:text-4xl">
            Privacy Collection Notice
          </h1>
          <p className="mt-6 text-lg max-w-3xl leading-relaxed text-white/80">
            This Privacy Collection Notice describes how Sognos Solutions Pty
            Ltd (ABN 53 611 121 870) (we, us or our) collects and handles your
            personal information when you make an enquiry with us.
          </p>
        </div>
      </section>

      {/* Privacy Collection Notice Content */}
      <section className="w-full">
        <div className="max-w-7xl w-full mx-auto px-6 py-24">
          <div className="prose prose-sognos lg:prose-xl mx-auto">
            <p className="mb-3">
              We collect personal information from you so that we can respond to
              your enquiry and for related purposes set out in our Privacy
              Policy, available on our website (or on request).
            </p>
            <p className="mb-3">
              We may disclose this personal information to third parties,
              including our personnel, related entities, any third parties
              engaged by us and acting on our behalf and as otherwise set out in
              our Privacy Policy.
            </p>
            <p className="mb-3">
              We store personal information in Australia. Where we disclose your
              personal information to third parties, those third parties may
              store, transfer or access personal information outside of
              Australia.
            </p>
            <p className="mb-3">
              If you do not provide your personal information to us, it may
              affect our ability to do business with you.
            </p>
            <p className="mb-3">
              Please see our{" "}
              <a
                href="/company/privacy-policy"
                className="underline hover:text-prussian-blue-800 transition-colors"
              >
                Privacy Policy
              </a>
              for more information about how we collect, store, use and disclose
              your personal information, including details about overseas
              disclosure, access, correction, how you can make a privacy-related
              complaint and our complaint-handling process.
            </p>
            <p className="mb-3">
              If you have questions about our privacy practices, please contact
              us by email at:{" "}
              <a
                href="mailto:contact@sognos.com.au"
                className="underline hover:text-prussian-blue-800 transition-colors"
              >
                contact@sognos.com.au
              </a>
              . By providing your personal information to us, you agree to the
              collection, use, storage and disclosure of that information as
              described in this privacy collection notice.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

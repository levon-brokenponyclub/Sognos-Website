import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Sognos",
  description:
    "Learn how we collect, use, and protect your personal information.",
};

// ─── Shared styles ──────────────────────────────────────────────────────────

const H2 =
  "mt-12 mb-4 font-heading text-2xl font-medium text-prussian-blue-800 tracking-tight";
const H3 =
  "mt-8 mb-3 font-heading text-xl font-medium text-prussian-blue-800 tracking-tight";
const P = "mb-4 text-base leading-relaxed text-sognos-text-body";
const UL =
  "mb-6 list-disc pl-6 space-y-2 text-base leading-relaxed text-sognos-text-body";
const OL =
  "mb-6 list-decimal pl-6 space-y-2 text-base leading-relaxed text-sognos-text-body";

// ─── Page ───────────────────────────────────────────────────────────────────

export default function PrivacyPolicyPage() {
  return (
    <main className="w-full bg-white">
      {/* Hero */}
      <section
        data-header-dark
        className="bg-gradient-hero w-full border-b border-sognos-border-subtle"
      >
        <div className="max-w-7xl w-full mx-auto px-6 pb-18 pt-40 flex flex-col items-center text-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1 text-sm border-white/30 text-white font-medium mb-6">
            <span className="w-2 h-2 bg-[#1D96FC] rounded-full" />
            Privacy Policy
          </div>
          <h1 className="mx-auto max-w-5xl font-heading text-3xl font-normal leading-heading tracking-heading text-white sm:text-5xl lg:text-5xl">
            Your Privacy, Our Priority
          </h1>
          <p className="mt-6 text-lg max-w-3xl leading-relaxed text-white/80">
            This Privacy Policy describes how Sognos collects, uses, and
            safeguards your information when you use our website and services.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="w-full">
        <div className="max-w-5xl w-full mx-auto px-6 py-14">
          {/* Preamble */}
          <h1 className="mb-6 font-heading text-2xl font-medium text-prussian-blue-800 tracking-tight">
            Sognos Solutions Pty Ltd &ndash; Privacy Policy
          </h1>
          <p className={P}>
            Sognos Solutions Pty Ltd (ABN 53 611 121 870) (<strong>we</strong>,{" "}
            <strong>us</strong> or <strong>our</strong>), understands that
            protecting your personal information is important. This Privacy
            Policy sets out our commitment to protecting the privacy of personal
            information provided to us, or collected by us, when interacting
            with you.
          </p>
          <p className={P}>
            This Privacy Policy takes into account the requirements of the{" "}
            <em>Privacy Act 1988</em> (Cth) and the Australian Privacy
            Principles, as well as the <em>New Zealand Privacy Act 2020</em> and
            the Information Privacy Principles.
          </p>
          <p className={P}>
            This Privacy Policy was last updated on <strong>26 May 2026</strong>
            .
          </p>

          {/* ── The information we collect ── */}
          <h2 className={H2}>The information we collect</h2>
          <p className={P}>
            <strong>Personal information</strong> is information or an opinion,
            whether true or not and whether recorded in a material form or not,
            about an individual who is identified or reasonably identifiable.
          </p>
          <p className={P}>
            The types of personal information we may collect about you include:
          </p>
          <ul className={UL}>
            <li>
              <strong>Identity Data</strong> &mdash; your name, age and
              profession.
            </li>
            <li>
              <strong>Contact Data</strong> &mdash; your telephone number,
              address and email.
            </li>
            <li>
              <strong>Transaction Data</strong> &mdash; details about payments
              to you from us and from you to us, and other details of products
              and services you have purchased from us or we have purchased from
              you.
            </li>
            <li>
              <strong>Technical and Usage Data</strong> &mdash; when you access
              any of our websites or platforms, details about your internet
              protocol (IP) address, login data, browser session and
              geo-location data, statistics on page views and sessions, device
              and network information, acquisition sources, search queries
              and/or browsing behaviour, access and use of our website
              (including through the use of Internet cookies or analytics), and
              communications with our website.
            </li>
            <li>
              <strong>Interaction Data</strong> &mdash; information you provide
              to us when you participate in any interactive features, including
              surveys, activities or events.
            </li>
            <li>
              <strong>Marketing and Communications Data</strong> &mdash; your
              preferences in receiving marketing from us and our third parties
              and your communication preferences.
            </li>
            <li>
              <strong>Professional Data</strong> &mdash; where you are a worker
              of ours or applying for a role with us, your professional history
              such as your previous positions and professional experience.
            </li>
          </ul>
          <p className={P}>
            <strong>Sensitive information</strong> is a sub-set of personal
            information that is given a higher level of protection. Sensitive
            information means information relating to your racial or ethnic
            origin, political opinions, religion, trade union or other
            professional associations or memberships, philosophical beliefs,
            sexual orientation or practices, criminal records, health
            information or biometric information. We do not actively request
            sensitive information about you. If at any time we need to collect
            sensitive information about you, unless otherwise permitted by law,
            we will first obtain your consent and we will only use it as
            required or authorised by law.
          </p>

          {/* ── How we collect ── */}
          <h2 className={H2}>How we collect personal information</h2>
          <p className={P}>
            We collect personal information in a variety of ways, including:
          </p>
          <ul className={UL}>
            <li>
              when you provide it directly to us, including face-to-face, over
              the phone, over email, or online;
            </li>
            <li>
              when you complete a form, such as registering for any events or
              newsletters, or responding to surveys;
            </li>
            <li>
              when you use any website we operate (including from any analytics
              and cookie providers or marketing providers &mdash; see the
              &ldquo;Cookies&rdquo; section below for more detail); or
            </li>
            <li>from publicly available sources, such as LinkedIn.</li>
          </ul>

          {/* ── Why we collect ── */}
          <h2 className={H2}>
            Why we collect, hold, use and disclose personal information
          </h2>
          <p className={P}>
            We collect, hold, use and disclose your personal information for the
            following purposes:
          </p>
          <ul className={UL}>
            <li>to do business with you and provide you with our services;</li>
            <li>
              to contact and communicate with you about our business, including
              in response to any support requests you lodge with us or other
              enquiries you make with us;
            </li>
            <li>
              to contact and communicate with you about any enquiries you make
              with us via any website we operate;
            </li>
            <li>
              for internal record keeping, administrative, invoicing and billing
              purposes;
            </li>
            <li>
              for analytics, market research and business development, including
              to operate and improve our business, associated applications and
              associated social media platforms;
            </li>
            <li>
              for advertising and marketing, including to send you promotional
              information about our events and experiences and information that
              we consider may be of interest to you;
            </li>
            <li>
              to run promotions, competitions and/or offer additional benefits
              to you;
            </li>
            <li>
              if you have applied for employment with us, to consider your
              employment application; and
            </li>
            <li>
              to comply with our legal obligations or if otherwise required or
              authorised by law.
            </li>
          </ul>

          {/* ── Third-party disclosures ── */}
          <h2 className={H2}>
            Our disclosures of personal information to third parties
          </h2>
          <p className={P}>
            We will only disclose your personal information to third parties
            where it is necessary as part of our business, where we have your
            consent, or where permitted by law. This means that we may disclose
            personal information to:
          </p>
          <ul className={UL}>
            <li>our employees, contractors and/or related entities;</li>
            <li>
              IT service providers, data storage, web-hosting and server
              providers;
            </li>
            <li>marketing or advertising providers;</li>
            <li>
              professional advisors, bankers, auditors, our insurers and
              insurance brokers;
            </li>
            <li>our existing or potential agents or business partners;</li>
            <li>
              if we merge with, or are acquired by, another company, or sell all
              or a portion of our assets, your personal information may be
              disclosed to our advisers and any prospective purchaser&apos;s
              advisers and may be among the assets transferred;
            </li>
            <li>
              courts, tribunals and regulatory authorities, in the event you
              fail to pay for goods or services we have provided to you;
            </li>
            <li>
              courts, tribunals, regulatory authorities and law enforcement
              officers, as required or authorised by law, in connection with any
              actual or prospective legal proceedings, or in order to establish,
              exercise or defend our legal rights;
            </li>
            <li>
              third parties to collect and process data, such as analytics
              providers and cookies; and
            </li>
            <li>
              any other third parties as required or permitted by law, such as
              where we receive a subpoena.
            </li>
          </ul>

          <h3 className={H3}>Google Analytics</h3>
          <p className={P}>
            We have enabled Google Analytics Advertising Features. We and
            third-party vendors may use first-party cookies (such as the Google
            Analytics cookie) or other first-party identifiers, and third-party
            cookies (such as Google advertising cookies) or other third-party
            identifiers together. These cookies and identifiers may collect
            Technical and Usage Data about you.
          </p>
          <p className={P}>
            You can opt-out of Google Analytics Advertising Features including
            using a Google Analytics Opt-out Browser add-on. To opt-out of
            personalised ad delivery on the Google content network, please visit
            Google&apos;s Ads Preferences Manager, or if you wish to opt-out
            permanently even when all cookies are deleted from your browser you
            can install their plugin. To opt out of interest-based ads on mobile
            devices, please follow these instructions for your mobile device: on
            Android, open the Google Settings app on your device and select
            &ldquo;ads&rdquo; to control the settings. On iOS devices with iOS 6
            and above, use Apple&apos;s advertising identifier. To learn more
            about limiting ad tracking using this identifier, visit the settings
            menu on your device.
          </p>

          {/* ── Overseas disclosure ── */}
          <h2 className={H2}>Overseas disclosure</h2>

          <h3 className={H3}>Australian Residents</h3>
          <p className={P}>
            We store your personal information in Australia. Where we disclose
            your personal information to third parties, those third parties may
            store, transfer or access personal information outside of Australia.
            We will only disclose your personal information overseas in
            accordance with the Australian Privacy Principles.
          </p>

          <h3 className={H3}>New Zealand Residents</h3>
          <p className={P}>
            Where we disclose your personal information to third parties, those
            third parties may store, transfer or access personal information
            outside of New Zealand, which may not have an equivalent level of
            data protection laws as those in New Zealand. Before disclosing any
            personal information to an overseas recipient, we will comply with
            Information Privacy Principle 12 and only disclose the information
            if:
          </p>
          <ol className={OL}>
            <li>
              you have authorised the disclosure after we expressly informed you
              that the overseas recipient may not be required to protect the
              personal information in a way that, overall, provides comparable
              safeguards to those in the <em>Privacy Act 2020</em>;
            </li>
            <li>
              we believe the overseas recipient is subject to the{" "}
              <em>Privacy Act 2020</em>;
            </li>
            <li>
              we believe that the overseas recipient is subject to privacy laws
              that, overall, provide comparable safeguards to those in the{" "}
              <em>Privacy Act 2020</em>;
            </li>
            <li>
              we believe that the overseas recipient is a participant in a
              prescribed binding scheme;
            </li>
            <li>
              we believe that the overseas recipient is subject to privacy laws
              in a prescribed country; or
            </li>
            <li>
              we otherwise believe that the overseas recipient is required to
              protect your personal information in a way that, overall, provides
              comparable safeguards to those in the <em>Privacy Act 2020</em>{" "}
              (for example pursuant to a data transfer agreement entered into
              between us and the overseas recipient).
            </li>
          </ol>

          {/* ── Your rights ── */}
          <h2 className={H2}>
            Your rights and controlling your personal information
          </h2>

          <h3 className={H3}>Your choice</h3>
          <p className={P}>
            Please read this Privacy Policy carefully. If you provide personal
            information to us, you understand we will collect, hold, use and
            disclose your personal information in accordance with this Privacy
            Policy. You do not have to provide personal information to us,
            however, if you do not, it may affect our ability to do business
            with you.
          </p>

          <h3 className={H3}>Information from third parties</h3>
          <p className={P}>
            If we receive personal information about you from a third party, we
            will protect it as set out in this Privacy Policy. If you are a
            third party providing personal information about somebody else, you
            represent and warrant that you have such person&apos;s consent to
            provide the personal information to us.
          </p>

          <h3 className={H3}>Restrict and unsubscribe</h3>
          <p className={P}>
            To object to processing for direct marketing/unsubscribe from our
            email database or opt-out of communications (including marketing
            communications), please contact us using the details below or
            opt-out using the opt-out facilities provided in the communication.
          </p>

          <h3 className={H3}>Access</h3>
          <p className={P}>
            You may request access to the personal information that we hold
            about you. An administrative fee may be payable for the provision of
            such information. Please note, in some situations, we may be legally
            permitted to withhold access to your personal information. If we
            cannot provide access to your information, we will advise you as
            soon as reasonably possible and provide you with the reasons for our
            refusal and any mechanism available to complain about the refusal.
            If we can provide access to your information in another form that
            still meets your needs, then we will take reasonable steps to give
            you such access.
          </p>

          <h3 className={H3}>Correction</h3>
          <p className={P}>
            If you believe that any information we hold about you is inaccurate,
            out of date, incomplete, irrelevant or misleading, please contact us
            using the details below. We will take reasonable steps to promptly
            correct any information found to be inaccurate, out of date,
            incomplete, irrelevant or misleading. Please note, in some
            situations, we may be legally permitted to not correct your personal
            information. If we cannot correct your information, we will advise
            you as soon as reasonably possible and provide you with the reasons
            for our refusal and any mechanism available to complain about the
            refusal.
          </p>

          <h3 className={H3}>Complaints</h3>
          <p className={P}>
            If you wish to make a complaint, please contact us using the details
            below and provide us with full details of the complaint. We will
            promptly investigate your complaint and respond to you, in writing,
            setting out the outcome of our investigation and the steps we will
            take in response to your complaint. If you are not satisfied with
            our response, you may contact the Office of the Australian
            Information Commissioner (if you are an Australian resident), or the
            Office of the New Zealand Privacy Commissioner (if you are a New
            Zealand resident).
          </p>

          {/* ── Storage and security ── */}
          <h2 className={H2}>Storage and security</h2>
          <p className={P}>
            We are committed to ensuring that the personal information we
            collect is secure. In order to prevent unauthorised access or
            disclosure, we have put in place suitable physical, electronic and
            managerial procedures, to safeguard and secure personal information
            and protect it from misuse, interference, loss and unauthorised
            access, modification and disclosure.
          </p>
          <p className={P}>
            While we are committed to security, we cannot guarantee the security
            of any information that is transmitted to or by us over the
            Internet. The transmission and exchange of information is carried
            out at your own risk.
          </p>

          {/* ── Cookies ── */}
          <h2 className={H2}>Cookies</h2>
          <p className={P}>
            We may use cookies on our website from time to time. Cookies are
            text files placed in your computer&apos;s browser to store your
            preferences. Cookies, by themselves, do not tell us your email
            address or other personally identifiable information. However, they
            do recognise you when you return to our online website and allow
            third parties to cause our advertisements to appear on your social
            media and online media feeds as part of our retargeting campaigns.
            If and when you choose to provide our online website with personal
            information, this information may be linked to the data stored in
            the cookie.
          </p>
          <p className={P}>
            You can block cookies by activating the setting on your browser that
            allows you to refuse the setting of all or some cookies. However, if
            you use your browser settings to block all cookies (including
            essential cookies) you may not be able to access all or parts of our
            website.
          </p>

          {/* ── Links ── */}
          <h2 className={H2}>Links to other websites</h2>
          <p className={P}>
            Our website may contain links to other party&apos;s websites. We do
            not have any control over those websites and we are not responsible
            for the protection and privacy of any personal information which you
            provide whilst visiting those websites. Those websites are not
            governed by this Privacy Policy.
          </p>

          {/* ── Amendments ── */}
          <h2 className={H2}>Amendments</h2>
          <p className={P}>
            We may, at any time and at our discretion, vary this Privacy Policy
            by publishing the amended Privacy Policy on our website. We
            recommend you check our website regularly to ensure you are aware of
            our current Privacy Policy.
          </p>

          {/* ── Contact ── */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <p className={P}>
              For any questions or notices, please contact us at:
            </p>
            <address className="not-italic text-base leading-relaxed text-sognos-text-body">
              <strong>Sognos Solutions Pty Ltd</strong> (ABN 53 611 121 870)
              <br />
              Email:{" "}
              <a
                href="mailto:contact@sognos.com.au"
                className="text-brand hover:underline"
              >
                contact@sognos.com.au
              </a>
            </address>
            <p className="mt-6 text-sm text-gray-400">
              &copy; LegalVision ILP Pty Ltd
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import { CookiePanel } from "@/components/ui/cookie-banner-1";

export default function CookieBanner() {
  return (
    <CookiePanel
      title="We value your privacy"
      message="We use cookies to analyse site usage and improve your experience. You can accept or decline non-essential cookies."
      acceptText="Give me the cookies"
      customizeText="Customize"
      icon="cookie"
      privacyHref="/company/privacy-policy"
      termsHref="/company/privacy-collection-notice"
    />
  );
}

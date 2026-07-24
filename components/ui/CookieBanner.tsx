"use client";

import { CookiePanel } from "@/components/ui/cookie-banner-1";

export default function CookieBanner() {
  return (
    <CookiePanel
      title="This site uses cookies"
      message="We use cookies to analyse site usage and improve your experience. You can accept or decline non-essential cookies."
      acceptText="Accept all"
      customizeText="Customize"
      icon="cookie"
      privacyHref="/company/privacy-policy"
      termsHref="/company/privacy-collection-notice"
    />
  );
}

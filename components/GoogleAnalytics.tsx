"use client";

import Script from "next/script";

export function GoogleAnalytics() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GT-TWQ5ZNF3"
        strategy="afterInteractive"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag("set","linker",{"domains":["sognos.com.au"]});
            gtag("js", new Date());
            gtag("set", "developer_id.dZTNiMT", true);
            gtag("config", "GT-TWQ5ZNF3");
          `,
        }}
      />
    </>
  );
}

"use client";

import Script from "next/script";

type Props = {
  measurementId: string;
};

export function GoogleAnalytics({ measurementId }: Props) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
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
            gtag("config", "${measurementId}");
          `,
        }}
      />
    </>
  );
}

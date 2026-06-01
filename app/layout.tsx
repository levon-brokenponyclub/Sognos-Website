import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { headers } from "next/headers";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { LinkedInInsight } from "@/components/LinkedInInsight";
import CookieBanner from "@/components/ui/CookieBanner";
import { getSiteSettings } from "@/lib/sanity/queries";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: settings.siteTitle,
    description: settings.metaDescription,
    icons: {
      icon: [
        { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon/favicon.ico" },
      ],
      apple: { url: "/favicon/apple-touch-icon.png" },
      other: [
        {
          rel: "icon",
          url: "/favicon/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          rel: "icon",
          url: "/favicon/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hdrs = await headers();
  const consent = hdrs.get("x-cookie-consent");
  const pathname = hdrs.get("x-pathname") ?? "";
  const isStudio = pathname.startsWith("/studio");
  const analyticsEnabled = consent === "true";
  const showBanner = !isStudio && (consent === "unset" || consent === null);

  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        {children}
        {analyticsEnabled && <Analytics />}
        {analyticsEnabled && <SpeedInsights />}
        {analyticsEnabled && <GoogleAnalytics />}
        {analyticsEnabled && <LinkedInInsight />}
        {showBanner && <CookieBanner />}
      </body>
    </html>
  );
}

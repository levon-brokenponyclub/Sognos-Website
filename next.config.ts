import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["next-sanity"],
  serverExternalPackages: ["sanity", "@sanity/vision"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },

  async redirects() {
    return [
      // Conversation / lead funnels
      { source: "/start-the-conversation", destination: "/dhf-conversation", permanent: true },
      { source: "/dhf-conversation/", destination: "/dhf-conversation", permanent: true },

      // Company / about
      { source: "/about-us", destination: "/company/about", permanent: true },
      { source: "/about-us/our-team", destination: "/company/about", permanent: true },
      { source: "/about-us/partners", destination: "/company/about", permanent: true },
      { source: "/about-us/social-responsibility", destination: "/company/social-responsibility", permanent: true },
      { source: "/about-us/careers", destination: "/", permanent: true },
      { source: "/company/careers", destination: "/", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },

      // Knowledge Hub consolidation
      { source: "/blog", destination: "/knowledge-hub", permanent: true },
      { source: "/news", destination: "/knowledge-hub", permanent: true },
      { source: "/news-updates", destination: "/knowledge-hub", permanent: true },
      { source: "/industry-insights", destination: "/knowledge-hub", permanent: true },

      // Industries — slug change
      { source: "/industries/health-and-social-care", destination: "/industries/health-social-care", permanent: true },

      // Solutions — slug change
      { source: "/solutions/power-platform-solutions", destination: "/solutions/power-platform", permanent: true },

      // Products — restructured
      { source: "/sognoscare", destination: "/products/sognoscare", permanent: true },
      { source: "/sognos-genogram", destination: "/products/sognosgenogram", permanent: true },
      { source: "/products/digpacks", destination: "/digpacks", permanent: true },
      { source: "/products/digpacks-contact", destination: "/digpacks", permanent: true },

      // Old landing page
      { source: "/first-in-field-service", destination: "/", permanent: true },

      // Legal / policy
      { source: "/privacy-collection-notice", destination: "/company/privacy-collection-notice", permanent: true },
      { source: "/isms-policy", destination: "/", permanent: true },

      // Customers → customer-stories (legacy path renamed)
      { source: "/customers", destination: "/customer-stories", permanent: true },
      { source: "/customers/:slug", destination: "/customer-stories/:slug", permanent: true },

      // Customer stories — slug normalisation (dropped "-case-study" suffix; nps renamed)
      { source: "/customer-stories/gentari-case-study", destination: "/customer-stories/gentari", permanent: true },
      { source: "/customer-stories/penrith-city-council-case-study", destination: "/customer-stories/penrith-city-council", permanent: true },
      { source: "/customer-stories/nps-case-study", destination: "/customer-stories/natural-power-solutions", permanent: true },
      { source: "/customer-stories/neca-case-study", destination: "/customer-stories/neca", permanent: true },
      { source: "/customer-stories/asset-security-concepts-case-study", destination: "/customer-stories/asset-security-concepts", permanent: true },
      { source: "/customer-stories/all-purpose-pumps-case-study", destination: "/customer-stories/all-purpose-pumps", permanent: true },
    ];
  },
};

export default nextConfig;

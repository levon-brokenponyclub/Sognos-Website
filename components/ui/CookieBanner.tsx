"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function CookieBanner() {
  const router = useRouter();

  function setConsent(value: "true" | "false") {
    const maxAge = 60 * 60 * 24 * 365; // 1 year
    document.cookie = `cookie_consent=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
    router.refresh();
  }

  return (
    <motion.div
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-4 left-0 right-0 z-50 px-4 mx-auto max-w-7xl"
    >
      <div className="flex flex-col gap-4 rounded-lg bg-prussian-blue-800 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
         <p className="text-sm text-white/80 max-w-xl">
           We use cookies to analyse site usage and improve your experience. You
           can accept or decline non-essential cookies.{" "}
           <a
             href="/company/privacy-policy"
             className="underline underline-offset-2 hover:text-white transition-colors"
           >
             Privacy Policy
           </a>
         </p>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setConsent("false")}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={() => setConsent("true")}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-[#1D96FC] text-white hover:bg-[#1D96FC]/90 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </motion.div>
  );
}

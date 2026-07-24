"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Cookie,
  Info,
  Shield,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Prefs = {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

interface CookiePanelProps {
  title?: string;
  message?: string;
  acceptText?: string;
  customizeText?: string;
  icon?: "cookie" | "shield" | "info";
  className?: string;
  privacyHref?: string;
  termsHref?: string;
}

const CONSENT_COOKIE = "cookie_consent";
const CONSENT_STORAGE_KEY = "cookie-consent";
const PREFS_STORAGE_KEY = "cookie-preferences";

function writeConsentCookie(value: "true" | "false") {
  const maxAge = 60 * 60 * 24 * 365;
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=${maxAge}; SameSite=Lax${secure}`;
}

function getConsentFromPrefs(prefs: Prefs): "true" | "false" {
  return prefs.analytics || prefs.marketing ? "true" : "false";
}

const CookiePanel = (props: CookiePanelProps) => {
  const {
    title = "This site uses cookies",
    message = "We use cookies to analyse site usage and improve your experience.",
    acceptText = "Accept all",
    customizeText = "Customize",
    icon = "cookie",
    className,
    privacyHref = "/company/privacy-policy",
    termsHref = "/company/privacy-collection-notice",
  } = props;

  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [render, setRender] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  });
  const prefsRef = useRef<HTMLDivElement | null>(null);
  const [prefsHeight, setPrefsHeight] = useState(0);

  useEffect(() => {
    setRender(true);

    const frame = window.requestAnimationFrame(() => {
      setVisible(true);
    });

    const storedPrefs = localStorage.getItem(PREFS_STORAGE_KEY);
    if (storedPrefs) {
      try {
        const parsed = JSON.parse(storedPrefs) as Partial<Prefs>;
        setPrefs({
          necessary: true,
          functional: Boolean(parsed.functional),
          analytics: Boolean(parsed.analytics),
          marketing: Boolean(parsed.marketing),
        });
      } catch {}
    }

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!showPrefs || !prefsRef.current) {
      setPrefsHeight(0);
      return;
    }

    setPrefsHeight(prefsRef.current.scrollHeight);
  }, [showPrefs, prefs]);

  function closeWithExit(value: "true" | "false" = "false") {
    localStorage.setItem(CONSENT_STORAGE_KEY, value);
    writeConsentCookie(value);
    setVisible(false);
    window.setTimeout(() => {
      setRender(false);
      router.refresh();
    }, 300);
  }

  function acceptAll() {
    const nextPrefs: Prefs = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };

    setPrefs(nextPrefs);
    localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(nextPrefs));
    closeWithExit("true");
  }

  function savePreferences() {
    localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(prefs));
    const consent = getConsentFromPrefs(prefs);
    localStorage.setItem(CONSENT_STORAGE_KEY, consent);
    writeConsentCookie(consent);
    setShowPrefs(false);
    setVisible(false);
    window.setTimeout(() => {
      setRender(false);
      router.refresh();
    }, 300);
  }

  if (!render) {
    return null;
  }

  const IconEl =
    icon === "shield" ? Shield : icon === "info" ? Info : Cookie;

  const PrefRow = ({
    rowTitle,
    desc,
    field,
    locked,
  }: {
    rowTitle: string;
    desc: string;
    field: keyof Prefs;
    locked?: boolean;
  }) => (
    <div className="flex items-start gap-2 rounded-lg border border-white/12 bg-white/[0.03] p-2.5">
      <button
        type="button"
        disabled={locked}
        onClick={() =>
          !locked && setPrefs((current) => ({ ...current, [field]: !current[field] }))
        }
        className={cn(
          "mt-0.5 inline-flex size-5 items-center justify-center rounded border transition-colors",
          locked
            ? "cursor-not-allowed border-white/12 bg-white/10 text-white/45"
            : "cursor-pointer border-white/18 bg-transparent text-white hover:bg-white/10"
        )}
        aria-pressed={prefs[field]}
        aria-label={`${rowTitle} cookie preference`}
      >
        {prefs[field] && <Check className="size-4" />}
      </button>

      <div className="flex-1">
        <div className="text-xs font-medium text-white">
          {rowTitle}{" "}
          {locked && (
            <span className="text-[10px] text-white/55">(required)</span>
          )}
        </div>

        <p className="mt-0.5 text-[11px] leading-4 text-white/65">{desc}</p>
      </div>
    </div>
  );

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className={cn(
        "fixed bottom-4 right-4 z-50 w-[380px] max-w-[calc(100vw-2rem)] md:bottom-6 md:right-6"
      )}
    >
      <div
        className={cn(
          "relative flex flex-col gap-3 rounded-xl border border-white/12 bg-sognos-navy px-4 py-4 text-white shadow-xl backdrop-blur",
          visible
            ? cn("animate-in", "fade-in", "slide-in-from-bottom-8")
            : cn("animate-out", "fade-out", "slide-out-to-bottom-8"),
          "duration-300 ease-out",
          className
        )}
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex size-9 items-center justify-center rounded-lg bg-white/10 text-white ring-1 ring-white/12">
            <IconEl className="size-5" aria-hidden="true" />
          </span>

          <h2 className="text-sm font-semibold leading-5 text-white">{title}</h2>

          <button
            type="button"
            onClick={() => closeWithExit("false")}
            className="ml-auto inline-flex size-8 items-center justify-center rounded-md text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close cookie banner"
          >
            <X className="size-4" />
          </button>
        </div>

        <p className="max-w-[32rem] text-xs leading-5 text-white/72">
          {message} See our{" "}
          <Link
            href={privacyHref}
            className="underline underline-offset-4 transition-colors hover:text-white"
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            href={termsHref}
            className="underline underline-offset-4 transition-colors hover:text-white"
          >
            Privacy Collection Notice
          </Link>
          .
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPrefs((current) => !current)}
            className={cn(
              "flex items-center gap-1 rounded-md border border-white/12 bg-white/6 px-3 py-1.5 text-xs text-white/78 transition-colors hover:bg-white/10 hover:text-white"
            )}
            aria-expanded={showPrefs}
            aria-controls="cookie-preferences-inline"
          >
            {customizeText}
            {showPrefs ? (
              <ChevronUp className="size-3" />
            ) : (
              <ChevronDown className="size-3" />
            )}
          </button>

          <button
            type="button"
            onClick={acceptAll}
            className="rounded-md bg-sognos-blue-accent px-3 py-1.5 text-xs text-white transition-colors hover:bg-sognos-blue-accent/90"
          >
            {acceptText}
          </button>
        </div>

        <div
          id="cookie-preferences-inline"
          ref={prefsRef}
          style={{ height: prefsHeight ? `${prefsHeight}px` : 0 }}
          className="overflow-hidden transition-[height] duration-300 ease-out will-change-[height]"
        >
          {showPrefs && (
            <div className="mt-2 flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <PrefRow
                rowTitle="Strictly necessary"
                desc="Required for core site functionality."
                field="necessary"
                locked
              />
              <PrefRow
                rowTitle="Functional"
                desc="Remembers your site preferences."
                field="functional"
              />
              <PrefRow
                rowTitle="Analytics"
                desc="Helps us improve the site and measure usage."
                field="analytics"
              />
              <PrefRow
                rowTitle="Marketing"
                desc="Supports campaign attribution and related outreach."
                field="marketing"
              />

              <div className="mt-1 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPrefs(false)}
                  className="rounded-md border border-white/12 bg-white/6 px-2.5 py-1 text-xs text-white/78 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={savePreferences}
                  className="rounded-md bg-sognos-blue-accent px-2.5 py-1 text-xs text-white transition-colors hover:bg-sognos-blue-accent/90"
                >
                  Save preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { CookiePanel };

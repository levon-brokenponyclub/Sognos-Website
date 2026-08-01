"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
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

// Declared at module scope, not inside CookiePanel. A component defined in a
// render body is a new component type on every render, so React unmounts and
// remounts each row whenever any preference changes — losing focus and
// discarding row state. Passing prefs/setPrefs keeps the type stable.
function PrefRow({
  rowTitle,
  desc,
  field,
  locked,
  prefs,
  setPrefs,
}: {
  rowTitle: string;
  desc: string;
  field: keyof Prefs;
  locked?: boolean;
  prefs: Prefs;
  setPrefs: Dispatch<SetStateAction<Prefs>>;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-sognos-line bg-gray-200/70 p-3">
      <button
        type="button"
        disabled={locked}
        onClick={() =>
          !locked &&
          setPrefs((current) => ({ ...current, [field]: !current[field] }))
        }
        className={cn(
          "mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded border transition-colors duration-200",
          locked
            ? "cursor-not-allowed border-sognos-line bg-white text-sognos-muted"
            : prefs[field]
              ? "cursor-pointer border-sognos-blue-accent bg-sognos-blue-accent text-white"
              : "cursor-pointer border-sognos-line bg-white text-transparent hover:border-sognos-blue-accent"
        )}
        aria-pressed={prefs[field]}
        aria-label={`${rowTitle} cookie preference`}
      >
        {prefs[field] && <Check className="size-3.5" strokeWidth={2.5} />}
      </button>

      <div className="flex-1">
        <div className="text-sm font-medium text-sognos-heading">
          {rowTitle}{" "}
          {locked && (
            <span className="text-xs font-normal text-sognos-muted">
              (required)
            </span>
          )}
        </div>

        <p className="mt-1 text-xs leading-relaxed text-sognos-muted">{desc}</p>
      </div>
    </div>
  );
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

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className={cn(
        "fixed bottom-4 left-4 z-50 w-[380px] max-w-[calc(100vw-2rem)] md:bottom-6 md:left-6"
      )}
    >
      <div
        className={cn(
          // No shadow — the border carries the separation from page content.
          "relative flex flex-col gap-4 rounded-lg border border-sognos-line bg-white p-5",
          visible
            ? cn("animate-in", "fade-in", "slide-in-from-bottom-8")
            : cn("animate-out", "fade-out", "slide-out-to-bottom-8"),
          "duration-300 ease-out",
          className
        )}
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-gray-200/70 text-sognos-heading">
            <IconEl className="size-[18px]" aria-hidden="true" />
          </span>

          <h2 className="font-heading text-base font-medium tracking-tight text-sognos-heading">
            {title}
          </h2>

          <button
            type="button"
            onClick={() => closeWithExit("false")}
            className="ml-auto inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-sognos-muted transition-colors duration-200 hover:bg-gray-200/70 hover:text-sognos-heading"
            aria-label="Close cookie banner"
          >
            <X className="size-4" />
          </button>
        </div>

        <p className="text-sm leading-relaxed text-sognos-body">
          {message} See our{" "}
          <Link
            href={privacyHref}
            className="font-medium text-sognos-blue-accent underline underline-offset-4 transition-opacity duration-200 hover:opacity-80"
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            href={termsHref}
            className="font-medium text-sognos-blue-accent underline underline-offset-4 transition-opacity duration-200 hover:opacity-80"
          >
            Privacy Collection Notice
          </Link>
          .
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={acceptAll}
            className="flex-1 rounded-lg bg-sognos-navy-dark px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-sognos-blue-accent"
          >
            {acceptText}
          </button>

          <button
            type="button"
            onClick={() => setShowPrefs((current) => !current)}
            className="flex items-center gap-1.5 rounded-lg border border-sognos-line bg-white px-4 py-2.5 text-sm font-medium text-sognos-heading transition-colors duration-200 hover:bg-gray-200/70"
            aria-expanded={showPrefs}
            aria-controls="cookie-preferences-inline"
          >
            {customizeText}
            {showPrefs ? (
              <ChevronUp className="size-3.5" />
            ) : (
              <ChevronDown className="size-3.5" />
            )}
          </button>
        </div>

        <div
          id="cookie-preferences-inline"
          ref={prefsRef}
          style={{ height: prefsHeight ? `${prefsHeight}px` : 0 }}
          className="overflow-hidden transition-[height] duration-300 ease-out will-change-[height]"
        >
          {showPrefs && (
            <div className="mt-4 flex flex-col gap-3 border-t border-sognos-line pt-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <PrefRow
                rowTitle="Strictly necessary"
                desc="Required for core site functionality."
                field="necessary"
                locked
                prefs={prefs}
                setPrefs={setPrefs}
              />
              <PrefRow
                rowTitle="Functional"
                desc="Remembers your site preferences."
                field="functional"
                prefs={prefs}
                setPrefs={setPrefs}
              />
              <PrefRow
                rowTitle="Analytics"
                desc="Helps us improve the site and measure usage."
                field="analytics"
                prefs={prefs}
                setPrefs={setPrefs}
              />
              <PrefRow
                rowTitle="Marketing"
                desc="Supports campaign attribution and related outreach."
                field="marketing"
                prefs={prefs}
                setPrefs={setPrefs}
              />

              <div className="mt-1 flex items-center gap-3">
                <button
                  type="button"
                  onClick={savePreferences}
                  className="flex-1 rounded-lg bg-sognos-navy-dark px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-sognos-blue-accent"
                >
                  Save preferences
                </button>

                <button
                  type="button"
                  onClick={() => setShowPrefs(false)}
                  className="rounded-lg border border-sognos-line bg-white px-4 py-2.5 text-sm font-medium text-sognos-heading transition-colors duration-200 hover:bg-gray-200/70"
                >
                  Cancel
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

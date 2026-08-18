import Image from "next/image";
import {
  CalendarDays,
  MapPin,
  Users,
  Eye,
  HeartHandshake,
  BrainCircuit,
  Mic,
  Building2,
  ShieldCheck,
  Smartphone,
  Workflow,
  Navigation,
} from "lucide-react";
import RegisterButton from "@/components/sections/events/nfp-real-care/RegisterButton";

export const metadata = {
  title: "NFP Real Care — Designing Services Around Real Lives | Sognos",
  description:
    "A breakfast event for NFP leaders in health, social and community care. Thursday 17 September, Microsoft, North Sydney. Places limited to 35 attendees.",
};

const IMAGE_DIR = "/images/events/nfp-real-care";

const challengeBullets = [
  {
    icon: HeartHandshake,
    text: "Keep care coordinated when needs are complex",
  },
  {
    icon: Smartphone,
    text: "Support mobile and frontline teams without adding more admin",
  },
  {
    icon: ShieldCheck,
    text: "Maintain visibility, compliance and quality while keeping care personal and human",
  },
];

const whyAttend = [
  {
    icon: Eye,
    title: "Gain a clearer view of service complexity",
  },
  {
    icon: Users,
    title: "Learn practical approaches to support frontline teams",
  },
  {
    icon: BrainCircuit,
    title:
      "See how connected systems and AI-supported tools can reduce admin burden",
  },
];

const agenda = [
  { time: "8.30 am", item: "Registration and breakfast" },
  {
    time: "9.00 am",
    item: "Welcome from Microsoft Elevate — Joanna Killalea-Walford, Partner Development Manager, Microsoft",
  },
  {
    time: "9.10 am",
    item: "Keynote presentation by Bill Gye, Director of Education and Training, WEA Sydney: Designing Services Around Real Lives, Not System Boundaries",
  },
  { time: "9.40 am", item: "Facilitated discussion / Q&A" },
  {
    time: "9.55 am",
    item: "Sognos perspective: supporting complex care and mobile service delivery, including live demo",
  },
  { time: "10.35 am", item: "Networking and close" },
  { time: "11.00 am", item: "Event concludes" },
];

const attendeeRoles = [
  "CEOs",
  "COOs",
  "CIOs",
  "Service delivery leaders",
  "Operations leaders",
  "Transformation leads",
  "Program managers",
];

export default function NfpRealCarePage() {
  return (
    <main className="bg-white">
        {/* HERO */}
        <section className="bg-gradient-hero pt-28 pb-16 lg:pt-40 lg:pb-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
              <div>
                <h1 className="font-heading text-4xl lg:text-5xl font-normal leading-heading tracking-heading text-white">
                  Designing Services Around Real Lives, Not System Boundaries
                </h1>
                <p className="mt-5 font-heading text-lg lg:text-xl text-[#8E9EBB] tracking-heading">
                  A breakfast event for NFP leaders in health, social and
                  community care
                </p>
                <p className="mt-6 text-base lg:text-lg text-white/80 leading-relaxed max-w-2xl">
                  Hosted at Microsoft and aligned with the spirit of Microsoft
                  Elevate, this event brings together NFP leaders in health,
                  social and community care to explore how providers can respond
                  to growing service complexity while supporting more connected,
                  sustainable and human-centred care.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-3 lg:gap-4 max-w-lg">
                  <div className="flex flex-col gap-2 rounded-lg bg-white border border-white/10 p-2">
                    <Image
                      src={`${IMAGE_DIR}/microsoft-elevate-logo.png`}
                      alt="Microsoft Elevate"
                      width={180}
                      height={40}
                      className="h-22 w-auto object-contain"
                    />
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#8E9EBB] text-center">
                      Hosted by Microsoft Elevate
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 rounded-lg bg-white border border-white/10 p-2">
                    <div className="h-22 flex items-center justify-center">
                      <Image
                        src={`${IMAGE_DIR}/softwareone-logo.png`}
                        alt="SoftwareOne"
                        width={120}
                        height={40}
                        className="h-22 w-auto object-contain"
                      />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#8E9EBB] text-center">
                      Supported by Software One
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative aspect-[3/2] w-full lg:justify-self-end rounded-lg overflow-hidden">
                <Image
                  src={`${IMAGE_DIR}/MSFT-header-img.png`}
                  alt="Guests at a Microsoft event in North Sydney"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 640px"
                  priority
                />
              </div>
            </div>

            {/* Event meta cards */}
            <div className="mt-10 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              <div className="flex items-start gap-3 rounded-lg bg-white p-5">
                <CalendarDays
                  className="text-[#1D96FC] shrink-0 mt-0.5"
                  size={22}
                  aria-hidden
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                    When
                  </p>
                  <p className="mt-1 text-sm font-medium text-prussian-blue-800 leading-snug">
                    Thursday 17 September
                    <br />
                    8.30 am – 10.30 am
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-white p-5">
                <MapPin
                  className="text-[#1D96FC] shrink-0 mt-0.5"
                  size={22}
                  aria-hidden
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                    Where
                  </p>
                  <p className="mt-1 text-sm font-medium text-prussian-blue-800 leading-snug">
                    Microsoft, Level 27,
                    <br />1 Denison Street,
                    <br />
                    North Sydney, NSW 2060
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-white p-5">
                <Users
                  className="text-[#1D96FC] shrink-0 mt-0.5"
                  size={22}
                  aria-hidden
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                    Places limited
                  </p>
                  <p className="mt-1 text-sm font-medium text-prussian-blue-800 leading-snug">
                    35 attendees
                  </p>
                </div>
              </div>
              <RegisterButton variant="card" label="Register now" />
            </div>
          </div>
        </section>

        {/* CHALLENGE + WHY ATTEND */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
            {/* Challenge */}
            <div className="rounded-lg bg-gray-200/70 p-8 lg:p-10">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#1D96FC]">
                <Users size={16} aria-hidden />
                The Challenge
              </div>
              <p className="mt-5 text-base text-sognos-text-body leading-relaxed">
                Across health, social and community care, people&rsquo;s needs
                are rarely confined to one service category. Individuals and
                families often require coordinated support across mental health,
                disability, aged care, housing, employment, family services and
                community care. Yet providers are often expected to deliver this
                support through separate programs, funding streams, systems and
                reporting frameworks.
              </p>

              <p className="mt-5 font-heading text-lg font-medium text-prussian-blue-800 tracking-heading">
                For NFP leaders, this creates real pressure.
              </p>

              <ul className="mt-5 space-y-3">
                {challengeBullets.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <span className="shrink-0 w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[#1D96FC]">
                      <Icon size={18} aria-hidden />
                    </span>
                    <span className="text-sm lg:text-base text-prussian-blue-800 leading-snug pt-1">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-sm text-sognos-text-body leading-relaxed">
                Join Sognos and Microsoft for a practical breakfast conversation
                with Bill Gye OAM, one of the sector&rsquo;s most respected
                leaders in community-led mental health.
              </p>
            </div>

            {/* Why attend */}
            <div className="rounded-lg bg-gray-200/70 p-8 lg:p-10 flex flex-col">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#1D96FC]">
                <Workflow size={16} aria-hidden />
                Why Attend
              </div>
              <h2 className="mt-3 font-heading text-2xl lg:text-3xl font-medium text-prussian-blue-800 tracking-heading">
                A practical conversation for sector leaders
              </h2>
              <p className="mt-4 text-sm text-sognos-text-body leading-relaxed">
                This session is designed for leaders across the NFP health,
                social and community care sector who are navigating complex
                service delivery, growing compliance demands, workforce pressure
                and the need for better visibility across care.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 lg:gap-4">
                {whyAttend.map(({ icon: Icon, title }) => (
                  <div
                    key={title}
                    className="flex items-start gap-4 rounded-lg bg-white p-5"
                  >
                    <span className="shrink-0 w-10 h-10 rounded-lg bg-[#1D96FC]/10 flex items-center justify-center text-[#1D96FC]">
                      <Icon size={20} aria-hidden />
                    </span>
                    <p className="text-sm lg:text-base font-medium text-prussian-blue-800 leading-snug pt-1.5">
                      {title}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm text-sognos-text-body leading-relaxed">
                You will walk away with a clearer way to think about complexity
                in care and a practical view of how connected systems, smarter
                workflows and AI-supported tools can help reduce admin burden
                and support frontline teams to focus on what matters most.
              </p>
            </div>
          </div>
        </section>

        {/* SPEAKER + AGENDA */}
        <section className="pb-16 lg:pb-24">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
            {/* Speaker */}
            <div className="rounded-lg bg-gray-200/70 p-8 lg:p-10">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#1D96FC]">
                <Mic size={16} aria-hidden />
                Guest Speaker
              </div>

              <div className="mt-6 flex items-start gap-5">
                <div className="relative w-24 h-24 lg:w-28 lg:h-28 shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={`${IMAGE_DIR}/Bill-Gye-headshot-img.jpg`}
                    alt="Bill Gye OAM"
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-medium text-prussian-blue-800 tracking-heading">
                    Bill Gye OAM
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[#1D96FC]">
                    Director of Education and Training, WEA Sydney
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm text-sognos-text-body leading-relaxed">
                <p>
                  Joining us is Bill Gye OAM, B.A. (Hons. Psych); M.Cog.Sci.
                  (Cognitive Science &mdash; UNSW), one of the sector&rsquo;s
                  most respected leaders, bringing deep insight into
                  community-led mental health.
                </p>
                <p>
                  Bill is currently Director of Education and Training at WEA
                  Sydney. He previously served as CEO of Community Mental Health
                  Australia from 2019 to 2024, and CEO of Ostara Australia, one
                  of Australia&rsquo;s largest specialist mental health
                  employment service providers. Earlier roles include General
                  Manager of Recovery Services at OneDoor Mental Health,
                  formerly the Schizophrenia Fellowship of NSW, and CEO of
                  Options Community Enterprises. He has worked across the care
                  and community sector since 1978.
                </p>
                <p>
                  Bill writes on Substack, including the series{" "}
                  <em>
                    Surviving and Thriving in the Age of Intelligent Machines
                  </em>
                  , and has co-authored several peer-reviewed papers. He has
                  closely followed the development and societal impact of
                  artificial intelligence for more than three decades, with a
                  particular interest in how AI is reshaping human services,
                  workforce models and the future of care.
                </p>
              </div>
            </div>

            {/* Agenda */}
            <div className="rounded-lg bg-gray-200/70 p-8 lg:p-10">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#1D96FC]">
                <CalendarDays size={16} aria-hidden />
                Event Agenda
              </div>
              <h2 className="mt-3 font-heading text-2xl lg:text-3xl font-medium text-prussian-blue-800 tracking-heading">
                8.30 am – 11.00 am
              </h2>

              <ol className="mt-6 relative">
                <span
                  className="absolute left-[7px] top-2 bottom-2 w-px bg-[#1D96FC]/30"
                  aria-hidden
                />
                {agenda.map(({ time, item }) => (
                  <li
                    key={time}
                    className="relative grid grid-cols-[16px_1fr] gap-x-4 pl-0 pb-5 last:pb-0"
                  >
                    <span
                      className="mt-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#1D96FC] shrink-0"
                      aria-hidden
                    />
                    <div>
                      <p className="text-sm font-semibold text-[#1D96FC]">
                        {time}
                      </p>
                      <p className="mt-0.5 text-sm text-prussian-blue-800 leading-snug">
                        {item}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* WHO SHOULD ATTEND + ABOUT SOGNOS */}
        <section className="pb-16 lg:pb-24">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
            {/* Who should attend */}
            <div className="rounded-lg bg-gray-200/70 p-8 lg:p-10">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#1D96FC]">
                <Users size={16} aria-hidden />
                Who Should Attend
              </div>
              <h2 className="mt-3 font-heading text-2xl lg:text-3xl font-medium text-prussian-blue-800 tracking-heading">
                NFP leaders shaping how care is delivered
              </h2>

              <div className="mt-6 flex flex-wrap gap-2">
                {attendeeRoles.map((role) => (
                  <span
                    key={role}
                    className="inline-flex items-center rounded-lg bg-white border border-[#1D96FC]/20 px-3 py-1.5 text-xs font-semibold text-prussian-blue-800"
                  >
                    {role}
                  </span>
                ))}
              </div>

              <p className="mt-6 text-sm text-sognos-text-body leading-relaxed">
                Across NFP health, social and community care organisations. It
                will be especially relevant for providers working across mental
                health, disability, aged care, community health, family
                services, psychosocial support, outreach and mobile service
                delivery.
              </p>
            </div>

            {/* About Sognos */}
            <div className="rounded-lg bg-gray-200/70 p-8 lg:p-10">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#1D96FC]">
                <Building2 size={16} aria-hidden />
                About Sognos
              </div>

              <div className="mt-6 inline-flex items-center gap-3 rounded-lg bg-white px-4 py-3">
                <div className="grid grid-cols-2 gap-0.5 w-6 h-6 shrink-0">
                  <span className="bg-[#F25022]" />
                  <span className="bg-[#7FBA00]" />
                  <span className="bg-[#00A4EF]" />
                  <span className="bg-[#FFB900]" />
                </div>
                <span className="text-sm font-semibold text-prussian-blue-800 leading-tight">
                  Microsoft
                  <br />
                  Solutions Partner
                </span>
              </div>

              <p className="mt-6 text-sm text-sognos-text-body leading-relaxed">
                Sognos is a Microsoft-native business solutions partner working
                with health, social and community care organisations across
                Australia and New Zealand. We support providers delivering
                complex frontline services, including mental health, disability,
                aged care, community health, psychosocial support and mobile
                care teams.
              </p>
              <p className="mt-4 text-sm text-sognos-text-body leading-relaxed">
                What makes Sognos different is our focus on real service
                delivery: care coordination, compliance, rostering, workforce
                visibility and reducing admin burden for frontline teams. Built
                on Microsoft Dynamics 365, Power Platform and AI, our solutions
                are designed to work within the Microsoft ecosystem while
                supporting the way care is actually delivered.
              </p>
              <p className="mt-4 text-sm font-medium text-prussian-blue-800">
                Sognos was recently recognised as a finalist in the 2026 Impact
                Awards.
              </p>
            </div>
          </div>
        </section>

        {/* HOW TO GET THERE */}
        <section className="pb-16 lg:pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="rounded-lg bg-gray-200/70 p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#1D96FC]">
                  <MapPin size={16} aria-hidden />
                  How to Get There
                </div>
                <h2 className="mt-3 font-heading text-2xl lg:text-3xl font-medium text-prussian-blue-800 tracking-heading">
                  Microsoft, Level 27, 1 Denison Street, North Sydney
                </h2>
                <div className="mt-5 space-y-4 text-sm text-sognos-text-body leading-relaxed">
                  <p>
                    Microsoft is located in the heart of North Sydney and is
                    easy to access by public transport. The closest station is
                    <strong> Victoria Cross Metro Station</strong>,
                    approximately a 7-minute walk to 1 Denison Street. North
                    Sydney Station is also nearby and within walking distance.
                  </p>
                  <p>
                    Several bus routes also service the North Sydney CBD, with
                    stops close to Denison Street. For the easiest route on the
                    day, we recommend checking Transport for NSW before you
                    travel.
                  </p>
                  <p>
                    If you are driving, please note that parking at 1 Denison
                    Street is limited. There are several paid parking options
                    nearby, including Wilson Parking locations around Denison
                    Street, Berry Street, Walker Street and Miller Street. We
                    recommend allowing extra time for parking during the morning
                    peak.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="relative w-full aspect-square lg:aspect-[4/3] rounded-lg overflow-hidden bg-white">
                  <iframe
                    title="Map: Microsoft, Level 27, 1 Denison Street, North Sydney"
                    src="https://www.google.com/maps?q=Microsoft%2C%20Level%2027%2C%201%20Denison%20Street%2C%20North%20Sydney%20NSW%202060&output=embed"
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Microsoft%2C+Level+27%2C+1+Denison+Street%2C+North+Sydney+NSW+2060"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white hover:bg-gray-50 text-prussian-blue-800 font-semibold py-3 px-4 text-sm transition-colors"
                >
                  <Navigation size={16} aria-hidden />
                  <span>Get directions</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER CTA BANNER */}
        <section className="pb-16 lg:pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="rounded-lg bg-prussian-blue-800 p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <span className="shrink-0 w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-white">
                  <Users size={22} aria-hidden />
                </span>
                <div>
                  <h2 className="font-heading text-2xl lg:text-3xl font-medium text-white tracking-heading">
                    Ready to join the conversation?
                  </h2>
                  <p className="mt-1.5 text-sm text-[#8E9EBB]">
                    This is a complimentary breakfast event for NFP leaders in
                    health, social and community care. Places are limited to 35
                    attendees.
                  </p>
                </div>
              </div>
              <RegisterButton variant="primary" label="Register now" />
            </div>
          </div>
        </section>

    </main>
  );
}

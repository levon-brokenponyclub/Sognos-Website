import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Post = {
  category: string;
  title: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  excerpt: string;
  twoCol?: boolean;
  body: React.ReactNode;
};

// ─── Badge styles ─────────────────────────────────────────────────────────────

const BADGE_STYLES: Record<string, string> = {
  Milestone: "bg-indigo-50 text-indigo-700 border-indigo-100",
  News: "bg-blue-50 text-blue-700 border-blue-100",
  Events: "bg-amber-50 text-amber-700 border-amber-100",
  Webinar: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Insights: "bg-violet-50 text-violet-700 border-violet-100",
};

// ─── Post data ────────────────────────────────────────────────────────────────

const POSTS: Record<string, Post> = {
  "sognos-9-years": {
    category: "Milestone",
    title:
      "Sognos Solutions Celebrates 9 Years of Growth, Innovation, and Microsoft Dynamics 365 Expertise",
    date: "2025-05-09",
    readTime: "3 min read",
    author: "Sognos Solutions",
    image: "/images/news/sognos-9-years.webp",
    excerpt: "Today marks a major milestone – 9 years of Sognos Solutions.",
    twoCol: true,
    body: (
      <div className="prose prose-lg max-w-none text-sognos-text-body">
        <p>
          Today marks a major milestone – 9 years of Sognos Solutions. Since our
          founding in Australia, our journey through digital transformation has
          been shaped by bold thinking, trusted partnerships, and a passion for
          delivering impactful technology solutions. These efforts help
          organisations achieve more with Microsoft Dynamics 365 and the Power
          Platform.
        </p>
        <p>
          From our early beginnings, Sognos has grown into a global solutions
          partner. We have a strong presence in Australia, New Zealand, and
          India. Additionally, there are exciting new opportunities emerging in
          the United Arab Emirates (UAE).
        </p>
        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          9 Years of Impact and Digital Transformation
        </h2>
        <p>Over nearly a decade, we've achieved:</p>
        <ul>
          <li>
            Tailored Microsoft Dynamics 365 solutions across industries in
            Australia and New Zealand
          </li>
          <li>
            Expansion into new sectors with innovative digital transformation
            and intelligent service delivery
          </li>
          <li>
            A growing international team, including our talented India office.
            Their energy, expertise, and commitment continue to fuel our
            success.
          </li>
        </ul>
        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          Thank You to Our Clients, Partners, and Team
        </h2>
        <p>
          This milestone would not have been possible without the trust of our
          clients. Also, the collaboration of our partners and the dedication of
          the incredible Sognos Solutions team played a vital role. Together,
          we've built a track record of delivering field service excellence,
          operational optimisation, and technology-driven growth.
        </p>
        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          Looking Ahead
        </h2>
        <p>
          As we celebrate 9 years of Sognos Solutions, we remain focused on our
          mission: helping organisations harness the power of Microsoft Dynamics
          365. We aim to optimise operations, overcome field service challenges,
          and deliver measurable business impact.
        </p>
        <p>
          Here's to the next chapter of growth, innovation, and digital
          transformation. We look forward to continuing our journey as a trusted
          partner for organisations worldwide.
        </p>
      </div>
    ),
  },

  "north-sydney-office": {
    category: "News",
    title: "Sognos Solutions Moves to New Office in North Sydney",
    date: "2025-04-07",
    readTime: "2 min read",
    author: "Sognos Solutions",
    image: "/images/news/north-sydney-office.webp",
    excerpt:
      "We're thrilled to share that Sognos Solutions has officially moved to our new office at 1 Denison Street, North Sydney.",
    twoCol: true,
    body: (
      <div className="prose prose-lg max-w-none text-sognos-text-body">
        <p>
          We're thrilled to share that Sognos Solutions has officially moved to
          our new office at 1 Denison Street, North Sydney. The new office
          offers a great location with ample opportunities.
        </p>
        <p>
          This move marks an exciting new chapter in our journey. Our new office
          location allows us to continue to grow and evolve in a space that
          better reflects our team's energy, culture, and ambition. Located in
          one of Sydney's most dynamic business precincts, our new office offers
          a vibrant environment for collaboration, innovation, and connection,
          complete with panoramic views that inspire.
        </p>
        <p>
          The relocation supports our ongoing commitment to delivering
          exceptional service and building strong partnerships, and it gives our
          team a workplace that fosters creativity and focus.
        </p>
        <p>
          We extend a sincere thank you to everyone involved in making the
          transition seamless. Our team managed every detail, from logistics to
          design, with care, and we're already seeing the positive impact take
          shape.
        </p>
        <p>
          We look forward to welcoming our clients, partners, and friends to the
          new space in the weeks ahead.
        </p>
        <p>
          Here's to new beginnings, continued growth, and even greater
          collaboration at Sognos with our new office in North Sydney.
        </p>
      </div>
    ),
  },

  "new-zealand-launch": {
    category: "News",
    title:
      "Sognos Solutions Expands to New Zealand with Official Launch at Microsoft House in Auckland",
    date: "2024-12-05",
    readTime: "3 min read",
    author: "Sognos Solutions",
    image: "/images/news/new-zealand-launch.webp",
    excerpt:
      "Sognos Solutions is proud to announce the official launch of Sognos Solutions New Zealand Limited.",
    twoCol: true,
    body: (
      <div className="prose prose-lg max-w-none text-sognos-text-body">
        <p>
          Sognos Solutions is proud to announce the official launch of Sognos
          Solutions New Zealand Limited. This New Zealand expansion was marked
          by a milestone event at Microsoft's Auckland offices (Microsoft
          House). This exciting expansion strengthens our presence in the region
          and underscores our commitment to delivering world-class Microsoft
          Dynamics 365 and Power Platform solutions to organisations across New
          Zealand.
        </p>
        <p>
          The launch event brought together an impressive line-up of local
          organisations, customers, and partners — including APM Group, Auckland
          Airport, Function10, and Microsoft — who joined us to celebrate this
          next chapter for Sognos and our New Zealand expansion.
        </p>
        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          Introducing SognosCare for Allied Health and Social Care in New
          Zealand
        </h2>
        <p>
          As part of the New Zealand expansion launch, we were proud to unveil
          SognosCare, our purpose-built Accelerator solution for the Allied
          Health and Social Care sector. Designed to empower healthcare
          providers with digital transformation tools, SognosCare streamlines
          service delivery, enhances patient and participant care, and improves
          workforce efficiency. By harnessing the power of Microsoft Cloud and
          Dynamics 365, SognosCare helps providers deliver more connected,
          transparent, and impactful care.
        </p>
        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          A Thank You to Our Partners
        </h2>
        <p>
          We extend our gratitude to our colleagues at Microsoft New Zealand for
          hosting this important event. We also thank our customers and partners
          for their continued support and trust. The turnout, both in-person and
          online, reflects the strength of our growing New Zealand community and
          the shared vision we have for transforming service experiences.
        </p>
        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          Looking Ahead
        </h2>
        <p>
          With our New Zealand office now officially launched, Sognos Solutions
          is excited to partner with organisations across industries — from
          healthcare and social care to utilities and beyond — to solve field
          service challenges and enable digital transformation at scale.
        </p>
      </div>
    ),
  },

  "india-office": {
    category: "News",
    title: "New Beginnings | Office Premises in India",
    date: "2024-09-11",
    readTime: "2 min read",
    author: "Sognos Solutions",
    image: "/images/news/india-office.webp",
    excerpt:
      "As we continue to grow and evolve, we are excited to announce the opening of our new office premises in India.",
    twoCol: true,
    body: (
      <div className="prose prose-lg max-w-none text-sognos-text-body">
        <p>
          As we continue to grow and evolve, we are excited to announce the
          opening of our new office premises in India. This move is a key part
          of our ongoing strategy to expand operational capacity and strengthen
          our service capabilities while retaining our core focus on our
          existing customer base in Australia and New Zealand.
        </p>
        <p>
          With its wealth of talent and technological expertise, India provides
          an ideal environment for operational growth and back-end support as we
          scale our efforts. While our customer base remains firmly rooted in
          Australia and New Zealand, these office premises in India will enhance
          our ability to meet increasing demand and support our teams in
          delivering exceptional value.
        </p>
        <p>
          In keeping with traditions, we marked the occasion with a Pooja
          ceremony, a ritual to invoke blessings for prosperity and success.
          This cultural gesture reflects our respect for local customs and our
          commitment to fostering a positive and productive environment as we
          move forward in our office premises in India.
        </p>
        <p>
          This new space symbolises a new phase in our journey, where we remain
          dedicated to serving our existing markets while exploring new growth
          opportunities.
        </p>
        <p>
          We are excited about the road ahead and look forward to sharing the
          benefits of this expansion with our valued clients.
        </p>
      </div>
    ),
  },

  "fsm-summit-2024": {
    category: "Events",
    title:
      "Sognos at FSM Summit 2024: Driving the Future of Field Service in Sydney",
    date: "2024-08-30",
    readTime: "4 min read",
    author: "Sognos Solutions",
    image: "/images/news/fsm-summit-2024.webp",
    excerpt:
      "The Field Service Management (FSM) Summit 2024 in Sydney brought together the brightest minds in service innovation, and Sognos Solutions was proud to be part of the conversation.",
    twoCol: true,
    body: (
      <div className="prose prose-lg max-w-none text-sognos-text-body">
        <p>
          The Field Service Management (FSM) Summit 2024 in Sydney brought
          together the brightest minds in service innovation, and Sognos
          Solutions was proud to be part of the conversation. As a trusted
          Microsoft partner and field service technology specialist, our team
          joined industry leaders, partners, and peers to explore the next
          generation of field service transformation.
        </p>
        <p>
          The FSM Summit Sydney event was packed with valuable insights on
          automation, customer expectations, workforce challenges, and the
          impact of AI on field service delivery. For Sognos, it was more than a
          networking opportunity — it was a reaffirmation of our mission to help
          clients modernise operations through Microsoft Dynamics 365 and the
          Power Platform.
        </p>
        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          Key Takeaways from FSM Summit 2024
        </h2>
        <ol>
          <li>
            <strong>AI is no longer on the horizon — it's here.</strong> The
            field service industry is rapidly embracing AI to optimise
            scheduling, anticipate equipment failure, and enhance customer
            experiences. Microsoft's Copilot capabilities were front and centre,
            reinforcing how intelligent service is becoming the new normal.
          </li>
          <li>
            <strong>Data-driven decision-making is the new standard.</strong>{" "}
            From asset performance to technician productivity, FSM leaders are
            prioritising platforms that deliver real-time insights. As one
            speaker noted, &ldquo;If you're not measuring it, you're not
            managing it.&rdquo;
          </li>
          <li>
            <strong>People-first innovation is critical.</strong> Amid all the
            tech, there was a strong focus on workforce enablement — ensuring
            field technicians have the right tools, training, and support to
            succeed. At Sognos, we're passionate about building systems that
            empower people as much as they optimise process.
          </li>
        </ol>
        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          The Sognos Team in Action
        </h2>
        <p>
          It was fantastic to see our leadership team connecting with industry
          peers and participating in breakout sessions. We showcased how our
          clients are achieving real results with Dynamics 365 Field Service. We
          also had the opportunity to strengthen relationships with Microsoft,
          reaffirming our shared commitment to digital transformation in
          complex, regulated service industries.
        </p>
        <blockquote>
          <p>
            &ldquo;So great to see this incredible community of service leaders
            coming together at FSM Summit Sydney. The energy and insight were
            unmatched.&rdquo; — Rick Vosila, Co-Founder at Sognos
          </p>
        </blockquote>
        <p>
          We left the FSM Summit more energised than ever about the future of
          field service and the role Sognos will continue to play in shaping it.
        </p>
      </div>
    ),
  },

  "participant-care-webinar": {
    category: "Webinar",
    title: "Enhancing Participant Care with Field Service Management",
    date: "2024-08-13",
    readTime: "1 min read",
    author: "Sognos Solutions",
    image: "/images/news/participant-care-webinar.webp",
    excerpt:
      "Watch the playback of our webinar with Microsoft and Flourish Australia — exploring how field service management is transforming participant care delivery.",
    twoCol: false,
    body: (
      <div className="prose prose-lg max-w-none text-sognos-text-body">
        <p>
          Watch the playback of our webinar with Microsoft and Flourish
          Australia — exploring how field service management is transforming
          participant care delivery.
        </p>
        <p>
          In this session we covered how organisations in the health and social
          care sector are using Microsoft Dynamics 365 Field Service to improve
          participant outcomes, reduce admin burden, and maintain compliance at
          scale.
        </p>
        <p>
          <a
            href="https://sognos.com.au/sognos-webinar-series-reinventing-patient-and-participant-care/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:underline"
          >
            Watch the full webinar on sognos.com.au →
          </a>
        </p>
      </div>
    ),
  },

  "smarter-facilities-management-with-dynamics-365": {
    category: "Insights",
    title: "Smarter facilities management with Dynamics 365",
    date: "2025-04-01",
    readTime: "5 min read",
    author: "Sognos Solutions",
    image: "/images/news/smarter-facilities-mngmt-scaled.avif",
    excerpt:
      "Facilities management can often be an intricate balancing act. You're balancing assets, people, contractors, compliance, and customer expectations across multiple sites, often with work that can't wait until tomorrow.",
    twoCol: true,
    body: (
      <div className="prose prose-lg max-w-none text-sognos-text-body">
        <p>
          Facilities management can often be an intricate balancing act.
          You&apos;re balancing assets, people, contractors, compliance, and
          customer expectations across multiple sites — often with work that
          can&apos;t wait until tomorrow.
        </p>
        <p>
          Legacy systems and disconnected spreadsheets make this harder than it
          needs to be. When a technician can&apos;t see an asset history in the
          field, or a planner can&apos;t match the right skill to the right job,
          the whole operation slows down. Costs rise. SLAs slip. Customers
          notice.
        </p>
        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          What Connected Facilities Management Looks Like
        </h2>
        <p>
          Microsoft Dynamics 365 Field Service brings the key components of FM
          together on one platform: work order management, asset tracking,
          preventive maintenance scheduling, technician dispatch, and real-time
          reporting. When these are connected, your team sees the full picture —
          not just their slice of it.
        </p>
        <p>
          Predictive maintenance capabilities mean you&apos;re flagging equipment
          issues before they become service calls. Intelligent scheduling ensures
          the right technician arrives with the right parts. Mobile access gives
          frontline staff what they need without having to call back to base.
        </p>
        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          Where Sognos Comes In
        </h2>
        <p>
          Sognos works with facilities management organisations to implement and
          configure Dynamics 365 Field Service so it reflects the complexity of
          real operations — multi-site, multi-contractor, and multi-compliance.
          We don&apos;t hand you a platform and walk away. We map your workflows,
          build the integrations you need, and train your team so adoption
          actually sticks.
        </p>
        <p>
          If your team is still stitching together operations across email,
          spreadsheets, and separate tools, it&apos;s worth exploring what a
          unified platform can do.
        </p>
      </div>
    ),
  },

  "from-chaos-to-control-modernising-field-services": {
    category: "Insights",
    title: "From chaos to control: Modernising field services",
    date: "2025-03-15",
    readTime: "5 min read",
    author: "Sognos Solutions",
    image: "/images/news/chaos-to-calm-scaled.avif",
    excerpt:
      "Field services do not usually fall into chaos overnight. It creeps in. A handful of urgent jobs arrive, priorities change mid-day, and the schedule gets stitched together with phone calls, spreadsheets, and best guesses.",
    twoCol: true,
    body: (
      <div className="prose prose-lg max-w-none text-sognos-text-body">
        <p>
          Field services do not usually fall into chaos overnight. It creeps in.
          A handful of urgent jobs arrive, priorities change mid-day, and the
          schedule gets stitched together with phone calls, spreadsheets, and
          best guesses. Before long, what started as a manageable operation
          becomes something reactive and unpredictable.
        </p>
        <p>
          This is the pattern we see most often when organisations come to us
          looking to modernise. The tools they&apos;re using were built for
          simpler times, and the team has been compensating ever since.
        </p>
        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          The Hidden Cost of Reactive Operations
        </h2>
        <p>
          Reactive field service operations carry costs that rarely show up in a
          single line on a report. There&apos;s the overtime when the schedule
          falls apart. The customer that doesn&apos;t get called back. The
          technician driving across town because dispatch didn&apos;t have
          visibility of who was nearby. These are the friction points that erode
          margin and morale over time.
        </p>
        <p>
          Modernising doesn&apos;t mean ripping everything out at once. It means
          identifying where visibility breaks down, where decisions are made
          without enough information, and building toward a model where the right
          data reaches the right person at the right time.
        </p>
        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          What the Shift Looks Like in Practice
        </h2>
        <p>
          Organisations that move from reactive to proactive field service
          typically see three changes early: scheduling accuracy improves,
          first-time fix rates go up, and the volume of inbound status calls
          drops. These aren&apos;t abstract improvements — they reflect a team
          that has the tools to see what&apos;s coming before it becomes a
          problem.
        </p>
        <p>
          Dynamics 365 Field Service, combined with the right implementation
          partner, gives field service managers the platform to make that shift.
          Sognos helps organisations move from chaos to control — one workflow
          at a time.
        </p>
      </div>
    ),
  },

  "the-aged-care-quality-standards-whats-changing-in-2026-and-how-to-implement": {
    category: "Insights",
    title:
      "The aged care quality standards: What's changing in 2026, and how to implement",
    date: "2025-02-20",
    readTime: "6 min read",
    author: "Sognos Solutions",
    image: "/images/news/innovation-aged-care-scaled.avif",
    excerpt:
      "Under the strengthened Aged Care Quality Standards brought in on November 1, 2025, quality of care is judged less by intent and more by what you can demonstrate in everyday records.",
    twoCol: true,
    body: (
      <div className="prose prose-lg max-w-none text-sognos-text-body">
        <p>
          Under the strengthened Aged Care Quality Standards brought in on
          November 1, 2025, quality of care is judged less by intent and more by
          what you can demonstrate in everyday records. For aged care providers,
          this is a fundamental shift — one that demands more from your systems,
          not just your staff.
        </p>
        <p>
          The revised standards place stronger emphasis on individual outcomes,
          organisational governance, and evidence of continuous improvement. If
          your compliance approach still relies on manual documentation and
          periodic audits, you are carrying risk that you may not yet be able to
          see.
        </p>
        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          What the New Standards Require
        </h2>
        <p>
          The eight revised standards span safety, dignity, care delivery,
          services and supports, clinical care, food and nutrition, the living
          environment, and organisational governance. Each standard now requires
          demonstrable evidence — not just policy documentation, but records of
          how care decisions were made, reviewed, and acted on in individual
          cases.
        </p>
        <p>
          For providers operating across multiple sites or with complex caseloads,
          the challenge is consistency. A strong outcome in one location means
          little if documentation practices vary across your organisation.
        </p>
        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          How Technology Supports Implementation
        </h2>
        <p>
          Microsoft Dynamics 365, configured for aged care, gives providers a
          single environment for care plans, progress notes, incident reporting,
          and audit trails. When the data is structured and searchable, compliance
          reporting becomes a byproduct of good care delivery — not an additional
          burden.
        </p>
        <p>
          SognosCare is built on this foundation, with the workflow design and
          reporting structures that aged care providers need to meet the
          strengthened standards and demonstrate continuous improvement to the
          Aged Care Quality and Safety Commission.
        </p>
      </div>
    ),
  },

  "innovation-in-aged-care-what-australia-can-learn-from-systems-already-under-strain": {
    category: "Insights",
    title:
      "Innovation in aged care: What Australia can learn from systems already under strain",
    date: "2025-02-10",
    readTime: "6 min read",
    author: "Sognos Solutions",
    image: "/images/news/NDIS-768x513.avif",
    excerpt:
      "Australia has entered a new era in aged care. With the rights-based Aged Care Act and the Support at Home program now in place, expectations are shifting from 'having policies' to consistently demonstrating safe, person-centred care.",
    twoCol: true,
    body: (
      <div className="prose prose-lg max-w-none text-sognos-text-body">
        <p>
          Australia has entered a new era in aged care. With the rights-based
          Aged Care Act and the Support at Home program now in place, expectations
          are shifting from &apos;having policies&apos; to consistently
          demonstrating safe, person-centred care. This is not a gradual
          evolution — it is a structural reset.
        </p>
        <p>
          Other healthcare systems further down this path offer a useful lens.
          Countries that moved early to rights-based care frameworks faced the
          same challenges now arriving in Australia: workforce pressure, funding
          complexity, compliance overhead, and the need for data systems that
          actually reflect what happens in care.
        </p>
        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          The Lessons Worth Borrowing
        </h2>
        <p>
          In systems that have already navigated this transition, several patterns
          stand out. Providers that invested early in digital care records were
          better positioned to respond to audit requirements and demonstrate
          quality outcomes. Those that continued relying on paper or disconnected
          systems found compliance reporting becoming a separate workstream —
          which added cost and slowed care teams down.
        </p>
        <p>
          Workforce management also proved critical. Providers that could match
          staff skills to participant needs, manage rosters dynamically, and
          maintain continuity of care performed better on both quality metrics and
          staff retention.
        </p>
        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          What This Means for Australian Providers Now
        </h2>
        <p>
          The reform window is open now. Providers that act on their systems and
          processes in 2025 will be in a stronger position when the compliance
          environment tightens further. Waiting for stability in the reform
          program before investing in capability is a risk — the organisations
          that adapt early tend to lead on quality outcomes and attract funding
          accordingly.
        </p>
        <p>
          Sognos works with aged care providers to implement care management and
          workforce tools that are built for this environment. If you&apos;re
          assessing what your systems need to handle the next phase of reform,
          we&apos;re worth talking to.
        </p>
      </div>
    ),
  },

  "data-residency-in-australian-healthcare-sorting-fact-from-fiction": {
    category: "Insights",
    title: "Data residency in Australian healthcare: Sorting fact from fiction",
    date: "2025-01-25",
    readTime: "5 min read",
    author: "Sognos Solutions",
    image: "/images/news/data-residency-768x512.avif",
    excerpt:
      "A persistent myth in healthcare IT is that data must stay onshore to stay safe. Many providers — especially in mental health, disability, and aged care — are told that hosting data overseas is non-compliant or even illegal.",
    twoCol: true,
    body: (
      <div className="prose prose-lg max-w-none text-sognos-text-body">
        <p>
          A persistent myth in healthcare IT is that data must stay onshore to
          stay safe. Many providers — especially in mental health, disability, and
          aged care — are told that hosting data overseas is non-compliant or even
          illegal. This claim has shaped procurement decisions, delayed
          modernisation projects, and led some organisations to maintain expensive
          on-premises infrastructure well past its useful life.
        </p>
        <p>
          The reality is more nuanced, and understanding it matters — because
          acting on misinformation about data residency can cost your organisation
          both money and agility.
        </p>
        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          What Australian Law Actually Requires
        </h2>
        <p>
          The Privacy Act 1988 and the Australian Privacy Principles (APPs) govern
          how health information is handled. They require that personal information
          be protected from misuse, interference, and unauthorised access — but
          they do not mandate that data be stored on Australian soil. The
          obligation is to ensure adequate protections are in place wherever the
          data resides.
        </p>
        <p>
          For cloud services, this means assessing the provider&apos;s security
          controls, certifications, and contractual commitments — not simply their
          data centre location. Microsoft Azure, for example, holds IRAP
          assessments across multiple services and operates Australian data centre
          regions, which satisfies the expectations of most healthcare regulators.
        </p>
        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          Where Genuine Risk Sits
        </h2>
        <p>
          Real data risk in healthcare tends to come from access control gaps,
          unencrypted storage, inadequate audit trails, and poor incident response
          — not from geography. Providers that focus exclusively on residency
          while leaving other security fundamentals unaddressed are solving the
          wrong problem.
        </p>
        <p>
          Sognos helps health and care organisations assess their data governance
          posture and implement Microsoft cloud environments that meet regulatory
          expectations. If your organisation is weighing up cloud adoption and
          has questions about compliance, we can help you separate fact from
          fiction.
        </p>
      </div>
    ),
  },

  "compliance-without-the-paperwork-finding-the-right-ndis-reporting-tools-for-your-organisation": {
    category: "Insights",
    title:
      "Compliance without the paperwork: Finding the right NDIS reporting tools for your organisation",
    date: "2025-01-15",
    readTime: "6 min read",
    author: "Sognos Solutions",
    image: "/images/news/Good-compliance-768x511.avif",
    excerpt:
      "If you lead a disability service today, you can feel it — compliance is back at the centre of everything. The NDIS Commission expects every provider to run a working incident management system, document outcomes, and respond to audits with confidence.",
    twoCol: true,
    body: (
      <div className="prose prose-lg max-w-none text-sognos-text-body">
        <p>
          If you lead a disability service today, you can feel it — compliance is
          back at the centre of everything. The NDIS Commission expects every
          provider to run a working incident management system, document outcomes,
          and respond to audits with confidence. The expectation isn&apos;t just
          that you&apos;re compliant. It&apos;s that you can prove it.
        </p>
        <p>
          For many providers, the gap between what the Commission expects and what
          their current tools can actually produce is significant. Reporting is
          manual, incident records are inconsistent, and pulling together the data
          for an audit means hours of work that could have gone into direct
          support.
        </p>
        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          What Good NDIS Reporting Tools Actually Do
        </h2>
        <p>
          The right tools do two things: they make it easy for support workers to
          capture the right information at the point of care, and they make it
          easy for managers to report on it without extra effort. When those two
          things happen, compliance stops being a separate workstream and becomes
          a byproduct of normal operations.
        </p>
        <p>
          This means incident management that is genuinely easy to use on a mobile
          device, progress notes that are structured without being rigid, and
          reporting dashboards that give management visibility across the whole
          organisation — not just a snapshot of one program.
        </p>
        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          Evaluating Your Options
        </h2>
        <p>
          When assessing NDIS reporting tools, the questions that matter most are
          not about features lists. They are about fit: Does this tool reflect how
          your workers actually deliver support? Can it handle your participant
          mix? Does it connect to your rostering and billing systems, or does it
          create another silo?
        </p>
        <p>
          SognosCare is built on Microsoft Dynamics 365 and designed to meet the
          specific reporting requirements of NDIS providers — from incident
          management and outcome tracking to audit-ready records and NDIS
          Commission reporting. If you&apos;re evaluating your options, we&apos;re
          worth adding to the list.
        </p>
      </div>
    ),
  },

  "aged-care-reform-2025-26-what-providers-need-to-do-now": {
    category: "Insights",
    title: "Aged care reform 2025/26: What providers need to do now",
    date: "2025-01-05",
    readTime: "6 min read",
    author: "Sognos Solutions",
    image: "/images/news/aged-care-reform-768x512.avif",
    excerpt:
      "Reform has landed. Now the real work begins. The new Aged Care Act and Support at Home program came into force, reshaping how aged care operates, funds and proves quality. It is the most significant structural change in a generation.",
    twoCol: true,
    body: (
      <div className="prose prose-lg max-w-none text-sognos-text-body">
        <p>
          Reform has landed. Now the real work begins. The new Aged Care Act and
          Support at Home program came into force, reshaping how aged care
          operates, funds, and proves quality. It is the most significant
          structural change in a generation — and providers are now operating
          inside a compliance environment that rewards organisations that are
          ready, and exposes those that are not.
        </p>
        <p>
          The question for providers in 2025 and 2026 is not whether to act, but
          what to prioritise first.
        </p>
        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          What the Reform Requires Operationally
        </h2>
        <p>
          The Support at Home program introduces a new assessment and budget
          framework that places individual choice at the centre of care planning.
          For providers, this means care plans need to be more dynamic, service
          delivery records need to be more granular, and reporting needs to be
          structured around individual outcomes rather than just service hours.
        </p>
        <p>
          At the governance level, the new Act strengthens the obligations of
          approved providers on quality systems, incident management, and
          continuous improvement. These are not tick-box requirements — they
          require organisations to demonstrate that their systems actually work as
          intended.
        </p>
        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          Where to Start
        </h2>
        <p>
          Providers who are still running care management on legacy systems or
          disconnected tools should treat 2025 as the year to address that. The
          compliance expectations under the new Act are not compatible with manual
          documentation at scale.
        </p>
        <p>
          Sognos works with aged care providers to implement SognosCare —
          a purpose-built care management platform on Microsoft Dynamics 365 —
          that is designed for exactly this operating environment. If you want to
          understand what implementation looks like for your organisation, reach
          out to our team.
        </p>
      </div>
    ),
  },

  "admin-overload-in-care-why-its-burning-out-frontline-workers": {
    category: "Insights",
    title: "Admin overload in care: Why it's burning out frontline workers",
    date: "2024-12-10",
    readTime: "5 min read",
    author: "Sognos Solutions",
    image: "/images/news/admin-overload-768x405.avif",
    excerpt:
      "Across Australia and New Zealand, frontline teams in care and community services are under pressure. Time with people is shrinking as screens take over the workday — and it's pushing good workers out the door.",
    twoCol: true,
    body: (
      <div className="prose prose-lg max-w-none text-sognos-text-body">
        <p>
          Across Australia and New Zealand, frontline teams in care and community
          services are under pressure. Time with people is shrinking as screens
          take over the workday — and it&apos;s pushing good workers out the door.
        </p>
        <p>
          The problem is not that workers have too much to do. The problem is that
          too much of what they do is not care. It is documentation. Duplicate
          data entry. Chasing approvals. Filling out forms that no one reads in
          full. For workers who came into the sector to make a difference for
          people, this disconnect is demoralising.
        </p>
        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          The Scale of the Problem
        </h2>
        <p>
          Research consistently shows that care workers in the NDIS and aged care
          sectors spend a disproportionate amount of time on administrative tasks
          relative to direct support time. In some settings, this ratio is close
          to 1:1. That means for every hour a worker spends with a participant,
          they spend roughly another hour on paperwork.
        </p>
        <p>
          This is not sustainable, and it is not inevitable. It is a systems
          problem — and systems problems can be solved.
        </p>
        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          What Reducing Admin Actually Requires
        </h2>
        <p>
          Reducing admin burden for frontline care workers requires rethinking
          how information is captured and shared — not just digitising existing
          paper forms. When notes are structured at the point of care on a mobile
          device, when shift handover happens in the platform rather than via
          phone, and when compliance reporting is generated automatically from
          care records, the time equation changes.
        </p>
        <p>
          SognosCare is designed with frontline workers in mind — mobile-first,
          structured for compliance, and built to reduce the time between care and
          documentation. If your team is burning out on admin, let&apos;s talk
          about what better looks like.
        </p>
      </div>
    ),
  },

  "mobile-care-app-solutions-empowering-your-frontline-workforce-with-dataverse": {
    category: "Insights",
    title:
      "Mobile care app solutions: Empowering your frontline workforce with Dataverse",
    date: "2024-11-20",
    readTime: "5 min read",
    author: "Sognos Solutions",
    image: "/images/news/mobile-care-app-solutions-768x512.avif",
    excerpt:
      "Frontline care relies on connection — between people, information, and place. Yet for many teams, mobile tools still slow things down. Coverage drops. Logins fail. Notes get written on paper and entered hours later.",
    twoCol: true,
    body: (
      <div className="prose prose-lg max-w-none text-sognos-text-body">
        <p>
          Frontline care relies on connection — between people, information, and
          place. Yet for many teams, mobile tools still slow things down. Coverage
          drops. Logins fail. Notes get written on paper and entered hours later.
          The technology meant to support care workers often creates friction
          instead.
        </p>
        <p>
          The gap between what mobile tools promise and what they deliver in the
          field comes down to how they are built and what they are built on.
          Consumer-grade apps adapted for care often lack the offline capability,
          data structure, and integration depth that professional care environments
          require.
        </p>
        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          Why Dataverse Changes the Equation
        </h2>
        <p>
          Microsoft Dataverse provides the data layer that makes mobile care apps
          work the way they should. Information captured in the field — notes,
          observations, task completions — is stored in a structured format that
          connects directly to care plans, rostering, compliance records, and
          reporting. There is no secondary sync required, no manual reconciliation,
          and no data that exists only on a device.
        </p>
        <p>
          Offline capability means workers can continue recording in low-signal
          environments and have their data synced automatically when connectivity
          returns. For community care workers covering regional or rural areas,
          this is not a nice-to-have — it is essential.
        </p>
        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          What This Looks Like in Practice
        </h2>
        <p>
          Sognos builds mobile care apps on Power Apps and Dataverse that are
          tailored to the specific workflows of NDIS providers, aged care
          organisations, and allied health teams. The apps are designed for
          workers, not system administrators — simple interfaces, structured inputs,
          and the data connections that matter.
        </p>
        <p>
          If your frontline team is working around their mobile tools rather than
          with them, that is a problem worth solving. We can show you what a
          purpose-built approach looks like for your organisation.
        </p>
      </div>
    ),
  },

  "mental-health-and-disability-workforce-burnout-a-growing-crisis": {
    category: "Insights",
    title: "Mental health and disability workforce burnout: A growing crisis",
    date: "2024-11-05",
    readTime: "5 min read",
    author: "Sognos Solutions",
    image: "/images/news/Heathcare-burnout_blog-768x576.avif",
    excerpt:
      "Across Australia, providers in mental health and disability care are facing a growing crisis. Recruitment is harder. Retention is slipping. Rosters are stretched thin — and the people who remain are carrying more than they should.",
    twoCol: true,
    body: (
      <div className="prose prose-lg max-w-none text-sognos-text-body">
        <p>
          Across Australia, providers in mental health and disability care are
          facing a growing crisis. Recruitment is harder. Retention is slipping.
          Rosters are stretched thin — and the people who remain are carrying more
          than they should. Burnout is not a future risk in this sector. It is a
          present reality.
        </p>
        <p>
          The causes are well documented: high emotional demands, inadequate
          supervision, excessive administrative burden, and rosters that leave
          workers feeling like variables rather than people. What is less often
          discussed is the role that operational systems play in either containing
          or compounding these pressures.
        </p>
        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          How Workforce Systems Contribute to Burnout
        </h2>
        <p>
          When rostering is manual or poorly integrated with care planning,
          workers absorb the consequences. Last-minute shift changes with no
          context. Handovers that rely on verbal communication rather than
          structured records. Inconsistent participant allocations that prevent
          relationship building.
        </p>
        <p>
          These are not just inconveniences — they are stressors that compound
          over weeks and months. Workers who feel unsupported by their systems are
          more likely to feel unsupported by their organisation.
        </p>
        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          What Better Operations Look Like for Workforce Wellbeing
        </h2>
        <p>
          Organisations that invest in connected workforce and care management
          tools tend to see measurable improvements in workforce stability. Stable
          rosters reduce uncertainty. Mobile tools that reduce after-hours admin
          give workers back their time. Structured handovers mean workers arrive
          prepared, not guessing.
        </p>
        <p>
          SognosRoster is built to give workforce managers the visibility and
          control to run stable, sustainable rosters — and to give frontline
          workers the information they need to do their jobs without additional
          friction. If workforce stability is a priority for your organisation,
          let&apos;s talk.
        </p>
      </div>
    ),
  },

  "reducing-administrative-burden-through-automated-compliance-tracking": {
    category: "Insights",
    title:
      "Reducing Administrative Burden Through Automated Compliance Tracking in Field Service",
    date: "2024-10-15",
    readTime: "5 min read",
    author: "Sognos Solutions",
    image: "/images/news/admin-blog-768x576.webp",
    excerpt:
      "In highly regulated industries like utilities, healthcare, and infrastructure, compliance isn't optional — it's a daily operational necessity. Yet many field service organisations still rely on manual compliance tracking.",
    twoCol: true,
    body: (
      <div className="prose prose-lg max-w-none text-sognos-text-body">
        <p>
          In highly regulated industries like utilities, healthcare, and
          infrastructure, compliance isn&apos;t optional — it&apos;s a daily
          operational necessity. Yet many field service organisations still rely
          on manual compliance tracking: spreadsheets, printed checklists, and
          follow-up calls to confirm whether the right steps were taken on the
          right job.
        </p>
        <p>
          This approach has a ceiling. As teams grow and job volumes increase, the
          overhead of manual compliance tracking scales linearly with operations.
          At some point, it becomes a constraint on growth — or a liability when
          an audit reveals gaps.
        </p>
        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          What Automated Compliance Tracking Changes
        </h2>
        <p>
          Automated compliance tracking embeds the compliance requirements into
          the work order itself. Technicians complete structured checklists in the
          field on a mobile device. Required certifications are verified before
          dispatch. Audit trails are generated automatically as work is completed.
        </p>
        <p>
          The result is that compliance becomes a byproduct of normal operations
          rather than a separate reporting exercise. Managers gain real-time
          visibility across their compliance status, and audit preparation becomes
          a matter of running a report rather than reconstructing records from
          multiple systems.
        </p>
        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          The Right Platform for Regulated Field Service
        </h2>
        <p>
          Microsoft Dynamics 365 Field Service provides the workflow infrastructure
          to automate compliance at scale. Sognos configures these capabilities
          to reflect the specific requirements of your industry — whether that is
          AS/NZS standards in utilities, care delivery compliance in health, or
          safety protocols in infrastructure.
        </p>
        <p>
          If your team is spending more time documenting compliance than delivering
          service, it is worth exploring what an automated approach can do for
          your operations.
        </p>
      </div>
    ),
  },

  "power-apps-in-action-customising-your-fsm-for-industry-specific-needs": {
    category: "Insights",
    title:
      "Power Apps in Action – Customising Your FSM for Industry-Specific Needs",
    date: "2024-09-25",
    readTime: "5 min read",
    author: "Sognos Solutions",
    image: "/images/news/power-app-blog-2-768x576.webp",
    excerpt:
      "One-size-fits-all rarely works in field service management. Industries like utilities, healthcare, logistics, and infrastructure have unique operational needs, compliance requirements, and customer expectations.",
    twoCol: true,
    body: (
      <div className="prose prose-lg max-w-none text-sognos-text-body">
        <p>
          One-size-fits-all rarely works in field service management. Industries
          like utilities, healthcare, logistics, and infrastructure have unique
          operational needs, compliance requirements, and customer expectations.
          A platform configured for a utility crew managing high-voltage
          infrastructure looks very different from one built for a disability
          support organisation coordinating community care workers.
        </p>
        <p>
          This is where Power Apps changes what is possible. Rather than forcing
          your operations into a standard template, Power Apps allows field
          service platforms to be shaped around your specific workflows — without
          the cost of custom software development.
        </p>
        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          What Customisation With Power Apps Looks Like
        </h2>
        <p>
          Power Apps sits on top of Microsoft Dataverse, which means it connects
          directly to Dynamics 365 Field Service data. Custom apps can be built
          for specific roles — a technician app that surfaces only the job
          information relevant to that worker, a supervisor dashboard built for
          rapid status review, or a client-facing portal for booking and tracking
          service requests.
        </p>
        <p>
          These are not bolt-ons. They are native extensions of the same data
          platform, which means information captured in a Power App flows
          immediately into the broader system — no manual exports, no sync delays,
          no duplicate records.
        </p>
        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          Industry-Specific Applications Sognos Has Built
        </h2>
        <p>
          Sognos has built Power Apps customisations for field service clients
          across facilities management, health and social care, and utilities —
          including mobile job checklists with industry-specific compliance
          requirements, technician certification validation, and real-time asset
          condition reporting.
        </p>
        <p>
          If your current FSM platform doesn&apos;t fit the way your industry
          actually operates, Power Apps is likely part of the solution. Talk to
          our team about what a customised approach looks like for your
          organisation.
        </p>
      </div>
    ),
  },
};

// ─── Meta sidebar ─────────────────────────────────────────────────────────────

function PostMeta({ post }: { post: Post }) {
  const badge =
    BADGE_STYLES[post.category] ??
    "bg-neutral-50 text-neutral-600 border-neutral-100";
  return (
    <aside className="flex flex-col gap-6">
      <Link
        href="/knowledge-hub"
        className="inline-flex items-center gap-2 text-sm font-medium text-sognos-text-muted hover:text-prussian-blue-800 transition-colors"
      >
        <ArrowLeft size={14} />
        Back to Knowledge Hub
      </Link>

      <span
        className={`inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${badge}`}
      >
        {post.category}
      </span>

      <h1 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800">
        {post.title}
      </h1>

      <p className="text-sm text-sognos-text-body leading-relaxed">
        {post.excerpt}
      </p>

      <div className="border-t border-sognos-border-subtle pt-5 flex flex-col gap-3 text-sm text-sognos-text-muted">
        <div className="flex items-center gap-2">
          <span className="font-medium text-prussian-blue-800">Author</span>
          <span>{post.author}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-prussian-blue-800">Published</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-AU", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-prussian-blue-800">Read time</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </aside>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function KnowledgeHubPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POSTS[slug];

  if (!post) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="font-heading text-2xl text-prussian-blue-800">
            Post not found
          </p>
          <Link
            href="/knowledge-hub"
            className="mt-4 inline-block text-sm text-brand hover:underline"
          >
            Back to Knowledge Hub
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white">
      <div className="w-full h-64 lg:h-96 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        {post.twoCol ? (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[340px_1fr]">
            <div className="lg:sticky lg:top-[100px] lg:self-start">
              <PostMeta post={post} />
            </div>
            <div>{post.body}</div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl flex flex-col gap-10">
            <PostMeta post={post} />
            <div>{post.body}</div>
          </div>
        )}
      </div>
    </main>
  );
}

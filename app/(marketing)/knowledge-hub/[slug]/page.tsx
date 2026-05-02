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
};

// ─── Post data ────────────────────────────────────────────────────────────────

const POSTS: Record<string, Post> = {
  "sognos-9-years": {
    category: "Milestone",
    title: "Sognos Solutions Celebrates 9 Years of Growth, Innovation, and Microsoft Dynamics 365 Expertise",
    date: "2025-05-09",
    readTime: "3 min read",
    author: "Sognos Solutions",
    image: "/images/news/sognos-9-years.webp",
    excerpt: "Today marks a major milestone – 9 years of Sognos Solutions.",
    twoCol: true,
    body: (
      <div className="prose prose-lg max-w-none text-sognos-text-body">
        <p>Today marks a major milestone – 9 years of Sognos Solutions. Since our founding in Australia, our journey through digital transformation has been shaped by bold thinking, trusted partnerships, and a passion for delivering impactful technology solutions. These efforts help organisations achieve more with Microsoft Dynamics 365 and the Power Platform.</p>
        <p>From our early beginnings, Sognos has grown into a global solutions partner. We have a strong presence in Australia, New Zealand, and India. Additionally, there are exciting new opportunities emerging in the United Arab Emirates (UAE).</p>
        <h2>9 Years of Impact and Digital Transformation</h2>
        <p>Over nearly a decade, we&apos;ve achieved:</p>
        <ul>
          <li>Tailored Microsoft Dynamics 365 solutions across industries in Australia and New Zealand</li>
          <li>Expansion into new sectors with innovative digital transformation and intelligent service delivery</li>
          <li>A growing international team, including our talented India office. Their energy, expertise, and commitment continue to fuel our success.</li>
        </ul>
        <h2>Thank You to Our Clients, Partners, and Team</h2>
        <p>This milestone would not have been possible without the trust of our clients. Also, the collaboration of our partners and the dedication of the incredible Sognos Solutions team played a vital role. Together, we&apos;ve built a track record of delivering field service excellence, operational optimisation, and technology-driven growth.</p>
        <h2>Looking Ahead</h2>
        <p>As we celebrate 9 years of Sognos Solutions, we remain focused on our mission: helping organisations harness the power of Microsoft Dynamics 365. We aim to optimise operations, overcome field service challenges, and deliver measurable business impact.</p>
        <p>Here&apos;s to the next chapter of growth, innovation, and digital transformation. We look forward to continuing our journey as a trusted partner for organisations worldwide.</p>
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
    excerpt: "We're thrilled to share that Sognos Solutions has officially moved to our new office at 1 Denison Street, North Sydney.",
    twoCol: true,
    body: (
      <div className="prose prose-lg max-w-none text-sognos-text-body">
        <p>We&apos;re thrilled to share that Sognos Solutions has officially moved to our new office at 1 Denison Street, North Sydney. The new office offers a great location with ample opportunities.</p>
        <p>This move marks an exciting new chapter in our journey. Our new office location allows us to continue to grow and evolve in a space that better reflects our team&apos;s energy, culture, and ambition. Located in one of Sydney&apos;s most dynamic business precincts, our new office offers a vibrant environment for collaboration, innovation, and connection, complete with panoramic views that inspire.</p>
        <p>The relocation supports our ongoing commitment to delivering exceptional service and building strong partnerships, and it gives our team a workplace that fosters creativity and focus.</p>
        <p>We extend a sincere thank you to everyone involved in making the transition seamless. Our team managed every detail, from logistics to design, with care, and we&apos;re already seeing the positive impact take shape.</p>
        <p>We look forward to welcoming our clients, partners, and friends to the new space in the weeks ahead.</p>
        <p>Here&apos;s to new beginnings, continued growth, and even greater collaboration at Sognos with our new office in North Sydney.</p>
      </div>
    ),
  },

  "new-zealand-launch": {
    category: "News",
    title: "Sognos Solutions Expands to New Zealand with Official Launch at Microsoft House in Auckland",
    date: "2024-12-05",
    readTime: "3 min read",
    author: "Sognos Solutions",
    image: "/images/news/new-zealand-launch.webp",
    excerpt: "Sognos Solutions is proud to announce the official launch of Sognos Solutions New Zealand Limited.",
    twoCol: true,
    body: (
      <div className="prose prose-lg max-w-none text-sognos-text-body">
        <p>Sognos Solutions is proud to announce the official launch of Sognos Solutions New Zealand Limited. This New Zealand expansion was marked by a milestone event at Microsoft&apos;s Auckland offices (Microsoft House). This exciting expansion strengthens our presence in the region and underscores our commitment to delivering world-class Microsoft Dynamics 365 and Power Platform solutions to organisations across New Zealand.</p>
        <p>The launch event brought together an impressive line-up of local organisations, customers, and partners — including APM Group, Auckland Airport, Function10, and Microsoft — who joined us to celebrate this next chapter for Sognos and our New Zealand expansion.</p>
        <h2>Introducing SognosCare for Allied Health and Social Care in New Zealand</h2>
        <p>As part of the New Zealand expansion launch, we were proud to unveil SognosCare, our purpose-built Accelerator solution for the Allied Health and Social Care sector. Designed to empower healthcare providers with digital transformation tools, SognosCare streamlines service delivery, enhances patient and participant care, and improves workforce efficiency. By harnessing the power of Microsoft Cloud and Dynamics 365, SognosCare helps providers deliver more connected, transparent, and impactful care.</p>
        <h2>A Thank You to Our Partners</h2>
        <p>We extend our gratitude to our colleagues at Microsoft New Zealand for hosting this important event. We also thank our customers and partners for their continued support and trust. The turnout, both in-person and online, reflects the strength of our growing New Zealand community and the shared vision we have for transforming service experiences.</p>
        <h2>Looking Ahead</h2>
        <p>With our New Zealand office now officially launched, Sognos Solutions is excited to partner with organisations across industries — from healthcare and social care to utilities and beyond — to solve field service challenges and enable digital transformation at scale.</p>
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
    excerpt: "As we continue to grow and evolve, we are excited to announce the opening of our new office premises in India.",
    twoCol: true,
    body: (
      <div className="prose prose-lg max-w-none text-sognos-text-body">
        <p>As we continue to grow and evolve, we are excited to announce the opening of our new office premises in India. This move is a key part of our ongoing strategy to expand operational capacity and strengthen our service capabilities while retaining our core focus on our existing customer base in Australia and New Zealand.</p>
        <p>With its wealth of talent and technological expertise, India provides an ideal environment for operational growth and back-end support as we scale our efforts. While our customer base remains firmly rooted in Australia and New Zealand, these office premises in India will enhance our ability to meet increasing demand and support our teams in delivering exceptional value.</p>
        <p>In keeping with traditions, we marked the occasion with a Pooja ceremony, a ritual to invoke blessings for prosperity and success. This cultural gesture reflects our respect for local customs and our commitment to fostering a positive and productive environment as we move forward in our office premises in India.</p>
        <p>This new space symbolises a new phase in our journey, where we remain dedicated to serving our existing markets while exploring new growth opportunities.</p>
        <p>We are excited about the road ahead and look forward to sharing the benefits of this expansion with our valued clients.</p>
      </div>
    ),
  },

  "fsm-summit-2024": {
    category: "Events",
    title: "Sognos at FSM Summit 2024: Driving the Future of Field Service in Sydney",
    date: "2024-08-30",
    readTime: "4 min read",
    author: "Sognos Solutions",
    image: "/images/news/fsm-summit-2024.webp",
    excerpt: "The Field Service Management (FSM) Summit 2024 in Sydney brought together the brightest minds in service innovation, and Sognos Solutions was proud to be part of the conversation.",
    twoCol: true,
    body: (
      <div className="prose prose-lg max-w-none text-sognos-text-body">
        <p>The Field Service Management (FSM) Summit 2024 in Sydney brought together the brightest minds in service innovation, and Sognos Solutions was proud to be part of the conversation. As a trusted Microsoft partner and field service technology specialist, our team joined industry leaders, partners, and peers to explore the next generation of field service transformation.</p>
        <p>The FSM Summit Sydney event was packed with valuable insights on automation, customer expectations, workforce challenges, and the impact of AI on field service delivery. For Sognos, it was more than a networking opportunity — it was a reaffirmation of our mission to help clients modernise operations through Microsoft Dynamics 365 and the Power Platform.</p>
        <h2>Key Takeaways from FSM Summit 2024</h2>
        <ol>
          <li><strong>AI is no longer on the horizon — it&apos;s here.</strong> The field service industry is rapidly embracing AI to optimise scheduling, anticipate equipment failure, and enhance customer experiences. Microsoft&apos;s Copilot capabilities were front and centre, reinforcing how intelligent service is becoming the new normal.</li>
          <li><strong>Data-driven decision-making is the new standard.</strong> From asset performance to technician productivity, FSM leaders are prioritising platforms that deliver real-time insights. As one speaker noted, &ldquo;If you&apos;re not measuring it, you&apos;re not managing it.&rdquo;</li>
          <li><strong>People-first innovation is critical.</strong> Amid all the tech, there was a strong focus on workforce enablement — ensuring field technicians have the right tools, training, and support to succeed. At Sognos, we&apos;re passionate about building systems that empower people as much as they optimise process.</li>
        </ol>
        <h2>The Sognos Team in Action</h2>
        <p>It was fantastic to see our leadership team connecting with industry peers and participating in breakout sessions. We showcased how our clients are achieving real results with Dynamics 365 Field Service. We also had the opportunity to strengthen relationships with Microsoft, reaffirming our shared commitment to digital transformation in complex, regulated service industries.</p>
        <blockquote><p>&ldquo;So great to see this incredible community of service leaders coming together at FSM Summit Sydney. The energy and insight were unmatched.&rdquo; — Rick Vosila, Co-Founder at Sognos</p></blockquote>
        <p>We left the FSM Summit more energised than ever about the future of field service and the role Sognos will continue to play in shaping it.</p>
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
    excerpt: "Watch the playback of our webinar with Microsoft and Flourish Australia — exploring how field service management is transforming participant care delivery.",
    twoCol: false,
    body: (
      <div className="prose prose-lg max-w-none text-sognos-text-body">
        <p>Watch the playback of our webinar with Microsoft and Flourish Australia — exploring how field service management is transforming participant care delivery.</p>
        <p>In this session we covered how organisations in the health and social care sector are using Microsoft Dynamics 365 Field Service to improve participant outcomes, reduce admin burden, and maintain compliance at scale.</p>
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
};

// ─── Meta sidebar ─────────────────────────────────────────────────────────────

function PostMeta({ post }: { post: Post }) {
  const badge = BADGE_STYLES[post.category] ?? "bg-neutral-50 text-neutral-600 border-neutral-100";
  return (
    <aside className="flex flex-col gap-6">
      <Link
        href="/knowledge-hub"
        className="inline-flex items-center gap-2 text-sm font-medium text-sognos-text-muted hover:text-prussian-blue-800 transition-colors"
      >
        <ArrowLeft size={14} />
        Back to Knowledge Hub
      </Link>

      <span className={`inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${badge}`}>
        {post.category}
      </span>

      <h1 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800">
        {post.title}
      </h1>

      <p className="text-sm text-sognos-text-body leading-relaxed">{post.excerpt}</p>

      <div className="border-t border-sognos-border-subtle pt-5 flex flex-col gap-3 text-sm text-sognos-text-muted">
        <div className="flex items-center gap-2">
          <span className="font-medium text-prussian-blue-800">Author</span>
          <span>{post.author}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-prussian-blue-800">Published</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}
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

export default async function KnowledgeHubPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS[slug];

  if (!post) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="font-heading text-2xl text-prussian-blue-800">Post not found</p>
          <Link href="/knowledge-hub" className="mt-4 inline-block text-sm text-brand hover:underline">
            Back to Knowledge Hub
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white">
      <div className="w-full h-64 lg:h-96 overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
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

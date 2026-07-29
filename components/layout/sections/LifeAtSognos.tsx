import Image from "next/image";
import { AnimatedEyebrow } from "@/components/ui/AnimatedEyebrow";

const TESTIMONIALS = [
  {
    name: "Mayank Raval",
    role: "Dynamics 365 CE Technical Lead",
    image: "/images/team/Mayank-Raval.webp",
    quote:
      "I appreciate working with Sognos for its dynamic environment, where innovation thrives, and the opportunity to contribute to cutting-edge solutions allows for continuous learning and professional growth. I also appreciate the work-life balance and flexibility with my working hours that Sognos offers. It's not just a job; it's a journey of both professional and personal growth within a group that feels like family.",
    className:
      "sm:col-span-2 lg:col-span-7 lg:row-span-2 bg-sognos-blue-accent text-white",
    featured: true,
  },
  {
    name: "Brian Kasmara",
    role: "Technical Consultant",
    image: "/images/team/Brian-Kasmara.webp",
    quote:
      "As a technical consultant I appreciate the challenges that come every day. It discourages having a narrow view and encourages puzzle-solving with others. It's common that we are required to innovate within the Field Services space and as a result, we have a team that is highly supportive and willing to share knowledge across different areas.",
    className: "lg:col-span-5 bg-white text-sognos-body",
  },
  {
    name: "Mrigul Arora aka Mac",
    role: "Business Analyst",
    image: "/images/team/Mrigul-Arora.webp",
    quote:
      "Working at Sognos is a true delight. The vibrant atmosphere fosters creativity, allowing me to explore innovative ideas freely. Moreover, the infectious enthusiasm of my seniors towards achieving greatness is truly inspiring. It's not just a job; it's a journey towards excellence.",
    className: "lg:col-span-5 bg-white text-sognos-body",
  },
  {
    name: "Rishit Patel",
    role: "Dynamics 365 Technical Consultant",
    image: "/images/team/Rishit-Patel.webp",
    quote:
      "At Sognos, I am empowered to unravel the complexities of business processes to streamline field services. They value my knowledge and expertise, making the work I do alongside our customers intuitive and impactful.",
    className: "lg:col-span-6 bg-white text-sognos-body",
  },
  {
    name: "Arayen Desai",
    role: "Dynamics 365 Technical Consultant",
    image: "/images/team/Arayen-Desai.webp",
    quote:
      "At Sognos, I've discovered more than just a workplace; it's a close-knit family dedicated to fostering improvement and reaching for excellence together. Every day, we turn challenges into opportunities, creating a thriving environment where success is a collective journey.",
    className: "lg:col-span-6 bg-sognos-navy-darkest text-white",
  },
] as const;

function TestimonialAuthor({
  name,
  role,
  image,
  inverted,
}: {
  name: string;
  role: string;
  image: string;
  inverted: boolean;
}) {
  return (
    <figcaption className="grid grid-cols-[auto_1fr] items-center gap-3">
      <div
        className={[
          "relative size-12 overflow-hidden rounded-full border",
          inverted ? "border-white/20" : "border-sognos-line",
        ].join(" ")}
      >
        <Image
          src={image}
          alt={name}
          fill
          loading="lazy"
          className="object-cover"
          sizes="48px"
        />
      </div>
      <div className="min-w-0">
        <cite className="block truncate text-sm font-semibold not-italic">
          {name}
        </cite>
        <span
          className={[
            "mt-0.5 block text-xs leading-snug",
            inverted ? "text-white/65" : "text-sognos-muted",
          ].join(" ")}
        >
          {role}
        </span>
      </div>
    </figcaption>
  );
}

export default function LifeAtSognos() {
  return (
    <section className="w-full border-b border-white/10 bg-sognos-navy py-20 lg:py-28">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="flex flex-col items-center pb-12 text-center lg:pb-16">
          <AnimatedEyebrow className="justify-center">
            Our team
          </AnimatedEyebrow>
          <h2 className="mt-4 max-w-xl text-balance font-heading text-3xl font-normal tracking-tight text-white md:text-4xl">
            Life at Sognos
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/65">
            Hear directly from the people who build and deliver Sognos every day.
          </p>
        </div>

        <div className="grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:gap-4">
          {TESTIMONIALS.map((testimonial) => {
            const inverted = testimonial.className.includes("text-white");

            return (
              <article
                key={testimonial.name}
                className={[
                  "min-w-0 rounded-lg border p-6 sm:p-7 lg:p-8",
                  inverted ? "border-white/10" : "border-sognos-line",
                  testimonial.className,
                ].join(" ")}
              >
                <blockquote className="grid h-full grid-rows-[1fr_auto] gap-10">
                  <div>
                    <span
                      aria-hidden="true"
                      className={[
                        "block font-heading text-5xl leading-none",
                        inverted
                          ? "text-white/30"
                          : "text-sognos-blue-accent/35",
                      ].join(" ")}
                    >
                      &ldquo;
                    </span>
                    <p
                      className={[
                        "-mt-2 font-heading font-normal leading-snug tracking-tight",
                        "featured" in testimonial && testimonial.featured
                          ? "text-2xl md:text-3xl"
                          : "text-lg md:text-xl",
                        inverted ? "text-white" : "text-sognos-heading",
                      ].join(" ")}
                    >
                      {testimonial.quote}
                    </p>
                  </div>

                  <TestimonialAuthor
                    name={testimonial.name}
                    role={testimonial.role}
                    image={testimonial.image}
                    inverted={inverted}
                  />
                </blockquote>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

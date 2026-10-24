// Certification, government prequalification and industry memberships.
// Shared by the Footer and the About page so the two can't drift. Intrinsic
// sizes are the supplied artwork's own — height is capped in the markup, so
// these only set the aspect ratio Next needs.
export type Accreditation = {
  alt: string;
  src: string;
  width: number;
  height: number;
  href?: string;
  title?: string;
};

export const ACCREDITATIONS: Accreditation[] = [
  {
    alt: "ISO 27001 Information Security - certified by Compass Assurance Services",
    src: "/logos/accreditations/iso-27001.png",
    width: 714,
    height: 193,
  },
  {
    alt: "NSW Government Approved Supplier - SCM0020 Prequalification Scheme: ICT Services",
    src: "/logos/accreditations/nsw-ict-services.png",
    width: 1024,
    height: 299,
  },
  {
    alt: "Australasian Institute of Digital Health - Organisational Member",
    src: "/logos/accreditations/aidh.png",
    width: 200,
    height: 100,
  },
  {
    alt: "Talking HealthTech partner",
    src: "/logos/accreditations/talking-health-tech.png",
    width: 200,
    height: 200,
    href: "https://www.talkinghealthtech.com/sognos-solutions?from=badge",
    title: "Find me on Talking HealthTech",
  },
];

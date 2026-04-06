const beams = [
  {
    id: "b1",
    d: "M 600 10 C 350 10, 150 140, 150 280",
    dur: 3,
    delay: 0,
    x1From: "700",
    x1To: "30",
    x2From: "820",
    x2To: "150",
  },
  {
    id: "b2",
    d: "M 600 10 C 540 10, 450 140, 450 280",
    dur: 2.5,
    delay: 0.8,
    x1From: "700",
    x1To: "330",
    x2From: "820",
    x2To: "450",
  },
  {
    id: "b3",
    d: "M 600 10 C 660 10, 750 140, 750 280",
    dur: 2.5,
    delay: 1.6,
    x1From: "500",
    x1To: "630",
    x2From: "380",
    x2To: "750",
  },
  {
    id: "b4",
    d: "M 600 10 C 850 10, 1050 140, 1050 280",
    dur: 3,
    delay: 2.4,
    x1From: "500",
    x1To: "930",
    x2From: "380",
    x2To: "1050",
  },
];

export default function MapAnimation() {
  return (
    <div className="relative w-full h-[150px] hidden md:block pointer-events-none overflow-hidden">
      <svg
        viewBox="0 0 1200 280"
        className="w-full"
        style={{ height: "280px" }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {beams.map((b) => (
            <linearGradient
              key={b.id}
              id={`map-grad-${b.id}`}
              gradientUnits="userSpaceOnUse"
              x1={b.x1From}
              x2={b.x2From}
              y1="0"
              y2="0"
            >
              <animate
                attributeName="x1"
                values={`${b.x1From};${b.x1To}`}
                dur={`${b.dur}s`}
                begin={`${b.delay}s`}
                repeatCount="indefinite"
                calcMode="linear"
              />
              <animate
                attributeName="x2"
                values={`${b.x2From};${b.x2To}`}
                dur={`${b.dur}s`}
                begin={`${b.delay}s`}
                repeatCount="indefinite"
                calcMode="linear"
              />
              <stop offset="0%" stopColor="#1e96fc" stopOpacity="0" />
              <stop offset="30%" stopColor="#1e96fc" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#60b8ff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#60b8ff" stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        {beams.map((b) => (
          <path
            key={`map-track-${b.id}`}
            d={b.d}
            stroke="#dcdfe6"
            strokeWidth="1"
            strokeOpacity="0.7"
            strokeLinecap="round"
          />
        ))}

        {beams.map((b) => (
          <path
            key={`map-beam-${b.id}`}
            d={b.d}
            stroke={`url(#map-grad-${b.id})`}
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
      </svg>
    </div>
  );
}

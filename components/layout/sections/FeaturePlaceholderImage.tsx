import Image from "next/image";

export default function FeaturePlaceholderImage({ index }: { index: number }) {
  const n = String((index % 6) + 1).padStart(2, "0");
  return (
    <div className="relative h-full min-h-[280px] w-full overflow-hidden rounded-lg">
      <Image
        src={`/product/feature-${n}.webp`}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 560px"
      />
    </div>
  );
}

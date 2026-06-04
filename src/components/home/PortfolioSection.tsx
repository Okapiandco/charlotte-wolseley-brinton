import Image from "next/image";
import type { PortfolioItem } from "@prisma/client";

type Props = {
  headline: string;
  items: PortfolioItem[];
};

export function PortfolioSection({ headline, items }: Props) {
  if (!items.length) return null;

  return (
    <section className="bg-white py-28 px-8 md:px-16" id="portfolio">
      <div className="max-w-6xl mx-auto">
        <p className="font-[family-name:var(--font-jost)] text-[0.65rem] tracking-[0.3em] uppercase text-[#5a8f94] mb-6 flex items-center gap-4 before:content-[''] before:w-8 before:h-px before:bg-[#b89a6a] before:flex-shrink-0">
          Portfolio
        </p>
        <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2rem,3.5vw,3.5rem)] font-light leading-[1.1] text-[#1a2840] mb-16">
          {headline}
        </h2>

        <div className="grid grid-cols-2 gap-6">
          {items.map((item) => (
            <div key={item.id} className="group overflow-hidden relative aspect-[4/3]">
              <Image
                src={item.imageUrl}
                alt={item.imageAlt || item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#1a2840]/0 group-hover:bg-[#1a2840]/60 transition-colors duration-300 flex items-end">
                <div className="p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-[family-name:var(--font-cormorant)] text-lg text-white">{item.title}</p>
                  {item.category && (
                    <p className="font-[family-name:var(--font-jost)] text-[0.65rem] tracking-[0.2em] uppercase text-[#8fb8bc] mt-1">{item.category}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

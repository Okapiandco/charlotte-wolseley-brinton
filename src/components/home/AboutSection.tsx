import Image from "next/image";

type Props = { image: string };

export function AboutSection({ image }: Props) {
  return (
    <section className="bg-white py-28 px-8 md:px-16" id="about">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-24 items-start">
          {/* Photo */}
          <div className="relative">
            {image ? (
              <>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image src={image} alt="Charlotte Wolseley Brinton" fill className="object-cover object-top" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-[#8fb8bc] p-6">
                  <p className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1a2840] leading-none">25+</p>
                  <span className="font-[family-name:var(--font-jost)] text-[0.65rem] tracking-[0.2em] uppercase text-[#1a2840]/70">Years Experience</span>
                </div>
              </>
            ) : (
              <div className="aspect-[3/4] bg-[#f5f2ec] flex items-center justify-center relative">
                <p className="font-[family-name:var(--font-cormorant)] text-6xl text-[#8fb8bc] opacity-30">CWB</p>
                <div className="absolute -bottom-6 -right-6 bg-[#8fb8bc] p-6">
                  <p className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1a2840] leading-none">25+</p>
                  <span className="font-[family-name:var(--font-jost)] text-[0.65rem] tracking-[0.2em] uppercase text-[#1a2840]/70">Years Experience</span>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="pt-4">
            <p className="font-[family-name:var(--font-jost)] text-[0.65rem] tracking-[0.3em] uppercase text-[#5a8f94] mb-6 flex items-center gap-4 before:content-[''] before:w-8 before:h-px before:bg-[#b89a6a] before:flex-shrink-0">
              About Charlotte
            </p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2rem,3.5vw,3.5rem)] font-light leading-[1.15] text-[#1a2840] mb-3">
              A rare combination of<br />
              <em className="italic text-[#5a8f94]">creativity, precision</em><br />
              and personal warmth
            </h2>
            <p className="font-[family-name:var(--font-cormorant)] italic text-lg text-[#6b7585] mb-8">
              Born in Scotland, shaped by the world
            </p>

            <div className="space-y-5 mb-10">
              <p className="font-[family-name:var(--font-jost)] text-[0.9rem] leading-[1.9] text-[#6b7585] font-light">
                Charlotte Wolseley Brinton brings over two decades of international experience to every event. From intimate private celebrations to high-profile cultural moments, she has built a quiet reputation for delivering the extraordinary — always with discretion, always with care.
              </p>
              <p className="font-[family-name:var(--font-jost)] text-[0.9rem] leading-[1.9] text-[#6b7585] font-light">
                Born in Scotland and educated in South Africa, Charlotte began her career in investment banking in the City before following her curiosity through interior design and the charity sector, ultimately becoming Head of Events at one of London&apos;s leading catering companies.
              </p>
              <p className="font-[family-name:var(--font-jost)] text-[0.9rem] leading-[1.9] text-[#6b7585] font-light">
                She manages every element of an event herself — from initial concept and design through to costings, logistics and supplier management — ensuring her clients&apos; vision is not just met, but exceeded.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Founded", value: "Event Fusion · Managing Director" },
                { label: "Serpentine Gallery", value: "Interim Head of Development" },
                { label: "Global Reach", value: "London, Cape Town, Mauritius, Paris & beyond" },
                { label: "Client Range", value: "Royalty, celebrities, corporations & charities" },
              ].map((h) => (
                <div key={h.label} className="border-l-2 border-[#8fb8bc] pl-4">
                  <strong className="block font-[family-name:var(--font-jost)] font-medium text-[0.75rem] text-[#1a2840]">{h.label}</strong>
                  <span className="font-[family-name:var(--font-jost)] text-[0.8rem] text-[#6b7585] leading-snug">{h.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const QUALITIES = [
  { title: "Quality", desc: "Meticulously planned events and boutique conferences of the highest standard, never compromising on the finer details." },
  { title: "Human Touch", desc: "Work grounded in genuine warmth and personal care, building strong and long-lasting working relationships." },
  { title: "Network", desc: "An extensive network of high-profile contacts and trusted suppliers — relationships built over two decades." },
  { title: "Client First", desc: "Empathy, patience and understanding to ensure that the client's needs — above all else — are always met." },
  { title: "Innovation", desc: "An innovative and creative approach to crafting bespoke events that feel genuinely distinctive and memorable." },
  { title: "Integrity", desc: "An approach built on deep honesty and transparency — the foundation of every lasting client relationship." },
];

export function DistinctionSection() {
  return (
    <section className="bg-[#f5f2ec] py-28 px-8 md:px-16" id="distinction">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-16 items-start">
          {/* Left */}
          <div>
            <p className="font-[family-name:var(--font-jost)] text-[0.65rem] tracking-[0.3em] uppercase text-[#5a8f94] mb-6 flex items-center gap-4 before:content-[''] before:w-8 before:h-px before:bg-[#b89a6a] before:flex-shrink-0">
              Distinction
            </p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2rem,3.5vw,3.5rem)] font-light leading-[1.1] text-[#1a2840]">
              What sets<br /><em className="italic text-[#5a8f94]">Charlotte</em><br />apart
            </h2>
          </div>

          {/* Grid */}
          <div className="md:col-span-2 grid grid-cols-2 gap-6">
            {QUALITIES.map((q) => (
              <div key={q.title} className="bg-white p-8 border-b-2 border-[#8fb8bc]">
                <h3 className="font-[family-name:var(--font-jost)] text-[0.7rem] tracking-[0.2em] uppercase text-[#5a8f94] font-medium mb-4">{q.title}</h3>
                <p className="font-[family-name:var(--font-jost)] text-[0.85rem] leading-[1.9] text-[#6b7585] font-light">{q.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

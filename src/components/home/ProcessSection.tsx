type Step = { title: string; description: string };
type Props = { steps: Step[] };

const DEFAULT_STEPS: Step[] = [
  {
    title: "Getting Started",
    description: "That first conversation is really just about getting to know you and understanding what you need. What's the event? When and where? How many guests? Our motto has always been never to say no — everything is possible.",
  },
  {
    title: "Building Your Team",
    description: "We handpick the right suppliers to bring your vision to life, drawing on an extensive network of trusted professionals. We do the heavy lifting — filtering options, managing quotes — while keeping you involved at every step.",
  },
  {
    title: "The Journey",
    description: "Over the weeks and months that follow, everything gradually comes together — invitations, menus, flowers, the look and feel. You'll be in very safe, experienced, and enthusiastic hands from concept through to your unforgettable day.",
  },
];

export function ProcessSection({ steps }: Props) {
  const items = steps?.length ? steps : DEFAULT_STEPS;

  return (
    <section className="bg-[#1a2840] py-28 px-8 md:px-16" id="process">
      <div className="max-w-6xl mx-auto">
        <p className="font-[family-name:var(--font-jost)] text-[0.65rem] tracking-[0.3em] uppercase text-[#8fb8bc] mb-6 flex items-center gap-4 before:content-[''] before:w-8 before:h-px before:bg-[#8fb8bc] before:flex-shrink-0">
          How It Works
        </p>
        <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2rem,3.5vw,3.5rem)] font-light text-white leading-[1.15] mb-16">
          From first conversation<br />to <em className="italic text-[#8fb8bc]">unforgettable moment</em>
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          {items.map((step, i) => (
            <div key={i} className="relative pt-8 border-t border-[#8fb8bc]/25">
              <span className="absolute top-0 right-0 -translate-y-1/2 font-[family-name:var(--font-cormorant)] text-6xl font-light text-[#8fb8bc]/20 leading-none">
                {i + 1}
              </span>
              <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-light text-white mb-4">
                {step.title}
              </h3>
              <p className="font-[family-name:var(--font-jost)] text-[0.85rem] leading-[1.9] text-white/50 font-light">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

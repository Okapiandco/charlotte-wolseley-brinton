import type { Service } from "@prisma/client";

type Props = { services: Service[] };

const DESCRIPTIONS: Record<string, string> = {
  "private-celebrations": "Weddings, milestone birthdays, anniversaries and intimate gatherings, designed around you with absolute discretion and personal care.",
  "cultural-arts-events": "Gallery openings, pavilion curation, cultural programmes and high-profile occasions for institutions, foundations and creative organisations.",
  "corporate-events": "Product launches, boutique conferences, awards ceremonies and client entertainment, enhancing your profile and reinforcing your brand.",
  "government-diplomatic": "Foreign & Commonwealth Office events, high commissioner engagements and international diplomatic occasions handled with precision.",
  "charity-galas-fundraisers": "From The Prince's Trust to major international charities — events that inspire generosity and leave a lasting impression.",
  "consultancy": "Developing and restructuring event departments, mentoring and training teams. Clients include Tate, The Royal Institution and The Mayor's Office for Culture.",
};

const NUMS = ["01", "02", "03", "04", "05", "06"];

export function ServicesSection({ services }: Props) {
  return (
    <section className="bg-[#f5f2ec] py-28 px-8 md:px-16" id="services">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-16 mb-20 items-end">
          <div>
            <p className="font-[family-name:var(--font-jost)] text-[0.65rem] tracking-[0.3em] uppercase text-[#5a8f94] mb-6 flex items-center gap-4 before:content-[''] before:w-8 before:h-px before:bg-[#b89a6a] before:flex-shrink-0">
              What I Offer
            </p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2rem,3.5vw,3.5rem)] font-light leading-[1.1] text-[#1a2840]">
              Bespoke<br /><em className="italic text-[#5a8f94]">events</em><br />at every scale
            </h2>
          </div>
          <div className="md:col-span-2">
            <p className="font-[family-name:var(--font-jost)] text-[0.9rem] leading-[1.9] text-[#6b7585] font-light">
              Whether your event is a one-off celebration, part of an ongoing series, private, corporate, or a charity occasion — each one receives the same warmth, diplomacy, and respect. We take the time to truly understand your circumstances, your vision, and your budget.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 border border-[#ede8de]">
          {services.map((svc, i) => (
            <div
              key={svc.id}
              className="p-10 border-b border-r border-[#8fb8bc]/35 [&:nth-child(3n)]:border-r-0"
            >
              <div className="font-[family-name:var(--font-cormorant)] text-5xl font-light text-[#8fb8bc]/40 leading-none mb-6">
                {NUMS[i] ?? String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-medium text-[#1a2840] mb-3">
                {svc.title}
              </h3>
              <p className="font-[family-name:var(--font-jost)] text-[0.82rem] leading-[1.8] text-[#6b7585] font-light">
                {DESCRIPTIONS[svc.slug] ?? svc.subtitle ?? ""}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

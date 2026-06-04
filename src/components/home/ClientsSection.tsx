export function ClientsSection() {
  const categories = [
    {
      heading: "Government & Culture",
      text: "The Mayor's Office for Culture · Foreign & Commonwealth Office · World Cities Culture Forum · The Serpentine Summer Party (5 years) · Opening of the Serpentine North Gallery · Venice Biennale for Lisson Gallery · Opening of the Royal Exchange · Nigerian Pavilion at Révélations, Paris · The Sherborne",
    },
    {
      heading: "Fashion, Arts & Luxury",
      text: "Cork Street 100 Years Celebration · Sotheby's · Louis Vuitton Moët Hennessy · De Beers · Mont Blanc · Bulgari · Leopard Gala Jewellery Awards · Blohm & Voss (launch of the Zaha Hadid Mega Yacht)",
    },
    {
      heading: "Renowned Individuals",
      text: "TRH The Duke & Duchess of Edinburgh · Sir Elton John · Sharleen Spiteri · Adwoa Aboah · HE the British High Commissioner to South Africa · HE the Monégasque Ambassador to London · Stella McCartney · Diana Krall · Elvis Costello · Jodie Kidd",
    },
    {
      heading: "Charity & Financial",
      text: "The Prince's Trust (Leopard Gala Awards) · The Elton John AIDS Foundation · Red Cross · STOLL · Barclays Capital · St Paul's Knightsbridge · The Drakensberg Boys Choir UK Tour · Childline and Mission Enfance",
    },
  ];

  const signature = [
    { title: "Cork Street 100 Years Celebration", desc: "Landmark centenary event for London's most iconic gallery street." },
    { title: "UHNWI Wedding, Mauritius", desc: "A private destination wedding of extraordinary elegance." },
    { title: "Adwoa Aboah's 30th Birthday", desc: "An intimate celebration for the supermodel and activist." },
    { title: "Nigerian Pavilion, Révélations Paris", desc: "Curating Nigeria's presence at the prestigious Paris biennial." },
  ];

  return (
    <section className="bg-white py-28 px-8 md:px-16" id="clients">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-16 mb-16 items-end">
          <div>
            <p className="font-[family-name:var(--font-jost)] text-[0.65rem] tracking-[0.3em] uppercase text-[#5a8f94] mb-6 flex items-center gap-4 before:content-[''] before:w-8 before:h-px before:bg-[#b89a6a] before:flex-shrink-0">
              Client Work
            </p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2rem,3.5vw,3.5rem)] font-light leading-[1.1] text-[#1a2840]">
              An exceptional<br /><em className="italic text-[#5a8f94]">range</em> of<br />clients
            </h2>
          </div>
          <div className="md:col-span-2">
            <p className="font-[family-name:var(--font-jost)] text-[0.9rem] leading-[1.9] text-[#6b7585] font-light">
              Royalty, celebrities, HNI/UHNI individuals, global corporations, charities, cultural institutions and many private individuals across the UK, South Africa, Mauritius, Marrakesh, Paris and beyond.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 mb-16">
          {categories.map((cat) => (
            <div key={cat.heading} className="border-t border-[#ede8de] pt-6">
              <h4 className="font-[family-name:var(--font-jost)] text-[0.7rem] tracking-[0.2em] uppercase text-[#1a2840] font-medium mb-3">{cat.heading}</h4>
              <p className="font-[family-name:var(--font-jost)] text-[0.85rem] leading-[1.9] text-[#6b7585] font-light">{cat.text}</p>
            </div>
          ))}
        </div>

        <div>
          <p className="font-[family-name:var(--font-jost)] text-[0.65rem] tracking-[0.3em] uppercase text-[#5a8f94] mb-8 flex items-center gap-4 before:content-[''] before:w-8 before:h-px before:bg-[#b89a6a] before:flex-shrink-0">
            Signature Occasions
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {signature.map((ev) => (
              <div key={ev.title} className="bg-[#f5f2ec] p-6 border-b-2 border-[#8fb8bc]">
                <h5 className="font-[family-name:var(--font-cormorant)] text-base font-medium text-[#1a2840] mb-2">{ev.title}</h5>
                <p className="font-[family-name:var(--font-jost)] text-[0.8rem] leading-[1.8] text-[#6b7585]">{ev.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

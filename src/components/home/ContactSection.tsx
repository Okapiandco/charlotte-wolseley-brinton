import { ContactForm } from "@/components/contact/ContactForm";

type Props = { formspreeId: string };

export function ContactSection({ formspreeId }: Props) {
  return (
    <section className="bg-[#1a2840] py-28 px-8 md:px-16" id="contact">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-24 items-start">
          {/* Left */}
          <div>
            <p className="font-[family-name:var(--font-jost)] text-[0.65rem] tracking-[0.3em] uppercase text-[#8fb8bc] mb-6 flex items-center gap-4 before:content-[''] before:w-8 before:h-px before:bg-[#8fb8bc] before:flex-shrink-0">
              Get in Touch
            </p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2rem,4vw,4rem)] font-light text-white leading-[1.1] mb-8">
              Let&apos;s create<br />something<br /><em className="italic text-[#8fb8bc]">extraordinary</em>
            </h2>
            <p className="font-[family-name:var(--font-jost)] text-[0.9rem] leading-[1.9] text-white/50 font-light mb-12">
              Every remarkable event begins with a conversation. Whether you have a clear vision or simply a dream, Charlotte would love to hear from you.
            </p>

            <div className="space-y-5">
              <div className="flex items-start gap-6">
                <span className="font-[family-name:var(--font-jost)] text-[0.65rem] tracking-[0.2em] uppercase text-[#8fb8bc] w-20 flex-shrink-0 pt-0.5">Email</span>
                <a href="mailto:charlottewb@eventfusion.co.uk" className="font-[family-name:var(--font-jost)] text-[0.9rem] text-white/70 no-underline hover:text-[#8fb8bc] transition-colors">
                  charlottewb@eventfusion.co.uk
                </a>
              </div>
              <div className="flex items-start gap-6">
                <span className="font-[family-name:var(--font-jost)] text-[0.65rem] tracking-[0.2em] uppercase text-[#8fb8bc] w-20 flex-shrink-0 pt-0.5">Mobile</span>
                <a href="tel:+447885174269" className="font-[family-name:var(--font-jost)] text-[0.9rem] text-white/70 no-underline hover:text-[#8fb8bc] transition-colors">
                  +44 7885 174 269
                </a>
              </div>
              <div className="flex items-start gap-6">
                <span className="font-[family-name:var(--font-jost)] text-[0.65rem] tracking-[0.2em] uppercase text-[#8fb8bc] w-20 flex-shrink-0 pt-0.5">LinkedIn</span>
                <a href="https://www.linkedin.com/in/charlotte-wolseley-brinton-events-42a11818a/" target="_blank" rel="noopener noreferrer" className="font-[family-name:var(--font-jost)] text-[0.9rem] text-white/70 no-underline hover:text-[#8fb8bc] transition-colors">
                  Charlotte Wolseley Brinton
                </a>
              </div>
              <div className="flex items-start gap-6">
                <span className="font-[family-name:var(--font-jost)] text-[0.65rem] tracking-[0.2em] uppercase text-[#8fb8bc] w-20 flex-shrink-0 pt-0.5">Based in</span>
                <span className="font-[family-name:var(--font-jost)] text-[0.9rem] text-white/70">London, United Kingdom</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div style={{ background: "rgba(255,255,255,0.04)", padding: "3rem", border: "0.5px solid rgba(143,184,188,0.2)" }}>
            <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-white mb-8">
              Send a Message
            </h3>
            <ContactForm formspreeId={formspreeId} />
          </div>
        </div>
      </div>
    </section>
  );
}

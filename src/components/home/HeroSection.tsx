import Link from "next/link";
import Image from "next/image";

type Props = {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
};

export function HeroSection({ backgroundImage }: Props) {
  return (
    <section className="min-h-screen grid md:grid-cols-2" style={{ paddingTop: 0 }} aria-label="Hero">
      {/* Left */}
      <div
        className="flex flex-col justify-center relative"
        style={{
          background: "#f5f2ec",
          padding: "8rem 5rem 8rem 8rem",
        }}
      >
        {/* Sage divider line on right edge */}
        <div
          className="absolute top-0 right-0 bottom-0 w-px hidden md:block"
          style={{
            background: "linear-gradient(to bottom, transparent, #8fb8bc 30%, #8fb8bc 70%, transparent)",
          }}
        />

        {/* Discreet badge */}
        <div
          className="inline-flex items-center gap-2 mb-8 w-fit"
          style={{
            border: "0.5px solid #b89a6a",
            padding: "0.4rem 1rem",
            fontFamily: "var(--font-jost)",
            fontSize: "0.6rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#b89a6a",
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#b89a6a", display: "inline-block" }} />
          Discreet Enquiries Welcome
        </div>

        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "var(--font-jost)",
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#5a8f94",
            marginBottom: "2rem",
          }}
        >
          Event Fusion · London &amp; International
        </p>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(3rem, 5vw, 5.5rem)",
            fontWeight: 300,
            lineHeight: 1.05,
            color: "#1a2840",
            marginBottom: "1rem",
          }}
        >
          Trusted by <em style={{ fontStyle: "italic", color: "#5a8f94" }}>royalty,</em>
          <br />cultural institutions
          <br />&amp; private clients
          <br />for over 25 years
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1.25rem",
            fontWeight: 300,
            fontStyle: "italic",
            color: "#6b7585",
            marginBottom: "3rem",
            lineHeight: 1.5,
          }}
        >
          Event Fusion · Bespoke occasions, delivered with discretion
        </p>

        {/* Divider */}
        <div style={{ width: "3rem", height: "1px", background: "#b89a6a", marginBottom: "2.5rem" }} />

        {/* Body */}
        <p
          style={{
            fontSize: "0.9rem",
            lineHeight: 1.9,
            color: "#6b7585",
            maxWidth: "36ch",
            marginBottom: "3rem",
          }}
        >
          We create exceptional events with creativity, discretion and meticulous attention to detail — from intimate private celebrations to high-profile cultural moments, for royalty, global brands and cultural institutions alike.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <Link
            href="#contact"
            style={{
              fontFamily: "var(--font-jost)",
              fontSize: "0.7rem",
              fontWeight: 400,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#fdfcfa",
              background: "#1a2840",
              padding: "1rem 2.5rem",
              textDecoration: "none",
            }}
          >
            Begin a Conversation
          </Link>
          <Link
            href="#about"
            style={{
              fontFamily: "var(--font-jost)",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#1a2840",
              textDecoration: "none",
            }}
          >
            About Charlotte →
          </Link>
        </div>
      </div>

      {/* Right */}
      <div className="relative overflow-hidden" style={{ minHeight: "50vw", background: "#1a2840" }}>
        {backgroundImage ? (
          <Image
            src={backgroundImage}
            alt="A spectacular Charlotte Wolseley Brinton event"
            fill
            className="object-cover object-center"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "7rem", color: "#8fb8bc" }}>CWB</p>
          </div>
        )}

        {/* Overlay quote */}
        <div
          className="absolute bottom-10 right-0 left-0 mx-8"
          style={{
            background: "rgba(26,40,64,0.88)",
            padding: "1.5rem 2rem",
            maxWidth: "22rem",
            marginLeft: "auto",
            marginRight: "2.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            &ldquo;Nothing is too much. Everything is possible — it simply comes down to what&rsquo;s realistic for your budget.&rdquo;
          </p>
          <cite
            style={{
              display: "block",
              marginTop: "0.75rem",
              fontFamily: "var(--font-jost)",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              color: "#8fb8bc",
              fontStyle: "normal",
              textTransform: "uppercase",
            }}
          >
            — Charlotte Wolseley Brinton
          </cite>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#clients", label: "Clients" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

const linkStyle = {
  fontFamily: "var(--font-jost)",
  fontSize: "0.7rem",
  fontWeight: 400,
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
  color: "#6b7585",
  textDecoration: "none",
};

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: scrolled ? "1rem 4rem" : "1.5rem 4rem",
        background: "rgba(253,252,250,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "0.5px solid rgba(143,184,188,0.3)",
        transition: "padding 0.3s ease",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "1.05rem",
          fontWeight: 400,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "#1a2840",
          textDecoration: "none",
          lineHeight: 1.3,
        }}
      >
        Charlotte Wolseley Brinton
        <span style={{ display: "block", fontStyle: "italic", fontWeight: 300, letterSpacing: "0.1em", fontSize: "0.8rem", color: "#5a8f94", textTransform: "none" }}>
          Event Fusion
        </span>
      </Link>

      {/* Desktop nav */}
      <ul className="hidden md:flex" style={{ gap: "2.5rem", listStyle: "none" }}>
        {LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href} style={linkStyle}>{link.label}</a>
          </li>
        ))}
      </ul>

      {/* Desktop CTA */}
      <a
        href="#contact"
        className="hidden md:inline-block"
        style={{
          fontFamily: "var(--font-jost)",
          fontSize: "0.7rem",
          fontWeight: 400,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#fdfcfa",
          background: "#1a2840",
          padding: "0.65rem 1.5rem",
          textDecoration: "none",
        }}
      >
        Get in Touch
      </a>

      {/* Mobile toggle */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        <span className={`block h-px w-6 bg-[#1a2840] transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block h-px w-6 bg-[#1a2840] transition-all ${open ? "opacity-0" : ""}`} />
        <span className={`block h-px w-6 bg-[#1a2840] transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile menu */}
      {open && (
        <div
          className="absolute top-full left-0 right-0 md:hidden flex flex-col"
          style={{ background: "#fdfcfa", borderBottom: "0.5px solid rgba(143,184,188,0.3)", padding: "1.5rem 4rem", gap: "1.25rem" }}
        >
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)} style={linkStyle}>
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            style={{ ...linkStyle, color: "#fdfcfa", background: "#1a2840", padding: "0.65rem 1.5rem", textAlign: "center" }}
          >
            Get in Touch
          </a>
        </div>
      )}
    </nav>
  );
}

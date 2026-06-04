"use client";

import { useState } from "react";

type Props = { formspreeId: string };

const EVENT_TYPES = [
  "Private Celebration / Wedding",
  "Cultural / Arts Event",
  "Corporate Event",
  "Government / Diplomatic",
  "Charity Gala / Fundraiser",
  "Consultancy",
  "Other",
];

export function ContactForm({ formspreeId }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again or email directly.");
      }
    } catch {
      setError("Something went wrong. Please try again or email directly.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="py-12 text-center">
        <p className="font-[family-name:var(--font-cormorant)] italic text-2xl text-white mb-4">
          Thank you
        </p>
        <p className="font-[family-name:var(--font-jost)] text-[0.85rem] text-white/60 font-light">
          Charlotte will be in touch shortly.
        </p>
      </div>
    );
  }

  const fieldClass =
    "w-full bg-transparent border-0 border-b border-[#8fb8bc]/30 text-white placeholder-white/25 font-[family-name:var(--font-jost)] text-[0.9rem] font-light py-3 px-0 outline-none focus:border-[#8fb8bc] transition-colors appearance-none";
  const labelClass =
    "block font-[family-name:var(--font-jost)] text-[0.65rem] tracking-[0.2em] uppercase text-[#8fb8bc] mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className={labelClass}>Name</label>
        <input type="text" name="name" required placeholder="Your name" className={fieldClass} />
      </div>
      <div>
        <label className={labelClass}>Email</label>
        <input type="email" name="email" required placeholder="your@email.com" className={fieldClass} />
      </div>
      <div>
        <label className={labelClass}>Type of event</label>
        <select name="eventType" className={`${fieldClass} [&>option]:bg-[#1a2840]`}>
          <option value="">Please select…</option>
          {EVENT_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelClass}>Tell me about your event</label>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Rough date, location, number of guests, any other details…"
          className={`${fieldClass} resize-none`}
        />
      </div>

      {error && (
        <p className="font-[family-name:var(--font-jost)] text-[0.8rem] text-red-400">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-[#8fb8bc] text-[#1a2840] font-[family-name:var(--font-jost)] text-[0.7rem] tracking-[0.25em] uppercase py-4 hover:bg-[#d4e9eb] transition-colors disabled:opacity-50"
      >
        {submitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

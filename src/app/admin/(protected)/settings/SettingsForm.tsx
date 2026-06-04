"use client";

import { useState, useTransition } from "react";
import { saveSettings } from "./actions";
import { SaveBar } from "@/components/admin/SaveBar";
import { Field } from "@/components/admin/FormFields";
import type { SiteSettings } from "@prisma/client";

type Props = { settings: SiteSettings | null };

export function SettingsForm({ settings }: Props) {
  const [siteName, setSiteName] = useState(settings?.siteName ?? "Event Fusion");
  const [tagline, setTagline] = useState(settings?.tagline ?? "Bespoke occasions, delivered with discretion");
  const [contactEmail, setContactEmail] = useState(settings?.contactEmail ?? "");
  const [phone, setPhone] = useState(settings?.phone ?? "");
  const [linkedinUrl, setLinkedinUrl] = useState(settings?.linkedinUrl ?? "");
  const [formspreeId, setFormspreeId] = useState(settings?.formspreeId ?? "mlgkrypl");
  const [footerText, setFooterText] = useState(settings?.footerText ?? "");
  const [saved, setSaved] = useState(false);
  const [, startTransition] = useTransition();

  function handleSave() {
    startTransition(async () => {
      await saveSettings({ siteName, tagline, contactEmail, phone, linkedinUrl, formspreeId, footerText });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    });
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-5">
        <h2 className="font-semibold text-gray-800">Brand</h2>
        <Field label="Site name">
          <input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} className="input" />
        </Field>
        <Field label="Tagline">
          <input type="text" value={tagline} onChange={(e) => setTagline(e.target.value)} className="input" />
        </Field>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-5">
        <h2 className="font-semibold text-gray-800">Contact Details</h2>
        <Field label="Contact email">
          <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="input" />
        </Field>
        <Field label="Phone" hint="Optional">
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="input" placeholder="+44 …" />
        </Field>
        <Field label="LinkedIn URL" hint="Optional">
          <input type="url" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} className="input" placeholder="https://www.linkedin.com/in/..." />
        </Field>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-5">
        <h2 className="font-semibold text-gray-800">Contact Form</h2>
        <Field label="Formspree form ID" hint="The ID from your Formspree form URL">
          <input type="text" value={formspreeId} onChange={(e) => setFormspreeId(e.target.value)} className="input" placeholder="mlgkrypl" />
        </Field>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-5">
        <h2 className="font-semibold text-gray-800">Footer</h2>
        <Field label="Footer text" hint="Copyright line at the bottom of every page">
          <input type="text" value={footerText} onChange={(e) => setFooterText(e.target.value)} className="input" />
        </Field>
      </div>

      <SaveBar onSave={handleSave} saved={saved} />
    </div>
  );
}

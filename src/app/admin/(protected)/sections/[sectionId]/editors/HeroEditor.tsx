"use client";

import { useState, useTransition } from "react";
import { saveSection } from "../actions";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { SaveBar } from "@/components/admin/SaveBar";
import { Field, Textarea } from "@/components/admin/FormFields";

type Props = { sectionId: string; content: Record<string, unknown> };

export function HeroEditor({ sectionId, content }: Props) {
  const [headline, setHeadline] = useState((content.headline as string) ?? "");
  const [subheadline, setSubheadline] = useState((content.subheadline as string) ?? "");
  const [ctaText, setCtaText] = useState((content.ctaText as string) ?? "");
  const [ctaLink, setCtaLink] = useState((content.ctaLink as string) ?? "");
  const [backgroundImage, setBackgroundImage] = useState((content.backgroundImage as string) ?? "");
  const [saved, setSaved] = useState(false);
  const [, startTransition] = useTransition();

  function handleSave() {
    startTransition(async () => {
      await saveSection(sectionId, { headline, subheadline, ctaText, ctaLink, backgroundImage });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    });
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-5">
        <h2 className="font-semibold text-gray-800">Hero Content</h2>
        <Field label="Headline" required>
          <Textarea value={headline} onChange={setHeadline} rows={2} placeholder="Trusted by royalty, cultural institutions & private clients for over 25 years" />
        </Field>
        <Field label="Subheadline">
          <input type="text" value={subheadline} onChange={(e) => setSubheadline(e.target.value)} className="input" placeholder="Bespoke occasions, delivered with discretion" />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="CTA button text">
            <input type="text" value={ctaText} onChange={(e) => setCtaText(e.target.value)} className="input" placeholder="Discuss Your Event" />
          </Field>
          <Field label="CTA button link">
            <input type="text" value={ctaLink} onChange={(e) => setCtaLink(e.target.value)} className="input" placeholder="/contact" />
          </Field>
        </div>
        <ImageUploadField label="Background image (right panel)" value={backgroundImage} onChange={setBackgroundImage} />
      </div>
      <SaveBar onSave={handleSave} saved={saved} />
    </div>
  );
}

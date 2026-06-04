"use client";

import { useState, useTransition } from "react";
import { saveSection } from "../actions";
import { SaveBar } from "@/components/admin/SaveBar";
import { Field, Textarea } from "@/components/admin/FormFields";

type Props = { sectionId: string; content: Record<string, unknown> };

export function ServicesEditor({ sectionId, content }: Props) {
  const [headline, setHeadline] = useState((content.headline as string) ?? "");
  const [intro, setIntro] = useState((content.intro as string) ?? "");
  const [saved, setSaved] = useState(false);
  const [, startTransition] = useTransition();

  function handleSave() {
    startTransition(async () => {
      await saveSection(sectionId, { headline, intro });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    });
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-5">
        <h2 className="font-semibold text-gray-800">Services Section</h2>
        <p className="text-sm text-gray-500">
          The individual service cards are managed in{" "}
          <a href="/admin/services" className="text-blue-600 underline">Services</a>.
        </p>
        <Field label="Section headline">
          <input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} className="input" />
        </Field>
        <Field label="Intro text">
          <Textarea value={intro} onChange={setIntro} rows={3} />
        </Field>
      </div>
      <SaveBar onSave={handleSave} saved={saved} />
    </div>
  );
}

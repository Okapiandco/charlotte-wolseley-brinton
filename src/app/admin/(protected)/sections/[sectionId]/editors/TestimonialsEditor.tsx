"use client";

import { useState, useTransition } from "react";
import { saveSection } from "../actions";
import { SaveBar } from "@/components/admin/SaveBar";
import { Field } from "@/components/admin/FormFields";

type Props = { sectionId: string; content: Record<string, unknown> };

export function TestimonialsEditor({ sectionId, content }: Props) {
  const [headline, setHeadline] = useState((content.headline as string) ?? "");
  const [saved, setSaved] = useState(false);
  const [, startTransition] = useTransition();

  function handleSave() {
    startTransition(async () => {
      await saveSection(sectionId, { headline });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    });
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-5">
        <h2 className="font-semibold text-gray-800">Testimonials Section</h2>
        <p className="text-sm text-gray-500">
          Individual testimonials are managed in{" "}
          <a href="/admin/testimonials" className="text-blue-600 underline">Testimonials</a>.
          Only featured testimonials appear on the homepage.
        </p>
        <Field label="Section headline">
          <input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} className="input" />
        </Field>
      </div>
      <SaveBar onSave={handleSave} saved={saved} />
    </div>
  );
}

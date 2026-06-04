"use client";

import { useState, useTransition } from "react";
import { saveSection } from "../actions";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { SaveBar } from "@/components/admin/SaveBar";
import { Field, Textarea } from "@/components/admin/FormFields";

type Props = { sectionId: string; content: Record<string, unknown> };

export function AboutEditor({ sectionId, content }: Props) {
  const [headline, setHeadline] = useState((content.headline as string) ?? "");
  const [bio, setBio] = useState((content.bio as string) ?? "");
  const [image, setImage] = useState((content.image as string) ?? "");
  const [highlights, setHighlights] = useState<string[]>((content.highlights as string[]) ?? []);
  const [saved, setSaved] = useState(false);
  const [, startTransition] = useTransition();

  function updateHighlight(i: number, val: string) {
    setHighlights((prev) => prev.map((h, j) => (j === i ? val : h)));
  }

  function handleSave() {
    startTransition(async () => {
      await saveSection(sectionId, { headline, bio, image, highlights: highlights.filter(Boolean) });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    });
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-5">
        <h2 className="font-semibold text-gray-800">About Section</h2>
        <Field label="Headline" required>
          <input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} className="input" />
        </Field>
        <Field label="Bio" hint="Use two blank lines for paragraph breaks">
          <Textarea value={bio} onChange={setBio} rows={8} />
        </Field>
        <ImageUploadField label="Portrait photo" value={image} onChange={setImage} />
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-800">Highlights</h2>
          <button
            type="button"
            onClick={() => setHighlights((prev) => [...prev, ""])}
            className="rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
          >
            + Add
          </button>
        </div>
        {highlights.map((h, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={h}
              onChange={(e) => updateHighlight(i, e.target.value)}
              placeholder="e.g. 25+ years experience"
              className="input flex-1"
            />
            <button
              type="button"
              onClick={() => setHighlights((prev) => prev.filter((_, j) => j !== i))}
              className="text-xs text-red-400 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <SaveBar onSave={handleSave} saved={saved} />
    </div>
  );
}

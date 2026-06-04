"use client";

import { useState, useTransition } from "react";
import { saveSection } from "../actions";
import { SaveBar } from "@/components/admin/SaveBar";
import { Field } from "@/components/admin/FormFields";

type Props = { sectionId: string; content: Record<string, unknown> };

export function ClientsEditor({ sectionId, content }: Props) {
  const [headline, setHeadline] = useState((content.headline as string) ?? "");
  const [items, setItems] = useState<string[]>((content.items as string[]) ?? []);
  const [saved, setSaved] = useState(false);
  const [, startTransition] = useTransition();

  function handleSave() {
    startTransition(async () => {
      await saveSection(sectionId, { headline, items: items.filter(Boolean) });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    });
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-5">
        <h2 className="font-semibold text-gray-800">Clients Section</h2>
        <Field label="Headline">
          <input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} className="input" />
        </Field>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-800">Client / Collaborator Names</h2>
          <button
            type="button"
            onClick={() => setItems((prev) => [...prev, ""])}
            className="rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
          >
            + Add
          </button>
        </div>
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => setItems((prev) => prev.map((v, j) => (j === i ? e.target.value : v)))}
              placeholder="e.g. Serpentine Gallery"
              className="input flex-1"
            />
            <button
              type="button"
              onClick={() => setItems((prev) => prev.filter((_, j) => j !== i))}
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

"use client";

import { useState, useTransition } from "react";
import type { Service } from "@prisma/client";
import { saveService } from "./actions";
import { SaveBar } from "@/components/admin/SaveBar";
import { Field, Textarea } from "@/components/admin/FormFields";

type Props = { service: Service };

export function ServiceEditorForm({ service }: Props) {
  const [title, setTitle] = useState(service.title);
  const [subtitle, setSubtitle] = useState(service.subtitle);
  const [description, setDescription] = useState(service.description);
  const [enabled, setEnabled] = useState(service.enabled);
  const [metaTitle, setMetaTitle] = useState(service.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(service.metaDescription ?? "");
  const [saved, setSaved] = useState(false);
  const [, startTransition] = useTransition();

  function handleSave() {
    startTransition(async () => {
      await saveService(service.id, { title, subtitle, description, enabled, metaTitle, metaDescription });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    });
  }

  return (
    <div className="space-y-6">
      {/* Visibility */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <label className="flex items-center justify-between gap-4 cursor-pointer">
          <div>
            <p className="font-semibold text-gray-800">Visibility</p>
            <p className="text-sm text-gray-500 mt-0.5">
              {enabled ? "Visible to the public" : "Hidden from public — record kept in admin"}
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={enabled}
            onClick={() => setEnabled((v) => !v)}
            className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors focus:outline-none ${enabled ? "bg-gray-900" : "bg-gray-300"}`}
          >
            <span className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${enabled ? "translate-x-5" : "translate-x-0"}`} />
          </button>
        </label>
      </div>

      {/* Content */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-5">
        <h2 className="font-semibold text-gray-800">Content</h2>
        <Field label="Title" required>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input" />
        </Field>
        <Field label="Subtitle" hint="Shown in card view — one line summary">
          <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="input" />
        </Field>
        <Field label="Description" hint="Full text shown on the service detail page. Two blank lines = new paragraph.">
          <Textarea value={description} onChange={setDescription} rows={10} />
        </Field>
      </div>

      {/* SEO */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-5">
        <h2 className="font-semibold text-gray-800">SEO</h2>
        <Field label="Meta title" hint="Defaults to service title if blank">
          <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} className="input" />
        </Field>
        <Field label="Meta description" hint="160 characters recommended">
          <Textarea value={metaDescription} onChange={setMetaDescription} rows={3} />
        </Field>
      </div>

      <SaveBar onSave={handleSave} saved={saved} />
    </div>
  );
}

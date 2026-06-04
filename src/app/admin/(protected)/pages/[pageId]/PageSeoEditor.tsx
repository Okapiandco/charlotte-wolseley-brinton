"use client";

import { useState, useTransition } from "react";
import { savePageSeo } from "./actions";
import { SaveBar } from "@/components/admin/SaveBar";
import { Field, Textarea } from "@/components/admin/FormFields";

type Props = {
  pageId: string;
  metaTitle: string | null;
  metaDescription: string | null;
};

export function PageSeoEditor({ pageId, metaTitle, metaDescription }: Props) {
  const [title, setTitle] = useState(metaTitle ?? "");
  const [desc, setDesc] = useState(metaDescription ?? "");
  const [saved, setSaved] = useState(false);
  const [, startTransition] = useTransition();

  function handleSave() {
    startTransition(async () => {
      await savePageSeo(pageId, title, desc);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    });
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-5">
      <h2 className="font-semibold text-gray-800">SEO</h2>
      <Field label="Meta title" hint="Shown in browser tab and search results">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input" />
      </Field>
      <Field label="Meta description" hint="160 characters recommended">
        <Textarea value={desc} onChange={setDesc} rows={3} />
      </Field>
      <SaveBar onSave={handleSave} saved={saved} />
    </div>
  );
}

"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import type { PortfolioItem } from "@prisma/client";
import { savePortfolioItem, deletePortfolioItem } from "./actions";

type Props = { items: PortfolioItem[] };

const EMPTY = { title: "", category: "", imageUrl: "", imageAlt: "", enabled: true };

export function PortfolioManager({ items: initial }: Props) {
  const [items, setItems] = useState(initial);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [uploading, setUploading] = useState(false);
  const [, startTransition] = useTransition();

  function startAdd() {
    setEditing("new");
    setForm(EMPTY);
  }

  function startEdit(item: PortfolioItem) {
    setEditing(item.id);
    setForm({
      title: item.title,
      category: item.category,
      imageUrl: item.imageUrl,
      imageAlt: item.imageAlt,
      enabled: item.enabled,
    });
  }

  function handleSave() {
    startTransition(async () => {
      await savePortfolioItem({
        id: editing === "new" ? undefined : (editing ?? undefined),
        ...form,
      });
      setEditing(null);
      window.location.reload();
    });
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this portfolio item?")) return;
    startTransition(async () => {
      await deletePortfolioItem(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
    });
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json() as { url?: string };
    if (data.url) setForm((f) => ({ ...f, imageUrl: data.url! }));
    setUploading(false);
  }

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="rounded-lg border border-gray-200 bg-white overflow-hidden">
            {item.imageUrl && (
              <div className="relative h-40">
                <Image src={item.imageUrl} alt={item.imageAlt || item.title} fill className="object-cover" />
              </div>
            )}
            <div className="p-4">
              <p className="font-medium text-gray-900 text-sm">{item.title}</p>
              {item.category && <p className="text-xs text-gray-400 mt-0.5">{item.category}</p>}
              <div className="flex gap-3 mt-3">
                <button onClick={() => startEdit(item)} className="text-xs text-blue-600 hover:underline">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="text-xs text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing ? (
        <div className="rounded-lg border border-blue-200 bg-white p-6 space-y-4">
          <h3 className="font-medium text-gray-900">{editing === "new" ? "Add portfolio item" : "Edit portfolio item"}</h3>
          <input type="text" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Title" className="input" />
          <input type="text" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} placeholder="Category (e.g. Private Wedding)" className="input" />

          {form.imageUrl && (
            <div className="relative h-32 w-32 rounded overflow-hidden border border-gray-200">
              <Image src={form.imageUrl} alt="" fill className="object-cover" />
            </div>
          )}
          <div className="flex gap-3 items-center flex-wrap">
            <label className="cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
              {uploading ? "Uploading…" : "Upload image"}
              <input type="file" accept="image/*" onChange={handleImageUpload} className="sr-only" disabled={uploading} />
            </label>
            <span className="text-xs text-gray-400">or paste URL:</span>
            <input type="url" value={form.imageUrl} onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))} placeholder="https://…" className="input flex-1" />
          </div>
          <input type="text" value={form.imageAlt} onChange={(e) => setForm((f) => ({ ...f, imageAlt: e.target.value }))} placeholder="Image alt text" className="input" />
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" checked={form.enabled} onChange={(e) => setForm((f) => ({ ...f, enabled: e.target.checked }))} className="h-4 w-4 rounded" />
            Visible
          </label>
          <div className="flex gap-3">
            <button onClick={handleSave} className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700">Save</button>
            <button onClick={() => setEditing(null)} className="rounded-md border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
          </div>
        </div>
      ) : (
        <button
          onClick={startAdd}
          className="w-full rounded-lg border border-dashed border-gray-300 py-4 text-sm text-gray-400 hover:border-gray-400 hover:text-gray-600"
        >
          + Add portfolio item
        </button>
      )}
    </div>
  );
}

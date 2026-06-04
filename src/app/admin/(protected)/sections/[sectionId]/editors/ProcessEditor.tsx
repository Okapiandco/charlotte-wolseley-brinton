"use client";

import { useState, useTransition } from "react";
import { saveSection } from "../actions";
import { SaveBar } from "@/components/admin/SaveBar";
import { Field, Textarea } from "@/components/admin/FormFields";

type Step = { title: string; description: string };
type Props = { sectionId: string; content: Record<string, unknown> };

export function ProcessEditor({ sectionId, content }: Props) {
  const [headline, setHeadline] = useState((content.headline as string) ?? "");
  const [steps, setSteps] = useState<Step[]>((content.steps as Step[]) ?? [
    { title: "", description: "" },
  ]);
  const [saved, setSaved] = useState(false);
  const [, startTransition] = useTransition();

  function updateStep(i: number, field: keyof Step, val: string) {
    setSteps((prev) => prev.map((s, j) => (j === i ? { ...s, [field]: val } : s)));
  }

  function handleSave() {
    startTransition(async () => {
      await saveSection(sectionId, { headline, steps });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    });
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-5">
        <h2 className="font-semibold text-gray-800">Process Section</h2>
        <Field label="Headline">
          <input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} className="input" />
        </Field>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-800">Steps</h2>
          <button
            type="button"
            onClick={() => setSteps((prev) => [...prev, { title: "", description: "" }])}
            className="rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
          >
            + Add step
          </button>
        </div>
        {steps.map((step, i) => (
          <div key={i} className="rounded-md border border-gray-100 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">Step {i + 1}</span>
              <button
                type="button"
                onClick={() => setSteps((prev) => prev.filter((_, j) => j !== i))}
                className="text-xs text-red-400 hover:text-red-700"
              >
                Remove
              </button>
            </div>
            <Field label="Title">
              <input
                type="text"
                value={step.title}
                onChange={(e) => updateStep(i, "title", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Description">
              <Textarea value={step.description} onChange={(v) => updateStep(i, "description", v)} rows={3} />
            </Field>
          </div>
        ))}
      </div>

      <SaveBar onSave={handleSave} saved={saved} />
    </div>
  );
}

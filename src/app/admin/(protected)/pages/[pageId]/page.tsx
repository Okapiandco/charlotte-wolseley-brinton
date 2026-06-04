import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SectionReorderList } from "./SectionReorderList";
import { PageSeoEditor } from "./PageSeoEditor";
import { reorderSections, toggleSection } from "./actions";

type Props = { params: Promise<{ pageId: string }> };

const SECTION_LABELS: Record<string, string> = {
  hero: "Hero",
  marquee: "Marquee Strip",
  about: "About",
  services: "Services",
  portfolio: "Portfolio",
  process: "How We Work",
  clients: "Clients",
  testimonials: "Testimonials",
};

export default async function PageEditor({ params }: Props) {
  const { pageId } = await params;
  const page = await prisma.page.findUnique({
    where: { id: pageId },
    include: { sections: { orderBy: { order: "asc" } } },
  });
  if (!page) notFound();

  const sections = page.sections.map((s) => ({
    id: s.id,
    type: s.type,
    label: SECTION_LABELS[s.type] ?? s.type,
    enabled: s.enabled,
    order: s.order,
  }));

  return (
    <>
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/pages" className="text-sm text-gray-400 hover:text-gray-900">
          ← Pages
        </Link>
        <span className="text-gray-300">/</span>
        <h1 className="text-2xl font-semibold text-gray-900">{page.title}</h1>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="mb-3 text-sm font-semibold text-gray-700">Sections</h2>
          <SectionReorderList
            sections={sections}
            reorderAction={reorderSections}
            toggleAction={toggleSection}
          />
        </div>

        <PageSeoEditor
          pageId={page.id}
          metaTitle={page.metaTitle}
          metaDescription={page.metaDescription}
        />
      </div>
    </>
  );
}

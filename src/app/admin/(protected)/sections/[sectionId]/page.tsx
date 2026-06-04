import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { HeroEditor } from "./editors/HeroEditor";
import { AboutEditor } from "./editors/AboutEditor";
import { ServicesEditor } from "./editors/ServicesEditor";
import { ProcessEditor } from "./editors/ProcessEditor";
import { TestimonialsEditor } from "./editors/TestimonialsEditor";
import { ClientsEditor } from "./editors/ClientsEditor";
import { MarqueeEditor } from "./editors/MarqueeEditor";
import { PortfolioEditor } from "./editors/PortfolioEditor";

type PageProps = { params: Promise<{ sectionId: string }> };

const LABELS: Record<string, string> = {
  hero: "Hero",
  marquee: "Marquee Strip",
  about: "About",
  services: "Services",
  portfolio: "Portfolio",
  process: "How We Work",
  clients: "Clients",
  testimonials: "Testimonials",
};

export default async function SectionEditorPage({ params }: PageProps) {
  const { sectionId } = await params;
  const section = await prisma.section.findUnique({
    where: { id: sectionId },
    include: { page: true },
  });
  if (!section) notFound();

  const content = section.content as Record<string, unknown>;

  return (
    <>
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/pages" className="text-sm text-gray-400 hover:text-gray-900">
          ← Pages
        </Link>
        <span className="text-gray-300">/</span>
        <Link href={`/admin/pages/${section.pageId}`} className="text-sm text-gray-400 hover:text-gray-900">
          {section.page.title}
        </Link>
        <span className="text-gray-300">/</span>
        <h1 className="text-2xl font-semibold text-gray-900">
          {LABELS[section.type] ?? section.type}
        </h1>
      </div>

      {section.type === "hero" && <HeroEditor sectionId={section.id} content={content} />}
      {section.type === "marquee" && <MarqueeEditor sectionId={section.id} content={content} />}
      {section.type === "about" && <AboutEditor sectionId={section.id} content={content} />}
      {section.type === "services" && <ServicesEditor sectionId={section.id} content={content} />}
      {section.type === "portfolio" && <PortfolioEditor sectionId={section.id} content={content} />}
      {section.type === "process" && <ProcessEditor sectionId={section.id} content={content} />}
      {section.type === "clients" && <ClientsEditor sectionId={section.id} content={content} />}
      {section.type === "testimonials" && <TestimonialsEditor sectionId={section.id} content={content} />}
    </>
  );
}

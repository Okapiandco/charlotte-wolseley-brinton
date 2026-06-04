import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/siteUrl";
import { HeroSection } from "@/components/home/HeroSection";
import { MarqueeSection } from "@/components/home/MarqueeSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { PortfolioSection } from "@/components/home/PortfolioSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ClientsSection } from "@/components/home/ClientsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { DistinctionSection } from "@/components/home/DistinctionSection";
import { ContactSection } from "@/components/home/ContactSection";

export const revalidate = 60;

async function getData() {
  try {
    const [page, services, portfolio, testimonials, settings] = await Promise.all([
      prisma.page.findUnique({
        where: { slug: "home" },
        include: { sections: { where: { enabled: true }, orderBy: { order: "asc" } } },
      }),
      prisma.service.findMany({ where: { enabled: true }, orderBy: { order: "asc" } }),
      prisma.portfolioItem.findMany({ where: { enabled: true }, orderBy: { order: "asc" } }),
      prisma.testimonial.findMany({ where: { enabled: true }, orderBy: { order: "asc" } }),
      prisma.siteSettings.findUnique({ where: { id: 1 } }),
    ]);
    return { page, services, portfolio, testimonials, settings };
  } catch {
    return { page: null, services: [], portfolio: [], testimonials: [], settings: null };
  }
}

function sc(sections: { type: string; content: unknown }[], type: string) {
  return (sections.find((s) => s.type === type)?.content ?? {}) as Record<string, unknown>;
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await prisma.page.findUnique({ where: { slug: "home" } });
    const title = page?.metaTitle ?? "Charlotte Wolseley Brinton — Event Fusion | Bespoke Event Planning";
    const description = page?.metaDescription ?? "Bespoke occasions, delivered with discretion. Trusted by royalty, cultural institutions and private clients for over 25 years.";
    return {
      title: { absolute: title },
      description,
      alternates: { canonical: "/" },
      openGraph: { title, description, url: `${SITE_URL}/` },
    };
  } catch {
    return {
      title: { absolute: "Charlotte Wolseley Brinton — Event Fusion" },
      description: "Bespoke occasions, delivered with discretion. Trusted by royalty, cultural institutions and private clients for over 25 years.",
    };
  }
}

export default async function HomePage() {
  const { page, services, portfolio, testimonials, settings } = await getData();
  const sections = page?.sections ?? [];

  const hero = sc(sections, "hero");
  const marquee = sc(sections, "marquee");
  const about = sc(sections, "about");
  const portfolioContent = sc(sections, "portfolio");
  const process = sc(sections, "process");
  const formspreeId = settings?.formspreeId ?? "mlgkrypl";

  return (
    <>
      <HeroSection
        headline={(hero.headline as string) || ""}
        subheadline={(hero.subheadline as string) || ""}
        ctaText={(hero.ctaText as string) || ""}
        ctaLink="#contact"
        backgroundImage={(hero.backgroundImage as string) || ""}
      />
      <MarqueeSection
        items={(marquee.items as string[]) || [
          "Mayor's Office for Culture", "Foreign & Commonwealth Office", "Serpentine Gallery",
          "Venice Biennale", "The Prince's Trust", "Royal Exchange", "Tate", "Royal Institution", "Lisson Gallery",
        ]}
      />
      <AboutSection image={(about.image as string) || ""} />
      <ServicesSection services={services} />
      {portfolio.length > 0 && (
        <PortfolioSection
          headline={(portfolioContent.headline as string) || "Selected events"}
          items={portfolio}
        />
      )}
      <ProcessSection
        steps={(process.steps as { title: string; description: string }[]) || []}
      />
      <ClientsSection />
      <TestimonialsSection
        headline="In their own words"
        testimonials={testimonials}
      />
      <DistinctionSection />
      <ContactSection formspreeId={formspreeId} />
    </>
  );
}

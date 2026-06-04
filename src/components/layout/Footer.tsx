import { prisma } from "@/lib/prisma";

async function getSettings() {
  try {
    return await prisma.siteSettings.findUnique({ where: { id: 1 } });
  } catch {
    return null;
  }
}

export async function Footer() {
  const settings = await getSettings();

  return (
    <footer className="bg-[#111d2e] px-8 md:px-16 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="font-[family-name:var(--font-cormorant)] text-sm tracking-[0.2em] uppercase text-white/40">
        Charlotte Wolseley Brinton
      </div>
      <p className="font-[family-name:var(--font-jost)] text-[0.75rem] text-white/25 text-center">
        {settings?.footerText ?? `© ${new Date().getFullYear()} Event Fusion. All rights reserved.`}
      </p>
      <a
        href="https://www.linkedin.com/in/charlotte-wolseley-brinton-events-42a11818a/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-[family-name:var(--font-jost)] text-[0.7rem] tracking-[0.15em] uppercase text-white/35 no-underline hover:text-[#8fb8bc] transition-colors"
      >
        LinkedIn
      </a>
    </footer>
  );
}

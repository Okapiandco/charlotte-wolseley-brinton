import { prisma } from "@/lib/prisma";
import { PortfolioManager } from "./PortfolioManager";

export default async function PortfolioAdmin() {
  const items = await prisma.portfolioItem.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Portfolio</h1>
      <p className="mb-6 text-sm text-gray-500">
        Portfolio items appear on the homepage when at least one is enabled.
      </p>
      <PortfolioManager items={items} />
    </>
  );
}

import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function PagesAdmin() {
  const pages = await prisma.page.findMany({
    include: { sections: { orderBy: { order: "asc" } } },
    orderBy: { slug: "asc" },
  });

  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Pages</h1>
      <div className="space-y-4">
        {pages.map((page) => (
          <div key={page.id} className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold text-gray-900">{page.title}</h2>
                <p className="text-xs text-gray-400">/{page.slug}</p>
              </div>
              <Link
                href={`/admin/pages/${page.id}`}
                className="rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
              >
                Manage sections
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {page.sections.map((s) => (
                <span
                  key={s.id}
                  className={`rounded px-2 py-1 text-xs ${s.enabled ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-400"}`}
                >
                  {s.type}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

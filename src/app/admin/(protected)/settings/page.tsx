import { prisma } from "@/lib/prisma";
import { SettingsForm } from "./SettingsForm";

export default async function SettingsAdmin() {
  let settings = null;
  try {
    settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  } catch {
    // DB not yet configured
  }

  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Site Settings</h1>
      <SettingsForm settings={settings} />
    </>
  );
}

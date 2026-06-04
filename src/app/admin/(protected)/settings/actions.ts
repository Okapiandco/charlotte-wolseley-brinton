"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function saveSettings(data: {
  siteName: string;
  tagline: string;
  contactEmail: string;
  phone: string;
  linkedinUrl: string;
  formspreeId: string;
  footerText: string;
}) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      siteName: data.siteName,
      tagline: data.tagline,
      contactEmail: data.contactEmail,
      phone: data.phone || null,
      linkedinUrl: data.linkedinUrl || null,
      formspreeId: data.formspreeId,
      footerText: data.footerText || null,
    },
    update: {
      siteName: data.siteName,
      tagline: data.tagline,
      contactEmail: data.contactEmail,
      phone: data.phone || null,
      linkedinUrl: data.linkedinUrl || null,
      formspreeId: data.formspreeId,
      footerText: data.footerText || null,
    },
  });
  revalidatePath("/", "layout");
  revalidatePath("/contact");
}

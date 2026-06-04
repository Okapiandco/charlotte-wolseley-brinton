"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function saveService(
  id: string,
  data: {
    title: string;
    subtitle: string;
    description: string;
    enabled: boolean;
    metaTitle: string;
    metaDescription: string;
  },
) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const svc = await prisma.service.update({
    where: { id },
    data: {
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      enabled: data.enabled,
      metaTitle: data.metaTitle || null,
      metaDescription: data.metaDescription || null,
    },
  });
  revalidatePath("/services");
  revalidatePath(`/services/${svc.slug}`);
  revalidatePath("/");
}

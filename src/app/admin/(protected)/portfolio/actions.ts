"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function savePortfolioItem(data: {
  id?: string;
  title: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  enabled: boolean;
}) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  if (data.id) {
    await prisma.portfolioItem.update({
      where: { id: data.id },
      data: {
        title: data.title,
        category: data.category,
        imageUrl: data.imageUrl,
        imageAlt: data.imageAlt,
        enabled: data.enabled,
      },
    });
  } else {
    const count = await prisma.portfolioItem.count();
    await prisma.portfolioItem.create({
      data: {
        title: data.title,
        category: data.category,
        imageUrl: data.imageUrl,
        imageAlt: data.imageAlt,
        enabled: data.enabled,
        order: count,
      },
    });
  }
  revalidatePath("/");
}

export async function deletePortfolioItem(id: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  await prisma.portfolioItem.delete({ where: { id } });
  revalidatePath("/");
}

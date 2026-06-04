"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function saveTestimonial(data: {
  id?: string;
  quote: string;
  author: string;
  role?: string;
  event?: string;
  featured: boolean;
  enabled: boolean;
}) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  if (data.id) {
    await prisma.testimonial.update({
      where: { id: data.id },
      data: {
        quote: data.quote,
        author: data.author,
        role: data.role || null,
        event: data.event || null,
        featured: data.featured,
        enabled: data.enabled,
      },
    });
  } else {
    const count = await prisma.testimonial.count();
    await prisma.testimonial.create({
      data: {
        quote: data.quote,
        author: data.author,
        role: data.role || null,
        event: data.event || null,
        featured: data.featured,
        enabled: data.enabled,
        order: count,
      },
    });
  }
  revalidatePath("/");
}

export async function deleteTestimonial(id: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/");
}

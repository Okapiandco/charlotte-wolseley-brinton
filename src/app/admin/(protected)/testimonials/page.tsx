import { prisma } from "@/lib/prisma";
import { TestimonialsManager } from "./TestimonialsManager";

export default async function TestimonialsAdmin() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Testimonials</h1>
        <p className="text-sm text-gray-500">
          {testimonials.filter((t) => t.featured).length} featured on homepage
        </p>
      </div>
      <TestimonialsManager testimonials={testimonials} />
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useSiteData } from "@/context/SiteDataContext";

export default function ProductCategoryGrid() {
  const { categories } = useSiteData();
  return (
    <section className="px-6 py-12">
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {categories
          .filter((cat) => cat.is_active)
          .map((category) => (
            <Link className="block" href={`/product-category/${category.slug}`} key={category.id}>
              <div
                key={category.id}
                className="relative w-full overflow-hidden rounded-2xl group break-inside-avoid"
              >
                <Image
                  src={category.image}
                  alt={category.alt_text || category.category_name}
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-2xl group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center">
                  <h3 className="text-white text-xl capitalize font-semibold text-center px-4">
                    {category.category_name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}

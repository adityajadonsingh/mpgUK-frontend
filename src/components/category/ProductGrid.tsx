"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Product } from "@/types";

export default function ProductGrid({
  products,
  currentPage,
  totalPages,
  categorySlug,
}: {
  products: Product[];
  currentPage: number;
  totalPages: number;
  categorySlug: string;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  const showPagination = totalPages > 1;
  console.log(products)
  return (
    <section className="product-grid my-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (

            <Link href={`/product-category/${product.category.replace(/ /g, "-").toLowerCase()}/${product.slug}`} key={index}>
              <div className="card group relative overflow-hidden rounded-lg shadow-md">
                <Image
                  src={product.image}
                  alt={product.alt_text || product.name}
                  fill
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-full bg-[#00000081] bg-opacity-60 text-white text-center py-3">
                  <h3 className="text-sm md:text-base font-medium px-2">
                    {product.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {showPagination && (
          <div className="pagination text-center my-10 space-x-2">
            {currentPage > 1 && (
              <Link
                href={`/product-category/${categorySlug}/page/${
                  currentPage - 1
                }`}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                « <span className="sm:inline hidden">Previous</span>
              </Link>
            )}

            {(isMobile
              ? [currentPage - 1, currentPage, currentPage + 1]
              : [
                  1,
                  2,
                  currentPage - 1,
                  currentPage,
                  currentPage + 1,
                  totalPages - 1,
                  totalPages,
                ]
            )
              .filter(
                (value, index, self) =>
                  value > 0 &&
                  value <= totalPages &&
                  self.indexOf(value) === index
              )
              .sort((a, b) => a - b)
              .map((page, idx, arr) => (
                <span key={page + "-wrap"}>
                  {idx > 0 && page - arr[idx - 1] > 1 && (
                    <span className="px-2 py-2">...</span>
                  )}
                  <Link
                    href={
                      page === 1
                        ? `/product-category/${categorySlug}`
                        : `/product-category/${categorySlug}/page/${page}`
                    }
                    className={`px-4 py-2 rounded font-semibold ${
                      currentPage === page
                        ? "bg-[#DC5100] !text-[#fff]"
                        : "bg-[#E9E9ED] text-[#8a8a8c]"
                    }`}
                  >
                    {page}
                  </Link>
                </span>
              ))}

            {currentPage < totalPages && (
              <Link
                href={`/product-category/${categorySlug}/page/${
                  currentPage + 1
                }`}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                <span className="sm:inline hidden">Next</span> »
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

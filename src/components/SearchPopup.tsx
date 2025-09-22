"use client";

import { Category, Product } from "@/types";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function SearchPopup({
  isOpen,
  onClose,
  products,
  categories,
}: {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  categories: Category[];
}) {
  const popupRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const pathname = usePathname(); // ✅ detect route changes

  const [query, setQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Autofocus input
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Reset query when popup closes
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  // Reset query on page change
  useEffect(() => {
    setQuery("");
  }, [pathname]);

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Filter results on query change
  useEffect(() => {
    if (query.trim().length > 0) {
      const q = query.toLowerCase();
      setFilteredProducts(
        products.filter((p) => p.name.toLowerCase().includes(q))
      );
      setFilteredCategories(
        categories.filter((c) => c.category_name.toLowerCase().includes(q))
      );
    } else {
      setFilteredProducts([]);
      setFilteredCategories([]);
    }
  }, [query, products, categories]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-20 backdrop-blur-[2px] bg-[#00000038]">
      <div
        ref={popupRef}
        className="bg-white lg:w-5/12 md:w-7/12 w-11/12 mx-auto p-6 rounded shadow-md animate-slide-down relative"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 cursor-pointer text-gray-500 hover:text-gray-700"
        >
          <i className="bi bi-x-lg"></i>
        </button>

        {/* Title */}
        <h2 className="text-lg mb-4 font-semibold">Search</h2>

        {/* Input */}
        <div className="flex relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow border lg:w-9/12 sm:w-8/12 w-8/12 border-gray-300 px-4 py-2 rounded-l"
          />
          <button className="bg-[#f36c23] lg:w-3/12 sm:w-4/12 w-4/12 hover:bg-[#c09d68] cursor-pointer text-white px-4 py-2 rounded-r">
            Search
          </button>
        </div>

        {/* Dropdown Results */}
        {loading && <p className="mt-3 text-sm text-gray-500">Loading...</p>}
        {!loading &&
          query &&
          (filteredCategories.length > 0 || filteredProducts.length > 0) && (
            <div
              className="mt-3 max-h-64 overflow-y-auto custom-scrollbar"
              data-lenis-prevent
            >
              <div className="grid grid-cols-1 gap-y-4">
                {/* Categories */}
                <div className="border-gray-200 border rounded shadow">
                  <h3 className="px-3 py-2 font-semibold text-sm text-gray-600 bg-gray-100">
                    Categories
                  </h3>
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/product-category/${cat.category_name
                          .toLowerCase()
                          .replace(/ /g, "-")}/`}
                        className="block px-3 py-2 capitalize hover:bg-gray-50 text-sm"
                        onClick={onClose} // ✅ close popup on click
                      >
                        {cat.category_name}
                      </Link>
                    ))
                  ) : (
                    <p className="px-3 py-2 text-sm text-gray-400">
                      No categories
                    </p>
                  )}
                </div>

                {/* Products */}
                <div className="border-gray-200 border rounded shadow">
                  <h3 className="px-3 py-2 font-semibold text-sm text-gray-600 bg-gray-100">
                    Products
                  </h3>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((prod) => (
                      <Link
                        key={prod.id}
                        href={`/product-category/${prod.category
                          .replace(/ /g, "-")
                          .toLowerCase()}/${prod.slug}`}
                        className="block px-3 py-2 capitalize hover:bg-gray-50 text-sm"
                        onClick={onClose} // ✅ close popup on click
                      >
                        {prod.name}
                      </Link>
                    ))
                  ) : (
                    <p className="px-3 py-2 text-sm text-gray-400">
                      No products
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

        {/* No Results */}
        {!loading &&
          query &&
          filteredCategories.length === 0 &&
          filteredProducts.length === 0 && (
            <p className="mt-3 text-sm text-gray-500">No results found</p>
          )}
      </div>
    </div>
  );
}

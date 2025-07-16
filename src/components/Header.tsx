"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSiteData } from "@/context/SiteDataContext";
import SearchPopup from "@/components/SearchPopup";

export default function Header() {
  const { categories, contactDetails } = useSiteData();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="header bg-[#f6f4f5] py-5 shadow-md">
        <div className="container">
          <div className="flex items-center justify-between">
            {/* LOGO */}
            <div className="logo basis-1/4">
              <div className="wrap relative w-[160px] h-[32px]">
                <Link href="/">
                  <Image
                    src="https://mpgstone.com/wp-content/uploads/2023/09/logo-5.svg"
                    alt="logo"
                    fill
                    className="object-contain"
                  />
                </Link>
              </div>
            </div>

            {/* NAVBAR */}
            <div className="navbar basis-2/4">
              <ul className="flex gap-x-6 w-fit mx-auto">
                <li className="relative group">
                  <div className="flex items-center cursor-pointer">
                    Categories
                    <i className="bi bi-caret-down-fill ml-2"></i>
                  </div>
                  <ul className="absolute left-0 top-full py-2 px-2 rounded-md hidden min-w-[200px] bg-white shadow-md group-hover:block z-50">
                    {categories.map((category) => (
                      <li key={category.id} className="py-2">
                        <Link
                          href={`/product-category/${category.slug}/`}
                          className="block w-full whitespace-nowrap px-4 py-2 text-gray-700"
                        >
                          {category.category_name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <Link href="/products/">Products</Link>
                </li>
                <li>
                  <Link href="/about-us/">About Us</Link>
                </li>
                <li>
                  <Link href="/contact-us/">Contact Us</Link>
                </li>
              </ul>
            </div>

            <div className="basis-1/4">
              <div className="flex gap-x-4 justify-end">
                <div
                  className="search-icn cursor-pointer"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <i className="bi bi-search"></i>
                </div>
                <div className="contact">
                  <Link href={`tel:${contactDetails.phones[0]}`}>
                    <div className="icn">
                      <i className="bi bi-telephone-fill"></i>
                    </div>
                  </Link>
                </div>
                <div className="contact">
                  <Link href={`mailto:${contactDetails.emails[0]}`}>
                    <div className="icn">
                      <i className="bi bi-envelope-fill"></i>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <SearchPopup isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
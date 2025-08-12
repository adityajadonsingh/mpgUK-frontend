"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSiteData } from "@/context/SiteDataContext";
import SearchPopup from "@/components/SearchPopup";

export default function Header() {
  const { categories, contactDetails } = useSiteData();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <header className="header bg-[#f6f4f5] py-5 shadow-md">
        <div className="container">
          <div className="flex items-center justify-between">
            {/* LOGO */}
            <div className="logo basis-1/4 flex items-center gap-x-4">
              <div className="wrap relative w-[160px] h-[32px]">
                <Link className="" href="/">
                  <Image
                    src="/media/logo.svg"
                    alt="logo"
                    fill
                    priority
                    className="object-contain"
                  />
                </Link>
              </div>
            </div>

            {/* NAVBAR (hidden on mobile) */}
            <div className="navbar basis-2/4 hidden lg:block">
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

            {/* RIGHT ICONS */}
            <div className="basis-1/4">
              <div className="flex md:gap-x-4 gap-x-2 justify-end">
                <div
                  className="search-icn cursor-pointer"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <i className="bi bi-search"></i>
                </div>
                <div className="contact">
                  <Link href={`tel:${contactDetails[0]?.phones[0]}`}>
                    <div className="icn">
                      <i className="bi bi-telephone-fill"></i>
                    </div>
                  </Link>
                </div>
                <div className="contact">
                  <Link href={`mailto:${contactDetails[0]?.emails[0]}`}>
                    <div className="icn">
                      <i className="bi bi-envelope-fill"></i>
                    </div>
                  </Link>
                </div>
                {/* Mobile Menu Button */}
                <button
                  className="lg:hidden text-2xl"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <i className="bi bi-list"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed inset-0 bg-black/40 z-[9999] transition-opacity ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      >
        <div
          className={`bg-white md:w-80 sm:w-96 w-full h-full py-5 px-2 transform transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <div className="flex justify-end mb-3">
            <button
            className="text-2xl"
            onClick={() => setIsSidebarOpen(false)}
          >
            <i className="bi bi-x-lg"></i>
          </button>
          </div>

          {/* Sidebar Menu */}
          <ul className="flex flex-col mobile-nav font-medium">
            <li>
              <details>
                <summary className="cursor-pointer flex items-center justify-between">
                  Categories <i className="bi bi-caret-down-fill"></i>
                </summary>
                <ul className="pl-4 mt-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        href={`/product-category/${category.slug}/`}
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        {category.category_name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
            <li>
              <Link href="/products/" onClick={() => setIsSidebarOpen(false)}>
                Products
              </Link>
            </li>
            <li>
              <Link href="/about-us/" onClick={() => setIsSidebarOpen(false)}>
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact-us/" onClick={() => setIsSidebarOpen(false)}>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <SearchPopup
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}

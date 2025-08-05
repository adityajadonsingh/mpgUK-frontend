"use client";

import { useSiteData } from "@/context/SiteDataContext";
import { SocialMedia } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function Footer({
  socialMedia,
}: {
  socialMedia: SocialMedia[];
}) {
  const { categories, contactDetails } = useSiteData();
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid grid-cols-[25%_17%_16%_35%] gap-4">
          <div className="logo">
            <div className="img relative h-[52px] w-[180px] mb-3">
              <Image
                src="/media/logo.svg"
                alt={"logo"}
                fill
                className="object-contain"
              />
            </div>
            <p className="text-sm">
              Leading natural stones manufacturer and supplier in the USA and
              worldwide since 1984. With a proven experience of 38+ years, MPG
              Stone has evolved as one of the fastest-growing natural stones and
              floor tiles offering brands in a short time. Discover a wide range
              of high-quality products like pavers, cobblestones, indoor tiles,
              natural stone pavers, different types of marble floorings, and
              more.
            </p>
            <div className="social-media mt-6">
              <ul className="flex gap-x-3">
                {
                  socialMedia.map(social => <li key={social.id+"-social"}>
                  <Link href={social.url} target="_blank">
                    <div className="w-[35px] h-[35px] rounded-full bg-[#5a5c5d] hover:bg-[#f36c23] flex justify-center items-center">
                      <i className={`bi bi-${social.platform} text-white`}></i>
                    </div>
                  </Link>
                </li>)
                }
              </ul>
            </div>
          </div>

          <div className="widget">
            <h4 className="text-2xl mt-3 mb-5 font-semibold">Categories</h4>
            <ul className="widget-lists">
              {categories.map((category) => {
                return (
                    <li key={`${category.id}`}>
                      <div className="details">
                        <Link href={`/product-category/${category.slug}`}>
                          {category.category_name}
                        </Link>
                      </div>
                    </li>
                );
              })}
            </ul>
          </div>
          <div className="widget">
            <h4 className="text-2xl mt-3 mb-5 font-semibold">Quick Links</h4>
            <ul className="widget-lists">
              <li>
                <div className="details">
                  <Link href={`/about-us/`}>About Us</Link>
                </div>
              </li>
              <li>
                <div className="details">
                  <Link href={`/contact-us/`}>Contact Us</Link>
                </div>
              </li>
              <li>
                <div className="details">
                  <Link href={`/blogs/`}>Blogs</Link>
                </div>
              </li>
              <li>
                <div className="details">
                  <Link href={`/products/`}>Products</Link>
                </div>
              </li>
              <li>
                <div className="details">
                  <Link href={`/product-category/`}>Product Category</Link>
                </div>
              </li>
              <li>
                <div className="details">
                  <Link href={`/product-catalouge/`}>Product Catalouge</Link>
                </div>
              </li>
              <li>
                <div className="details">
                  <Link href={`/terms-and-conditions/`}>
                    Terms & Conditions
                  </Link>
                </div>
              </li>
              <li>
                <div className="details">
                  <Link href={`/privacy-policy/`}>Privacy Policy</Link>
                </div>
              </li>
            </ul>
          </div>
          <div className="widget">
            <h4 className="text-2xl mt-3 mb-5 font-semibold">Contact Us</h4>
            <ul className="widget-lists">
              <li className="flex gap-x-4">
                <div className="icn">
                  <i className="bi bi-telephone-fill text-lg"></i>
                </div>
                <div className="details">
                  <Link href={`tel:${contactDetails[0]?.phones[0]}`}>
                    {contactDetails[0]?.phones[0]}
                  </Link>
                </div>
              </li>
              <li className="flex gap-x-4">
                <div className="icn">
                  <i className="bi bi-envelope-fill text-lg"></i>
                </div>
                <div className="details">
                  <Link href={`mailto:${contactDetails[0]?.emails[0]}`}>
                    {contactDetails[0]?.emails[0]}
                  </Link>
                </div>
              </li>
              <li className="flex gap-x-4">
                <div className="icn">
                  <i className="bi bi-geo-alt-fill text-lg"></i>
                </div>
                <div className="details">
                  <span className="text">{contactDetails[0]?.address}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-3" />
        <span className="block text-center">Copyright © 2025 MPG Stone. All rights reserved.</span>
      </div>
    </footer>
  );
}

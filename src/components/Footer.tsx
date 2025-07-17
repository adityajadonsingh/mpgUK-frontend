"use client";

import { useSiteData } from "@/context/SiteDataContext";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const { categories, contactDetails } = useSiteData();
  console.log(contactDetails)
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid grid-cols-4 gap-4">
          <div className="logo">
            <div className="img relative h-[52px] w-[180px] mb-3">
              <Image
                src={
                  "https://mpgstone.com/wp-content/uploads/2023/09/logo-5.svg"
                }
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
          </div>
          <div className="widget">
            <h4 className="text-2xl mt-3 mb-5 font-semibold">Contact Us</h4>
            <ul className="widget-lists">
              <li className="flex gap-x-4">
                <div className="icn">
                  <i className="bi bi-telephone-fill text-lg"></i>
                </div>
                <div className="details">
                  <Link href={`tel:`}>{contactDetails[0]?.phones[0]}</Link>
                </div>
              </li>
              <li className="flex gap-x-4">
                <div className="icn">
                  <i className="bi bi-envelope-fill text-lg"></i>
                </div>
                <div className="details">
                  <Link href={`tel:`}>{contactDetails[0]?.emails[0]}</Link>
                </div>
              </li>
              <li className="flex gap-x-4">
                <div className="icn">
                  <i className="bi bi-geo-alt-fill text-lg"></i>
                </div>
                <div className="details">
                  <Link href={`tel:`}>{contactDetails[0]?.address}</Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

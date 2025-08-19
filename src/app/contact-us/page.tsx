import ContactSection from "@/components/home/ContactSection";
import PageBanner from "@/components/PageBanner";
import { getContactDetails, getMetaData } from "@/lib/api";
import Link from "next/link";

import { MetaData } from "@/types";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const meta: MetaData = await getMetaData("contact");

  return {
    title: meta.meta_title || "Home | MPG Stone",
    description: meta.meta_description || "Default description",
    keywords: meta.meta_keywords || "",
    openGraph: {
      title: meta.og_title || meta.meta_title || "",
      description: meta.og_description || meta.meta_description || "",
      url: meta.canonical_url || "",
      images: meta.meta_image ? [meta.meta_image] : [],
      type: "website",
      locale: "en_US",
      siteName: "MPG Stone",
    },
    twitter: {
      title: meta.twitter_title || meta.meta_title || "",
      description: meta.twitter_description || meta.meta_description || "",
      images: meta.meta_image ? [meta.meta_image] : [],
    },
    alternates: {
      canonical: meta.canonical_url || "",
    },
    robots: meta.robots_tag,
  };
}

export default async function ContactPage() {
  const [contactDetails] = await getContactDetails();

  return (
    <>
      <PageBanner
        bgImg="/media/contact_banner.jpeg"
        pageName="Contact Us"
        breadcrum={[{ slug_name: "Contact Us", slug_url: "" }]}
      />
      <section className="contact-page my-10">
        <div className="container">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="map md:h-[450px] h-[200px]">
              <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5030.799917806217!2d-1.4825172296816007!3d50.916317986266876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487476060eb9303d%3A0x385eaecb9e0f016e!2sTotton%2C%20Southampton%20SO40%204TE%2C%20UK!5e0!3m2!1sen!2sin!4v1754630175156!5m2!1sen!2sin"
                  loading="lazy"
                  className="w-full h-full !border-0 rounded-md"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            <div className="details md:w-9/12 w-full mx-auto">
              <h2 className="heading mb-5 md:text-3xl text-2xl font-semibold ">Reach Us By</h2>
              <ul>
                <li className="flex bg-[#f6f4f5] p-4 rounded-sm items-center mb-4">
                  <div className="icn">
                    <i className="bi bi-telephone-fill"></i>
                  </div>
                  <div className="links flex flex-col pl-3">
                    {
                      contactDetails.phones.map((phone, idx) => <Link key={idx} href={`tel:${phone}`}>{phone}</Link>)
                    }
                  </div>
                </li>
                <li className="flex bg-[#f6f4f5] p-4 rounded-sm items-center mb-4">
                  <div className="icn">
                    <i className="bi bi-envelope-fill"></i>
                  </div>
                  <div className="links flex flex-col pl-3">
                    <Link href={`mailto:${contactDetails.emails[0]}`}>{contactDetails.emails[0]}</Link>
                  </div>
                </li>
                <li className="flex bg-[#f6f4f5] p-4 rounded-sm items-center mb-4">
                  <div className="icn">
                    <i className="bi bi-geo-alt-fill"></i>
                  </div>
                  <div className="links flex flex-col pl-3">
                    <span>{contactDetails.address}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <ContactSection />
    </>
  );
}

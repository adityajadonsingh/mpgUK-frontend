import PageBanner from "@/components/PageBanner";
import { getMetaData, getProductCatalouge } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { MetaData } from "@/types";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const meta: MetaData = await getMetaData("catalogue");

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

export default async function ProductCatalouguePage() {
  const catalouges = await getProductCatalouge();
  return (
    <>
      <PageBanner
        bgImg="/media/contact_banner.jpeg"
        pageName="Product Catalogue"
        breadcrum={[{ slug_name: "Product Catalogue", slug_url: "" }]}
      />
      <section className="catalogue my-10">
        <div className="container">
          <div className="grid grid-cols-4">
            {catalouges.map((catalouge, idx) => (
              <div key={idx} className="card bg-[#f6f4f5] px-4 py-4 rounded-sm shadow-sm hover:shadow-md">
                <Link href={catalouge.pdf_file} target="_blank">
                  <div className="img-box relative h-[180px]">
                    <Image
                      src={catalouge.thumbnail}
                      alt={catalouge.name}
                      fill
                      className="object-contain rounded-sm"
                    />
                  </div>
                  <span className="block mt-2 text-center font-medium capitalize">
                    {catalouge.name}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import FooterContent from "@/components/FooterContent";
import PageBanner from "@/components/PageBanner";
import { getLegalPageData, getMetaData } from "@/lib/api";

import { MetaData } from "@/types";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const meta: MetaData = await getMetaData("terms");

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

export default async function PrivacyPolicy() {
    const getContent = await getLegalPageData("terms");
    const content = getContent.content;
  return (
    <>
      <PageBanner
        bgImg={"/media/product_category_banner.jpeg"}
        pageName={"Terms & Conditions"}
        breadcrum={[{ slug_name: "Terms & Conditions", slug_url: "" }]}
      />
        <div className="my-10">
            <FooterContent content={content} isFullPage={true}/>
        </div>
    </>
  );
}

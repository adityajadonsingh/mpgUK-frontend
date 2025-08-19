import FooterContent from "@/components/FooterContent";
import PageBanner from "@/components/PageBanner";
import ProductSlider from "@/components/product/ProductSlider";
import { getAboutPageData, getMetaData, getRandomProducts } from "@/lib/api";
import { MetaData } from "@/types";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const meta: MetaData = await getMetaData("about");

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

export default async function AboutUsPage() {
  const getAboutData = await getAboutPageData();
  const randomProducts = await getRandomProducts();
  return (
    <>
      <PageBanner
        bgImg={"/media/product_category_banner.jpeg"}
        pageName={"About Us"}
        breadcrum={[{ slug_name: "About Us", slug_url: "" }]}
      />
      <div className="my-10">
        <FooterContent content={getAboutData.description} isFullPage={true} />
      </div>

      <ProductSlider products={randomProducts} />
    </>
  );
}

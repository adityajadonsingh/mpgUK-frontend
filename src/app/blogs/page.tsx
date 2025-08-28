import BlogsGrid from "@/components/blogs/BlogsGrid";
import PageBanner from "@/components/PageBanner";
import { getBlogsPaginated, getMetaData } from "@/lib/api";
import { MetaData } from "@/types";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const meta: MetaData = await getMetaData("blogs");

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
export default async function BlogPage() {
  const { blogs, totalPages } = await getBlogsPaginated(1);
  return (
    <>
      <PageBanner
        pageName="Blogs"
        bgImg={"/media/blog-banner.webp"}
        breadcrum={[
          {
            slug_name: "Blogs",
            slug_url: "blogs",
          },
        ]}
      />
      <BlogsGrid currentPage={1} totalPages={totalPages} blogs={blogs} isCategoryBlog={false}/>
    </>
  );
}

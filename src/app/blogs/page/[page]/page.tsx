import BlogsGrid from "@/components/blogs/BlogsGrid";
import PageBanner from "@/components/PageBanner";
import { getBlogsPaginated, getMetaData } from "@/lib/api";
import { notFound } from "next/navigation";
import { MetaData } from "@/types";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const meta: MetaData = await getMetaData("blogs");

  return {
    title: meta.meta_title,
    description: meta.meta_description,
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
    robots: "noindex, follow",
  };
}

export default async function BlogPaginatedPage({ params }: {params: Promise<{page : string}>}) {
  const getParams = await params;
  const pageNumber = parseInt(getParams.page) || 1;
  const { blogs, totalPages } = await getBlogsPaginated(pageNumber);
  if(pageNumber > totalPages) return notFound();
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
      <BlogsGrid currentPage={pageNumber} totalPages={totalPages} blogs={blogs} isCategoryBlog={false} />
    </>
  );
}

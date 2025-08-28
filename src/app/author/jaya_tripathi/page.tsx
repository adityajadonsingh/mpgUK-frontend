import BlogsGrid from "@/components/blogs/BlogsGrid";
import { getBlogsPaginated } from "@/lib/api";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: "Author at Mpgstone: Jaya Tripathi",
    description: "Jaya Tripathi, Expert Content Writer and Author at Mpgstone",
    openGraph: {
      title: "Author at Mpgstone: Jaya Tripath",
      description: "Jaya Tripathi, Expert Content Writer and Author at Mpgstone",
      url: "https://mpgstone.co.uk/author/jaya_tripathi",
      type: "website",
      locale: "en_US",
      siteName: "MPG Stone",
    },
    twitter: {
      title: "Author at Mpgstone: Jaya Tripath",
      description: "Jaya Tripathi, Expert Content Writer and Author at Mpgstone",
    },
    alternates: {
      canonical: "https://mpgstone.co.uk/author/jaya_tripathi",
    },
    robots: "INDEX, FOLLOW, MAX-IMAGE-PREVIEW:LARGE, MAX-SNIPPET:-1, MAX-VIDEO-PREVIEW:-1",
  };
}
export default async function authorBlogPage() {
  const { blogs, totalPages } = await getBlogsPaginated(1);
  return (
    <>
      <div className="container">
        <h1 className="pt-8 text-2xl font-semibold">Jaya Tripathi&apos;s Blogs</h1>
      </div>
      <BlogsGrid currentPage={1} totalPages={totalPages} blogs={blogs} isCategoryBlog={false}/>
    </>
  );
}

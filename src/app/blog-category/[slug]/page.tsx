import BlogsGrid from "@/components/blogs/BlogsGrid";
import PageBanner from "@/components/PageBanner";
import { getAllBlogCategory, getBlogPerCategory } from "@/lib/api";
import { notFound } from "next/navigation";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const {slug} = await params;
  const allCategoryBlogs = await getAllBlogCategory();
  const checkSlug = allCategoryBlogs.find(category => category.slug === slug);
  if (!checkSlug) return notFound();
  const { blogs, totalPages } = await getBlogPerCategory(slug, 1);
  return (
    <>
      <PageBanner
        pageName={`${checkSlug.name} Blogs`}
        bgImg={"/media/product_category_banner.jpeg"}
        breadcrum={[
          {
             slug_name: `${checkSlug.name} Blogs`,
            slug_url: `${checkSlug.name} Blogs`,
          },
        ]}
      />
      <BlogsGrid currentPage={1} totalPages={totalPages} blogs={blogs} isCategoryBlog={slug} />
    </>
  );
}

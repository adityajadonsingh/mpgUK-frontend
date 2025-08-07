import BlogsGrid from "@/components/blogs/BlogsGrid";
import PageBanner from "@/components/PageBanner";
import { getAllBlogCategory, getBlogPerCategory } from "@/lib/api";
import { notFound, redirect } from "next/navigation";

type Params = {
  slug: string;
  page: string;
};

export default async function BlogPaginatedPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug, page } = await params;
  const pageNumber = parseInt(page);
  const allCategoryBlogs = await getAllBlogCategory();
  const checkSlug = allCategoryBlogs.find((category) => category.slug === slug);
  if (!checkSlug) return notFound();
  if (pageNumber === 1) {
    redirect(`/blog-category/${slug}`);
  }
  const { blogs, totalPages } = await getBlogPerCategory(slug, pageNumber);
  if(pageNumber > totalPages) return notFound();
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
      <BlogsGrid currentPage={pageNumber} totalPages={totalPages} blogs={blogs} isCategoryBlog={slug} />
    </>
  );
}

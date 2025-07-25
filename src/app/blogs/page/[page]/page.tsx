import BlogsGrid from "@/components/blogs/BlogsGrid";
import PageBanner from "@/components/PageBanner";
import { getBlogsPaginated } from "@/lib/api";

export default async function BlogPaginatedPage({ params }: {params: Promise<{page : string}>}) {
  const getParams = await params;
  const pageNumber = parseInt(getParams.page) || 1;
  const { blogs, totalPages } = await getBlogsPaginated(pageNumber);
  return (
    <>
      <PageBanner
        pageName="Blogs"
        bgImg={"/media/product_category_banner.jpeg"}
        breadcrum={[
          {
            slug_name: "Blogs",
            slug_url: "blogs",
          },
        ]}
      />
      <BlogsGrid currentPage={pageNumber} totalPages={totalPages} blogs={blogs} />
    </>
  );
}

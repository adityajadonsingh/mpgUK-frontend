import BlogsGrid from "@/components/blogs/BlogsGrid";
import PageBanner from "@/components/PageBanner";
import { getBlogsPaginated } from "@/lib/api";

export default async function BlogPage() {
  const { blogs, totalPages } = await getBlogsPaginated(1);
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
      <BlogsGrid currentPage={1} totalPages={totalPages} blogs={blogs} isCategoryBlog={false}/>
    </>
  );
}

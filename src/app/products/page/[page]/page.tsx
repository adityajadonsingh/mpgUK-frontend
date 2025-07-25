import ProductGrid from "@/components/category/ProductGrid";
import PageBanner from "@/components/PageBanner";
import { getAllProducts } from "@/lib/api";
import { redirect } from "next/navigation";

export default async function ProductsPagePaginated({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const getParams = await params;
  const getPageNumber = getParams.page;
  const pageNumber = parseInt(getPageNumber) || 1;
  if (pageNumber === 1) {
    redirect("/products/");
  }
  const { products, totalPages } = await getAllProducts(pageNumber);

  console.log(products);
  return (
    <>
      <PageBanner
        bgImg={"/media/product_category_banner.jpeg"}
        pageName={"Products"}
        breadcrum={[{ slug_name: "Products", slug_url: "" }]}
      />
      <ProductGrid
        products={products}
        currentPage={pageNumber}
        totalPages={totalPages}
        categorySlug={null}
      />
    </>
  );
}

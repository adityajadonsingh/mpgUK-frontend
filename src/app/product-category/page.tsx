import ProductCategoryGrid from "@/components/category/ProductCategoryGrid";
import PageBanner from "@/components/PageBanner";

export default function ProductCategory() {
    
  const breadcrum = [
    {
      slug_name: "Product Category",
      slug_url: "/product-category/",
    },
  ];
  return (
    <>
      <PageBanner
        breadcrum={breadcrum}
        bgImg={"/media/breadcumb.jpg"}
        pageName="Product Category"
      />
      <ProductCategoryGrid />
    </>
  );
}

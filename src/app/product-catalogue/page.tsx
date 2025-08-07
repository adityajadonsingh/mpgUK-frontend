import PageBanner from "@/components/PageBanner";
import { getProductCatalouge } from "@/lib/api";

export default async function ProductCatalouguePage() {
  const catalouges = await getProductCatalouge();
  console.log(catalouges);
  return (
    <>
      <PageBanner
        bgImg="/media/contact_banner.jpeg"
        pageName="Product Catalogue"
        breadcrum={[{ slug_name: "Product Catalogue", slug_url: "" }]}
      />
    </>
  );
}

import FooterContent from "@/components/FooterContent";
import PageBanner from "@/components/PageBanner";
import ProductSlider from "@/components/product/ProductSlider";
import { getAboutPageData, getRandomProducts } from "@/lib/api";

export default async function AboutUsPage() {
  const getAboutData = await getAboutPageData();
  const randomProducts = await getRandomProducts();

  return (
    <>
      <PageBanner
        bgImg={"/media/product_category_banner.jpeg"}
        pageName={"About Us"}
        breadcrum={[{ slug_name: "About Us", slug_url: "" }]}
      />
      <div className="my-10">
        <FooterContent content={getAboutData.description} isFullPage={true} />
      </div>

      <ProductSlider products={randomProducts} />
    </>
  );
}

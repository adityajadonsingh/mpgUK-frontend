import FooterContent from "@/components/FooterContent";
import PageBanner from "@/components/PageBanner";
import { getLegalPageData } from "@/lib/api";

export default async function PrivacyPolicy() {
    const getContent = await getLegalPageData("terms");
    const content = getContent.content;
  return (
    <>
      <PageBanner
        bgImg={"/media/product_category_banner.jpeg"}
        pageName={"Terms & Conditions"}
        breadcrum={[{ slug_name: "Terms & Conditions", slug_url: "" }]}
      />
        <div className="my-10">
            <FooterContent content={content} isFullPage={true}/>
        </div>
    </>
  );
}

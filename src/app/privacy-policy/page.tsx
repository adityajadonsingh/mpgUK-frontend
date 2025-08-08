import FooterContent from "@/components/FooterContent";
import PageBanner from "@/components/PageBanner";
import { getLegalPageData } from "@/lib/api";

export default async function PrivacyPolicy() {
    const getContent = await getLegalPageData("privacy");
    const content = getContent.content;
  return (
    <>
      <PageBanner
        bgImg={"/media/product_category_banner.jpeg"}
        pageName={"Privacy Policy"}
        breadcrum={[{ slug_name: "Privacy Policy", slug_url: "" }]}
      />
        <div className="my-10">
            <FooterContent content={content} isFullPage={true}/>
        </div>
    </>
  );
}

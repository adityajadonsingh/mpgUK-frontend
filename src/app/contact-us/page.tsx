import PageBanner from "@/components/PageBanner";

export default function ContactPage() {
  return (
    <>
      <PageBanner
        bgImg="/media/contact_banner.jpeg"
        pageName="Contact Us"
        breadcrum={[{ slug_name: "Contact Us", slug_url: "" }]}
      />
    </>
  );
}

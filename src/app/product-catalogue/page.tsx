import PageBanner from "@/components/PageBanner";
import { getProductCatalouge } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

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
      <section className="catalogue my-10">
        <div className="container">
          <div className="grid grid-cols-4">
            {catalouges.map((catalouge, idx) => (
              <div key={idx} className="card bg-[#f6f4f5] px-4 py-4 rounded-sm shadow-sm hover:shadow-md">
                <Link href={catalouge.pdf_file} target="_blank">
                  <div className="img-box relative h-[180px]">
                    <Image
                      src={catalouge.thumbnail}
                      alt={catalouge.name}
                      fill
                      className="object-contain rounded-sm"
                    />
                  </div>
                  <span className="block mt-2 text-center font-medium capitalize">
                    {catalouge.name}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

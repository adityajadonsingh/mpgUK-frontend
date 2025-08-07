import ContactSection from "@/components/home/ContactSection";
import PageBanner from "@/components/PageBanner";
import Link from "next/link";

export default function ContactPage() {
  return (
    <>
      <PageBanner
        bgImg="/media/contact_banner.jpeg"
        pageName="Contact Us"
        breadcrum={[{ slug_name: "Contact Us", slug_url: "" }]}
      />
      <section className="contact-page my-10">
        <div className="container">
          <div className="grid grid-cols-2 gap-4">
            <div className="map h-[450px]">
              <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3298.3841937519933!2d-118.53760508820062!3d34.23873897297508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c29baaf292a48d%3A0xc20ed60f30ae1dd7!2s9250%20Reseda%20Blvd%20%23777%2C%20Northridge%2C%20CA%2091324%2C%20USA!5e0!3m2!1sen!2sin!4v1752059259240!5m2!1sen!2sin"
                  loading="lazy"
                  className="w-full h-full !border-0 rounded-md"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            <div className="details w-9/12 mx-auto">
              <h2 className="heading mb-5 text-3xl font-semibold ">Reach Us By</h2>
              <ul>
                <li className="flex bg-[#f6f4f5] p-4 rounded-sm items-center mb-4">
                  <div className="icn">
                    <i className="bi bi-telephone-fill"></i>
                  </div>
                  <div className="links flex flex-col pl-3">
                    <Link href={'tel:3425432532'}>4325324532432</Link>
                    <Link href={'tel:3425432532'}>4325324532432</Link>
                  </div>
                </li>
                <li className="flex bg-[#f6f4f5] p-4 rounded-sm items-center mb-4">
                  <div className="icn">
                    <i className="bi bi-envelope-fill"></i>
                  </div>
                  <div className="links flex flex-col pl-3">
                    <Link href={'mailto:'}>sales@mpgstone.co.uk</Link>
                  </div>
                </li>
                <li className="flex bg-[#f6f4f5] p-4 rounded-sm items-center mb-4">
                  <div className="icn">
                    <i className="bi bi-geo-alt-fill"></i>
                  </div>
                  <div className="links flex flex-col pl-3">
                    <span>All Stone Products Ltd Yard 2, Eling Wharf, Southampton SO40 4TE, United Kingdom</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <ContactSection />
    </>
  );
}

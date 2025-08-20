"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "bootstrap-icons/font/bootstrap-icons.css";

import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

import { AttributeType, GalleryType } from "@/types";
import ContactPopup from "@/components/ContactPopup";
import PopupMessage from "@/components/PopupMessage";

export default function ProductDetails({
  name,
  description,
  category,
  gallery,
  attributes,
}: {
  name: string;
  description: string;
  category: string;
  gallery: GalleryType[];
  attributes: AttributeType[];
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [safeDescription, setSafeDescription] = useState("");
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setSafeDescription(description);
  }, [description]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleSuccessMessage = (msg: string) => {
    setMessageText(msg);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <>
      <ContactPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSuccessMessage={handleSuccessMessage}
        product={name}
      />

      {showPopup && (
        <PopupMessage
          message={messageText}
          type="success"
          show={showPopup}
          onClose={() => setShowPopup(false)}
        />
      )}

      <section className="product-details py-5">
        <div className="container">
          <div className="grid lg:grid-cols-[40%_55%] grid-cols-1 gap-x-5 w-12/12 mx-auto">
            <div className="img-box lg:w-full sm:w-[450px] w-full mx-auto lg:mb-0 mb-5">
              {/* Main Swiper */}
              <Swiper
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Navigation, Thumbs]}
                className="main-swiper mb-4 rounded-md overflow-hidden"
              >
                {gallery.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-full md:h-[440px] sm:h-[340px] h-[300px] group">
                      <Image
                        src={item.image}
                        alt={item.alt_text}
                        fill
                        className="object-cover object-center h-full w-full bg-[#ebedf0]"
                        placeholder="blur"
                        blurDataURL="/media/placeholder.jpg"
                      />
                      <button
                        onClick={() => openLightbox(index)}
                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:scale-110 transition"
                      >
                        <i className="bi bi-zoom-in text-xl text-gray-800" />
                      </button>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Thumbs Swiper */}
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                watchSlidesProgress
                modules={[Thumbs]}
                className="thumb-swiper"
              >
                {gallery.map((item, index) => (
                  <SwiperSlide key={`thumb-${index}`}>
                    <div className="relative w-full md:h-[100px] h-[80px] cursor-pointer">
                      <Image
                        src={item.image}
                        alt={item.alt_text}
                        fill
                        className="object-cover object-center rounded h-full w-full bg-[#ebedf0]"
                        placeholder="blur"
                        blurDataURL="/media/placeholder.jpg"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="product-content">
              <ul className="breadcrum font-medium flex gap-x-2 flex-wrap capitalize">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/product-category/">Product Category</Link>
                </li>
                <li>/</li>
                <li>
                  <Link
                    href={`/product-category/${category
                      .replace(/ /g, "-")
                      .toLowerCase()}/`}
                  >
                    {category}
                  </Link>
                </li>
                <li>/</li>
                <li className="text-[#f36c23]">{name}</li>
              </ul>

              <h1 className="text-2xl my-5 font-semibold capitalize">{name}</h1>

              <p
                className="text-gray-700 prose max-w-none"
                dangerouslySetInnerHTML={{ __html: safeDescription }}
              ></p>

              {/* Attributes Accordion */}
              <div className="mt-4">
                {attributes.map((item, index) => {
                  const isOpen = activeAccordion === index;
                  return (
                    <div key={index} className="mb-0 border-b overflow-hidden">
                      <button
                        onClick={() =>
                          setActiveAccordion(isOpen ? null : index)
                        }
                        className="w-full text-left px-4 py-3 bg-white hover:bg-gray-100 cursor-pointer font-semibold flex justify-between items-center"
                      >
                        <span>{item.title}</span>
                        <i
                          className={`bi ${
                            isOpen ? "bi-dash" : "bi-plus"
                          } text-lg`}
                        />
                      </button>
                      <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                          isOpen
                            ? "max-h-[500px] py-3 pt-0 px-4"
                            : "max-h-0 px-4 py-0"
                        }`}
                      >
                        <p className="text-sm text-gray-700">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="enquire-now sm:mt-4 mt-6">
                <button
                  onClick={() => setIsPopupOpen(true)}
                  className="bg-orange-600 text-white px-6 py-2 font-medium rounded-md text-lg sm:w-fit w-full cursor-pointer"
                >
                  Enquire Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={gallery.map((item) => ({
          src: item.image,
          alt: item.alt_text,
          description: item.alt_text || name,
        }))}
        plugins={[Captions]}
        captions={{
          descriptionTextAlign: "center",
          descriptionMaxLines: 3,
        }}
      />
    </>
  );
}

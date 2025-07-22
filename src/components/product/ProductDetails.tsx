"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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

import { galleryType } from "@/types";

export default function ProductDetails({
  name,
  description,
  category,
  gallery,
}: {
  name: string;
  description: string;
  category: string;
  gallery: galleryType[];
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [safeDescription, setSafeDescription] = useState("");

  useEffect(() => {
    setSafeDescription(description);
  }, [description]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <section className="product-details py-5">
        <div className="container">
          <div className="grid grid-cols-[40%_55%] gap-x-5 w-11/12 mx-auto">
            <div className="img-box">
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
                    <div className="relative w-full md:h-[390px] h-[340px] group">
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
                <ul className="breadcrum  font-medium flex gap-x-2 flex-wrap capitalize">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>/</li>
                    <li>
                        <Link href="/product-category/">Product Category</Link>
                    </li>
                    <li>/</li>
                    <li>
                        <Link href={`/product-category/${category.replace(/ /g, "-").toLowerCase()}/`}>{category}</Link>
                    </li>
                    <li>/</li>
                    <li className="text-[#f36c23]">
                        {name}
                    </li>
                    
                </ul>
                <h2 className="text-2xl my-5 font-semibold capitalize">{name}</h2>
                <p
                  className=" text-gray-700 prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: safeDescription }}
                ></p>
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

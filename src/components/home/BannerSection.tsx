"use client";

import { Banner } from "@/types";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function BannerSection({ data }: { data: Banner[] }) {
  return (
    <section className="home-banner w-full">
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        className="h-full w-full"
        loop={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        speed={800}
        effect="slide"
      >
        {data.map((banner) => (
          <SwiperSlide key={banner.id} className="relative w-full h-full">
            <div className="w-full h-full flex flex-col items-center z-10 justify-end bg-gray-100 text-center relative slide-wraper">
              <Image
                src={banner.image}
                alt={banner.alt_text ?? "Banner Image"}
                className="w-full h-full z-0 object-cover object-center"
                fill
              />
              <div className="content-box">
                <h2 className="xl:text-4xl lg:text-3xl md:text-2xl text-xl font-bold mb-3 capitalize">
                  {banner.title}
                </h2>
                <p className="mb-4 md:text-lg text-base">{banner.subtitle}</p>
                <button
                  onClick={() => {
                    const el = document.getElementById("contact-section");
                    if (el) {
                      const yOffset = -100;
                      const y =
                        el.getBoundingClientRect().top +
                        window.pageYOffset +
                        yOffset;
                      window.scrollTo({ top: y, behavior: "smooth" });
                    }
                  }}
                  className="bg-[#f36c23] hover:bg-[#e76017] cursor-pointer font-semibold text-white px-6 py-2 rounded"
                >
                  {banner.enquiry_button_text}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

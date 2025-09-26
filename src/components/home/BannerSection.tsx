"use client";

import { Banner } from "@/types";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

export default function BannerSection({ data }: { data: Banner[] }) {
  return (
    <section className="home-banner w-full relative">
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        speed={800}
        className="h-full w-full"
      >
        {data.map((banner, i) => (
          <SwiperSlide key={banner.id} className="relative w-full h-[600px]">
            <div className="relative w-full h-full flex flex-col items-center justify-end text-center slide-wraper">
              <Image
                src={banner.image}
                alt={banner.alt_text ?? "Banner Image"}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
              <div className="absolute bottom-10 z-20 text-white px-4 content-box">
                <h2 className="xl:text-4xl lg:text-3xl md:text-2xl text-xl font-bold mb-3 capitalize">
                  {banner.title}
                </h2>
                <p className="mb-4 md:text-lg text-base">{banner.subtitle}</p>
                <button
                  onClick={() => {
                    const el = document.getElementById("contact-section");
                    if (el) {
                      const y =
                        el.getBoundingClientRect().top + window.scrollY - 100;
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

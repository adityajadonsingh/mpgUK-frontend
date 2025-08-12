"use client";

import { useSiteData } from "@/context/SiteDataContext";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";

export default function CategorySlider({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) {
  const { categories } = useSiteData();
  return (
    <>
      <section className="category-slider mt-10">
        <div className="container">
          <div className="md:w-2/3 w-full mx-auto">
            <h1 className="text-center lg:text-3xl text-2xl font-semibold capitalize mb-3">
              {heading}
            </h1>
            <p className="text-center md:text-base text-sm font-medium">{description}</p>
          </div>
          <div className="slider ">
            <Swiper
              pagination={{ clickable: true }}
              modules={[Autoplay, Navigation]}
              navigation
              slidesPerView={4}
              spaceBetween={20}
              className="h-full w-full"
              loop={true}
              autoplay={{
                delay: 6000,
                disableOnInteraction: false,
              }}
              speed={800}
              effect="slide"
              breakpoints={{
              0: {
                slidesPerView: 2, // Mobile
              },
              480: {
                slidesPerView: 2, // Small tablets
              },
              768: {
                slidesPerView: 3, // Tablets
              },
              1024: {
                slidesPerView: 4, // Desktop
              },
            }}
            >
              {categories.map((category) => (
                <SwiperSlide
                  key={category.id}
                  className="relative w-full h-full"
                >
                  <div className="card shadow-md">
                    <Link href={`/product-category/${category.slug}/`}>
                      <div className="img-box">
                        <Image
                          src={category.image}
                          alt={category.alt_text}
                          className="w-full h-full z-0 object-cover object-center"
                          fill
                        />
                      </div>
                      <h4 className="xl:text-lg lg:text-base text-sm capitalize text-center mt-3 font-semibold">{category.category_name}</h4>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}

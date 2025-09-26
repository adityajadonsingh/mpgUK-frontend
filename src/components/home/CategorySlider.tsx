"use client";

import { useSiteData } from "@/context/SiteDataContext";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

export default function CategorySlider({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) {
  const { categories } = useSiteData();

  return (
    <section className="category-slider mt-10">
      <div className="container">
        <div className="md:w-2/3 w-full mx-auto">
          <h1 className="text-center lg:text-3xl text-2xl font-semibold capitalize mb-3">
            {heading}
          </h1>
          <p className="text-center md:text-base text-sm font-medium">{description}</p>
        </div>

        <div className="slider mt-6">
          <Swiper
            modules={[Autoplay, Navigation]}
            navigation
            loop
            slidesPerView={4}
            spaceBetween={20}
            speed={800}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            breakpoints={{
              0: { slidesPerView: 2 },
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="w-full"
          >
            {categories.map((category, i) => (
              <SwiperSlide
                key={category.id}
                className="relative w-full h-[250px] md:h-[300px] lg:h-[350px]"
              >
                <div className="card shadow-md h-full flex flex-col">
                  <Link href={`/product-category/${category.slug}/`}>
                    <div className="img-box relative w-full h-2/3">
                      <Image
                        src={category.image}
                        alt={category.alt_text ?? category.category_name}
                        fill
                        className="object-cover object-center"
                        priority={i === 0}
                        sizes="(max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <h4 className="xl:text-lg lg:text-base text-sm capitalize text-center mt-3 font-semibold">
                      {category.category_name}
                    </h4>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import { Testimonials } from "@/types";

export default function TestimonialSection({ data }: { data: Testimonials }) {
  console.log(data)
  return (
    <>
      <section className="testimonials">
        <div className="container">
          <div className="slider">
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
            >
              {/* {categories.map((category) => (
                <SwiperSlide
                  key={category.id}
                  className="relative w-full h-full"
                >
                  <div className="card">
                    <Link href={`/product-category/${category.slug}/`}>
                      <div className="img-box">
                        <Image
                          src={category.image}
                          alt={category.alt_text}
                          className="w-full h-full z-0 object-cover object-center"
                          fill
                        />
                      </div>
                      <h4 className="text-lg text-center mt-3 font-medium">
                        {category.category_name}
                      </h4>
                    </Link>
                  </div>
                </SwiperSlide>
              ))} */}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Testimonial } from "@/types";

interface TestimonialProps {
  data: Testimonial[];
}

export default function TestimonialSection({ data }: TestimonialProps) {
  return (
    <section className="testimonials lg:mt-20 mt-5 lg:mb-10 mb-5">
      <div className="container">
        <h3 className="heading text-center lg:text-3xl text-2xl font-semibold mb-6">
          What Our Clients Say About Us
        </h3>

        <Swiper
          modules={[Autoplay, Navigation]}
          navigation
          loop
          speed={800}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          slidesPerView={3}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            608: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full"
        >
          {data.map((testimonial, index) => (
            <SwiperSlide
              key={testimonial.id + "-testimonial"}
              className="relative w-full h-full"
            >
              <div className="card rounded-md min-h-[280px] shadow-md p-4 flex flex-col">
                <div className="flex gap-x-3">
                  <div className="img-box w-2/12 relative flex-shrink-0">
                    <Image
                      src={testimonial.profile_image}
                      alt={testimonial.name ?? "testimonial-user"}
                      width={40}
                      height={40}
                      className="rounded-full object-cover object-center"
                      loading={index === 0 ? "eager" : "lazy"} // LCP optimization
                    />
                  </div>

                  <div className="w-10/12">
                    <span className="text-lg block font-medium">
                      {testimonial.name}
                    </span>

                    <div className="flex items-center text-yellow-500 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={i < testimonial.rating ? "bi bi-star-fill" : "bi bi-star"}
                        />
                      ))}
                    </div>

                    <hr className="my-2 border-gray-300" />

                    <span className="block md:text-base text-sm">
                      {testimonial.testimonial}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import { Testimonial } from "@/types";

interface TestimonialProps {
  data: Testimonial[];
}

export default function TestimonialSection({ data }: TestimonialProps ) {
  console.log(data);
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
              autoplay={{
                delay: 6000,
                disableOnInteraction: false,
              }}
              speed={800}
              effect="slide"
            >
              {data.map((testimonial) => {
                console.log(testimonial)
                return (
                  <SwiperSlide
                    key={testimonial.id}
                    className="relative w-full h-full"
                  >
                    <div className="card">
                      <div className="flex">
                        <div className="img-box">
                          <Image
                            src={testimonial.profile_image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover object-center"
                            fill
                          />
                        </div>
                        <span className="text-lg font-medium">
                          {testimonial.name}
                        </span>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}

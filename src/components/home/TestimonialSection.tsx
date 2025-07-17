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

export default function TestimonialSection({ data }: TestimonialProps) {
  return (
    <>
      <section className="testimonials mt-20 mb-10">
        <div className="container">
          <h3 className="heading text-center text-3xl font-semibold ">
            What Our Clients Say About Us
          </h3>
          <div className="slider">
            <Swiper
              pagination={{ clickable: true }}
              modules={[Autoplay, Navigation]}
              navigation
              slidesPerView={3}
              spaceBetween={20}
              className="h-full w-full"
              autoplay={{
                delay: 6000,
                disableOnInteraction: false,
              }}
              speed={800}
              loop={true}
              effect="slide"
            >
              {data.map((testimonial) => {
                return (
                  <SwiperSlide
                    key={testimonial.id}
                    className="relative w-full h-full"
                  >
                    <div className="card rounded-md min-h-[280px] shadow-md">
                      <div className="flex gap-x-3">
                        <div className="img-box w-2/12 relative">
                          <Image
                            src={testimonial.profile_image}
                            alt={testimonial.name}
                            className=" rounded-full object-cover object-center"
                            width={40}
                            height={40}
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
                                className={
                                  i < testimonial.rating
                                    ? "bi bi-star-fill"
                                    : "bi bi-star"
                                }
                              ></i>
                            ))}
                          </div>
                          <hr className="my-2 text-[#ccc]" />
                          <span className="block">
                            {testimonial.testimonial}
                          </span>
                        </div>
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

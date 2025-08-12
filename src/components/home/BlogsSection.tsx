"use client";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import { Blog } from "@/types";

export default function BlogsSection({ data }: { data: Blog[] }) {
  return (
    <>
      <section className="blogs-home">
        <div className="container">
          <h3 className="heading text-center lg:text-3xl text-2xl font-semibold ">
            Latest Blogs
          </h3>
          <div className="slider">
            <Swiper
              pagination={{ clickable: true }}
              modules={[Autoplay, Navigation]}
              navigation
              slidesPerView={3}
              spaceBetween={30}
              className="h-full w-full pb-3"
              autoplay={{
                delay: 6000,
                disableOnInteraction: false,
              }}
              speed={800}
              loop={true}
              effect="slide"
              breakpoints={{
              0: {
                slidesPerView: 1, // Mobile
              },
              540: {
                slidesPerView: 2, // Small tablets
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 3, // Desktop
              },
            }}
            >
              {data.map((blog) => {
                const rawDate = blog.date_posted;
                const formattedDate = new Date(rawDate).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                );
                return (
                  <SwiperSlide key={blog.id} className="relative w-full h-full">
                    <div className="card relative group shadow-md min-h-[280px]">
                      <Link href={`/blogs/${blog.slug}/`}>
                        <div className="img-box rounded-sm w-full overflow-hidden md:h-[280px] h-[200px] relative">
                          <Image
                            src={blog.image}
                            alt={blog.alt_text || blog.title}
                            fill
                            className="object-cover group-hover:scale-[1.05] rounded-sm object-center"
                          />
                        </div>
                        <div className="content mt-5">
                          <span className="block md:text-sm text-xs text-[#f36c23] font-medium">
                            Date Posted : {formattedDate} | Author : Jaya
                            Tripathi
                          </span>
                          <span className="text-lg hover:text-[#f36c23] my-2 block font-semibold">
                            {blog.title}
                          </span>
                          <span className="block md:text-base text-sm">
                            {`${blog.description.slice(0, 100)}...`}
                          </span>
                          <button className="py-2 px-4 mt-4 bg-[#5a5c5d] hover:bg-[#f36c23] text-white rounded-sm cursor-pointer">
                            Read Blog
                          </button>
                        </div>
                      </Link>
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

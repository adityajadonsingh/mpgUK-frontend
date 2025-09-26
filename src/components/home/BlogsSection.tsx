"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Blog } from "@/types";

interface BlogsSectionProps {
  data: Blog[];
}

export default function BlogsSection({ data }: BlogsSectionProps) {
  return (
    <section className="blogs-home my-10">
      <div className="container">
        <h3 className="heading text-center lg:text-3xl text-2xl font-semibold mb-6">
          Latest Blogs
        </h3>

        <Swiper
          modules={[Autoplay, Navigation]}
          navigation
          loop
          speed={800}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          slidesPerView={3}
          spaceBetween={30}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 10 },
            540: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          className="w-full"
        >
          {data.map((blog, index) => {
            const formattedDate = new Date(blog.date_posted).toLocaleDateString(
              "en-US",
              { year: "numeric", month: "long", day: "numeric" }
            );

            return (
              <SwiperSlide key={blog.id} className="relative w-full h-full pb-3">
                <div className="card relative group shadow-md min-h-[320px] md:min-h-[280px] rounded-md overflow-hidden">
                  <Link href={`/blogs/${blog.slug}/`}>
                    {/* Blog Image */}
                    <div className="img-box w-full h-[200px] md:h-[280px] relative overflow-hidden rounded-md">
                      <Image
                        src={blog.image}
                        alt={blog.alt_text || blog.title}
                        fill
                        className="object-cover object-center group-hover:scale-[1.05] transition-transform duration-300"
                        priority={index === 0}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    </div>

                    {/* Blog Content */}
                    <div className="content mt-4 px-2 md:px-0">
                      <span className="block md:text-sm text-xs text-[#f36c23] font-medium">
                        Date Posted: {formattedDate} | Author: Jaya Tripathi
                      </span>
                      <span className="text-lg hover:text-[#f36c23] my-2 block font-semibold">
                        {blog.title}
                      </span>
                      <span className="block md:text-base text-sm">
                        {`${blog.description.slice(0, 100)}...`}
                      </span>
                      <button className="py-2 px-4 mt-4 bg-[#5a5c5d] hover:bg-[#f36c23] text-white rounded-sm cursor-pointer transition-colors duration-200">
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
    </section>
  );
}

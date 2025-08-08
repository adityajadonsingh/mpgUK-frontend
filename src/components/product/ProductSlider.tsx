"use client";

import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Product } from "@/types";



interface ProductSliderProps {
  products: Product[];
}

const ProductSlider: FC<ProductSliderProps> = ({ products }) => {
  return (
    <section className="my-10 product-slider">
      <div className="container">
        <h2 className="heading text-center text-3xl font-semibold mb-6">
          Explore Our Products
        </h2>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          breakpoints={{
            1024: { slidesPerView: 4 }, // Desktop
            768: { slidesPerView: 3 }, // Tablet
            0: { slidesPerView: 2 }, // Mobile
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <Link href={`/product-category/${product.category.replace(/ /g, "-").toLowerCase()}/${product.slug}/`}>
                <div className="card group relative overflow-hidden rounded-lg shadow-md aspect-[5/6]">
                  <Image
                    src={product.image}
                    alt={product.alt_text || product.name}
                    fill
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-[#00000081] bg-opacity-60 text-white text-center py-3">
                    <h3 className="text-sm capitalize md:text-base font-medium px-2">
                      {product.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ProductSlider;

"use client";

import { Blog } from "@/types";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
export default function BlogsGrid({
  blogs,
  currentPage,
  totalPages,
}: {
  blogs: Blog[];
  currentPage: number;
  totalPages: number;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  const showPagination = totalPages > 1;
  return (
    <>
      <section className="blogs-grid my-10">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
            {blogs.map((blog) => {
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
                <div className="card group min-h-[280px]" key={blog.id}>
                  <Link href={`/blogs/${blog.slug}/`}>
                    <div className="img-box rounded-sm w-full overflow-hidden h-[250px] relative">
                      <Image
                        src={blog.image}
                        alt={blog.alt_text || blog.title}
                        fill
                        className="object-cover group-hover:scale-[1.05] rounded-sm object-center"
                      />
                    </div>
                    <div className="content  mt-5">
                      <span className="block text-sm text-[#f36c23] font-medium">
                        Date Posted : {formattedDate} | Author : Jaya Tripathi
                      </span>
                      <span className="text-lg hover:text-[#f36c23] my-2 block font-semibold">
                        {blog.title}
                      </span>
                      <span className="block">
                        {`${blog.description.slice(0, 100)}...`}
                      </span>
                      <button className="py-2 px-4 mt-4 bg-[#5a5c5d] hover:bg-[#f36c23] text-white rounded-sm cursor-pointer">
                        Read Blog
                      </button>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {showPagination && (
            <div className="pagination text-center my-10 space-x-2">
              {currentPage > 1 && (
                <Link
                  href={`/blogs/page/${currentPage - 1}`}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  « <span className="sm:inline hidden">Previous</span>
                </Link>
              )}

              {(isMobile
                ? [currentPage - 1, currentPage, currentPage + 1]
                : [
                    1,
                    2,
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    totalPages - 1,
                    totalPages,
                  ]
              )
                .filter(
                  (value, index, self) =>
                    value > 0 &&
                    value <= totalPages &&
                    self.indexOf(value) === index
                )
                .sort((a, b) => a - b)
                .map((page, idx, arr) => (
                  <span key={page + "-wrap"}>
                    {idx > 0 && page - arr[idx - 1] > 1 && (
                      <span className="px-2 py-2">...</span>
                    )}
                    <Link
                      href={page === 1 ? `/blogs/` : `/blogs/page/${page}`}
                      className={`px-4 py-2 rounded font-semibold ${
                        currentPage === page
                          ? "bg-[#DC5100] !text-[#fff]"
                          : "bg-[#E9E9ED] text-[#8a8a8c]"
                      }`}
                    >
                      {page}
                    </Link>
                  </span>
                ))}

              {currentPage < totalPages && (
                <Link
                  href={`/blogs/page/${currentPage + 1}`}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  <span className="sm:inline hidden">Next</span> »
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

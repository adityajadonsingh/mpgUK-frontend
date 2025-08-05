import { getAllBlogCategory, getBlogs } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import BlogContent from "@/components/blogs/BlogContent";
import { Blog, BlogCategory } from "@/types";
import CopyUrlButton from "@/components/blogs/CopyUrlButton";
import FacebookShareButton from "@/components/blogs/FacebookShareButton";
import XShareButton from "@/components/blogs/XShareButton";
import LinkedInShareButton from "@/components/blogs/LinkedInShareButton";
import CommentSection from "@/components/blogs/CommentSection";

export default async function BlogsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data: { blogs: Blog[] } = await getBlogs();
  const blog = data.blogs.find((b) => b.slug === slug);
  console.log(blog);
  if (!blog) return notFound();
  const blogCategory: BlogCategory[] = await getAllBlogCategory();
  const latestBlogs = data.blogs
    .filter((b) => b.slug !== blog.slug)
    .slice(0, 5);
  const prevPost = data.blogs.filter((b) => b.id === blog.id - 1);
  const nextPost = data.blogs.filter((b) => b.id === blog.id + 1);
  return (
    <>
      <section className="blog-page my-10">
        <div className="container">
          <div className="flex">
            <div className="w-2/3">
              <ul className="breadcrum font-medium flex gap-x-2 flex-wrap capitalize">
                <li>
                  <Link href={"/"}>
                    <i className="bi bi-house-door-fill"></i> Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href={"/blogs/"}>Blogs</Link>
                </li>
                <li>/</li>
                <li className="text-[#f36c23]">{blog?.title}</li>
              </ul>
              <div className="blog-content">
                <h1 className="text-3xl font-semibold mt-5 mb-2">
                  {blog?.title}
                </h1>
                <ul className="blog-details flex gap-x-2">
                  <li>
                    <i className="bi bi-calendar-event-fill text-[#f48245]"></i>{" "}
                    Posted on {blog?.date_posted}
                  </li>
                  <li>|</li>
                  <li>
                    <i className="bi bi-person-fill text-[#f48245] text-[17px]"></i>{" "}
                    Author : <Link href={"/author/"}>Jaya Tripathi</Link>
                  </li>
                </ul>
                <hr className="mt-4 mb-5" />
                <div className="blog-main-img h-[450px] relative mb-5">
                  <Image
                    src={blog?.image || "/media/placeholder.jpg"}
                    alt={blog?.alt_text || "alt"}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <BlogContent content={blog.content} />
                <div className="about-author border-1 p-6 mt-5 rounded-md">
                  <h5 className="font-semibold text-xl">About the Autor</h5>
                  <hr className="my-3" />
                  <p>
                    <Link href={"/author/"}>
                      <strong className="text-[#f48245]">Jaya Tripathi</strong>
                    </Link>{" "}
                    is a seasoned content writer and editor with over a decade
                    of experience in the stone and real estate industries. As a
                    leading voice at MPG Stone, she shares insights on
                    installment processes, project insights, design guides, and
                    much more
                  </p>
                </div>
                <div className="blog-btm flex justify-between items-center mt-8">
                  <div className="flex gap-x-4">
                    {prevPost.length !== 0 ? (
                      <Link href={`/blogs/${prevPost[0].slug}`}>
                        <button title="Previous Post" className="post-nav">
                          <span className="sm:block hidden">Previous Post</span>
                          <i className="bi bi-chevron-left sm:hidden block"></i>
                        </button>
                      </Link>
                    ) : null}

                    {nextPost.length !== 0 ? (
                      <Link href={`/blogs/${nextPost[0].slug}`}>
                        <button title="Next Post" className="post-nav">
                          <span className="sm:block hidden">Next Post</span>
                          <i className="bi bi-chevron-right sm:hidden block"></i>
                        </button>
                      </Link>
                    ) : null}
                  </div>
                  <div className="share">
                    <ul className="flex gap-x-3">
                      <li>
                        <CopyUrlButton />
                      </li>
                      <li>
                        <FacebookShareButton />
                      </li>
                      <li>
                        <XShareButton text="Read this awesome blog:" />
                      </li>
                      <li>
                        <LinkedInShareButton />
                      </li>
                    </ul>
                  </div>
                </div>
                <hr className="my-8" />

                <CommentSection blogId={blog.id} blogTitle={blog.title} />
              </div>
            </div>
            <div className="w-1/3 relative">
              <div className="wrapper w-10/12 ml-auto sticky top-[100px]">
                <div className="blog-category">
                  <h3 className="text-xl text-center font-semibold border-b-1 pb-2 mb-5">
                    Blog Category
                  </h3>
                  <ul>
                    {blogCategory.map((category, idx) => {
                      if (category.blog_count > 0) {
                        return (
                          <li className="mb-2" key={idx}>
                            <Link
                              href={`/blog-category/${category.slug}/`}
                              className="flex justify-between bg-[#5a5c5d] hover:bg-[#f36c23] !text-[#fff] font-medium py-2 px-4 rounded-full"
                            >
                              <span>{category.name}</span>
                              <span>{category.blog_count}</span>
                            </Link>
                          </li>
                        );
                      }
                    })}
                  </ul>
                </div>
                <div className="latest-blogs mt-5">
                  <h3 className="text-xl text-center font-semibold border-b-1 pb-2 mb-5">
                    Latest Blogs
                  </h3>
                  <ul>
                    {latestBlogs.map((blog, idx) => (
                      <li key={idx} className="mb-4 p-3 bg-white rounded-md shadow-sm hover:shadow-md">
                        <Link href={""}>
                          <div className="flex">
                            <div className="img relative">
                              <Image
                                src={blog.image}
                                alt={blog.alt_text}
                                fill
                                className="object-cover rounded-sm"
                              />
                            </div>
                            <span className="block blog-title">
                              {blog.title}
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

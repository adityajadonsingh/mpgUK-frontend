import { getAllBlogCategory, getBlogs } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import BlogContent from "@/components/blogs/BlogContent";
import { Blog, BlogCategory, JSONObject, Schema } from "@/types";
import CopyUrlButton from "@/components/blogs/CopyUrlButton";
import FacebookShareButton from "@/components/blogs/FacebookShareButton";
import XShareButton from "@/components/blogs/XShareButton";
import LinkedInShareButton from "@/components/blogs/LinkedInShareButton";
import CommentSection from "@/components/blogs/CommentSection";

import { Metadata } from "next";
import SchemaInjector from "@/components/SchemaInjector";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data: { blogs: Blog[] } = await getBlogs();
  const blog = data.blogs.find((b) => b.slug === slug);

  if (!blog) {
    return {
      title: "Blog Not Found | MPG Stone",
      description: "The requested blog does not exist.",
    };
  }
  return {
    title: blog.meta_title || "Home | MPG Stone",
    description: blog.meta_description || "Default description",
    keywords: blog.meta_keyword || "",
    openGraph: {
      title: blog.og_title || blog.meta_title || "",
      description: blog.og_description || blog.meta_description || "",
      url: blog.canonical_url || "",
      images: blog.meta_img ? [blog.meta_img] : [],
      type: "website",
      locale: "en_US",
      siteName: "MPG Stone",
    },
    twitter: {
      title: blog.twitter_title || blog.meta_title || "",
      description: blog.twitter_description || blog.meta_description || "",
      images: blog.meta_img ? [blog.meta_img] : [],
    },
    alternates: {
      canonical: blog.canonical_url || "",
    },
    robots: blog.robot_tag,
  };
}

export default async function BlogsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data: { blogs: Blog[] } = await getBlogs();
  const blog = data.blogs.find((b) => b.slug === slug);
  if (!blog) return notFound();
  const blogCategory: BlogCategory[] = await getAllBlogCategory();
  const latestBlogs = data.blogs
    .filter((b) => b.slug !== blog.slug)
    .slice(0, 5);
  const prevPost = data.blogs.filter((b) => b.id === blog.id - 1);
  const nextPost = data.blogs.filter((b) => b.id === blog.id + 1);
  const commonSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://mpgstone.co.uk/blogs/${blog.slug}/`,
    },
    headline: blog.title,
    description: blog.meta_description,
    image: blog.meta_img,
    author: {
      "@type": "Person",
      name: "Jaya Tripathi",
      url: "https://mpgstone.co.uk/author/jaya_tripathi/",
    },
    publisher: {
      "@type": "Organization",
      name: "MPG Stone",
      logo: {
        "@type": "ImageObject",
        url: "https://mpgstone.co.uk/media/logo.svg",
      },
    },
    datePublished: new Date(blog.date_posted).toISOString(),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://mpgstone.co.uk/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogs",
        item: "https://mpgstone.co.uk/blogs/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blog.title,
        item: `https://mpgstone.co.uk/blogs/${blog.slug}/`,
      },
    ],
  };

  const normalizeSchema = (schema: Schema | JSONObject): Schema =>
    "schema_json" in schema
      ? (schema as Schema)
      : { id: 0, name: "", schema_json: schema };

  const rawSchemas: (Schema | JSONObject)[] = [
    breadcrumbSchema,
    commonSchema,
    ...(Array.isArray(blog?.schema_markup) ? blog?.schema_markup : []),
  ];

  const safeSchemas: Schema[] = Array.from(
    new Map(
      rawSchemas.map((schema) => {
        const normalized = normalizeSchema(schema);
        return [JSON.stringify(normalized.schema_json), normalized];
      })
    ).values()
  );
  return (
    <>
      <section className="blog-page my-10">
        <div className="container">
          <div className="flex lg:flex-nowrap flex-wrap gap-y-6">
            <div className="lg:w-2/3 w-full">
              <ul className="breadcrum font-medium md:text-base text-sm flex md:gap-x-2 gap-x-1 flex-wrap capitalize">
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
                <h1 className="md:text-3xl text-xl font-semibold mt-5 mb-2">
                  {blog?.title}
                </h1>
                <ul className="blog-details flex flex-wrap md:text-base text-sm gap-x-2">
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
                <div className="blog-main-img relative mb-5">
                  <Image
                    src={blog?.image || "/media/placeholder.jpg"}
                    alt={blog?.alt_text || "alt"}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <BlogContent content={blog.content} />
                <div className="about-author border-1 md:p-6 p-4 mt-5 rounded-md">
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
            <div className="lg:w-1/3 w-full relative">
              <div className="wrapper lg:w-10/12 md:w-6/12 lg:ml-auto mx-auto sticky top-[100px]">
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
                      <li
                        key={idx}
                        className="mb-4 p-3 bg-white rounded-md shadow-sm hover:shadow-md"
                      >
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

      <SchemaInjector schemas={safeSchemas} />
    </>
  );
}

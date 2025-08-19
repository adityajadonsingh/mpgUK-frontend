import { getProductDetails, getProductReviews } from "@/lib/api";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/product/ProductDetails";
import { Product, Review } from "@/types";
import ProductReviews from "@/components/product/ProductReviews";
import { Metadata } from "next";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ product: string }>;
}): Promise<Metadata> {
  const { product } = await params;
  const productData = await getProductDetails(product);
  return {
    title: productData.meta_title,
    description: productData.meta_description,
    keywords: productData.meta_keywords || "",
    openGraph: {
      title: productData.og_title || productData.meta_title || "",
      description: productData.og_description || productData.meta_description || "",
      url: productData.canonical_url || "",
      images: productData.meta_image ? [productData.meta_image] : [],
      type: "website",
      locale: "en_US",
      siteName: "MPG Stone",
    },
    twitter: {
      title: productData.twitter_title || productData.meta_title || "",
      description:
        productData.twitter_decriptions || productData.meta_description || "",
      images: productData.meta_image ? [productData.meta_image] : [],
    },
    alternates: {
      canonical: productData.canonical_url || "",
    },
    robots: productData.robots_tag,
  };
}

export default async function ProductDetailPage({ params } : {params : Promise<{product : string}>}) {
  const { product } = await params;

  let productData: Product;
  let reviews: Review[];

  try {
    productData = await getProductDetails(product);
    reviews = await getProductReviews(productData.id);
  } catch (err) {
    console.error(err);
    return notFound();
  }

  if (!productData) return notFound();

  const gallery = [...productData.gallery_images];
  gallery.unshift({
    image: productData.image,
    alt_text: productData.alt_text,
  });

  return (
    <>
    <ProductDetails
      name={productData.name}
      description={productData.descriptions}
      category={productData.category}
      gallery={gallery}
      attributes={productData.attributes}
    />
    <ProductReviews  product_id={productData.id} fetchReviews={reviews}/>
    </>
  );
}

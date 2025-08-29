import {
  getAllProducts,
  getCategoryBySlug,
  getProductDetails,
  getProductReviews,
} from "@/lib/api";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/product/ProductDetails";
import { Category, JSONObject, Product, Review, Schema } from "@/types";
import ProductReviews from "@/components/product/ProductReviews";
import { Metadata } from "next";
import SchemaInjector from "@/components/SchemaInjector";

export async function generateStaticParams() {
  const allProducts: Product[] = await getAllProducts();
  return allProducts.map((product) => ({
    category: product.category.replace(/ /g, "-").toLowerCase(),
    product: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}): Promise<Metadata> {
  const { category, product } = await params;
  const categories = await getCategoryBySlug(category);
  const productData = await getProductDetails(product);

  if (!categories || !productData) return {};

  return {
    title: productData.meta_title,
    description: productData.meta_description,
    keywords: productData.meta_keywords || "",
    openGraph: {
      title: productData.og_title || productData.meta_title || "",
      description:
        productData.og_description || productData.meta_description || "",
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

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{
    category: string;
    product: string;
  }>;
}) {
  const { category, product } = await params;

  let productData: Product;
  let categories: Category[];
  let reviews: Review[];
  try {
    productData = await getProductDetails(product);
    categories = await getCategoryBySlug(category);
    if (!categories || categories.length === 0) {
      return notFound();
    }
    if (!productData) return notFound();
    reviews = await getProductReviews(productData.id);
  } catch (err) {
    console.error(err);
    return notFound();
  }

  console.log(categories, productData);

  const gallery = [...productData.gallery_images];
  gallery.unshift({
    image: productData.image,
    alt_text: productData.alt_text,
  });
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
        name: "Product Category",
        item: "https://mpgstone.co.uk/product-category/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: productData.category,
        item: `https://mpgstone.co.uk/product-category/${productData.category
          .replace(/ /g, "-")
          .toLowerCase()}/`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: productData.name,
        item: `https://mpgstone.co.uk/product-category/${productData.category
          .replace(/ /g, "-")
          .toLowerCase()}/${productData.slug}/`,
      },
    ],
  };
  const reviewsSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: productData.name,
    image: productData.image,
    description: productData.meta_description,
    brand: {
      "@type": "Brand",
      name: "MPG Stone",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "15",
    },
  };

  const normalizeSchema = (schema: Schema | JSONObject): Schema =>
    "schema_json" in schema
      ? (schema as Schema)
      : { id: 0, name: "", schema_json: schema };

  const rawSchemas: (Schema | JSONObject)[] = [
    breadcrumbSchema,
    reviewsSchema,
    ...(Array.isArray(productData.schemas) ? productData.schemas : []),
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
      <ProductDetails
        name={productData.name}
        description={productData.descriptions}
        category={productData.category}
        gallery={gallery}
        attributes={productData.attributes}
      />
      <ProductReviews product_id={productData.id} fetchReviews={reviews} />
      <SchemaInjector schemas={safeSchemas} />
    </>
  );
}

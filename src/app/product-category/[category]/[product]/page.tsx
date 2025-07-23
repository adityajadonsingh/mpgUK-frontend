import { getProductDetails, getProductReviews } from "@/lib/api";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/product/ProductDetails";
import { Product, Review } from "@/types";
import ProductReviews from "@/components/product/ProductReviews";

export default async function ProductDetailPage({ params }) {
  const { product } = params;

  let productData: Product;
  let reviews: Review[];

  try {
    productData = await getProductDetails(product);
    reviews = await getProductReviews(productData.id);
    console.log(productData);
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

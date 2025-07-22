import { getProductDetails } from "@/lib/api";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/product/ProductDetails";

interface Props {
  params: {
    category: string;
    product: string;
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { product } = params;

  let productData;
  try {
    productData = await getProductDetails(product);
    console.log(productData)
  } catch (err) {
    return notFound();
  }

  if (!productData) return notFound();

  const gallery = [...productData.gallery_images];
  gallery.unshift({
    image: productData.image,
    alt_text: productData.alt_text,
  });

  return <ProductDetails name={productData.name} description={productData.descriptions} category={productData.category} gallery={gallery} />;
}

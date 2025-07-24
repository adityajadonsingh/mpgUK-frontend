import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";


export default function AllProductGrid({allProducts}:{allProducts : Product[]}){
    return (<>
        <section className="product-grid my-10">
            <div className="container">
                <div className="grid grid-cols-4 gap-6">
                    {
                        allProducts.map((product, idx)=>{
                            return (
                                <Link key={`${idx}-product`} href={`/product-category/${product.category.replace(/ /g, "-").toLowerCase()}`}>
                                    <div className="card">
                                        <div className="img-box h-[300px] relative">
                                            <Image
                                            src={product.image}
                                            alt={product.alt_text}
                                            fill
                                            className="object-cover"
                                            />
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    </>)
}
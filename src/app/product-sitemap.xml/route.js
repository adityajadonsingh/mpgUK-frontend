import { getAllProducts } from "@/lib/api";

export async function GET() {
  const baseUrl = "https://mpgstone.co.uk";

  const allProducts = await getAllProducts();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/url-sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allProducts
    .map(
      (product) => `
    <url>
      <loc>${baseUrl}/product-category/${product.category.replace(/ /g, "-").toLowerCase()}/${product.slug}/</loc>
      <lastmod>${new Date(product.updated_at.replace(" ", "T")).toISOString()}</lastmod>
      <priority>1.00</priority>
    </url>`
    )
    .join("")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

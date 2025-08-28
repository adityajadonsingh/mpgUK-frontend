// src/app/layout.tsx

import { ReactNode } from "react";

import "@/styles/globals.css";
import "@/styles/responsive.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { SiteDataProvider } from "@/context/SiteDataProvider";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

import { getAllCategorys, getAllProducts, getContactDetails, getSocialMedia } from "@/lib/api";
import { Category, ContactDetails, Product } from "@/types";

import { Montserrat } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Script from "next/script";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: {
    default: "MPG Stone | Premium Stone Products",
  },
  description:
    "MPG Stone — Showcasing premium marble, granite, and stone products for your home and commercial spaces.",
  authors: [{ name: "mpgstone.co.uk"}],
  robots: {
    index: false,
    follow: false,
    nocache: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const products: Product[] = await getAllProducts();
  const categories: Category[] = await getAllCategorys();
  const contactDetails: ContactDetails[] = await getContactDetails();
  const { social_media_links } = await getSocialMedia();
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <Script
          id="tawk-to"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/68afffcbbe8646192a41972b/1j3nnudmm';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </head>
      <body className={montserrat.className}>
        <SiteDataProvider
          categories={categories}
          contactDetails={contactDetails}
        >
          <SmoothScroll />
          <Header products={products} />
          <main>{children}</main>

          <Footer socialMedia={social_media_links} />
        </SiteDataProvider>
      </body>
    </html>
  );
}

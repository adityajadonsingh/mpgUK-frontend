// src/app/layout.tsx

import { ReactNode } from "react";

import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { getAllCategorys, getContactDetails } from "@/lib/api";
import { Category, ContactDetails } from "@/types";

import { SiteDataProvider } from "@/context/SiteDataProvider";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: {
    default: "MPG Stone | Premium Stone Products",
    template: "%s | MPG Stone",
  },
  description:
    "MPG Stone — Showcasing premium marble, granite, and stone products for your home and commercial spaces.",
  authors: [{ name: "MPG Stone", url: "https://mpgstone.co.uk" }],
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  // Optional: Add more SEO fields like open graph, twitter, etc.
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const categories: Category[] = await getAllCategorys();
  const contactDetails: ContactDetails[] = await getContactDetails();
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <SiteDataProvider
          categories={categories}
          contactDetails={contactDetails}
        >
          <Header />
          <main>{children}</main>
          <Footer />
        </SiteDataProvider>
      </body>
    </html>
  );
}

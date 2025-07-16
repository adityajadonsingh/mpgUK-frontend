"use client";

import { ReactNode } from "react";
import { SiteDataContext } from "./SiteDataContext";
import { Category, ContactDetails } from "@/types";

export function SiteDataProvider({
  categories,
  contactDetails,
  children,
}: {
  categories: Category[];
  contactDetails: ContactDetails[];
  children: ReactNode;
}) {
  return (
    <SiteDataContext.Provider value={{ categories, contactDetails }}>
      {children}
    </SiteDataContext.Provider>
  );
}

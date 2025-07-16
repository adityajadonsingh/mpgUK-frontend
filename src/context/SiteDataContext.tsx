"use client";

import { createContext, useContext } from "react";
import { Category, ContactDetails } from "@/types";

interface SiteDataContextProps {
  categories: Category[];
  contactDetails: ContactDetails[];
}

export const SiteDataContext = createContext<SiteDataContextProps | null>(null);

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error("useSiteData must be used inside SiteDataProvider");
  }
  return context;
}

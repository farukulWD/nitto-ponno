"use client";

import { useLanguage } from "@/providers/language-provider";



export default function Page() {
  const { dictionary } = useLanguage();
  return <button>{dictionary.products.cart}</button>;
} 
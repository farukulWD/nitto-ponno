import React from "react";
import type { Locale } from "@/types/language";
import Navbar from "@/components/common/Navbar";
import MainProvider from "@/providers/main-provider";

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  return (
    <MainProvider>
      <Navbar lang={lang} />
      {children}
    </MainProvider>
  );
}

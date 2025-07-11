import React from "react";
import type { Locale } from "@/types/language";
import Navbar from "@/components/common/Navbar";

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  return (
    <>
      <Navbar lang={lang} />
      <main>{children}</main>
    </>
  );
}

import React from "react";
import Navbar from "@/components/ui/Navbar";

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: "en" | "nl" }>;
}) {
  const { lang } = await params;

  return (
    <>
      <Navbar lang={lang} />
      <main>{children}</main>
    </>
  );
}

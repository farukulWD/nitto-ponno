import React from "react";
import Navbar from "@/components/ui/Navbar";

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const { lang } = params;

  return (
    <>
      <Navbar lang={lang} />
      <main>{children}</main>
    </>
  );
}

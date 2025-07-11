import { getDictionary } from "@/dictionaries/dictionaries";
import React from "react";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: "en" | "nl" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <div>{dict.aboutPage.title}</div>;
}

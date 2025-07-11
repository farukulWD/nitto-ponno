import { getDictionary } from "@/dictionaries/dictionaries";
import type { Locale } from "@/types/language";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <button>{dict.products.cart}</button>;
}

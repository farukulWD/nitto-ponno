import { cookies } from "next/headers";
import { getDictionary } from "@/dictionaries/dictionaries";
import { isValidLocale } from "@/types/language";

export default async function AboutPage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("app_language")?.value || "en";
  const locale = isValidLocale(lang) ? lang : "en";
  const dict = await getDictionary(locale);
  return <div>{dict.aboutPage.title}</div>;
} 
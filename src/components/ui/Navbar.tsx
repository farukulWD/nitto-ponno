import React from "react";
import Link from "next/link";
import { LangSwitcher } from "./LangSwitcher";
import { getDictionary } from "@/dictionaries/dictionaries";
import { ThemeSwitch } from "../common/theme-switch";

export default async function Navbar({ lang }: { lang: "en" | "nl" }) {
  const dict = await getDictionary(lang);
  return (
    <nav className="flex items-center justify-between p-4 border-b">
      <div className="flex gap-4">
        <Link href={`/${lang}`}>{dict.navbar.home}</Link>
        <Link href={`/${lang}/about`}>{dict.navbar.about}</Link>
      </div>
      <div className="flex gap-4">
        <ThemeSwitch />
        <LangSwitcher lang={lang} />
      </div>
    </nav>
  );
}

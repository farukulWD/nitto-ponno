import React from "react";
import Link from "next/link";
import LangSwitcher from "./LangSwitcher";

export default function Navbar({ lang }: { lang: string }) {
  return (
    <nav className="flex items-center justify-between p-4 border-b">
      <div className="flex gap-4">
        <Link href={`/${lang}`}>Home</Link>
        {/* Add more nav links here */}
      </div>
      <LangSwitcher lang={lang} />
    </nav>
  );
} 
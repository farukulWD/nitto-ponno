import React from "react";
import Link from "next/link";

const LANGS = [
  { code: "en", label: "English" },
  { code: "nl", label: "Nederlands" },
];

export default function LangSwitcher({ lang }: { lang: string }) {
  return (
    <div>
      {LANGS.map((l) => (
        <Link
          key={l.code}
          href={`/${l.code}`}
          className={
            l.code === lang
              ? "font-bold underline text-primary"
              : "text-muted-foreground hover:underline"
          }
          style={{ marginLeft: 8 }}
        >
          {l.label}
        </Link>
      ))}
    </div>
  );
} 
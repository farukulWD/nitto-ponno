"use client";

import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "motion/react";
import { LANGUAGES, Locale } from "@/types/language";

export function LangSwitcher({ lang }: { lang: Locale }) {
  const [selectedLang, setSelectedLang] = useState(lang);
  const router = useRouter();
  const pathname = usePathname();

  const LANGS = Object.values(LANGUAGES);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            <span>
              {LANGS.find((l) => l.code === selectedLang)?.nativeName}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {LANGS.map((l) => (
            <DropdownMenuItem
              key={l.code}
              onClick={() => {
                setSelectedLang(l.code);
                // Replace the lang in the pathname
                const newPath = pathname.replace(/^\/[a-zA-Z-]+/, `/${l.code}`);
                router.push(newPath);
              }}
              className={selectedLang === l.code ? "font-bold" : ""}
            >
              {l.flag} {l.nativeName}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
}

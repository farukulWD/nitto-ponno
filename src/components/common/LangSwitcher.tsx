"use client";

import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "motion/react";
import { LANGUAGES, Locale } from "@/types/language";
import { useLanguage } from "@/providers/language-provider";

export function LangSwitcher() {
  const { language, setLanguage } = useLanguage();
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
              {LANGS.find((l) => l.code === language)?.nativeName}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {LANGS.map((l) => (
            <DropdownMenuItem
              key={l.code}
              onClick={() => setLanguage(l.code)}
              className={language === l.code ? "font-bold" : ""}
            >
              {l.flag} {l.nativeName}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
}

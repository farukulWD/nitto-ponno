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

export function LangSwitcher({ lang }: { lang: string }) {
  const [selectedLang, setSelectedLang] = useState(lang);
  const router = useRouter();
  const pathname = usePathname();

  const LANGS = [
    { code: "en", label: "English" },
    { code: "nl", label: "Nederlands" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">
              {LANGS.find((l) => l.code === lang)?.label}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {LANGS.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => {
                setSelectedLang(lang.code);
                // Replace the [lang] segment in the current path with the new language code
                const newPath = pathname.replace(/^\/[a-z]{2}(\/|$)/, `/${lang.code}$1`);
                router.push(newPath);
              }}
              className={`cursor-pointer ${
                lang.code === selectedLang ? "bg-blue-50 text-blue-600" : ""
              }`}
            >
              <motion.div
                className="flex items-center justify-between w-full"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.1 }}
              >
                <span>{lang.label}</span>
                {lang.code === selectedLang && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 bg-blue-600 rounded-full"
                  />
                )}
              </motion.div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
}

"use client";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getDictionary } from "@/dictionaries/dictionaries";
import type { Locale, Dictionary } from "@/types/language";
import { LANGUAGES } from "@/types/language";

interface LanguageContextProps {
  language: Locale;
  setLanguage: (lang: Locale) => void;
  dictionary: Dictionary;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

const DEFAULT_LANGUAGE: Locale = "en";
const LOCAL_STORAGE_KEY = "app_language";

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Locale>(DEFAULT_LANGUAGE);
  const [dictionary, setDictionary] = useState<Dictionary | null>(null);

  // Load language from localStorage on mount
  useEffect(() => {
    const storedLang = localStorage.getItem(LOCAL_STORAGE_KEY) as Locale | null;
    if (storedLang && LANGUAGES[storedLang]) {
      setLanguageState(storedLang);
    }
  }, []);

  // Load dictionary when language changes
  useEffect(() => {
    getDictionary(language).then(setDictionary);
  }, [language]);

  const setLanguage = useCallback((lang: Locale) => {
    setLanguageState(lang);
    localStorage.setItem(LOCAL_STORAGE_KEY, lang);
    // Set cookie for SSR support
    document.cookie = `app_language=${lang}; path=/; max-age=31536000`;
  }, []);

  if (!dictionary) return null; // or a loading spinner

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dictionary }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}; 
// Language type definitions for the application
// This file defines the structure of all language dictionaries

// Supported locales - add new ones here
export type Locale = 'en' | 'nl' | 'bn';

// Extended locale format for middleware (with region codes)
export type ExtendedLocale = 'en-US' | 'nl-NL' | 'nl' | 'bn-BD';

// Language configuration
export interface LanguageConfig {
  code: Locale;
  extendedCode: ExtendedLocale;
  name: string;
  nativeName: string;
  flag?: string; // emoji flag or icon path
}

// Dictionary structure - add new sections here
export interface Dictionary {
  products: {
    cart: string;
  };
  aboutPage: {
    title: string;
    description: string;
    content: string;
  };
  common: {
    themeSwitch: string;
    light: string;
    dark: string;
    system: string;
  };
  navbar: {
    home: string;
    about: string;
  };
}

// Type for the dictionaries object
export type Dictionaries = {
  [K in Locale]: () => Promise<Dictionary>;
};

// Helper type for getting dictionary keys
export type DictionaryKey = keyof Dictionary;
export type NestedDictionaryKey<T extends DictionaryKey> = keyof Dictionary[T];
export type DeepDictionaryKey<T extends DictionaryKey, U extends NestedDictionaryKey<T>> = keyof Dictionary[T][U];

// Utility type for creating new locales
export type AddLocale<T extends string> = Locale | T;

// Language configuration object
export const LANGUAGES: Record<Locale, LanguageConfig> = {
  en: {
    code: 'en',
    extendedCode: 'en-US',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸'
  },
  nl: {
    code: 'nl',
    extendedCode: 'nl-NL',
    name: 'Dutch',
    nativeName: 'Nederlands',
    flag: '🇳🇱'
  },
  bn: {
    code: 'bn',
    extendedCode: 'bn-BD',
    name: 'Bengali',
    nativeName: 'বাংলা',
    flag: '🇧🇩'
  }
} as const;

// Utility functions for language management
export const getLanguageConfig = (locale: Locale): LanguageConfig => {
  return LANGUAGES[locale];
};

export const getAllLanguages = (): LanguageConfig[] => {
  return Object.values(LANGUAGES);
};

export const getSupportedLocales = (): Locale[] => {
  return Object.keys(LANGUAGES) as Locale[];
};

export const getExtendedLocales = (): ExtendedLocale[] => {
  return Object.values(LANGUAGES).map(lang => lang.extendedCode);
};

export const isValidLocale = (locale: string): locale is Locale => {
  return locale in LANGUAGES;
};

// Example of how to extend for new languages:
// 1. Add new locale to Locale type: export type Locale = 'en' | 'nl' | 'de';
// 2. Add new extended locale: export type ExtendedLocale = 'en-US' | 'nl-NL' | 'nl' | 'de-DE';
// 3. Add language config to LANGUAGES object
// 4. Create new dictionary file (e.g., de.json)
// 5. Update dictionaries.ts to include the new language 
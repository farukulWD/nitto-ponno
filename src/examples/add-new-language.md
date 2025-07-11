# How to Add a New Language

This guide shows you how to add a new language to your application using the centralized language type system.

## Step 1: Update Language Types

Edit `src/types/language.ts`:

```typescript
// Add new locale to the Locale type
export type Locale = 'en' | 'nl' | 'de'; // Add 'de' for German

// Add new extended locale for middleware
export type ExtendedLocale = 'en-US' | 'nl-NL' | 'nl' | 'de-DE'; // Add 'de-DE'

// Add language configuration to LANGUAGES object
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
  de: { // Add this new configuration
    code: 'de',
    extendedCode: 'de-DE',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪'
  }
} as const;
```

## Step 2: Create Dictionary File

Create `src/dictionaries/de.json`:

```json
{
  "products": {
    "cart": "Zum Warenkorb hinzufügen"
  },
  "aboutPage": {
    "title": "Über uns",
    "description": "Über das Unternehmen",
    "content": "Über das Unternehmen"
  },
  "common": {
    "themeSwitch": "Thema wechseln",
    "light": "Hell",
    "dark": "Dunkel",
    "system": "System"
  },
  "navbar": {
    "home": "Startseite",
    "about": "Über uns"
  }
}
```

## Step 3: Update Dictionaries

Edit `src/dictionaries/dictionaries.ts`:

```typescript
import "server-only";
import type { Locale, Dictionary, Dictionaries } from "../types/language";

const dictionaries: Dictionaries = {
  en: () => import("./en.json").then((module) => module.default),
  nl: () => import("./nl.json").then((module) => module.default),
  de: () => import("./de.json").then((module) => module.default), // Add this line
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();

export type { Locale, Dictionary } from "../types/language";
```

## Step 4: Update Layout Types (if needed)

If you're using the layout with params, update `src/app/[lang]/layout.tsx`:

```typescript
export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: "en" | "nl" | "de" }>; // Add "de"
}) {
  const { lang } = await params;
  // ... rest of the component
}
```

## Step 5: Test Your New Language

1. The middleware will automatically handle the new locale
2. TypeScript will provide full type safety
3. All existing components will work with the new language

## Benefits of This System

- **Type Safety**: TypeScript will catch missing translations
- **Centralized Management**: All language config is in one place
- **Easy Extension**: Adding new languages follows a clear pattern
- **Automatic Updates**: Middleware and routing work automatically
- **Consistent Structure**: All dictionaries follow the same structure

## Adding New Dictionary Sections

To add new sections to all languages, update the `Dictionary` interface in `src/types/language.ts`:

```typescript
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
  // Add new section here
  footer: {
    copyright: string;
    privacy: string;
    terms: string;
  };
}
```

Then add the corresponding translations to all your dictionary files (`en.json`, `nl.json`, `de.json`, etc.). 
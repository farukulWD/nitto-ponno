import "server-only";
import type { Locale, Dictionary, Dictionaries } from "../types/language";

const dictionaries: Dictionaries = {
  en: () => import("./en.json").then((module) => module.default),
  nl: () => import("./nl.json").then((module) => module.default),
  bn: () => import("./bn.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();

// Export the Locale type for use in other files
export type { Locale, Dictionary } from "../types/language";

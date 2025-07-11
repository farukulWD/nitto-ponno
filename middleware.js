import { NextResponse } from "next/server";
import { getExtendedLocales, getLanguageConfig, isValidLocale } from "./src/types/language";

// Get supported locales from our language configuration
const locales = getExtendedLocales();

// Get the preferred locale, similar to the above or using a library
function getLocale(request) {
  // Example: get locale from headers or default to 'en-US'
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const preferred = locales.find((locale) => acceptLanguage.includes(locale));
    if (preferred) return preferred;
  }
  return "en-US";
}

export function middleware(request) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  console.log({ locale });
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};

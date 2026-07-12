import { useEffect } from "react";

interface SEOOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  robots?: string;
  siteName?: string;
  locale?: string;
  twitterSite?: string;
}

export const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://smart-calculators-nine.vercel.app").replace(/\/$/, "");
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useSEO({ title, description, path = "/", image = DEFAULT_IMAGE, type = "website", jsonLd, robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1", siteName = "UtilityHub India", locale = "en_IN", twitterSite }: SEOOptions) {
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const url = `${SITE_URL}${normalizedPath}`;
    document.title = title;

    setMeta("name", "description", description);
    setMeta("name", "robots", robots);
    setMeta("name", "author", siteName);
    setMeta("name", "theme-color", "#4f46e5");
    setLink("canonical", url);

    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", image);
    setMeta("property", "og:image:alt", title);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:type", type);
    setMeta("property", "og:site_name", siteName);
    setMeta("property", "og:locale", locale);

    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:url", url);
    setMeta("name", "twitter:image", image);
    setMeta("name", "twitter:image:alt", title);
    setMeta("name", "twitter:card", "summary_large_image");
    if (twitterSite) {
      setMeta("name", "twitter:site", twitterSite);
    }

    const existing = document.getElementById("route-jsonld");
    if (existing) existing.remove();

    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "route-jsonld";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    // Use smooth scroll to top with fallback for browsers not supporting instant
    // instant is not standard ScrollBehavior; use auto for immediate
    try {
      window.scrollTo({ top: 0, behavior: "auto" });
    } catch {
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, image, type, jsonLdKey, robots, siteName, locale, twitterSite]);
}

import { useEffect } from "react";
import { Link } from "react-router-dom";

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface Props {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = "" }: Props) {
  // Inject JSON-LD via effect with cleanup to avoid duplicate script tags on SPA navigation
  useEffect(() => {
    const id = "breadcrumb-jsonld";
    const existing = document.getElementById(id);
    if (existing) existing.remove();

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        ...(item.to ? { item: `https://gstcalculator-india.example.com${item.to}` } : {}),
      })),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, [items]);

  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5 text-slate-400 dark:text-slate-500">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="flex items-center gap-1.5">
              {idx > 0 && (
                <span className="text-slate-300 dark:text-slate-600" aria-hidden="true">
                  /
                </span>
              )}
              {item.to && !isLast ? (
                <Link to={item.to} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "text-slate-600 dark:text-slate-300 font-medium" : ""} aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

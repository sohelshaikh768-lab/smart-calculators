import type { ReactNode } from "react";
import { useSEO } from "../hooks/useSEO";

export default function LegalPage({
  title,
  description,
  path,
  updated,
  children,
}: {
  title: string;
  description: string;
  path: string;
  updated: string;
  children: ReactNode;
}) {
  useSEO({ title: `${title} | UtilityHub India`, description, path });

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">{title}</h1>
      <p className="mt-2 text-sm text-slate-400">Last updated: {updated}</p>
      <div className="prose-legal mt-6 space-y-4 leading-relaxed text-slate-600 dark:text-slate-400">{children}</div>
    </div>
  );
}

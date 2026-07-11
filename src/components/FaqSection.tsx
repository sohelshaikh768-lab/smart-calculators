import { useEffect, useState, useId } from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  faqs: FaqItem[];
  title?: string;
}

export default function FaqSection({ faqs, title = "Frequently Asked Questions" }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reactId = useId();

  // Inject FAQ JSON-LD with unique id per mount to avoid duplicates across SPA navigations
  useEffect(() => {
    const id = `faq-jsonld-${reactId.replace(/:/g, "")}`;
    const existing = document.getElementById(id);
    if (existing) existing.remove();

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, [faqs, reactId]);

  return (
    <section className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900/50">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
      <div className="mt-6 divide-y divide-slate-200 dark:divide-slate-800 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          const buttonId = `${reactId}-faq-btn-${idx}`;
          const panelId = `${reactId}-faq-panel-${idx}`;
          return (
            <div key={idx}>
              <button
                type="button"
                id={buttonId}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span className="text-sm sm:text-[15px]">{faq.question}</span>
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs transition ${
                    isOpen ? "bg-indigo-600 border-indigo-600 text-white rotate-45" : "border-slate-300 dark:border-slate-600"
                  }`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              {isOpen && (
                <div id={panelId} role="region" aria-labelledby={buttonId} className="px-5 pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400 animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

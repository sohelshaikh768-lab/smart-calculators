import { useMemo, useState } from "react";
import { percentageOf, whatPercent, percentageChange, formatINR } from "../utils/calculators";
import ResultStat from "../components/ResultStat";
import CopyButton from "../components/CopyButton";
import AdSlot from "../components/AdSlot";
import Breadcrumbs from "../components/Breadcrumbs";
import FaqSection, { type FaqItem } from "../components/FaqSection";
import RelatedTools from "../components/RelatedTools";
import { useSEO } from "../hooks/useSEO";

const PERCENT_FAQS: FaqItem[] = [
  { question: "How to calculate X% of Y?", answer: "Formula: (X/100)*Y. Example: 18% of 1000 = (18/100)*1000 = 180." },
  { question: "How to find what percent X is of Y?", answer: "Formula: (X/Y)*100. Example: 180 is what % of 1000? (180/1000)*100 = 18%." },
  { question: "How to calculate percentage increase?", answer: "Increase % = ((New - Old)/Old)*100. Example: from 500 to 750 = ((750-500)/500)*100 = 50% increase." },
  { question: "Difference between percentage and percentage points?", answer: "Percentage points is absolute difference between percentages. Example: from 10% to 15% is +5 percentage points, but +50% increase in percentage terms." },
];

type Mode = "of" | "what-percent" | "change";

export default function PercentageCalculator() {
  useSEO({
    title: "Free Percentage Calculator India — Find % of Any Number",
    description:
      "Calculate percentages quickly for discounts, marks, growth, increase/decrease and ratio-based tasks with our free percentage calculator.",
    path: "/percentage-calculator",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Percentage Calculator",
      applicationCategory: "FinanceApplication",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    },
  });

  const [mode, setMode] = useState<Mode>("of");
  const [a, setA] = useState("18");
  const [b, setB] = useState("1000");

  const numA = parseFloat(a) || 0;
  const numB = parseFloat(b) || 0;

  const result = useMemo(() => {
    if (mode === "of") return percentageOf(numA, numB);
    if (mode === "what-percent") return whatPercent(numA, numB);
    return percentageChange(numA, numB);
  }, [mode, numA, numB]);

  function reset() {
    setA("18");
    setB("1000");
  }

  const labelA = mode === "of" ? "Percentage (%)" : mode === "what-percent" ? "Value (X)" : "From Value";
  const labelB = mode === "of" ? "Of Value" : mode === "what-percent" ? "Total (Y)" : "To Value";
  const resultLabel = mode === "of" ? "Result" : mode === "what-percent" ? "Percentage" : "Change";
  const resultValue = mode === "of" ? formatINR(result) : `${result}%`;

  const copyText = `Percentage Calculation\nMode: ${mode}\n${labelA}: ${a}\n${labelB}: ${b}\nResult: ${resultValue}`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Percentage Calculator" }]} className="mb-6" />
      <header className="animate-fade-in-up text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Percentage <span className="text-indigo-600 dark:text-indigo-400">Calculator</span>
        </h1>
        <p className="mt-3 text-slate-500 dark:text-slate-400">Quickly calculate percentages, ratios and percentage change.</p>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-2 rounded-2xl bg-slate-100 p-1.5 sm:grid-cols-3 dark:bg-slate-800/60" role="tablist">
        {[
          { key: "of" as Mode, label: "X% of Y" },
          { key: "what-percent" as Mode, label: "X is what % of Y" },
          { key: "change" as Mode, label: "% Increase/Decrease" },
        ].map((m) => (
          <button
            key={m.key}
            type="button"
            role="tab"
            aria-selected={mode === m.key}
            onClick={() => setMode(m.key)}
            className={`rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
              mode === m.key
                ? "bg-white text-indigo-700 shadow-md dark:bg-slate-900 dark:text-indigo-300"
                : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="mt-6 animate-fade-in-up rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label={labelA} value={a} onChange={setA} id="perc-a" />
          <Field label={labelB} value={b} onChange={setB} id="perc-b" />
        </div>

        <div className="mt-8">
          <ResultStat label={resultLabel} value={resultValue} highlight />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-6 dark:border-slate-800">
          <CopyButton text={copyText} />
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 active:scale-95 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="mt-10">
        <AdSlot />
      </div>

      <FaqSection faqs={PERCENT_FAQS} />
      <RelatedTools />
    </div>
  );
}

function Field({ label, value, onChange, id }: { label: string; value: string; onChange: (v: string) => void; id: string }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-300 bg-white py-3 px-4 text-lg font-semibold text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      />
    </div>
  );
}

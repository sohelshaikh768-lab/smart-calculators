import { useMemo, useState } from "react";
import { reversePercentageAfterIncrease, reversePercentageBase, formatINR } from "../utils/calculators";
import Breadcrumbs from "../components/Breadcrumbs";
import FaqSection, { type FaqItem } from "../components/FaqSection";
import RelatedTools from "../components/RelatedTools";
import AdSlot from "../components/AdSlot";
import ResultStat from "../components/ResultStat";
import CopyButton from "../components/CopyButton";
import { useSEO } from "../hooks/useSEO";

type Mode = "after-increase" | "is-percent-of";

const FAQS: FaqItem[] = [
  { question: "What is reverse percentage?", answer: "Reverse percentage helps you find the original value before a percentage increase or what the 100% base value is when you know a part and its percentage." },
  { question: "How to reverse calculate percentage increase?", answer: "If final value = original + P%, original = final / (1 + P/100). Example: 110 after 10% increase → original = 110/1.10 = 100." },
  { question: "Difference between percentage and reverse percentage?", answer: "Percentage calculates X% of Y. Reverse percentage works backward to find Y when you know X and its % relation." },
  { question: "Use case for shopkeepers?", answer: "Shopkeepers use reverse percentage to find cost price before GST or discount, and to calculate markup from selling price." },
  { question: "Can I use this for GST reverse calc?", answer: "Yes! Our GST reverse mode does similar math. For GST inclusive pricing, use our dedicated GST calculator's Reverse GST tab for CGST/SGST split." },
];

export default function ReversePercentageCalculator() {
  useSEO({
    title: "Free Reverse Percentage Calculator India — Find Original Value",
    description: "Work backward from a known percentage to find the original value, base amount or total with our free reverse percentage calculator.",
    path: "/reverse-percentage-calculator",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Reverse Percentage Calculator",
      applicationCategory: "FinanceApplication",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    },
  });

  const [mode, setMode] = useState<Mode>("after-increase");
  const [value, setValue] = useState("1100");
  const [percent, setPercent] = useState("10");

  const numVal = parseFloat(value) || 0;
  const numPer = parseFloat(percent) || 0;

  const result = useMemo(() => {
    if (mode === "after-increase") return reversePercentageAfterIncrease(numVal, numPer);
    return reversePercentageBase(numVal, numPer);
  }, [mode, numVal, numPer]);

  const copyText =
    mode === "after-increase"
      ? `Reverse % (After Increase)\nFinal: ${formatINR(numVal)} after ${numPer}% increase\nOriginal: ${formatINR(result.original)}\nDifference: ${formatINR(result.difference)}`
      : `Reverse % (Is P% Of)\n${formatINR(numVal)} is ${numPer}% of Original\nOriginal (100%): ${formatINR(result.original)}`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Reverse Percentage Calculator" }]} className="mb-6" />
      <header className="animate-fade-in-up text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Reverse <span className="text-indigo-600 dark:text-indigo-400">Percentage</span> Calculator
        </h1>
        <p className="mt-3 text-slate-500 dark:text-slate-400">Find original value before percentage changes.</p>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-2 rounded-2xl bg-slate-100 p-1.5 sm:grid-cols-2 dark:bg-slate-800/60" role="tablist">
        {[
          { key: "after-increase" as Mode, label: "Value After % Increase" },
          { key: "is-percent-of" as Mode, label: "Value is % Of Total" },
        ].map((m) => (
          <button
            key={m.key}
            type="button"
            role="tab"
            aria-selected={mode === m.key}
            onClick={() => setMode(m.key)}
            className={`rounded-xl px-4 py-3 text-sm font-semibold transition-all ${mode === m.key ? "bg-white text-indigo-700 shadow-md dark:bg-slate-900 dark:text-indigo-300" : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"}`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="mt-6 animate-fade-in-up rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="rev-value" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              {mode === "after-increase" ? "Final Value (after increase)" : "Partial Value"}
            </label>
            <input id="rev-value" type="number" inputMode="decimal" value={value} onChange={(e) => setValue(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white py-3 px-4 text-lg font-semibold text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
          </div>
          <div>
            <label htmlFor="rev-percent" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Percentage (%)</label>
            <input id="rev-percent" type="number" inputMode="decimal" value={percent} onChange={(e) => setPercent(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white py-3 px-4 text-lg font-semibold text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <ResultStat label={mode === "after-increase" ? "Original Value" : "Total (100%) Value"} value={formatINR(result.original)} highlight />
          <ResultStat label="Difference" value={formatINR(result.difference)} />
        </div>

        <div className="mt-6 rounded-xl bg-indigo-50 p-4 text-sm text-indigo-800 dark:bg-indigo-500/10 dark:text-indigo-200">
          {mode === "after-increase"
            ? `Formula: Original = ${formatINR(numVal)} ÷ (1 + ${numPer}/100) = ${formatINR(result.original)}`
            : `Formula: Total = ${formatINR(numVal)} × 100 ÷ ${numPer} = ${formatINR(result.original)}`}
        </div>

        <div className="mt-6 flex justify-between border-t border-slate-100 pt-6 dark:border-slate-800">
          <CopyButton text={copyText} />
          <button type="button" onClick={() => { setValue("1100"); setPercent("10"); }} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">Reset</button>
        </div>
      </div>

      <AdSlot className="mt-8" />
      <FaqSection faqs={FAQS} />
      <RelatedTools />
    </div>
  );
}

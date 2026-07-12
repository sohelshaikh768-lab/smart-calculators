import { useMemo, useState } from "react";
import { calculateProfitMargin, formatINR } from "../utils/calculators";
import ResultStat from "../components/ResultStat";
import CopyButton from "../components/CopyButton";
import AdSlot from "../components/AdSlot";
import Breadcrumbs from "../components/Breadcrumbs";
import FaqSection, { type FaqItem } from "../components/FaqSection";
import RelatedTools from "../components/RelatedTools";
import { useSEO } from "../hooks/useSEO";

const MARGIN_FAQS: FaqItem[] = [
  { question: "How to calculate profit margin?", answer: "Profit = Selling - Cost. Profit % on cost = (Profit/Cost)*100. Margin % on sale = (Profit/Selling)*100." },
  { question: "Difference between markup and margin?", answer: "Markup % is profit on cost: (Profit/Cost)*100. Margin % is profit on selling price: (Profit/Selling)*100." },
  { question: "What is good profit margin for small business India?", answer: "Varies by industry: retail 10-30%, food 20-40%, services 30-60%. Use this calculator to test pricing scenarios with GST." },
  { question: "Can profit be negative?", answer: "Yes, if selling price is less than cost price, you have loss. Our calculator shows negative profit %." },
];

export default function ProfitMarginCalculator() {
  useSEO({
    title: "Free Profit Margin Calculator India — Profit % & Margin",
    description:
      "Calculate profit, profit margin and markup instantly from cost price and selling price using our free margin calculator.",
    path: "/profit-margin-calculator",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Profit Margin Calculator",
      applicationCategory: "FinanceApplication",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    },
  });

  const [cost, setCost] = useState("500");
  const [selling, setSelling] = useState("750");

  const numCost = parseFloat(cost) || 0;
  const numSelling = parseFloat(selling) || 0;

  const result = useMemo(() => calculateProfitMargin(numCost, numSelling), [numCost, numSelling]);

  function reset() {
    setCost("500");
    setSelling("750");
  }

  const copyText = `Profit Margin Calculation\nCost Price: ${formatINR(numCost)}\nSelling Price: ${formatINR(
    numSelling
  )}\nProfit: ${formatINR(result.profit)}\nProfit % (on cost): ${result.profitPercentOnCost}%\nMargin % (on sale): ${result.marginPercentOnSale}%`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Profit Margin Calculator" }]} className="mb-6" />
      <header className="animate-fade-in-up text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Profit Margin <span className="text-indigo-600 dark:text-indigo-400">Calculator</span>
        </h1>
        <p className="mt-3 text-slate-500 dark:text-slate-400">Find your profit, markup and margin percentages instantly.</p>
      </header>

      <div className="mt-8 animate-fade-in-up rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="margin-cost" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Cost Price (₹)</label>
            <input
              id="margin-cost"
              type="number"
              min="0"
              inputMode="decimal"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white py-3 px-4 text-lg font-semibold text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="margin-selling" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Selling Price (₹)</label>
            <input
              id="margin-selling"
              type="number"
              min="0"
              inputMode="decimal"
              value={selling}
              onChange={(e) => setSelling(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white py-3 px-4 text-lg font-semibold text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <ResultStat label="Profit" value={formatINR(result.profit)} highlight />
          <ResultStat label="Profit % (on cost)" value={`${result.profitPercentOnCost}%`} />
          <ResultStat label="Margin % (on sale)" value={`${result.marginPercentOnSale}%`} />
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

      <FaqSection faqs={MARGIN_FAQS} />
      <RelatedTools />
    </div>
  );
}

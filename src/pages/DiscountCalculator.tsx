import { useMemo, useState } from "react";
import { calculateDiscount, formatINR } from "../utils/calculators";
import ResultStat from "../components/ResultStat";
import CopyButton from "../components/CopyButton";
import AdSlot from "../components/AdSlot";
import Breadcrumbs from "../components/Breadcrumbs";
import FaqSection, { type FaqItem } from "../components/FaqSection";
import RelatedTools from "../components/RelatedTools";
import { useSEO } from "../hooks/useSEO";

const DISCOUNT_FAQS: FaqItem[] = [
  { question: "How to calculate discount?", answer: "Discount Amount = (Original Price × Discount %)/100. Final Price = Original - Discount Amount." },
  { question: "How to find original price after discount?", answer: "If you know sale price and discount %, Original = Sale Price / (1 - Discount%/100). Example: ₹800 after 20% off → Original = 800/0.8 = ₹1000." },
  { question: "Difference between discount and profit margin?", answer: "Discount reduces selling price for customer. Profit margin is profit as % of cost or selling price for business." },
  { question: "Can discount be more than 100%?", answer: "No, discount in retail is 0-100%. Above 100% would mean negative price. Our calculator clamps final price at minimum ₹0." },
];

export default function DiscountCalculator() {
  useSEO({
    title: "Free Discount Calculator India — Find Sale Price & Savings",
    description:
      "Calculate discount percentage, final sale price and savings instantly with our free discount calculator for India.",
    path: "/discount-calculator",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Discount Calculator",
      applicationCategory: "FinanceApplication",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    },
  });

  const [price, setPrice] = useState("2000");
  const [discount, setDiscount] = useState("20");

  const numPrice = parseFloat(price) || 0;
  const numDiscount = parseFloat(discount) || 0;

  const result = useMemo(() => calculateDiscount(numPrice, numDiscount), [numPrice, numDiscount]);

  function reset() {
    setPrice("2000");
    setDiscount("20");
  }

  const copyText = `Discount Calculation\nOriginal Price: ${formatINR(numPrice)}\nDiscount: ${numDiscount}%\nYou Save: ${formatINR(
    result.youSave
  )}\nFinal Price: ${formatINR(result.finalPrice)}`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Discount Calculator" }]} className="mb-6" />
      <header className="animate-fade-in-up text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Discount <span className="text-indigo-600 dark:text-indigo-400">Calculator</span>
        </h1>
        <p className="mt-3 text-slate-500 dark:text-slate-400">Calculate sale prices and savings amounts in a click.</p>
      </header>

      <div className="mt-8 animate-fade-in-up rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="discount-price" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Original Price (₹)</label>
            <input
              id="discount-price"
              type="number"
              min="0"
              inputMode="decimal"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white py-3 px-4 text-lg font-semibold text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="discount-percent" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Discount (%)</label>
            <input
              id="discount-percent"
              type="number"
              min="0"
              max="100"
              inputMode="decimal"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white py-3 px-4 text-lg font-semibold text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Quick discount percentages">
          {[10, 20, 25, 30, 40, 50].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDiscount(String(d))}
              aria-pressed={Number(discount) === d}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                Number(discount) === d
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              {d}%
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <ResultStat label="You Save" value={formatINR(result.youSave)} />
          <ResultStat label="Final Price" value={formatINR(result.finalPrice)} highlight />
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

      <FaqSection faqs={DISCOUNT_FAQS} />
      <RelatedTools />
    </div>
  );
}

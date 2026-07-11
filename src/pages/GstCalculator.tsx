import { useMemo, useState } from "react";
import { GST_RATES, calculateGstExclusive, calculateGstInclusive, calculateReverseGst, formatINR } from "../utils/calculators";
import ResultStat from "../components/ResultStat";
import CopyButton from "../components/CopyButton";
import AdSlot from "../components/AdSlot";
import Breadcrumbs from "../components/Breadcrumbs";
import FaqSection, { type FaqItem } from "../components/FaqSection";
import RelatedTools from "../components/RelatedTools";
import { useSEO } from "../hooks/useSEO";

const GST_FAQS: FaqItem[] = [
  { question: "How to calculate GST exclusive?", answer: "GST Amount = (Original Amount × GST Rate)/100. Total = Original + GST Amount. Example: ₹1000 at 18% → GST ₹180, Total ₹1180." },
  { question: "How to calculate GST inclusive?", answer: "Original Amount = (Total Amount × 100)/(100+Rate). GST = Total - Original. Example: ₹1180 inclusive 18% → Original ₹1000, GST ₹180." },
  { question: "What is CGST, SGST, IGST?", answer: "Intra-state supply: CGST + SGST split equally (e.g., 9%+9% for 18%). Inter-state: IGST is full rate charged by Centre." },
  { question: "Which GST rate should I use?", answer: "Depends on goods/services category: 0% essentials, 5% mass items, 12% standard, 18% most goods/services, 28% luxury/sin. Check GST portal for HSN-wise rates." },
  { question: "Can I use this for invoices?", answer: "Yes, use Exclusive mode for B2B invoices with GST shown separately. For MRP labels, use Inclusive mode to back-calculate taxable value." },
];

type Mode = "exclusive" | "inclusive" | "reverse";

const MODES: { key: Mode; label: string; hint: string }[] = [
  { key: "exclusive", label: "GST Exclusive", hint: "Add GST to a base amount" },
  { key: "inclusive", label: "GST Inclusive", hint: "Extract GST from a total" },
  { key: "reverse", label: "Reverse GST", hint: "Find base price from final bill" },
];

export default function GstCalculator() {
  useSEO({
    title: "GST Calculator India — Inclusive, Exclusive & Reverse GST | Free Tool",
    description:
      "Free online GST calculator for India. Instantly calculate GST exclusive, inclusive & reverse GST for 0%, 3%, 5%, 12%, 18% & 28% slabs with CGST/SGST breakdown.",
    path: "/gst-calculator",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "GST Calculator India",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    },
  });

  const [mode, setMode] = useState<Mode>("exclusive");
  const [amount, setAmount] = useState("1000");
  const [rate, setRate] = useState(18);

  const numericAmount = parseFloat(amount) || 0;

  const result = useMemo(() => {
    if (mode === "exclusive") return calculateGstExclusive(numericAmount, rate);
    if (mode === "inclusive") return calculateGstInclusive(numericAmount, rate);
    return calculateReverseGst(numericAmount, rate);
  }, [mode, numericAmount, rate]);

  function handleReset() {
    setAmount("1000");
    setRate(18);
  }

  const copyText = `GST Calculation (${MODES.find((m) => m.key === mode)?.label})\nAmount Entered: ${formatINR(
    numericAmount
  )}\nGST Rate: ${rate}%\nOriginal Amount: ${formatINR(result.originalAmount)}\nCGST: ${formatINR(result.cgst)}\nSGST: ${formatINR(
    result.sgst
  )}\nTotal GST: ${formatINR(result.gstAmount)}\nTotal Amount: ${formatINR(result.totalAmount)}`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "GST Calculator" }]} className="mb-6" />
      <header className="animate-fade-in-up text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          GST Calculator <span className="text-indigo-600 dark:text-indigo-400">India</span>
        </h1>
        <p className="mt-3 text-slate-500 dark:text-slate-400">
          Calculate GST inclusive, exclusive and reverse GST instantly for all official Indian tax slabs.
        </p>
      </header>

      {/* Mode Tabs */}
      <div className="mt-8 grid grid-cols-1 gap-2 rounded-2xl bg-slate-100 p-1.5 sm:grid-cols-3 dark:bg-slate-800/60" role="tablist">
        {MODES.map((m) => (
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
            <span className="mt-0.5 block text-[11px] font-normal opacity-70">{m.hint}</span>
          </button>
        ))}
      </div>

      {/* Calculator Card */}
      <div className="mt-6 animate-fade-in-up rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="amount" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              {mode === "exclusive" ? "Amount (before GST)" : mode === "inclusive" ? "Amount (including GST)" : "Final Bill Amount"}
            </label>
            <div className="relative mt-2">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">₹</span>
              <input
                id="amount"
                type="number"
                inputMode="decimal"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-8 pr-4 text-lg font-semibold text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                placeholder="Enter amount"
              />
            </div>
          </div>

          <div>
            <label htmlFor="rate" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              GST Rate
            </label>
            <select
              id="rate"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white py-3 px-4 text-lg font-semibold text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              {GST_RATES.map((r) => (
                <option key={r} value={r}>
                  {r}% GST
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Rate quick-select chips */}
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="GST rates">
          {GST_RATES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRate(r)}
              aria-pressed={rate === r}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                rate === r
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              {r}%
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <ResultStat label="Original Amount" value={formatINR(result.originalAmount)} />
          <ResultStat label="GST Amount" value={formatINR(result.gstAmount)} />
          <ResultStat label="Total Amount" value={formatINR(result.totalAmount)} highlight />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <ResultStat label={`CGST (${rate / 2}%)`} value={formatINR(result.cgst)} />
          <ResultStat label={`SGST (${rate / 2}%)`} value={formatINR(result.sgst)} />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-6 dark:border-slate-800">
          <CopyButton text={copyText} />
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 active:scale-95 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
          </button>
        </div>
      </div>

      <div className="mt-10">
        <AdSlot />
      </div>

      {/* Explainer / SEO content */}
      <section className="mt-10 space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900/50">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">How the GST Calculator Works</h2>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          <strong>GST Exclusive</strong> mode adds GST on top of the amount you enter — ideal when you have a base price and want the final billing amount.
          <strong> GST Inclusive</strong> mode does the reverse — it extracts the tax component from a price that already includes GST.
          <strong> Reverse GST</strong> uses the same math as inclusive mode, framed for when you only have a final bill and need to know the taxable value for accounting or ITC purposes.
        </p>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          All calculations also show the CGST and SGST split (each exactly half of the total GST) which applies to intra-state transactions. For inter-state transactions, the full GST amount is charged as IGST.
        </p>
      </section>

      <FaqSection faqs={GST_FAQS} />
      <RelatedTools />
    </div>
  );
}

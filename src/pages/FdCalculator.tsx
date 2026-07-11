import { useMemo, useState } from "react";
import { calculateFD, formatINR } from "../utils/calculators";
import Breadcrumbs from "../components/Breadcrumbs";
import FaqSection, { type FaqItem } from "../components/FaqSection";
import RelatedTools from "../components/RelatedTools";
import AdSlot from "../components/AdSlot";
import ResultStat from "../components/ResultStat";
import CopyButton from "../components/CopyButton";
import { useSEO } from "../hooks/useSEO";

const FAQS: FaqItem[] = [
  { question: "What is FD?", answer: "Fixed Deposit (FD) is a safe investment where you deposit money for a fixed tenure at a guaranteed interest rate offered by banks." },
  { question: "How is FD interest calculated?", answer: "Maturity = P x (1 + r/n)^(n*t), where P principal, r annual rate, n compounding frequency per year (usually 4 for quarterly), t years." },
  { question: "What is quarterly compounding?", answer: "Most Indian banks compound FD interest quarterly — interest earned each quarter is added to principal for next quarter, increasing effective yield." },
  { question: "Is FD return taxable?", answer: "Yes, FD interest is taxable as per your income slab. TDS is deducted if interest exceeds Rs. 40,000 (Rs. 50,000 for senior citizens) per year per bank." },
  { question: "Which is better SIP or FD?", answer: "FD is safe with guaranteed returns (6-8%). SIP has market risk but historically higher long-term returns (10-14%). Choose based on risk appetite." },
];

const COMPOUND_OPTIONS = [
  { value: 1, label: "Yearly" },
  { value: 2, label: "Half-Yearly" },
  { value: 4, label: "Quarterly" },
  { value: 12, label: "Monthly" },
];

export default function FdCalculator() {
  useSEO({
    title: "FD Calculator - Fixed Deposit Interest & Maturity Calculator | Free",
    description: "Free FD calculator to calculate fixed deposit maturity amount, interest earned and total value for any principal, rate and tenure with quarterly compounding.",
    path: "/fd-calculator",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "FD Calculator",
      applicationCategory: "FinanceApplication",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    },
  });

  const [principal, setPrincipal] = useState("100000");
  const [rate, setRate] = useState("7.5");
  const [years, setYears] = useState("5");
  const [freq, setFreq] = useState(4);

  const p = parseFloat(principal) || 0;
  const r = parseFloat(rate) || 0;
  const y = parseFloat(years) || 0;

  const result = useMemo(() => calculateFD(p, r, y, freq), [p, r, y, freq]);

  const copyText = `FD Calculation\nPrincipal: ${formatINR(p)}\nRate: ${r}% for ${y} years (${COMPOUND_OPTIONS.find(o => o.value === freq)?.label})\nMaturity: ${formatINR(result.maturity)}\nInterest: ${formatINR(result.interest)}`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "FD Calculator" }]} className="mb-6" />
      <header className="animate-fade-in-up text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          FD <span className="text-indigo-600 dark:text-indigo-400">Calculator</span>
        </h1>
        <p className="mt-3 text-slate-500 dark:text-slate-400">Calculate fixed deposit maturity and interest with compounding.</p>
      </header>

      <div className="mt-8 animate-fade-in-up rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="fd-principal" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Principal Amount (₹)</label>
            <input id="fd-principal" type="number" min="0" inputMode="numeric" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white py-3 px-4 text-lg font-semibold text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
          </div>
          <div>
            <label htmlFor="fd-rate" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Interest Rate (% p.a.)</label>
            <input id="fd-rate" type="number" min="0" step="0.1" inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white py-3 px-4 text-lg font-semibold text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
          </div>
          <div>
            <label htmlFor="fd-years" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Time Period (Years)</label>
            <input id="fd-years" type="number" min="0" step="0.5" inputMode="decimal" value={years} onChange={(e) => setYears(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white py-3 px-4 text-lg font-semibold text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
          </div>
          <div>
            <label htmlFor="fd-freq" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Compounding Frequency</label>
            <select id="fd-freq" value={freq} onChange={(e) => setFreq(Number(e.target.value))} className="mt-2 w-full rounded-xl border border-slate-300 bg-white py-3 px-4 text-lg font-semibold text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
              {COMPOUND_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <ResultStat label="Invested Amount" value={formatINR(result.invested)} />
          <ResultStat label="Interest Earned" value={formatINR(result.interest)} />
          <ResultStat label="Maturity Value" value={formatINR(result.maturity)} highlight />
        </div>

        <div className="mt-6 flex justify-between border-t border-slate-100 pt-6 dark:border-slate-800">
          <CopyButton text={copyText} />
          <button type="button" onClick={() => { setPrincipal("100000"); setRate("7.5"); setYears("5"); setFreq(4); }} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">Reset</button>
        </div>
      </div>

      <AdSlot className="mt-8" />
      <FaqSection faqs={FAQS} />
      <RelatedTools />
    </div>
  );
}

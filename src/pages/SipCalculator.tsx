import { useMemo, useState } from "react";
import { calculateSIP, formatINR } from "../utils/calculators";
import Breadcrumbs from "../components/Breadcrumbs";
import FaqSection, { type FaqItem } from "../components/FaqSection";
import RelatedTools from "../components/RelatedTools";
import AdSlot from "../components/AdSlot";
import ResultStat from "../components/ResultStat";
import CopyButton from "../components/CopyButton";
import { useSEO } from "../hooks/useSEO";

const FAQS: FaqItem[] = [
  { question: "What is SIP?", answer: "Systematic Investment Plan (SIP) is a method of investing a fixed amount regularly in mutual funds to build wealth over time with compounding." },
  { question: "How does SIP calculator work?", answer: "It uses future value of annuity: FV = P x (((1+r)^n -1)/r) x (1+r), where P monthly investment, r monthly return rate, n months rounded." },
  { question: "Is SIP return guaranteed?", answer: "No, mutual fund returns are market-linked and not guaranteed. This calculator uses an assumed annual return for projection." },
  { question: "What is good SIP return for India?", answer: "Equity mutual funds historically delivered 10-14% long-term, but past performance doesn't guarantee future results." },
  { question: "Difference between SIP and Lump Sum?", answer: "SIP invests fixed amount monthly (rupee cost averaging), lump sum is one-time investment. SIP reduces timing risk." },
];

export default function SipCalculator() {
  useSEO({
    title: "Free SIP Calculator India — Mutual Fund Returns & Maturity",
    description: "Estimate mutual fund SIP maturity value, total investment and wealth gain with our free SIP calculator for Indian investors.",
    path: "/sip-calculator",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "SIP Calculator",
      applicationCategory: "FinanceApplication",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    },
  });

  const [monthly, setMonthly] = useState("5000");
  const [rate, setRate] = useState("12");
  const [years, setYears] = useState("15");

  const m = parseFloat(monthly) || 0;
  const r = parseFloat(rate) || 0;
  const y = parseFloat(years) || 0;

  const result = useMemo(() => calculateSIP(m, r, y), [m, r, y]);

  const copyText = `SIP Calculation\nMonthly SIP: ${formatINR(m)}\nReturn: ${r}% for ${y} years\nInvested: ${formatINR(result.invested)}\nReturns: ${formatINR(result.estimatedReturns)}\nMaturity: ${formatINR(result.maturityValue)}`;

  const investedPercent = result.maturityValue > 0 ? Math.min(100, Math.max(0, (result.invested / result.maturityValue) * 100)) : 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "SIP Calculator" }]} className="mb-6" />
      <header className="animate-fade-in-up text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          SIP <span className="text-indigo-600 dark:text-indigo-400">Calculator</span>
        </h1>
        <p className="mt-3 text-slate-500 dark:text-slate-400">Estimate your mutual fund SIP returns and wealth creation over time.</p>
      </header>

      <div className="mt-8 animate-fade-in-up rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <label htmlFor="sip-monthly" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Monthly Investment (₹)</label>
            <input id="sip-monthly" type="number" min="0" inputMode="numeric" value={monthly} onChange={(e) => setMonthly(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white py-3 px-4 text-lg font-semibold text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
            <input type="range" min="500" max="100000" step="500" value={Math.min(Math.max(m, 500), 100000) || 500} onChange={(e) => setMonthly(e.target.value)} aria-label="Monthly investment slider" className="mt-3 w-full accent-indigo-600" />
          </div>
          <div>
            <label htmlFor="sip-rate" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Expected Return (% p.a.)</label>
            <input id="sip-rate" type="number" min="0" step="0.5" inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white py-3 px-4 text-lg font-semibold text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
            <input type="range" min="1" max="30" step="0.5" value={Math.min(Math.max(r, 1), 30) || 12} onChange={(e) => setRate(e.target.value)} aria-label="Expected return slider" className="mt-3 w-full accent-indigo-600" />
          </div>
          <div>
            <label htmlFor="sip-years" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Time Period (Years)</label>
            <input id="sip-years" type="number" min="0" step="1" inputMode="numeric" value={years} onChange={(e) => setYears(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white py-3 px-4 text-lg font-semibold text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
            <input type="range" min="1" max="40" step="1" value={Math.min(Math.max(y, 1), 40) || 15} onChange={(e) => setYears(e.target.value)} aria-label="Time period slider" className="mt-3 w-full accent-indigo-600" />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <ResultStat label="Invested Amount" value={formatINR(result.invested)} />
          <ResultStat label="Est. Returns" value={formatINR(result.estimatedReturns)} />
          <ResultStat label="Maturity Value" value={formatINR(result.maturityValue)} highlight />
        </div>

        <div className="mt-6">
          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700 flex" role="progressbar" aria-valuenow={investedPercent} aria-valuemin={0} aria-valuemax={100} aria-label="Invested vs gains">
            <div className="h-full bg-indigo-600" style={{ width: `${investedPercent}%` }} />
            <div className="h-full bg-emerald-400" style={{ width: `${100 - investedPercent}%` }} />
          </div>
          <div className="mt-2 flex justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-indigo-600 inline-block" aria-hidden="true" /> Invested {investedPercent.toFixed(1)}%</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-emerald-400 inline-block" aria-hidden="true" /> Gains {(100 - investedPercent).toFixed(1)}%</span>
          </div>
        </div>

        <div className="mt-6 flex justify-between border-t border-slate-100 pt-6 dark:border-slate-800">
          <CopyButton text={copyText} />
          <button type="button" onClick={() => { setMonthly("5000"); setRate("12"); setYears("15"); }} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">Reset</button>
        </div>
      </div>

      <AdSlot className="mt-8" />
      <FaqSection faqs={FAQS} />
      <RelatedTools />
    </div>
  );
}

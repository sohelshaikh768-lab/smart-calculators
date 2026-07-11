import { useMemo, useState } from "react";
import { calculateEMI, formatINR } from "../utils/calculators";
import Breadcrumbs from "../components/Breadcrumbs";
import FaqSection, { type FaqItem } from "../components/FaqSection";
import RelatedTools from "../components/RelatedTools";
import AdSlot from "../components/AdSlot";
import ResultStat from "../components/ResultStat";
import CopyButton from "../components/CopyButton";
import { useSEO } from "../hooks/useSEO";

const FAQS: FaqItem[] = [
  { question: "What is EMI?", answer: "EMI stands for Equated Monthly Installment — a fixed amount you pay every month to repay a loan including principal and interest." },
  { question: "How is EMI calculated?", answer: "EMI = [P x R x (1+R)^N] / [(1+R)^N -1], where P is principal, R monthly interest rate, N total months (years*12 rounded)." },
  { question: "Does EMI change if I prepay?", answer: "Prepaying reduces principal, which can reduce either tenure or future EMIs. This calculator shows standard schedule without prepayment." },
  { question: "What is included in total interest?", answer: "Total interest is the extra amount you pay over principal across loan tenure — total payment minus principal." },
  { question: "Is EMI same for car, home and personal loans?", answer: "Formula is same, but interest rates and tenures differ by loan type. Always confirm rate with your lender." },
];

export default function EmiCalculator() {
  useSEO({
    title: "EMI Calculator - Calculate Loan EMI, Interest & Total Payment | Free",
    description: "Free EMI calculator for home, car, personal loans. Instantly calculate monthly EMI, total interest payable and total payment amount.",
    path: "/emi-calculator",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "EMI Calculator",
      applicationCategory: "FinanceApplication",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    },
  });

  const [principal, setPrincipal] = useState("1000000");
  const [rate, setRate] = useState("8.5");
  const [years, setYears] = useState("20");

  const p = parseFloat(principal) || 0;
  const r = parseFloat(rate) || 0;
  const y = parseFloat(years) || 0;

  const result = useMemo(() => calculateEMI(p, r, y), [p, r, y]);

  const copyText = `EMI Calculation\nLoan Amount: ${formatINR(p)}\nRate: ${r}% for ${y} years\nEMI: ${formatINR(result.emi)}\nTotal Interest: ${formatINR(result.totalInterest)}\nTotal Payment: ${formatINR(result.totalPayment)}`;

  const interestPercent = result.totalPayment > 0 ? (result.totalInterest / result.totalPayment) * 100 : 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "EMI Calculator" }]} className="mb-6" />

      <header className="animate-fade-in-up text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          EMI <span className="text-indigo-600 dark:text-indigo-400">Calculator</span>
        </h1>
        <p className="mt-3 text-slate-500 dark:text-slate-400">Calculate monthly EMI, total interest and total payment for any loan.</p>
      </header>

      <div className="mt-8 animate-fade-in-up rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <label htmlFor="emi-principal" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Loan Amount (₹)</label>
            <input id="emi-principal" type="number" min="0" inputMode="numeric" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white py-3 px-4 text-lg font-semibold text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
            <input type="range" min="10000" max="10000000" step="10000" value={Math.min(Math.max(p, 10000), 10000000) || 10000} onChange={(e) => setPrincipal(e.target.value)} aria-label="Loan amount slider" className="mt-3 w-full accent-indigo-600" />
          </div>
          <div>
            <label htmlFor="emi-rate" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Interest Rate (% p.a.)</label>
            <input id="emi-rate" type="number" min="0" step="0.1" inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white py-3 px-4 text-lg font-semibold text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
            <input type="range" min="1" max="20" step="0.1" value={Math.min(Math.max(r, 1), 20) || 8.5} onChange={(e) => setRate(e.target.value)} aria-label="Interest rate slider" className="mt-3 w-full accent-indigo-600" />
          </div>
          <div>
            <label htmlFor="emi-years" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Loan Tenure (Years)</label>
            <input id="emi-years" type="number" min="0" step="0.5" inputMode="decimal" value={years} onChange={(e) => setYears(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white py-3 px-4 text-lg font-semibold text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
            <input type="range" min="1" max="30" step="1" value={Math.min(Math.max(y, 1), 30) || 20} onChange={(e) => setYears(e.target.value)} aria-label="Loan tenure slider" className="mt-3 w-full accent-indigo-600" />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <ResultStat label="Monthly EMI" value={formatINR(result.emi)} highlight />
          <ResultStat label="Total Interest" value={formatINR(result.totalInterest)} />
          <ResultStat label="Total Payment" value={formatINR(result.totalPayment)} />
        </div>

        <div className="mt-6">
          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700 flex" role="progressbar" aria-valuenow={100 - interestPercent} aria-valuemin={0} aria-valuemax={100} aria-label="Principal vs interest split">
            <div className="h-full bg-indigo-600" style={{ width: `${100 - interestPercent}%` }} />
            <div className="h-full bg-violet-400" style={{ width: `${interestPercent}%` }} />
          </div>
          <div className="mt-2 flex justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-indigo-600 inline-block" aria-hidden="true" /> Principal { (100 - interestPercent).toFixed(1)}%</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-violet-400 inline-block" aria-hidden="true" /> Interest {interestPercent.toFixed(1)}%</span>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center border-t border-slate-100 pt-6 dark:border-slate-800">
          <CopyButton text={copyText} />
          <button type="button" onClick={() => { setPrincipal("1000000"); setRate("8.5"); setYears("20"); }} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">Reset</button>
        </div>
      </div>

      <AdSlot className="mt-8" />
      <FaqSection faqs={FAQS} />
      <RelatedTools />
    </div>
  );
}

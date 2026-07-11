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
  { question: "Difference between EMI and Loan Calculator?", answer: "Both use same formula. EMI calculator focuses on monthly installment, loan calculator emphasizes total interest vs principal breakdown and amortization view." },
  { question: "Can I calculate loan eligibility?", answer: "Eligibility depends on income, credit score and bank policy. This calculator focuses on EMI calculation only." },
  { question: "What affects loan interest most?", answer: "Credit score, loan tenure, loan type, and market rates (MCLR/repo rate) impact interest rates significantly." },
  { question: "What is amortization?", answer: "Amortization is the process of repaying loan via EMIs where early payments have more interest, later payments more principal." },
];

export default function LoanCalculator() {
  useSEO({
    title: "Loan Calculator - Calculate Total Interest & Payment Schedule | Free",
    description: "Free loan calculator for home, personal, car loans. Calculate EMI, total interest, total payable and view principal vs interest split.",
    path: "/loan-calculator",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Loan Calculator",
      applicationCategory: "FinanceApplication",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    },
  });

  const [principal, setPrincipal] = useState("500000");
  const [rate, setRate] = useState("11");
  const [years, setYears] = useState("5");

  const p = parseFloat(principal) || 0;
  const r = parseFloat(rate) || 0;
  const y = parseFloat(years) || 0;

  const result = useMemo(() => calculateEMI(p, r, y), [p, r, y]);

  const copyText = `Loan Calculation\nAmount: ${formatINR(p)} @ ${r}% for ${y} years\nEMI: ${formatINR(result.emi)}\nInterest: ${formatINR(result.totalInterest)}\nTotal: ${formatINR(result.totalPayment)}`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Loan Calculator" }]} className="mb-6" />
      <header className="animate-fade-in-up text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Loan <span className="text-indigo-600 dark:text-indigo-400">Calculator</span>
        </h1>
        <p className="mt-3 text-slate-500 dark:text-slate-400">Plan your loan with EMI, interest breakdown and total payable amount.</p>
      </header>

      <div className="mt-8 animate-fade-in-up rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <label htmlFor="loan-principal" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Loan Amount (₹)</label>
            <input id="loan-principal" type="number" min="0" inputMode="numeric" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white py-3 px-4 text-lg font-semibold text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
          </div>
          <div>
            <label htmlFor="loan-rate" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Interest Rate (% p.a.)</label>
            <input id="loan-rate" type="number" min="0" step="0.1" inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white py-3 px-4 text-lg font-semibold text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
          </div>
          <div>
            <label htmlFor="loan-years" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Tenure (Years)</label>
            <input id="loan-years" type="number" min="0" step="0.5" inputMode="decimal" value={years} onChange={(e) => setYears(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white py-3 px-4 text-lg font-semibold text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <ResultStat label="Monthly EMI" value={formatINR(result.emi)} highlight />
          <ResultStat label="Total Interest" value={formatINR(result.totalInterest)} />
          <ResultStat label="Total Amount" value={formatINR(result.totalPayment)} />
        </div>

        <div className="mt-6 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Loan Summary</h4>
          <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex justify-between"><span>Principal</span><span className="font-semibold">{formatINR(p)}</span></div>
            <div className="flex justify-between"><span>Total Interest ({r}% for {y} yrs)</span><span className="font-semibold">{formatINR(result.totalInterest)}</span></div>
            <div className="flex justify-between border-t border-slate-200 pt-2 font-bold dark:border-slate-700"><span>Total Payable</span><span>{formatINR(result.totalPayment)}</span></div>
          </div>
        </div>

        <div className="mt-6 flex justify-between border-t border-slate-100 pt-6 dark:border-slate-800">
          <CopyButton text={copyText} />
          <button type="button" onClick={() => { setPrincipal("500000"); setRate("11"); setYears("5"); }} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">Reset</button>
        </div>
      </div>

      <AdSlot className="mt-8" />
      <FaqSection faqs={FAQS} />
      <RelatedTools />
    </div>
  );
}

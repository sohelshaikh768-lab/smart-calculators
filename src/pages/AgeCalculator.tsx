import { useMemo, useState } from "react";
import { calculateAge, parseLocalDate } from "../utils/calculators";
import Breadcrumbs from "../components/Breadcrumbs";
import FaqSection, { type FaqItem } from "../components/FaqSection";
import RelatedTools from "../components/RelatedTools";
import AdSlot from "../components/AdSlot";
import ResultStat from "../components/ResultStat";
import { useSEO } from "../hooks/useSEO";

const FAQS: FaqItem[] = [
  { question: "How is age calculated accurately?", answer: "Age is calculated by comparing your date of birth with today's date, accounting for months and days. If your birthday hasn't occurred yet this year, one year is subtracted to give exact age." },
  { question: "Does this include leap years?", answer: "Yes. Our calculation uses actual calendar dates normalized to midnight local time, so leap years are automatically accounted for in total days calculation. Feb 29 birthdays use Feb 28 in non-leap years." },
  { question: "Can I calculate age from a future date?", answer: "No, DOB must be in the past. If you enter a future date, the calculator will show zero." },
  { question: "What is the difference between Age Calculator and Date Difference?", answer: "Age calculator specifically gives years, months, days since birth, plus total days lived and next birthday. Date difference tools are more generic for any two dates." },
  { question: "Is this age calculation valid for official documents?", answer: "Yes, the logic follows standard calendar calculation used for official forms, school admissions and government documents in India." },
];

export default function AgeCalculator() {
  useSEO({
    title: "Age Calculator - Calculate Exact Age in Years, Months, Days | Free",
    description: "Free age calculator to find your exact age in years, months, days. Calculate total days lived, next birthday countdown and more instantly.",
    path: "/age-calculator",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Age Calculator",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      description: "Calculate exact age from date of birth in years, months and days with next birthday countdown.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    },
  });

  const [dob, setDob] = useState("2000-01-01");
  const dobDate = useMemo(() => parseLocalDate(dob), [dob]);
  const result = useMemo(() => {
    if (!dobDate) return calculateAge(new Date("invalid"), new Date());
    return calculateAge(dobDate, new Date());
  }, [dobDate]);

  const todayIso = new Date().toISOString().split("T")[0];
  const isInvalid = !dobDate;
  const isFuture = dobDate ? dobDate > new Date() : false;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Age Calculator" }]} className="mb-6" />

      <header className="animate-fade-in-up text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Age <span className="text-indigo-600 dark:text-indigo-400">Calculator</span>
        </h1>
        <p className="mt-3 text-slate-500 dark:text-slate-400">Find your exact age in years, months and days with total days lived and next birthday.</p>
      </header>

      <div className="mt-8 animate-fade-in-up rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
        <div className="max-w-sm mx-auto">
          <label htmlFor="dob-input" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
            Date of Birth
          </label>
          <input
            id="dob-input"
            type="date"
            value={dob}
            max={todayIso}
            onChange={(e) => setDob(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white py-3 px-4 text-lg font-semibold text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            aria-describedby={isInvalid || isFuture ? "dob-error" : undefined}
          />
          {(isInvalid || isFuture) && (
            <p id="dob-error" className="mt-2 text-xs font-medium text-rose-600 dark:text-rose-400" role="alert">
              {isInvalid ? "Please enter a valid date (YYYY-MM-DD)." : "Date of birth cannot be in the future."}
            </p>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <ResultStat label="Years" value={`${result.years} Years`} highlight />
          <ResultStat label="Months" value={`${result.months} Months`} />
          <ResultStat label="Days" value={`${result.days} Days`} />
        </div>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <ResultStat label="Total Months" value={`${result.totalMonths.toLocaleString()} months`} />
          <ResultStat label="Total Days" value={`${result.totalDays.toLocaleString()} days`} />
          <ResultStat label="Next Birthday In" value={`${result.nextBirthdayDays} days`} />
        </div>

        {dobDate && !isFuture && (
          <div className="mt-6 rounded-xl bg-slate-50 p-4 text-center text-sm text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
            You were born on{" "}
            <span className="font-semibold">
              {dobDate.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </span>
            . Next birthday:{" "}
            <span className="font-semibold">
              {result.nextBirthdayDate?.toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}
            </span>
          </div>
        )}
      </div>

      <AdSlot className="mt-8" />

      <FaqSection faqs={FAQS} />
      <RelatedTools />
    </div>
  );
}

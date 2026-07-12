import { Link } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import AdSlot from "../components/AdSlot";

export default function About() {
  useSEO({
    title: "About UtilityHub India | Free GST, EMI, SIP & Finance Calculators",
    description: "Learn about UtilityHub India, our mission to make GST, EMI, SIP, age and finance calculations simple, fast and free for Indian users.",
    path: "/about",
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">About Utility Tools Hub India</h1>
      <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
        Utility Tools Hub India started as GST Calc India with one simple goal — to make GST calculations effortless for everyone, from small business owners and freelancers
        to students and everyday shoppers. Since the introduction of the Goods and Services Tax in 2017, businesses across India have needed a
        quick, accurate and free way to calculate tax on their invoices, pricing and purchases.
      </p>
      <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
        Today we've grown into a complete utility hub: GST exclusive/inclusive/reverse, percentage & reverse percentage, discount, profit margin, age, EMI, loan, SIP, FD calculators and a QR code generator — all running 100% in your browser with automatic dark mode, SEO optimization and privacy-first design.
      </p>
      <h2 className="mt-8 text-xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
      <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-400">
        We believe financial tools should be free, fast, private and accessible to everyone — regardless of technical background. Every calculation
        on this site runs entirely in your browser; we never store or transmit the numbers you enter.
      </p>
      <h2 className="mt-8 text-xl font-bold text-slate-900 dark:text-white">Why Trust Us?</h2>
      <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-600 dark:text-slate-400">
        <li>Formulas based on official GST rules and standard finance mathematics</li>
        <li>Regularly updated content reflecting latest GST rates and investment norms</li>
        <li>No sign-up, no paywalls — 100% free forever</li>
        <li>Built with performance, accessibility and mobile-first as top priorities</li>
        <li>All calculators include FAQ, breadcrumbs, and structured data for transparency</li>
      </ul>
      <p className="mt-6 leading-relaxed text-slate-600 dark:text-slate-400">
        Have feedback or a feature request? We'd love to hear from you on our{" "}
        <Link to="/contact" className="font-semibold text-indigo-600 dark:text-indigo-400">
          Contact page
        </Link>
        .
      </p>
      <div className="mt-10">
        <AdSlot />
      </div>
    </div>
  );
}

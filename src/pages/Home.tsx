import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { GST_RATES, calculateGstExclusive, formatINR } from "../utils/calculators";
import Newsletter from "../components/Newsletter";
import AdSlot from "../components/AdSlot";
import { useSEO, SITE_URL } from "../hooks/useSEO";
import { blogPosts } from "../data/blogPosts";

const features = [
  {
    icon: "⚡",
    title: "Instant & Real-Time",
    desc: "Results update live as you type — no button clicks, no delays.",
  },
  {
    icon: "🇮🇳",
    title: "Built for India",
    desc: "Supports all official GST slabs: 0%, 3%, 5%, 12%, 18% and 28%.",
  },
  {
    icon: "🌗",
    title: "Light & Dark Mode",
    desc: "Easy on the eyes, day or night, with a single click.",
  },
  {
    icon: "📱",
    title: "Mobile-First Design",
    desc: "Fully responsive — works beautifully on phones, tablets & desktops.",
  },
  {
    icon: "🔒",
    title: "100% Private",
    desc: "All calculations run in your browser. No data is ever sent to a server.",
  },
  {
    icon: "🧮",
    title: "Bonus Calculators",
    desc: "Percentage, discount and profit margin calculators included free.",
  },
];

const tools = [
  { to: "/gst-calculator", icon: "🧾", title: "GST Calculator", desc: "Inclusive, exclusive & reverse GST", badge: "Popular" },
  { to: "/percentage-calculator", icon: "%", title: "Percentage Calculator", desc: "Quick percentage maths" },
  { to: "/reverse-percentage-calculator", icon: "↩️", title: "Reverse Percentage", desc: "Find original before %", badge: "New" },
  { to: "/discount-calculator", icon: "🏷️", title: "Discount Calculator", desc: "Sale price & savings" },
  { to: "/profit-margin-calculator", icon: "📈", title: "Profit Margin", desc: "Profit & margin %" },
  { to: "/age-calculator", icon: "🎂", title: "Age Calculator", desc: "Years, months, days", badge: "New" },
  { to: "/emi-calculator", icon: "🏦", title: "EMI Calculator", desc: "Loan EMI & interest", badge: "Popular" },
  { to: "/loan-calculator", icon: "💳", title: "Loan Calculator", desc: "Total payable breakdown", badge: "New" },
  { to: "/sip-calculator", icon: "📊", title: "SIP Calculator", desc: "Mutual fund SIP returns", badge: "Popular" },
  { to: "/fd-calculator", icon: "🏛️", title: "FD Calculator", desc: "Fixed deposit maturity", badge: "New" },
  { to: "/qr-code-generator", icon: "🔳", title: "QR Code Generator", desc: "URL, text, UPI QR", badge: "New" },
];

export default function Home() {
  useSEO({
    title: "UtilityHub India — Free GST, EMI, SIP, Age, QR & Finance Calculators",
    description:
      "Use free online calculators for GST, percentage, reverse percentage, discount, profit margin, age, EMI, loan, SIP, FD and QR codes in India.",
    path: "/",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "UtilityHub India",
      url: SITE_URL,
      description: "Free online calculators for GST, finance, percentage and everyday utility needs in India.",
      publisher: { "@type": "Organization", name: "UtilityHub India", url: SITE_URL },
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/blog?search={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  });

  const [amount, setAmount] = useState("1000");
  const [rate, setRate] = useState(18);
  const numericAmount = parseFloat(amount) || 0;
  const result = useMemo(() => calculateGstExclusive(numericAmount, rate), [numericAmount, rate]);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-slate-950 dark:via-slate-950 dark:to-indigo-950/40">
        <div
          className="absolute inset-0 -z-10 animate-gradient-x opacity-40 dark:opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(99,102,241,0.25), transparent 40%), radial-gradient(circle at 80% 30%, rgba(139,92,246,0.25), transparent 45%)",
          }}
          aria-hidden="true"
        />
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8">
          <div className="animate-fade-in-up text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:border-indigo-800 dark:bg-indigo-500/10 dark:text-indigo-300">
              🇮🇳 Trusted by Indian businesses & freelancers
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl dark:text-white">
              India's Fastest <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">GST Calculator</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600 lg:mx-0 dark:text-slate-400">
              Calculate GST inclusive, exclusive and reverse GST in seconds. Accurate, free, and built for every Indian tax slab — 0% to 28%.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <Link
                to="/gst-calculator"
                className="w-full rounded-xl bg-indigo-600 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-indigo-300/50 transition hover:bg-indigo-700 active:scale-95 sm:w-auto dark:shadow-indigo-900/50"
              >
                Open Full GST Calculator →
              </Link>
              <Link
                to="/blog"
                className="w-full rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-95 sm:w-auto dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Read GST Guides
              </Link>
            </div>
          </div>

          {/* Quick calculator widget */}
          <div className="animate-fade-in-up rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-2xl shadow-indigo-200/40 backdrop-blur sm:p-8 dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-none">
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Quick GST Preview</h2>
            <div className="mt-4">
              <label htmlFor="home-quick-amount" className="block text-xs font-semibold text-slate-500 dark:text-slate-400">Amount (₹)</label>
              <input
                id="home-quick-amount"
                type="number"
                min="0"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-lg font-bold text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="GST rate quick select">
              {GST_RATES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRate(r)}
                  aria-pressed={rate === r}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    rate === r
                      ? "bg-indigo-600 text-white shadow"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  }`}
                >
                  {r}%
                </button>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
                <p className="text-[10px] font-semibold uppercase text-slate-400">Base</p>
                <p className="mt-1 text-sm font-bold text-slate-800 dark:text-white">{formatINR(result.originalAmount)}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
                <p className="text-[10px] font-semibold uppercase text-slate-400">GST</p>
                <p className="mt-1 text-sm font-bold text-slate-800 dark:text-white">{formatINR(result.gstAmount)}</p>
              </div>
              <div className="rounded-xl bg-indigo-600 p-3">
                <p className="text-[10px] font-semibold uppercase text-indigo-100">Total</p>
                <p className="mt-1 text-sm font-bold text-white">{formatINR(result.totalAmount)}</p>
              </div>
            </div>
            <Link
              to="/gst-calculator"
              className="mt-5 block w-full rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-center text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100 dark:border-indigo-800 dark:bg-indigo-500/10 dark:text-indigo-300 dark:hover:bg-indigo-500/20"
            >
              Full Calculator with Inclusive & Reverse Modes
            </Link>
          </div>
        </div>
      </section>

      {/* Tools grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">All-in-One Utility Tools Hub</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-slate-500 dark:text-slate-400">
          11 free calculators for GST, finance, everyday maths and utility — from EMI, SIP, FD to age and QR codes. Private, fast, no signup.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool: any, i: number) => (
            <Link
              key={tool.to}
              to={tool.to}
              style={{ animationDelay: `${i * 60}ms` }}
              className="group relative animate-fade-in-up rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
            >
              {tool.badge && (
                <span className={`absolute right-4 top-4 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${tool.badge === 'Popular' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'}`}>
                  {tool.badge}
                </span>
              )}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl transition group-hover:scale-110 dark:bg-indigo-500/10">
                {tool.icon}
              </div>
              <h3 className="mt-4 font-bold text-slate-900 dark:text-white">{tool.title}</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{tool.desc}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-indigo-600 dark:text-indigo-400">Try now →</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AdSlot />
      </div>

      {/* Features */}
      <section className="bg-slate-50 py-16 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">Why Use Our GST Calculator?</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div
                key={f.title}
                style={{ animationDelay: `${i * 80}ms` }}
                className="animate-fade-in-up rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900"
              >
                <div className="text-3xl">{f.icon}</div>
                <h3 className="mt-3 font-bold text-slate-900 dark:text-white">{f.title}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog preview */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">Latest GST Guides</h2>
          <Link to="/blog" className="hidden text-sm font-semibold text-indigo-600 sm:block dark:text-indigo-400">
            View all articles →
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">{post.category}</span>
              <h3 className="mt-2 font-bold text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                {post.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">{post.excerpt}</p>
              <p className="mt-3 text-xs text-slate-400">{post.readTime}</p>
            </Link>
          ))}
        </div>
        <Link to="/blog" className="mt-6 block text-center text-sm font-semibold text-indigo-600 sm:hidden dark:text-indigo-400">
          View all articles →
        </Link>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        <Newsletter />
      </section>
    </div>
  );
}

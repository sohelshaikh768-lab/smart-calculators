import { Link } from "react-router-dom";

interface ToolLink {
  to: string;
  label: string;
  icon?: string;
}

interface Props {
  tools?: ToolLink[];
  title?: string;
}

const DEFAULT_TOOLS: ToolLink[] = [
  { to: "/gst-calculator", label: "GST Calculator", icon: "🧾" },
  { to: "/percentage-calculator", label: "Percentage", icon: "%" },
  { to: "/reverse-percentage-calculator", label: "Reverse %", icon: "↩️" },
  { to: "/discount-calculator", label: "Discount", icon: "🏷️" },
  { to: "/profit-margin-calculator", label: "Profit Margin", icon: "📈" },
  { to: "/age-calculator", label: "Age Calculator", icon: "🎂" },
  { to: "/emi-calculator", label: "EMI Calculator", icon: "🏦" },
  { to: "/loan-calculator", label: "Loan Calculator", icon: "💳" },
  { to: "/sip-calculator", label: "SIP Calculator", icon: "📊" },
  { to: "/fd-calculator", label: "FD Calculator", icon: "🏛️" },
  { to: "/qr-code-generator", label: "QR Generator", icon: "🔳" },
];

export default function RelatedTools({ tools, title = "Explore Other Tools" }: Props) {
  const list = tools || DEFAULT_TOOLS;
  return (
    <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h2>
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-indigo-700 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300"
          >
            <span className="text-base">{t.icon}</span>
            {t.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

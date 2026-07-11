import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 text-lg font-extrabold text-slate-900 dark:text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md">
                %
              </span>
              UtilityHub India
            </Link>
            <p className="mt-3 max-w-sm text-sm text-slate-500 dark:text-slate-400">
              India's complete utility tools hub — free GST, percentage, EMI, SIP, FD, age, QR and finance calculators built for businesses and individuals. No signup, 100% private.
            </p>
            <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
              © {year} UtilityHub India. All rights reserved.
            </p>
          </div>

          <FooterColumn
            title="Finance Tools"
            links={[
              { to: "/gst-calculator", label: "GST Calculator" },
              { to: "/emi-calculator", label: "EMI Calculator" },
              { to: "/loan-calculator", label: "Loan Calculator" },
              { to: "/sip-calculator", label: "SIP Calculator" },
              { to: "/fd-calculator", label: "FD Calculator" },
            ]}
          />

          <FooterColumn
            title="Utility Tools"
            links={[
              { to: "/percentage-calculator", label: "Percentage Calculator" },
              { to: "/reverse-percentage-calculator", label: "Reverse Percentage" },
              { to: "/discount-calculator", label: "Discount Calculator" },
              { to: "/profit-margin-calculator", label: "Profit Margin" },
              { to: "/age-calculator", label: "Age Calculator" },
              { to: "/qr-code-generator", label: "QR Generator" },
            ]}
          />

          <FooterColumn
            title="Resources"
            links={[
              { to: "/blog", label: "Blog" },
              { to: "/about", label: "About Us" },
              { to: "/contact", label: "Contact" },
              { to: "/privacy-policy", label: "Privacy Policy" },
              { to: "/terms-and-conditions", label: "Terms & Conditions" },
              { to: "/disclaimer", label: "Disclaimer" },
            ]}
          />
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-xs text-slate-400 dark:border-slate-800 dark:text-slate-500">
          Made with ❤️ in India. All calculations run locally in your browser for privacy.
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h4>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.to + l.label}>
            <Link
              to={l.to}
              className="text-sm text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

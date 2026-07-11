import { useEffect, useState, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const mainLinks = [
  { to: "/", label: "Home" },
  { to: "/gst-calculator", label: "GST" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
];

const toolsLinks = [
  { to: "/gst-calculator", label: "GST Calculator", icon: "🧾", desc: "Inclusive, exclusive & reverse" },
  { to: "/percentage-calculator", label: "Percentage Calculator", icon: "%", desc: "X% of Y, % change" },
  { to: "/reverse-percentage-calculator", label: "Reverse Percentage", icon: "↩️", desc: "Find original before %" },
  { to: "/discount-calculator", label: "Discount Calculator", icon: "🏷️", desc: "Sale price & savings" },
  { to: "/profit-margin-calculator", label: "Profit Margin", icon: "📈", desc: "Profit & markup %" },
  { to: "/age-calculator", label: "Age Calculator", icon: "🎂", desc: "Years, months, days" },
  { to: "/emi-calculator", label: "EMI Calculator", icon: "🏦", desc: "Monthly EMI" },
  { to: "/loan-calculator", label: "Loan Calculator", icon: "💳", desc: "Total interest" },
  { to: "/sip-calculator", label: "SIP Calculator", icon: "📊", desc: "Mutual fund SIP" },
  { to: "/fd-calculator", label: "FD Calculator", icon: "🏛️", desc: "Fixed deposit" },
  { to: "/qr-code-generator", label: "QR Generator", icon: "🔳", desc: "URL, text, UPI" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const location = useLocation();
  const toolsRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setToolsOpen(false);
  }, [location.pathname]);

  // Close tools dropdown on outside click / Escape — fixes onBlur race that prevented link clicks
  useEffect(() => {
    if (!toolsOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setToolsOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [toolsOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? "bg-white/80 shadow-sm backdrop-blur-md dark:bg-slate-900/80"
          : "bg-white/60 backdrop-blur-sm dark:bg-slate-900/60"
      } border-b border-slate-200/70 dark:border-slate-800`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Primary">
        <Link to="/" className="flex items-center gap-2 text-lg font-extrabold text-slate-900 dark:text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md">
            %
          </span>
          <span>
            Utility<span className="text-indigo-600 dark:text-indigo-400">Hub</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {mainLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          {/* Tools Dropdown — fixed: removed buggy onBlur, uses outside-click handler */}
          <li className="relative" ref={toolsRef}>
            <button
              type="button"
              onClick={() => setToolsOpen((o) => !o)}
              aria-expanded={toolsOpen}
              aria-haspopup="true"
              aria-controls="tools-dropdown"
              className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                toolsOpen || location.pathname.includes("-calculator") || location.pathname.includes("qr")
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              }`}
            >
              Tools
              <svg className={`h-4 w-4 transition-transform ${toolsOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {toolsOpen && (
              <div
                id="tools-dropdown"
                className="absolute left-1/2 top-full mt-2 w-[560px] max-w-[90vw] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-700 dark:bg-slate-900 animate-fade-in"
              >
                <div className="grid grid-cols-2 gap-2">
                  {toolsLinks.map((t) => (
                    <Link
                      key={t.to}
                      to={t.to}
                      onClick={() => setToolsOpen(false)}
                      className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-sm dark:bg-indigo-500/10" aria-hidden="true">{t.icon}</span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-slate-800 dark:text-slate-200">{t.label}</span>
                        <span className="block text-xs text-slate-500 dark:text-slate-400">{t.desc}</span>
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="mt-3 border-t border-slate-100 pt-3 dark:border-slate-800">
                  <Link to="/" className="block text-center text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                    View all tools on homepage →
                  </Link>
                </div>
              </div>
            )}
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            {theme === "dark" ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.36 6.36l-.7-.7M6.34 6.34l-.7-.7m12.72 0l-.7.7M6.34 17.66l-.7.7M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 1020.354 15.354z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 lg:hidden"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900 lg:hidden animate-fade-in max-h-[80vh] overflow-y-auto">
          <ul className="flex flex-col gap-1">
            {mainLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2.5 text-sm font-medium ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}

            {/* Mobile Tools Accordion */}
            <li className="mt-1">
              <button
                type="button"
                onClick={() => setMobileToolsOpen((o) => !o)}
                aria-expanded={mobileToolsOpen}
                aria-controls="mobile-tools-list"
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <span>All Tools ({toolsLinks.length})</span>
                <svg className={`h-4 w-4 transition-transform ${mobileToolsOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileToolsOpen && (
                <div id="mobile-tools-list" className="mt-2 grid grid-cols-1 gap-1 rounded-xl bg-slate-50 p-2 dark:bg-slate-800/60">
                  {toolsLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                          isActive
                            ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300"
                            : "text-slate-600 hover:bg-white dark:text-slate-300 dark:hover:bg-slate-700"
                        }`
                      }
                    >
                      <span aria-hidden="true">{link.icon}</span> {link.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

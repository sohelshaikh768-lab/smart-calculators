import { Link } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";

export default function NotFound() {
  useSEO({
    title: "404 — Page Not Found | GST Calc India",
    description: "The page you are looking for could not be found.",
    path: "/404",
  });

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <span className="text-7xl">🧾</span>
      <h1 className="mt-6 text-4xl font-extrabold text-slate-900 dark:text-white">404 — Page Not Found</h1>
      <p className="mt-3 text-slate-500 dark:text-slate-400">
        Sorry, we couldn't find the page you were looking for. It may have been moved or no longer exists.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        Back to Home
      </Link>
    </div>
  );
}

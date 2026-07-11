export default function ResultStat({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-4 ${
        highlight
          ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md"
          : "bg-slate-50 dark:bg-slate-800/60"
      }`}
    >
      <p className={`text-xs font-medium uppercase tracking-wide ${highlight ? "text-indigo-100" : "text-slate-500 dark:text-slate-400"}`}>
        {label}
      </p>
      <p className={`mt-1 text-xl font-bold sm:text-2xl ${highlight ? "text-white" : "text-slate-900 dark:text-white"}`}>{value}</p>
    </div>
  );
}

// Reusable Google AdSense / affiliate placeholder block.
// Swap the inner content with real <ins class="adsbygoogle"> tags
// or affiliate banner markup when you're ready to monetize.
interface AdSlotProps {
  label?: string;
  className?: string;
  variant?: "ad" | "affiliate";
}

export default function AdSlot({ label = "Advertisement", className = "", variant = "ad" }: AdSlotProps) {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center gap-1 rounded-2xl border border-dashed ${
        variant === "affiliate"
          ? "border-amber-300 bg-amber-50 dark:border-amber-700/50 dark:bg-amber-950/20"
          : "border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/40"
      } px-4 py-8 text-center ${className}`}
      role="complementary"
      aria-label={label}
    >
      <span className="text-[11px] font-semibold tracking-widest text-slate-400 uppercase dark:text-slate-500">
        {variant === "affiliate" ? "Sponsored / Affiliate" : label}
      </span>
      <span className="text-sm text-slate-400 dark:text-slate-500">
        {variant === "affiliate" ? "Affiliate banner placeholder (728×90 / 300×250)" : "Google AdSense placeholder (responsive)"}
      </span>
    </div>
  );
}

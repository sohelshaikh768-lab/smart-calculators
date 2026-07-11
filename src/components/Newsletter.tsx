import { useState, type FormEvent } from "react";

// Front-end-only newsletter form (no backend). Stores emails locally
// as a placeholder — swap the onSubmit handler with a real provider
// (Mailchimp, ConvertKit, Beehiiv, etc.) when ready.
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    const stored = JSON.parse(window.localStorage.getItem("gst-newsletter-emails") || "[]");
    stored.push({ email, date: new Date().toISOString() });
    window.localStorage.setItem("gst-newsletter-emails", JSON.stringify(stored));
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 4000);
  }

  return (
    <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 p-6 text-white shadow-lg sm:p-8">
      <h3 className="text-xl font-bold sm:text-2xl">📬 Get GST Updates in Your Inbox</h3>
      <p className="mt-2 text-sm text-indigo-100 sm:text-base">
        Subscribe for the latest GST rate changes, compliance tips, and finance calculator guides — no spam, unsubscribe anytime.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full flex-1 rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-sm text-white placeholder-indigo-200 outline-none backdrop-blur focus:border-white focus:bg-white/20"
        />
        <button
          type="submit"
          className="shrink-0 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50 active:scale-95"
        >
          Subscribe
        </button>
      </form>
      {status === "success" && (
        <p className="mt-3 text-sm font-medium text-emerald-200 animate-fade-in" role="status">
          ✅ Thanks for subscribing! Please check your inbox to confirm.
        </p>
      )}
    </div>
  );
}

import { useState, type FormEvent } from "react";
import { useSEO } from "../hooks/useSEO";

export default function Contact() {
  useSEO({
    title: "Contact Us | Utility Tools Hub India",
    description: "Get in touch with Utility Tools Hub India for feedback, feature requests, partnership or support queries about our calculators.",
    path: "/contact",
  });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Front-end only demo — wire this up to Formspree, EmailJS or your backend of choice.
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">Contact Us</h1>
      <p className="mt-3 text-slate-500 dark:text-slate-400">
        Questions, feedback, or partnership enquiries? Fill out the form below and we'll get back to you as soon as possible.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
            Name
          </label>
          <input
            id="name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
            Message
          </label>
          <textarea
            id="message"
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            placeholder="How can we help?"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-95"
        >
          Send Message
        </button>
        {sent && (
          <p className="text-center text-sm font-medium text-emerald-600 dark:text-emerald-400" role="status">
            ✅ Thanks for reaching out! We'll respond within 1–2 business days.
          </p>
        )}
      </form>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/60">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">📧 Email</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">support@gstcalculator-india.example.com</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/60">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">📍 Location</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">India</p>
        </div>
      </div>
    </div>
  );
}

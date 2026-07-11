import { useEffect, useMemo, useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import FaqSection, { type FaqItem } from "../components/FaqSection";
import RelatedTools from "../components/RelatedTools";
import AdSlot from "../components/AdSlot";
import { useSEO } from "../hooks/useSEO";

const FAQS: FaqItem[] = [
  { question: "What is a QR Code Generator?", answer: "It converts text, URL, phone number or any data into a scannable QR code image that you can download and share." },
  { question: "Is QR generation free and private?", answer: "Yes, this tool uses an image API to generate QR codes client-side. The data stays in URL, fetch is done directly to QR server. We do not store your data. No sign-up required." },
  { question: "What data can I encode?", answer: "URLs, plain text, email, phone numbers, UPI payment links, WiFi credentials, addresses — any text up to ~4296 characters." },
  { question: "How to scan QR?", answer: "Open camera app on Android/iOS, point at QR, tap the notification. Or use Google Lens." },
  { question: "Can I use QR for business?", answer: "Yes! Print QR on invoices, visiting cards, menus, product labels to share website, UPI ID, GSTIN or contact info instantly." },
];

// Simple debounce hook for QR URL to avoid hammering external API on each keystroke
function useDebounced<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

function isValidHexColor(hex: string): boolean {
  return /^[0-9A-Fa-f]{6}$/.test(hex);
}

export default function QRGenerator() {
  useSEO({
    title: "QR Code Generator - Create Free QR Code for URL, Text, UPI | Instant",
    description: "Free QR code generator. Create QR codes for URLs, text, UPI payments, email, phone instantly. Download PNG, customizable size.",
    path: "/qr-code-generator",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "QR Code Generator",
      applicationCategory: "UtilitiesApplication",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    },
  });

  const [text, setText] = useState("https://gstcalculator-india.example.com/");
  const [size, setSize] = useState(300);
  const [fg, setFg] = useState("000000");
  const [bg, setBg] = useState("FFFFFF");
  const [error, setError] = useState<string>("");
  const [isDownloading, setIsDownloading] = useState(false);

  const debouncedText = useDebounced(text, 500);
  const debouncedFg = useDebounced(fg, 300);
  const debouncedBg = useDebounced(bg, 300);
  const debouncedSize = useDebounced(size, 300);

  const qrUrl = useMemo(() => {
    const t = debouncedText.trim();
    if (!t) return "";
    if (!isValidHexColor(debouncedFg)) return "";
    if (!isValidHexColor(debouncedBg)) return "";
    const s = Math.min(1000, Math.max(100, debouncedSize));
    const encoded = encodeURIComponent(t);
    return `https://api.qrserver.com/v1/create-qr-code/?size=${s}x${s}&data=${encoded}&color=${debouncedFg}&bgcolor=${debouncedBg}&margin=10`;
  }, [debouncedText, debouncedSize, debouncedFg, debouncedBg]);

  async function downloadQR() {
    if (!qrUrl) return;
    setError("");
    setIsDownloading(true);
    try {
      const res = await fetch(qrUrl, { mode: "cors" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `qr-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      setError("Failed to download QR. You can right-click the image and save instead.");
      console.error(e);
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "QR Code Generator" }]} className="mb-6" />
      <header className="animate-fade-in-up text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          QR Code <span className="text-indigo-600 dark:text-indigo-400">Generator</span>
        </h1>
        <p className="mt-3 text-slate-500 dark:text-slate-400">Create free QR codes for URLs, text, UPI, emails instantly.</p>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="animate-fade-in-up rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
          <div className="space-y-5">
            <div>
              <label htmlFor="qr-text" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Enter Text / URL / UPI</label>
              <textarea
                id="qr-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                placeholder="https://example.com or UPI ID: upi://pay?pa=yourname@upi..."
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                aria-describedby="qr-char-count"
              />
              <p id="qr-char-count" className="mt-1 text-xs text-slate-400">{text.length} chars • Max ~4296 recommended</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="qr-size" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Size: {size}px</label>
                <input id="qr-size" type="range" min={150} max={600} step={10} value={size} onChange={(e) => setSize(Number(e.target.value))} aria-label="QR size" className="mt-2 w-full accent-indigo-600" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="qr-fg" className="block text-xs font-semibold text-slate-600 dark:text-slate-400">FG Color</label>
                  <input id="qr-fg" type="color" value={`#${isValidHexColor(fg) ? fg : "000000"}`} onChange={(e) => setFg(e.target.value.replace("#", ""))} className="mt-1 h-10 w-full rounded-lg border border-slate-200 dark:border-slate-700" aria-label="Foreground color" />
                  {!isValidHexColor(fg) && <p className="mt-1 text-[10px] text-rose-500">Invalid hex</p>}
                </div>
                <div>
                  <label htmlFor="qr-bg" className="block text-xs font-semibold text-slate-600 dark:text-slate-400">BG Color</label>
                  <input id="qr-bg" type="color" value={`#${isValidHexColor(bg) ? bg : "FFFFFF"}`} onChange={(e) => setBg(e.target.value.replace("#", ""))} className="mt-1 h-10 w-full rounded-lg border border-slate-200 dark:border-slate-700" aria-label="Background color" />
                  {!isValidHexColor(bg) && <p className="mt-1 text-[10px] text-rose-500">Invalid hex</p>}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "URL Sample", value: "https://example.com" },
                { label: "UPI Sample", value: "upi://pay?pa=merchant@upi&pn=Shop&am=100&cu=INR" },
                { label: "WiFi Sample", value: "WIFI:T:WPA;S:MyWifi;P:password;;" },
              ].map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setText(preset.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-2 py-2 text-[11px] font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 truncate"
                  title={preset.value}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="animate-fade-in-up rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none flex flex-col items-center justify-center">
          {qrUrl ? (
            <>
              <div className="rounded-2xl bg-white p-4 shadow-inner border border-slate-100 dark:border-slate-800">
                <img src={qrUrl} alt={`QR code for ${debouncedText.slice(0, 40)}`} className="h-auto w-full max-w-[300px]" loading="lazy" decoding="async" />
              </div>
              <div className="mt-6 flex gap-3 w-full">
                <button type="button" onClick={downloadQR} disabled={isDownloading} className="flex-1 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition active:scale-95 disabled:opacity-60">
                  {isDownloading ? "Downloading..." : "Download PNG"}
                </button>
                <a href={qrUrl} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-xl border border-slate-300 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  Open Image
                </a>
              </div>
              {error && <p className="mt-3 text-xs text-rose-600 dark:text-rose-400 text-center" role="alert">{error}</p>}
              <p className="mt-3 text-xs text-slate-400 text-center">Tip: Right-click image → Save image as, if download fails. Works for invoices, UPI, business cards.</p>
            </>
          ) : (
            <p className="text-sm text-slate-400">{!debouncedText.trim() ? "Enter some text to generate QR" : "Invalid color code"}</p>
          )}
        </div>
      </div>

      <AdSlot className="mt-8" />
      <FaqSection faqs={FAQS} />
      <RelatedTools />
    </div>
  );
}

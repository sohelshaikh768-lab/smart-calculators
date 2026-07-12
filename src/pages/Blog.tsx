import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";
import { useSEO } from "../hooks/useSEO";
import AdSlot from "../components/AdSlot";

export default function Blog() {
  useSEO({
    title: "GST & Finance Blog | Calculator Guides for India",
    description:
      "Read practical guides on GST, percentage, EMI, SIP, FD, age calculations, QR codes and finance basics for India with formulas and examples.",
    path: "/blog",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Utility Tools Hub Blog",
      description: "Guides on GST, percentage, finance and utility calculators for India",
    },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="animate-fade-in-up text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">Knowledge Hub</h1>
        <p className="mx-auto mt-3 max-w-2xl text-slate-500 dark:text-slate-400">
          In-depth, easy-to-understand articles on GST, percentage, EMI, SIP, FD, age calculation, QR codes and finance in India — {blogPosts.length} guides and growing.
        </p>
      </header>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post, i) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            style={{ animationDelay: `${i * 40}ms` }}
            className="group animate-fade-in-up flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
          >
            <span className="w-fit rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
              {post.category}
            </span>
            <h2 className="mt-3 flex-1 font-bold text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
              {post.title}
            </h2>
            <p className="mt-2 line-clamp-3 text-sm text-slate-500 dark:text-slate-400">{post.excerpt}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </time>
              <span>{post.readTime}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <AdSlot />
      </div>
    </div>
  );
}

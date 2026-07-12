import { Link, useParams } from "react-router-dom";
import { getPostBySlug, allBlogPosts, type Block } from "../data/blogPosts";
import { useSEO } from "../hooks/useSEO";
import AdSlot from "../components/AdSlot";
import NotFound from "./NotFound";

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-8 text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">{block.text}</h2>;
    case "h3":
      return <h3 className="mt-6 text-lg font-bold text-slate-900 dark:text-white">{block.text}</h3>;
    case "p":
      return <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-400">{block.text}</p>;
    case "ul":
      return (
        <ul className="mt-3 list-disc space-y-1.5 pl-6 text-slate-600 dark:text-slate-400">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mt-3 list-decimal space-y-1.5 pl-6 text-slate-600 dark:text-slate-400">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote className="mt-4 rounded-r-xl border-l-4 border-indigo-500 bg-indigo-50 py-3 pl-4 pr-3 text-sm italic text-indigo-800 dark:bg-indigo-500/10 dark:text-indigo-200">
          {block.text}
        </blockquote>
      );
    case "table":
      return (
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                {block.headers.map((h) => (
                  <th key={h} className="px-4 py-2.5 font-semibold text-slate-700 dark:text-slate-200">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-t border-slate-100 dark:border-slate-800">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-2.5 text-slate-600 dark:text-slate-400">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug || "");

  const related = allBlogPosts.filter((p) => p.slug !== slug).slice(0, 3);
  const ctaHref = post?.calculator || "/gst-calculator";

  useSEO({
    title: post ? `${post.title} | UtilityHub India` : "Article Not Found | UtilityHub India",
    description: post?.description || "This article could not be found.",
    path: `/blog/${slug}`,
    type: "article",
    jsonLd: post
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          author: { "@type": "Organization", name: "UtilityHub India" },
        }
      : undefined,
  });

  if (!post) return <NotFound />;

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-slate-400" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-indigo-600">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/blog" className="hover:text-indigo-600">
          Blog
        </Link>{" "}
        / <span className="text-slate-500 dark:text-slate-400">{post.title}</span>
      </nav>

      <span className="w-fit rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
        {post.category}
      </span>
      <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl dark:text-white">{post.title}</h1>
      <div className="mt-4 flex items-center gap-3 text-sm text-slate-400">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
        </time>
        <span>•</span>
        <span>{post.readTime}</span>
      </div>

      <div className="mt-8">
        <AdSlot label="Sponsored" />
      </div>

      <div className="mt-6">
        {post.blocks.map((block, i) => (
          <BlockRenderer key={i} block={block} />
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-indigo-100 bg-indigo-50 p-6 text-center dark:border-indigo-900 dark:bg-indigo-500/10">
        <p className="font-semibold text-indigo-900 dark:text-indigo-200">Ready to try the related calculator?</p>
        <Link
          to={ctaHref}
          className="mt-3 inline-block rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Open the calculator →
        </Link>
      </div>

      <div className="mt-10">
        <AdSlot />
      </div>

      {post?.faqs && post.faqs.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <div className="mt-4 space-y-3">
            {post.faqs.map((faq, index) => (
              <details key={`${faq.question}-${index}`} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <summary className="cursor-pointer font-semibold text-slate-800 dark:text-slate-100">{faq.question}</summary>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {post?.relatedLinks && post.relatedLinks.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Related Tools</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {post.relatedLinks.map((item) => (
              <Link
                key={item.to + item.label}
                to={item.to}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Related Articles</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              >
                {p.title}
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/sanity/content";

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

const mono = "font-mono text-xs uppercase tracking-[0.14em]";

// Post card on /blog: cover image, title and read-more link, with the date and category in a footer row.
export default function BlogCard({ post }: { post: BlogPost }) {
  const href = `/blog/${post.slug}`;
  return (
    <article data-reveal className="group relative flex flex-col border border-ink/15 bg-white/40 transition-colors hover:bg-white/70">
      <div className="relative aspect-[16/10] overflow-hidden bg-ink/10">
        {post.image && (
          <Image
            src={post.image.src}
            alt={post.image.alt ?? ""}
            fill
            quality={85}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-[scale] duration-700 ease-out group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h2 className="text-balance text-[clamp(1.35rem,2vw,1.65rem)] leading-[1.15] tracking-[-0.01em]">
          {/* The link covers the whole card */}
          <Link href={href} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h2>
        <p className="mt-4 line-clamp-3 text-base leading-relaxed text-ink/70">{post.excerpt}</p>
        <p className={`mt-6 flex items-center gap-2 text-ink ${mono}`}>
          Read more
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </p>
      </div>
      <p className={`flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-ink/15 px-6 py-4 text-ink/55 sm:px-8 ${mono}`}>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        {post.category && (
          <>
            <span aria-hidden="true">·</span>
            <span>{post.category}</span>
          </>
        )}
      </p>
    </article>
  );
}

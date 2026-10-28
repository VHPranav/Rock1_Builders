import type { Metadata } from "next";
import { PortableText, type PortableTextBlock, type PortableTextComponents, toPlainText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/components/BlogCard";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TableOfContents from "@/components/TableOfContents";
import { defaultOgImage } from "@/content/site";
import { absolute, JsonLd, orgId } from "@/lib/schema";
import { type BlogImage, type BlogPost, getBlogPost, getBlogPosts, getSeo, seoMetadata } from "@/sanity/content";

const mono = "font-mono text-xs uppercase tracking-[0.14em]";

// Anchors for the H2s, keyed by block, shared by each heading and its table-of-contents link.
// Repeated heading text gets a numbered anchor so every link has its own target.
function headingIds(headings: PortableTextBlock[]) {
  const ids = new Map<string, string>();
  const used = new Set<string>();
  for (const heading of headings) {
    const base =
      toPlainText(heading)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || "section";
    let id = base;
    for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
    used.add(id);
    ids.set(heading._key ?? id, id);
  }
  return ids;
}

const bodyComponents = (ids: Map<string, string>): PortableTextComponents => ({
  block: {
    normal: ({ children }) => <p className="text-base leading-relaxed text-ink/75 sm:text-lg">{children}</p>,
    h2: ({ children, value }) => (
      <h2 id={ids.get(value._key ?? "")} className="scroll-mt-28 pt-6 text-balance text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[1.12] tracking-[-0.02em]">
        {children}
      </h2>
    ),
    h3: ({ children }) => <h3 className="pt-2 text-xl leading-snug tracking-[-0.01em] sm:text-2xl">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-ink-deep pl-6 text-[clamp(1.25rem,2.2vw,1.6rem)] leading-snug tracking-[-0.01em]">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed text-ink/75 marker:text-ink/40 sm:text-lg">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal space-y-2 pl-6 text-base leading-relaxed text-ink/75 marker:text-ink/40 sm:text-lg">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
    link: ({ children, value }) => {
      const href: string = value?.href ?? "#";
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          {...(external && { target: "_blank", rel: "noopener noreferrer" })}
          className="text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    photo: ({ value }: { value: Partial<BlogImage> }) =>
      value.src && value.width && value.height ? (
        <figure className="py-2">
          <Image src={value.src} alt={value.alt ?? ""} width={value.width} height={value.height} quality={85} sizes="(min-width: 1024px) 60vw, 100vw" className="h-auto w-full" />
          {value.caption && <figcaption className={`mt-3 text-ink/55 ${mono}`}>{value.caption}</figcaption>}
        </figure>
      ) : null,
  },
});

// Compact list for the sidebar (desktop) and below the article (mobile).
function RecentPosts({ posts }: { posts: BlogPost[] }) {
  return (
    <section aria-label="Recent posts">
      <p className={`text-ink/60 ${mono}`}>Recent posts</p>
      <ul className="mt-5 divide-y divide-ink/15 border-y border-ink/15">
        {posts.map((other) => (
          <li key={other.slug} className="group relative flex gap-4 py-4">
            <div className="relative aspect-[4/3] w-24 shrink-0 overflow-hidden bg-ink/10">
              {other.image && (
                <Image
                  src={other.image.src}
                  alt={other.image.alt ?? ""}
                  fill
                  quality={85}
                  sizes="96px"
                  className="object-cover transition-[scale] duration-700 ease-out group-hover:scale-105"
                />
              )}
            </div>
            <div className="min-w-0">
              <h2 className="line-clamp-3 text-base leading-snug tracking-[-0.01em]">
                <Link href={`/blog/${other.slug}`} className="transition-colors after:absolute after:inset-0 group-hover:text-ink/70">
                  {other.title}
                </Link>
              </h2>
              <p className={`mt-1.5 text-[0.65rem] text-ink/55 ${mono}`}>
                <time dateTime={other.date}>{formatDate(other.date)}</time>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export async function generateStaticParams() {
  return (await getBlogPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  const { ogImage } = await getSeo(`/blog/${slug}`);
  // A share image set in the post's SEO tab wins over the cover image.
  const image = ogImage ?? post.image?.src;
  return {
    title: `${post.title} – Rock1 Builders`,
    description: post.excerpt,
    // SEO tab values override the defaults above.
    ...(await seoMetadata(`/blog/${slug}`)),
    openGraph: {
      type: "article",
      url: "./",
      siteName: "Rock1 Builders",
      locale: "en_GB",
      publishedTime: post.date,
      images: [image ? { url: image, alt: post.title } : { url: defaultOgImage, width: 1200, height: 630, alt: "Life Bay Montenegro by Rock1 Builders" }],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const [post, posts] = await Promise.all([getBlogPost(slug), getBlogPosts()]);
  if (!post) notFound();

  const path = `/blog/${slug}`;
  const headingBlocks = post.body.filter((block) => block._type === "block" && block.style === "h2");
  const ids = headingIds(headingBlocks);
  const headings = headingBlocks.map((block) => ({ id: ids.get(block._key ?? "") ?? "", text: toPlainText(block) })).filter((h) => h.id);
  const recent = posts.filter((other) => other.slug !== slug).slice(0, 4);
  const hasSidebar = headings.length > 0 || recent.length > 0;

  const posting = {
    "@type": "BlogPosting",
    "@id": `${absolute(path)}#post`,
    url: absolute(path),
    headline: post.title,
    description: post.excerpt,
    articleBody: toPlainText(post.body),
    ...(post.category && { articleSection: post.category }),
    inLanguage: "en-GB",
    datePublished: post.date,
    image: absolute(post.image?.src ?? defaultOgImage),
    author: { "@id": orgId },
    publisher: { "@id": orgId },
  };

  return (
    <>
      <JsonLd
        path={path}
        name={post.title}
        description={post.excerpt}
        parents={[{ name: "Insights", path: "/blog" }]}
        image={post.image?.src}
        nodes={[posting]}
        extra={{ mainEntity: { "@id": posting["@id"] } }}
      />
      <main className="bg-linen text-ink">
        <Header overLight />

        {/* Title */}
        <header className="px-[clamp(1.25rem,6vw,6rem)] pt-36 text-center sm:pt-44">
          <Eyebrow className="justify-center">
            <Link href="/blog" className="transition-colors hover:text-ink/60">
              Insights
            </Link>
            {post.category && <span className="text-ink/55">/ {post.category}</span>}
          </Eyebrow>
          <h1 data-reveal className="mx-auto mt-8 max-w-5xl text-balance text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.04] tracking-[-0.03em]">
            {post.title}
          </h1>
          <p data-reveal className={`mt-6 text-ink/55 ${mono}`}>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </p>
        </header>

        <div className="grid gap-12 px-[clamp(1.25rem,6vw,6rem)] pb-32 pt-16 sm:pt-20 lg:grid-cols-12 lg:gap-10">
          {/* Sidebar: contents, then recent posts; stays in view while the article scrolls (desktop) */}
          {hasSidebar && (
            <aside aria-label="In this article" className={`lg:col-span-4 ${headings.length ? "" : "hidden lg:block"}`}>
              <div className="space-y-12 lg:sticky lg:top-28 lg:max-h-[calc(100svh-8rem)] lg:overflow-y-auto lg:overscroll-contain lg:pb-2 lg:[scrollbar-width:thin]">
                {headings.length > 0 && <TableOfContents headings={headings} />}
                {recent.length > 0 && (
                  <div className="hidden lg:block">
                    <RecentPosts posts={recent} />
                  </div>
                )}
              </div>
            </aside>
          )}

          {/* Article */}
          <article className={hasSidebar ? "min-w-0 lg:col-span-8" : "min-w-0 lg:col-span-8 lg:col-start-3"}>
            {post.image && (
              <figure data-reveal="image" className="relative mb-12 aspect-[16/9] overflow-hidden bg-ink/10">
                <Image src={post.image.src} alt={post.image.alt ?? ""} fill priority quality={85} sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
              </figure>
            )}
            <p className="text-[clamp(1.25rem,2.2vw,1.6rem)] leading-snug tracking-[-0.01em]">{post.excerpt}</p>
            <div className="mt-8 space-y-6">
              <PortableText value={post.body} components={bodyComponents(ids)} />
            </div>
            <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-ink/15 pt-8">
              <Button href="/contact-us">Contact our office</Button>
              <Button href="/blog" variant="ghost">
                All insights
              </Button>
            </div>
          </article>

          {/* Recent posts below the article (mobile) */}
          {recent.length > 0 && (
            <div className="lg:hidden">
              <RecentPosts posts={recent} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

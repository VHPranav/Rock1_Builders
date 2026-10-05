import type { Metadata } from "next";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { type NewsPost, newsroom } from "@/content/pages";

export const metadata: Metadata = {
  title: "Newsroom – Rock1 Builders",
  description: newsroom.intro,
};

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

const mono = "font-mono text-xs uppercase tracking-[0.14em]";

function Meta({ post }: { post: NewsPost }) {
  return (
    <p data-reveal className={`flex flex-wrap items-center gap-x-3 gap-y-2 text-ink/60 ${mono}`}>
      <span className="bg-ink-deep px-2 py-1 text-[0.65rem] text-white">{post.category}</span>
      {post.date ? <time dateTime={post.date}>{formatDate(post.date)}</time> : <span>Notice</span>}
      {post.video && <span className="text-ink/45">· Video {post.video.duration}</span>}
    </p>
  );
}

function Actions({ post }: { post: NewsPost }) {
  return (
    <div data-reveal className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-ink/15 pt-6">
      <Button href="/contact-us">Contact our office</Button>
      {post.source && (
        <a
          href={post.source.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-ink/60 underline-offset-4 transition-colors hover:text-ink hover:underline ${mono}`}
        >
          {post.source.label} ↗
        </a>
      )}
    </div>
  );
}

export default function NewsroomPage() {
  const posts = newsroom.posts;

  return (
    <>
      <main className="bg-linen text-ink">
        <Header overLight />
        <PageHero eyebrow={newsroom.eyebrow} title={newsroom.title} intro={newsroom.intro} />

        {/* Contents: every update at a glance, linking to its card */}
        <nav aria-label="Updates" className="px-[clamp(1.25rem,6vw,6rem)] pt-20">
          <p className={`text-ink/50 ${mono}`}>
            {posts.length} {posts.length === 1 ? "update" : "updates"}
          </p>
          <ol className="mt-4 border-t border-ink/15">
            {posts.map((post) => (
              <li key={post.slug} data-reveal className="border-b border-ink/15">
                <a
                  href={`#${post.slug}`}
                  className="group grid gap-1 py-4 sm:grid-cols-[11rem_9rem_1fr_auto] sm:items-baseline sm:gap-6"
                >
                  <span className={`text-ink/50 ${mono}`}>{post.date ? formatDate(post.date) : "Notice"}</span>
                  <span className={`text-ink/60 ${mono}`}>{post.category}</span>
                  <span className="text-lg tracking-[-0.01em] transition-colors group-hover:text-ink sm:text-xl">{post.title}</span>
                  <span aria-hidden="true" className="hidden text-ink/40 transition-transform duration-300 group-hover:translate-y-0.5 sm:block">
                    ↓
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Updates */}
        <div className="space-y-6 px-[clamp(1.25rem,6vw,6rem)] pb-32 pt-16 sm:space-y-8">
          {posts.map((post) =>
            post.video ? (
              // Video update: player beside the headline, full text underneath
              <article key={post.slug} id={post.slug} className="scroll-mt-28 border border-ink/15 bg-white/40 p-5 sm:p-8 lg:p-10">
                <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
                  <div className="lg:col-span-7">
                    <YouTubeEmbed id={post.video.id} title={post.video.title} label={`Watch · ${post.video.duration}`} />
                  </div>
                  <div className="lg:col-span-5">
                    <Meta post={post} />
                    <h2 data-reveal className="mt-5 text-balance text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.08] tracking-[-0.02em]">
                      {post.title}
                    </h2>
                    <p data-reveal className="mt-5 text-lg leading-relaxed text-ink/75">
                      {post.summary}
                    </p>
                  </div>
                </div>
                <div className="mt-10 grid gap-x-10 gap-y-5 border-t border-ink/15 pt-8 md:grid-cols-2">
                  {post.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)} data-reveal className="text-base leading-relaxed text-ink/75">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <Actions post={post} />
              </article>
            ) : (
              // Text update: date column and a lead summary
              <article
                key={post.slug}
                id={post.slug}
                className="grid scroll-mt-28 gap-8 border border-ink/15 bg-white/40 p-5 sm:p-8 md:grid-cols-12 md:gap-6 lg:p-10"
              >
                <div className="md:col-span-3">
                  <Meta post={post} />
                </div>
                <div className="md:col-span-9 lg:col-span-8">
                  <h2 data-reveal className="text-balance text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.08] tracking-[-0.02em]">
                    {post.title}
                  </h2>
                  <p data-reveal className="mt-5 text-lg leading-relaxed text-ink">
                    {post.summary}
                  </p>
                  <div className="mt-6 space-y-5">
                    {post.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 24)} data-reveal className="max-w-2xl text-base leading-relaxed text-ink/70">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <Actions post={post} />
                </div>
              </article>
            ),
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NewsEvents from "@/components/NewsEvents";
import PageHero from "@/components/PageHero";
import RevealWords from "@/components/RevealWords";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { contactCta } from "@/content/home";
import type { NewsPost } from "@/content/pages";
import { defaultOgImage } from "@/content/site";
import { absolute, JsonLd, orgId, videoNode } from "@/lib/schema";
import { getEvents, getListingHeadings, getNews, getSeo, type NewsEvent, seoMetadata } from "@/sanity/content";

export const generateMetadata = (): Promise<Metadata> => seoMetadata("/newsroom");

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

const mono = "font-mono text-xs uppercase tracking-[0.14em]";
const gutter = "px-[clamp(1.25rem,6vw,6rem)]";

// One BlogPosting per update; the posts have no pages of their own, so each URL is its card's anchor.
const postNodes = (posts: NewsPost[]) =>
  posts.flatMap((post) => {
  const url = absolute(`/newsroom#${post.slug}`);
  const video = post.video && videoNode({ name: post.video.title, description: post.summary, uploadDate: post.video.uploadDate, duration: post.video.duration, youtubeId: post.video.id }, "/newsroom");
  const posting = {
    "@type": "BlogPosting",
    "@id": `${url}-post`,
    url,
    mainEntityOfPage: { "@id": absolute("/newsroom#webpage") },
    headline: post.title,
    description: post.summary,
    articleBody: post.paragraphs.join("\n\n"),
    articleSection: post.category,
    inLanguage: "en-GB",
    ...(post.date && { datePublished: post.date }),
    image: post.image ? post.image.src : post.video ? `https://i.ytimg.com/vi/${post.video.id}/hqdefault.jpg` : absolute(defaultOgImage),
    author: { "@id": orgId },
    publisher: { "@id": orgId },
    ...(video && { video: { "@id": video["@id"] } }),
  };
  return video ? [posting, video] : [posting];
  });

// Only events with a name and a date qualify as schema.org Events.
const eventNodes = (events: NewsEvent[]) =>
  events
    .filter((event) => event.title && event.startDate)
    .map((event, i) => ({
      "@type": "Event",
      "@id": absolute(`/newsroom#event-${i + 1}`),
      name: event.title,
      startDate: event.startDate,
      ...(event.endDate && { endDate: event.endDate }),
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      ...(event.venue && { location: { "@type": "Place", name: event.venue, address: event.venue } }),
      ...(event.image && { image: event.image }),
      ...(event.instagram && { url: event.instagram.url }),
      organizer: { "@id": orgId },
    }));

// Image, video or a dark panel beside each post.
function PostMedia({ post }: { post: NewsPost }) {
  if (post.video) {
    return (
      <div className="flex items-center bg-ink-deep">
        <div className="w-full">
          <YouTubeEmbed id={post.video.id} title={post.video.title} label={`Watch · ${post.video.duration}`} />
        </div>
      </div>
    );
  }
  if (post.image) {
    return (
      <div className="relative aspect-[3/2] md:aspect-auto md:min-h-72">
        <Image src={post.image.src} alt={post.image.alt ?? ""} fill quality={85} sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
      </div>
    );
  }
  return (
    <div className="flex min-h-56 flex-col justify-between gap-10 bg-ink-deep p-6 text-white sm:p-8">
      <p className={`text-[0.65rem] text-white/70 ${mono}`}>Rock1 Builders · {post.category || "Announcement"}</p>
      <p className="text-balance text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.15] tracking-[-0.01em]">{post.panelText ?? post.title}</p>
    </div>
  );
}

function PostCard({ post }: { post: NewsPost }) {
  const hasMore = post.paragraphs.length > 0 || post.source;
  return (
    <article id={post.slug} data-reveal className="grid scroll-mt-28 overflow-hidden bg-white md:grid-cols-[2fr_3fr]">
      <PostMedia post={post} />
      <div className="p-6 sm:p-8 lg:p-10">
        <p className={`flex flex-wrap gap-x-3 text-ink/60 ${mono}`}>
          <span>{post.category}</span>
          {post.date ? <time dateTime={post.date}>{formatDate(post.date)}</time> : <span>Notice</span>}
        </p>
        <h3 className="mt-4 text-balance text-[clamp(1.5rem,2.4vw,2.125rem)] leading-[1.12] tracking-[-0.02em]">{post.title}</h3>
        <p className="mt-4 text-base leading-relaxed text-ink/70 sm:text-lg">{post.summary}</p>
        {hasMore && (
          // The full update opens in place: posts have no pages of their own.
          <details className="group/more mt-6">
            <summary className="w-fit cursor-pointer list-none text-sm text-ink underline underline-offset-4 transition-colors hover:text-ink/60 [&::-webkit-details-marker]:hidden">
              <span className="group-open/more:hidden">Read more →</span>
              <span className="hidden group-open/more:inline">Show less ↑</span>
            </summary>
            <div className="mt-6 space-y-4 border-t border-ink/15 pt-6">
              {post.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-base leading-relaxed text-ink/75">
                  {paragraph}
                </p>
              ))}
              {post.source && (
                <a
                  href={post.source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block text-ink/60 underline-offset-4 transition-colors hover:text-ink hover:underline ${mono}`}
                >
                  {post.source.label} ↗
                </a>
              )}
            </div>
          </details>
        )}
      </div>
    </article>
  );
}

export default async function NewsroomPage() {
  const [pageSeo, posts, events, { newsroom }] = await Promise.all([getSeo("/newsroom"), getNews(), getEvents(), getListingHeadings()]);

  // Events first, then company news; both always listed.
  const sections = [
    { id: "events", label: "Events & exhibitions" },
    { id: "company-news", label: "Company news" },
  ];
  const number = (id: string) => String(sections.findIndex((section) => section.id === id) + 1).padStart(2, "0");

  return (
    <>
      <JsonLd
        path="/newsroom"
        name="Newsroom"
        description={pageSeo.description ?? ""}
        type="CollectionPage"
        nodes={[...postNodes(posts), ...eventNodes(events)]}
      />
      <main className="bg-linen text-ink">
        <Header overLight />
        <PageHero eyebrow={newsroom.eyebrow} title={newsroom.title} intro={newsroom.intro} />

        {/* Contents: one link per section, under the heading */}
        <nav aria-label="Newsroom sections" className={`${gutter} pt-16`}>
          <ol className="grid border-b border-t border-b-ink/15 border-t-ink/50 sm:grid-cols-2">
            {sections.map((section, i) => (
              <li key={section.id} className={i ? "border-t border-ink/15 sm:border-t-0" : undefined}>
                <a href={`#${section.id}`} className="group block py-5 sm:pr-6">
                  <span className="font-mono text-xs text-ink/50">{number(section.id)}</span>
                  <span className="mt-2 block text-lg tracking-[-0.01em] transition-colors group-hover:text-ink/60">{section.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Events and exhibitions */}
        <section id="events" aria-labelledby="events-heading" className={`mt-20 scroll-mt-20 bg-ink/[0.04] ${gutter} py-24 sm:py-28`}>
          <div className="grid grid-cols-1 items-end gap-6 sm:grid-cols-[1fr_auto]">
            <div>
              <p className={`text-ink/55 ${mono}`}>{number("events")} · Events</p>
              <h2 id="events-heading" data-reveal="words" className="mt-4 text-balance text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.02em]">
                <RevealWords text="Events & exhibitions" />
              </h2>
            </div>
            {events.length > 0 && <NewsEvents events={events} today={new Date().toISOString().slice(0, 10)} />}
          </div>
          {!events.length && (
            <p data-reveal className="mt-10 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">
              Our upcoming property expos and events will be announced here.
            </p>
          )}
        </section>

        {/* Company news */}
        {posts.length > 0 && (
          <section id="company-news" aria-labelledby="news-heading" className={`scroll-mt-20 ${gutter} py-24 sm:py-28`}>
            <p className={`text-ink/55 ${mono}`}>{number("company-news")} · Company news</p>
            <h2 id="news-heading" data-reveal="words" className="mt-4 text-balance text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.02em]">
              <RevealWords text="Announcements & project updates" />
            </h2>
            <div className="mt-12 space-y-8">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Enquiry band */}
        <section className={`${gutter} pb-32`}>
          <div data-reveal className="flex flex-col gap-8 bg-ink-deep px-6 py-12 text-white sm:px-12 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] tracking-[-0.02em]">Interested in a property?</h2>
              <p className="mt-3 text-base leading-relaxed text-white/70">Ask about Life Bay or Ocean Crest and our team will get back to you.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button href="/contact-us" variant="light">
                Send an enquiry
              </Button>
              <a
                href={contactCta.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-white/30 px-6 py-3.5 font-mono text-xs font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-white/10"
              >
                {contactCta.whatsapp.label}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

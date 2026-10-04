import type { Metadata } from "next";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import { newsroom } from "@/content/pages";

export const metadata: Metadata = {
  title: "Newsroom – Rock1 Builders",
  description: newsroom.intro,
};

export default function NewsroomPage() {
  return (
    <>
      <main className="bg-linen text-ink">
        <Header overLight />
        <PageHero eyebrow={newsroom.eyebrow} title={newsroom.title} intro={newsroom.intro} />

        <section className="px-[clamp(1.25rem,6vw,6rem)] pb-32 pt-20">
          <ul className="border-t border-ink/15">
            {newsroom.posts.map((post) => (
              <li key={post.slug} id={post.slug} className="grid gap-8 border-b border-ink/15 py-14 md:grid-cols-12 md:gap-6">
                <p data-reveal className="font-mono text-xs uppercase tracking-[0.14em] text-ink/60 md:col-span-3">
                  {post.category}
                </p>
                <article className="md:col-span-8 md:col-start-5">
                  <h2 data-reveal className="text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.1] tracking-[-0.02em]">
                    {post.title}
                  </h2>
                  <div className="mt-8 space-y-5">
                    {post.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 24)} data-reveal className="max-w-2xl text-base leading-relaxed text-ink/75 sm:text-lg">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <div data-reveal className="mt-10">
                    <Button href="/contact-us">Contact our office</Button>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

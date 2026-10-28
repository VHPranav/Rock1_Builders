import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import { absolute, JsonLd, orgId } from "@/lib/schema";
import { type BlogPost, getBlogPosts, getListingHeadings, getSeo, seoMetadata } from "@/sanity/content";

export const generateMetadata = (): Promise<Metadata> => seoMetadata("/blog");

// One BlogPosting per post, each pointing to its own page.
const postNodes = (posts: BlogPost[]) =>
  posts.map((post) => ({
    "@type": "BlogPosting",
    "@id": `${absolute(`/blog/${post.slug}`)}#post`,
    url: absolute(`/blog/${post.slug}`),
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    ...(post.image && { image: post.image.src }),
    author: { "@id": orgId },
    publisher: { "@id": orgId },
  }));

export default async function BlogPage() {
  const [pageSeo, posts, { blog }] = await Promise.all([getSeo("/blog"), getBlogPosts(), getListingHeadings()]);

  return (
    <>
      <JsonLd path="/blog" name="Insights" description={pageSeo.description ?? ""} type="CollectionPage" nodes={postNodes(posts)} />
      <main className="bg-linen text-ink">
        <Header overLight />
        <PageHero eyebrow={blog.eyebrow} title={blog.title} intro={blog.intro} />

        <section aria-label="Articles" className="px-[clamp(1.25rem,6vw,6rem)] pb-32 pt-20">
          {posts.length ? (
            <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div data-reveal className="border border-ink/15 bg-white/40 p-8 sm:p-12">
              <p className="max-w-xl text-lg leading-relaxed text-ink/75">
                Our first articles are on their way. In the meantime, our team is happy to answer your questions directly.
              </p>
              <Button href="/contact-us" className="mt-8">
                Contact our office
              </Button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

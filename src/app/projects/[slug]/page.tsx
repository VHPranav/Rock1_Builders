import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import ContactCta from "@/components/ContactCta";
import Eyebrow from "@/components/Eyebrow";
import Footer from "@/components/Footer";
import GalleryGrid from "@/components/GalleryGrid";
import Header from "@/components/Header";
import MontenegroMap from "@/components/MontenegroMap";
import ParallaxLayer from "@/components/ParallaxLayer";
import RevealWords from "@/components/RevealWords";
import { projects } from "@/content/home";
import { montenegroMap } from "@/content/montenegroMap";
import { projectDetails, projectPhoto } from "@/content/projectDetails";

const items = projects.items;

export function generateStaticParams() {
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = items.find((project) => project.slug === slug);
  if (!item) return {};
  return { title: `${item.name} – Rock1 Builders`, description: item.summary };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const index = items.findIndex((project) => project.slug === slug);
  if (index === -1) notFound();

  const item = items[index];
  const detail = projectDetails[slug] ?? { overview: [item.description] };
  const previous = items[(index - 1 + items.length) % items.length];
  const next = items[(index + 1) % items.length];

  return (
    <>
      <main className="bg-linen text-ink">
        <Header />

        {/* Hero: full-bleed project image, or the muted loop from the client's film */}
        <section className="relative flex h-svh min-h-[560px] flex-col justify-end overflow-hidden bg-ink-deep text-white">
          {detail.heroVideo ? (
            <video
              src={detail.heroVideo.src}
              poster={detail.heroVideo.poster}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              className="absolute inset-0 size-full object-cover"
            />
          ) : (
            (detail.heroImage ?? item.image) && (
              <Image
                src={(detail.heroImage ?? item.image)!}
                alt={`${item.name}, ${item.location}`}
                fill
                priority
                quality={85}
                sizes="100vw"
                className="object-cover"
              />
            )
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 via-45% to-black/30" />
          <div className="relative px-[clamp(1.25rem,6vw,6rem)] pb-14 [text-shadow:0_1px_14px_rgb(0_0_0/0.45)] sm:pb-20">
            <p data-reveal className="font-mono text-xs uppercase tracking-[0.14em] text-white/75 sm:text-sm">
              {item.status} · {item.category} · {item.location}
            </p>
            <h1 data-reveal="words" className="mt-4 text-[clamp(3rem,9vw,8rem)] font-light leading-[0.95] tracking-[-0.03em]">
              <RevealWords text={item.name} />
            </h1>
            <div className="mt-8 flex flex-wrap items-end justify-between gap-8">
              <p data-reveal className="max-w-xl text-lg text-white/85 sm:text-xl">
                {item.summary}
              </p>
              <p data-reveal className="flex items-baseline gap-3">
                <span className="text-5xl font-light tracking-[-0.02em] sm:text-6xl">{item.stat.value}</span>
                <span className="font-mono text-sm uppercase tracking-[0.14em] text-white/70">{item.stat.label}</span>
              </p>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="px-[clamp(1.25rem,6vw,6rem)] py-24 sm:py-32">
          <div className="grid gap-12 md:grid-cols-12 md:gap-6">
            <div className="md:col-span-4">
              <Eyebrow>Overview</Eyebrow>
              {detail.logo && (
                // The client's logo files have a white ground; multiply drops it onto the linen.
                <Image
                  data-reveal
                  src={detail.logo.src}
                  alt={detail.logo.alt}
                  width={detail.logo.width}
                  height={detail.logo.height}
                  quality={85}
                  className="mt-10 h-auto w-44 mix-blend-multiply sm:w-52"
                />
              )}
              <dl className="mt-10 border-t border-ink/15">
                {[
                  { label: "Location", value: item.location },
                  { label: "Status", value: item.status },
                  { label: "Type", value: item.category },
                  { label: item.stat.label, value: item.stat.value },
                ].map((fact) => (
                  <div key={fact.label} data-reveal className="flex justify-between gap-6 border-b border-ink/15 py-4">
                    <dt className="font-mono text-xs uppercase tracking-[0.14em] text-ink/60">{fact.label}</dt>
                    <dd className="text-right text-base">{fact.value}</dd>
                  </div>
                ))}
              </dl>
              {/* Brochure download sits here when there is no villa section to carry it */}
              {!detail.villas &&
                detail.downloads?.map((download) => (
                  <div key={download.href} data-reveal className="mt-8">
                    <Button href={download.href} file>
                      {download.label}
                    </Button>
                  </div>
                ))}
            </div>
            <div className="space-y-8 md:col-span-7 md:col-start-6">
              {detail.tagline && (
                <p data-reveal className="font-mono text-xs uppercase tracking-[0.14em] text-ink/60 sm:text-sm">
                  {detail.tagline}
                </p>
              )}
              {detail.overview.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} data-reveal className="text-[clamp(1.25rem,2.2vw,1.75rem)] leading-snug tracking-[-0.01em]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Project photography and renders, otherwise one wide image band */}
        {detail.stills ? (
          <section className="px-[clamp(1.25rem,6vw,6rem)]">
            <ul className="grid gap-2 sm:grid-cols-2">
              {detail.stills.map((still) => (
                <li key={still.src} className={still.wide ? "sm:col-span-2" : ""}>
                  <figure>
                    <div data-reveal="image" className={`relative overflow-hidden ${still.wide ? "aspect-[4/3] sm:aspect-[21/9]" : "aspect-[4/3] sm:aspect-[16/10]"}`}>
                      <ParallaxLayer>
                        <Image src={still.src} alt={still.caption} fill quality={85} sizes={still.wide ? "100vw" : "(min-width: 640px) 50vw, 100vw"} className="object-cover" />
                      </ParallaxLayer>
                    </div>
                    <figcaption data-reveal className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-ink/60">
                      {still.caption}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </section>
        ) : detail.bandVideo ? (
          // Muted loop in place of the wide image band (Life Bay: Flow film of the real render)
          <section className="px-[clamp(1.25rem,6vw,6rem)]">
            <figure data-reveal="image" className="relative aspect-[4/3] overflow-hidden bg-ink/10 sm:aspect-video">
              <video
                src={detail.bandVideo.src}
                poster={detail.bandVideo.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={detail.bandVideo.label}
                className="absolute inset-0 size-full object-cover"
              />
            </figure>
          </section>
        ) : projectPhoto(slug, item.image) && (
          <section className="px-[clamp(1.25rem,6vw,6rem)]">
            <figure data-reveal="image" className="relative aspect-[4/3] overflow-hidden sm:aspect-[21/9]">
              <ParallaxLayer>
                <Image src={projectPhoto(slug, item.image)!} alt="" fill quality={85} sizes="100vw" className="object-cover object-bottom" />
              </ParallaxLayer>
            </figure>
          </section>
        )}

        {/* 3D film (Ocean Crest), with sound and controls; loads only when played */}
        {detail.film && (
          <section className="mt-24 bg-ink-deep px-[clamp(1.25rem,6vw,6rem)] py-24 text-white sm:mt-32 sm:py-32">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p data-reveal className="font-mono text-xs uppercase tracking-[0.14em] text-white/60 sm:text-sm">3D walkthrough</p>
                <h2 data-reveal="words" className="mt-4 text-[clamp(2rem,5vw,4rem)] font-light leading-none tracking-[-0.03em]">
                  <RevealWords text={detail.film.title} />
                </h2>
              </div>
              <p data-reveal className="max-w-sm text-base text-white/70">
                Exteriors, interiors and the sea-view setting, rendered by the project architects.
              </p>
            </div>
            <video
              data-reveal
              src={detail.film.src}
              poster={detail.film.poster}
              controls
              preload="none"
              playsInline
              className="mt-12 aspect-video w-full bg-black"
            >
              <a href={detail.film.src}>Watch the film</a>
            </video>
          </section>
        )}

        {/* Brochure pages (Life Bay), opening full-screen */}
        {detail.brochure && (
          <section className="pt-24 sm:pt-32">
            <div className="px-[clamp(1.25rem,6vw,6rem)]">
              <Eyebrow>From the brochure</Eyebrow>
            </div>
            <GalleryGrid
              images={detail.brochure.map((page) => ({ ...page, ratio: "page" }))}
              className="mt-12 grid gap-x-2 gap-y-6 px-[clamp(1.25rem,6vw,6rem)] sm:grid-cols-2 lg:grid-cols-3"
              captions="below"
            />
          </section>
        )}

        {/* Project facts (Ocean Crest) */}
        {detail.lists && (
          <section className="px-[clamp(1.25rem,6vw,6rem)] py-24 sm:py-32">
            <Eyebrow>The details</Eyebrow>
            <div className="mt-12 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {detail.lists.map((list) => (
                <div key={list.title}>
                  <h2 data-reveal className="border-b border-ink/15 pb-4 text-xl font-medium tracking-[-0.01em] sm:text-2xl">
                    {list.title}
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {list.items.map((entry) => (
                      <li key={entry} data-reveal className="flex gap-4 text-base leading-relaxed text-ink/75">
                        <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-current" />
                        {entry}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Site plan (Ocean Crest) */}
        {detail.sitePlan && (
          <section className="px-[clamp(1.25rem,6vw,6rem)] pb-24 sm:pb-32">
            <Eyebrow>Site plan</Eyebrow>
            {/* Near-square drawing: plan on the left, caption and link beside it on wide screens */}
            <figure className="mt-12 grid gap-8 md:grid-cols-12 md:items-end md:gap-6">
              <a href={detail.sitePlan.full} target="_blank" rel="noopener" data-reveal="image" className="group relative block aspect-[2400/2114] overflow-hidden bg-white md:col-span-8">
                <Image
                  src={detail.sitePlan.src}
                  alt={detail.sitePlan.caption}
                  fill
                  quality={85}
                  sizes="(min-width: 768px) 66vw, 100vw"
                  className="object-cover transition-[scale] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                />
              </a>
              <figcaption data-reveal className="flex flex-col items-start gap-6 text-base text-ink/70 md:col-span-4">
                <span>{detail.sitePlan.caption}</span>
                <a href={detail.sitePlan.full} target="_blank" rel="noopener" className="font-mono text-xs uppercase tracking-[0.14em] text-ink underline-offset-4 hover:underline">
                  View full size
                </a>
              </figcaption>
            </figure>
          </section>
        )}

        {/* Architect's floor plans: each PDF page as an image (opens full-screen), plus the PDF itself */}
        {detail.floorPlans && (
          <section className="pb-24 sm:pb-32">
            <div className="flex flex-wrap items-end justify-between gap-6 px-[clamp(1.25rem,6vw,6rem)]">
              <div>
                <Eyebrow>Floor plans</Eyebrow>
                <h2 data-reveal className="mt-6 text-[clamp(1.75rem,3.5vw,3rem)] font-light leading-[1.05] tracking-[-0.02em]">
                  {detail.floorPlans.title}
                </h2>
              </div>
              <div data-reveal>
                <Button href={detail.floorPlans.pdf.href} file>
                  {detail.floorPlans.pdf.label}
                </Button>
              </div>
            </div>
            <GalleryGrid
              images={detail.floorPlans.pages.map((page, i) => ({
                ...page,
                // Life Bay's sheets are landscape; Ocean Crest's are portrait (block plans)
                ratio: slug === "ocean-crest" ? "sheet-portrait" : "sheet",
                caption: `${page.caption} · ${i + 1}/${detail.floorPlans!.pages.length}`,
              }))}
              captions="below"
              className={`mt-12 grid gap-x-2 gap-y-6 px-[clamp(1.25rem,6vw,6rem)] sm:grid-cols-2 ${
                slug === "ocean-crest" ? "lg:grid-cols-5" : "lg:grid-cols-3"
              }`}
            />
          </section>
        )}

        {/* Villa types (Ocean Crest) */}
        {detail.villas && (
          <section className="px-[clamp(1.25rem,6vw,6rem)] pb-24 sm:pb-32">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <Eyebrow>Villa types</Eyebrow>
              {detail.downloads?.map((download) => (
                <Button key={download.href} href={download.href} file>
                  {download.label}
                </Button>
              ))}
            </div>
            <ul className="mt-12 grid gap-2 md:grid-cols-2">
              {detail.villas.map((villa) => (
                <li key={villa.name} data-reveal className="border border-ink/15 p-8 sm:p-10">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink/60">{villa.name}</p>
                  <p className="mt-3 text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-tight tracking-[-0.02em]">{villa.size}</p>
                  <dl className="mt-8 border-t border-ink/15">
                    {villa.specs.map((spec) => (
                      <div key={spec.label} className="flex justify-between gap-6 border-b border-ink/15 py-3">
                        <dt className="font-mono text-xs uppercase tracking-[0.12em] text-ink/55">{spec.label}</dt>
                        <dd className="max-w-[60%] text-right text-sm sm:text-base">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                  {villa.plans && (
                    // Floor plans have white grounds; multiply sets them on the card's linen.
                    <div className="mt-8 flex items-end justify-center gap-6 bg-linen">
                      {villa.plans.map((plan) => (
                        <figure key={plan.src} className="min-w-0 flex-1">
                          <Image
                            src={plan.src}
                            alt={`${villa.name}, ${plan.caption.toLowerCase()} plan`}
                            width={plan.width}
                            height={plan.height}
                            quality={85}
                            sizes="(min-width: 768px) 20vw, 45vw"
                            className="mx-auto h-auto max-h-80 w-auto mix-blend-multiply"
                          />
                          <figcaption className="mt-3 text-center font-mono text-xs uppercase tracking-[0.12em] text-ink/55">{plan.caption}</figcaption>
                        </figure>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Location map for the Montenegro projects: starts on this project, distances measured from it */}
        {montenegroMap.places.some((place) => place.id === slug) && (
          <MontenegroMap
            focus={slug}
            landing="coast"
            heading={{
              eyebrow: "Location",
              title: `${item.name} and what's around it.`,
              intro: `${item.name} sits on the Bar Riviera. Explore the beaches, old towns, airports and mountains within reach, with distances measured from the project.`,
            }}
          />
        )}

        {/* Previous / next */}
        <nav aria-label="More projects" className="grid gap-2 px-[clamp(1.25rem,6vw,6rem)] py-16 sm:grid-cols-2">
          {[
            { label: "Previous project", project: previous },
            { label: "Next project", project: next },
          ].map(({ label, project }) => (
            <Link key={label} href={project.href} data-reveal className="group flex items-center gap-6 border-t border-ink/15 pt-6">
              <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden bg-ink/10 sm:w-36">
                {projectPhoto(project.slug, project.image) && (
                  <Image
                    src={projectPhoto(project.slug, project.image)!}
                    alt=""
                    fill
                    quality={85}
                    sizes="160px"
                    className="object-cover transition-[scale] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                )}
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink/55">{label}</p>
                <p className="mt-2 text-xl tracking-[-0.01em] sm:text-2xl">{project.name}</p>
                <p className="mt-1 text-sm text-ink/60">{project.location}</p>
              </div>
            </Link>
          ))}
        </nav>

        <ContactCta />
      </main>
      <Footer />
    </>
  );
}

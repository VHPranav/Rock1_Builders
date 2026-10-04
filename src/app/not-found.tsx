import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <main className="flex min-h-svh flex-col bg-linen text-ink">
        <Header overLight />
        <section className="flex flex-1 flex-col items-center justify-center px-[clamp(1.25rem,6vw,6rem)] py-40 text-center">
          <Eyebrow>Page not found</Eyebrow>
          <h1 className="mt-8 text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] tracking-[-0.03em]">
            This page has moved, or never existed.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink/70 sm:text-lg">
            Let&apos;s get you back to somewhere useful.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            <Button href="/">Back to home</Button>
            <Button href="/projects" variant="ghost">
              View our projects
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

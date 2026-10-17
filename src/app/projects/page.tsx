import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProjectsIndex from "@/components/ProjectsIndex";
import { projects } from "@/content/home";
import { JsonLd, absolute } from "@/lib/schema";
import { seo, seoMetadata } from "@/content/seo";

export const metadata: Metadata = seoMetadata("/projects");

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        path="/projects"
        name="Projects"
        description={seo["/projects"].description}
        type="CollectionPage"
        extra={{
          mainEntity: {
            "@type": "ItemList",
            itemListElement: projects.items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, url: absolute(item.href) })),
          },
        }}
      />
      <main className="bg-linen text-ink">
        <Header overLight />
        <ProjectsIndex />
      </main>
      <Footer />
    </>
  );
}

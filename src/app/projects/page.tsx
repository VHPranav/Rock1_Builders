import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProjectsIndex from "@/components/ProjectsIndex";
import { JsonLd, absolute } from "@/lib/schema";
import { getProjectsSection, getSeo, seoMetadata } from "@/sanity/content";

export const generateMetadata = (): Promise<Metadata> => seoMetadata("/projects");

export default async function ProjectsPage() {
  const [pageSeo, projects] = await Promise.all([getSeo("/projects"), getProjectsSection()]);
  return (
    <>
      <JsonLd
        path="/projects"
        name="Projects"
        description={pageSeo.description ?? ""}
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
        <ProjectsIndex projects={projects} />
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProjectsIndex from "@/components/ProjectsIndex";
import { projects } from "@/content/home";
import { JsonLd, absolute } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Projects – Rock1 Builders",
  description: projects.intro,
};

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        path="/projects"
        name="Projects"
        description={projects.intro}
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

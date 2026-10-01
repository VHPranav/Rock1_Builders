import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProjectsIndex from "@/components/ProjectsIndex";
import { projects } from "@/content/home";

export const metadata: Metadata = {
  title: "Projects – Rock1 Builders",
  description: projects.intro,
};

export default function ProjectsPage() {
  return (
    <>
      <main className="bg-linen text-ink">
        <Header overLight />
        <ProjectsIndex />
      </main>
      <Footer />
    </>
  );
}

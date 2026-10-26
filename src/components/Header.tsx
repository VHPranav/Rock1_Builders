import HeaderBar from "@/components/HeaderBar";
import { getProjects, getSettings } from "@/sanity/content";

// Loads the project list (menus) and contact details (mobile menu) from Sanity for the client header.
export default async function Header({ overLight = false }: { overLight?: boolean }) {
  const [projects, contact] = await Promise.all([getProjects(), getSettings()]);
  return <HeaderBar overLight={overLight} projects={projects} contact={contact} />;
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 85 for grainy editorial photography — 75 visibly smears the film grain.
    qualities: [75, 85],
  },

  // Old WordPress addresses → new pages, so existing links and search results keep working.
  async redirects() {
    const project = (from: string, slug: string) => ({
      source: `/works/${from}`,
      destination: `/projects/${slug}`,
      permanent: true,
    });
    return [
      project("life-bay-montenegro", "life-bay"),
      project("ocean-crest", "ocean-crest"),
      project("ocean-crust", "ocean-crest"),
      project("royal-habitat", "royal-habitat"),
      project("rock-star-vazhakkalla", "rock-star-vazhakkala"),
      project("rock-valley-kakkanad", "rock-valley"),
      project("misty-blue", "misty-blue"),
      // Old per-project and listing pages that now live on the projects page
      { source: "/misty-blue", destination: "/projects/misty-blue", permanent: true },
      { source: "/rock-star-vazhakkala", destination: "/projects/rock-star-vazhakkala", permanent: true },
      { source: "/rock-valley-kakkanad", destination: "/projects/rock-valley", permanent: true },
      { source: "/ocean-crest", destination: "/projects/ocean-crest", permanent: true },
      { source: "/:listing(project|ongoing|completed|upcoming|work-projects)", destination: "/projects", permanent: true },
    ];
  },
};

export default nextConfig;

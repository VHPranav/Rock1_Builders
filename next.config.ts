import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 85 for grainy editorial photography — 75 visibly smears the film grain.
    qualities: [75, 85],
    // YouTube thumbnails for click-to-play embeds (About Us film)
    remotePatterns: [new URL("https://i.ytimg.com/vi/**")],
  },

  // Old WordPress addresses → new pages, so existing links and search results keep working.
  async redirects() {
    const project = (from: string, slug: string) => ({
      source: `/works/${from}`,
      destination: `/projects/${slug}`,
      permanent: true,
    });
    return [
      // One host only: www → apex, matching the canonical tags.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.rock1builders.com" }],
        destination: "https://rock1builders.com/:path*",
        permanent: true,
      },
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
      // Old category pages land on their section of the projects page
      { source: "/ongoing", destination: "/projects#ongoing", permanent: true },
      { source: "/completed", destination: "/projects#completed", permanent: true },
      { source: "/upcoming", destination: "/projects#newly-launched", permanent: true },
      { source: "/:listing(project|work-projects)", destination: "/projects", permanent: true },
    ];
  },
};

export default nextConfig;

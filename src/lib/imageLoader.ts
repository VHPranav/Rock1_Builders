// Images served as-is, skipping Vercel's resizer (the Hobby plan allows 5,000 resizes a month). Only for small files.
const asIs = ["/images/projects/life-bay/render.webp"];

export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (asIs.includes(src)) return src;
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
}

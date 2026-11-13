"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const SCRIPT_SRC = "https://www.instagram.com/embed.js";

// Loads embed.js once, or asks it to swap in any new blockquotes.
export function useInstagramEmbeds(deps: unknown[]) {
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
      return;
    }
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// Instagram's official embed: the <blockquote> is swapped for an auto-sized player by embed.js.
// The blockquote is set as raw HTML so React never re-renders over the player Instagram puts there.
export function InstagramEmbed({ post, className = "" }: { post: { code: string; url: string }; className?: string }) {
  return (
    <div
      className={`min-w-0 [&_iframe]:!min-w-0 [&_iframe]:!max-w-full ${className}`}
      // URL is rebuilt from the post code (letters, digits, - and _), so it is safe in HTML.
      dangerouslySetInnerHTML={{
        __html: `<blockquote class="instagram-media" data-instgrm-permalink="${post.url}?utm_source=ig_embed" data-instgrm-version="14" style="margin:0;width:100%;min-width:0;max-width:100%;border:1px solid rgb(0 0 0 / 0.12);background:#fff"><a href="${post.url}" target="_blank" rel="noopener noreferrer" style="display:block;padding:24px;font:14px/1.4 sans-serif;color:#1f2a33">View this post on Instagram</a></blockquote>`,
      }}
    />
  );
}

export default function InstagramEmbeds({ posts }: { posts: { code: string; url: string }[] }) {
  useInstagramEmbeds([posts]);
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <InstagramEmbed key={post.code} post={post} />
      ))}
    </div>
  );
}

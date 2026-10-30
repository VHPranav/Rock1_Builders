"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const SCRIPT_SRC = "https://www.instagram.com/embed.js";

// Instagram's official embed: each <blockquote> is swapped for an auto-sized player by embed.js.
// The blockquote is set as raw HTML so React never re-renders over the player Instagram puts there.
export default function InstagramEmbeds({ posts }: { posts: { code: string; url: string }[] }) {
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
  }, [posts]);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <div
          key={post.code}
          className="min-w-0 [&_iframe]:!min-w-0 [&_iframe]:!max-w-full"
          // URL is rebuilt from the post code (letters, digits, - and _), so it is safe in HTML.
          dangerouslySetInnerHTML={{
            __html: `<blockquote class="instagram-media" data-instgrm-permalink="${post.url}?utm_source=ig_embed" data-instgrm-version="14" style="margin:0;width:100%;min-width:0;max-width:100%;border:1px solid rgb(0 0 0 / 0.12);background:#fff"><a href="${post.url}" target="_blank" rel="noopener noreferrer" style="display:block;padding:24px;font:14px/1.4 sans-serif;color:#1f2a33">View this post on Instagram</a></blockquote>`,
          }}
        />
      ))}
    </div>
  );
}

import { Fragment, type CSSProperties } from "react";

// Splits a heading into masked words for the [data-reveal="words"] intro. Use inside the heading:
// <h2 data-reveal="words"><RevealWords text="..." /></h2>. Real spaces stay between words, so the
// text reads and wraps normally.
export default function RevealWords({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="reveal-word">
            <span style={{ "--i": i } as CSSProperties}>{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}

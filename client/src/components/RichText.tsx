import { Fragment } from "react";
import { Link } from "wouter";

/**
 * RichText: renders case-study copy with inline links written as
 * [text](href). Internal paths ("/work/kosign") use the router; anything
 * else opens in a new tab. Other text is rendered as-is.
 */

export const linkClass =
  "underline decoration-border underline-offset-2 hover:text-muted-foreground transition-colors";

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export default function RichText({ text }: { text: string }) {
  const parts: (string | { label: string; href: string })[] = [];
  let last = 0;
  LINK.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = LINK.exec(text)) !== null) {
    const i = m.index;
    if (i > last) parts.push(text.slice(last, i));
    parts.push({ label: m[1], href: m[2] });
    last = i + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));

  return (
    <>
      {parts.map((p, i) =>
        typeof p === "string" ? (
          <Fragment key={i}>{p}</Fragment>
        ) : p.href.startsWith("/") ? (
          <Link key={i} href={p.href} className={linkClass}>
            {p.label}
          </Link>
        ) : (
          <a key={i} href={p.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {p.label}
          </a>
        )
      )}
    </>
  );
}

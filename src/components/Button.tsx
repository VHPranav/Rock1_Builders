import Link from "next/link";

// One button style site-wide; only the colour changes per variant.
const variants = {
  dark: "bg-ink-deep text-white hover:bg-ink",
  light: "bg-sand text-ink-deep hover:bg-white",
  ghost: "bg-transparent text-ink-deep hover:bg-ink/5",
} as const;

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  // Files (PDFs etc.) skip client-side routing and open in a new tab.
  file?: boolean;
  onClick?: () => void;
};

export default function Button({ href, children, variant = "dark", className = "", file = false, onClick }: ButtonProps) {
  const Tag = file ? "a" : Link;
  return (
    <Tag
      href={href}
      onClick={onClick}
      {...(file && { target: "_blank", rel: "noopener" })}
      className={`group inline-flex items-center gap-3 px-6 py-3.5 font-mono text-xs font-medium uppercase tracking-[0.12em] transition-colors ${variants[variant]} ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 18 14"
        className="h-3 w-4 transition-transform group-hover:translate-x-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <path d="M1 0v8h15M12 4l4 4-4 4" />
      </svg>
      {children}
    </Tag>
  );
}

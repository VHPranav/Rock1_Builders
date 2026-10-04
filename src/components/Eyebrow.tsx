// The small monospace section label with a diamond, used across the site.
export default function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      data-reveal
      className={`flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.14em] sm:text-sm ${className}`}
    >
      <span aria-hidden="true" className="size-1.5 rotate-45 bg-current" />
      {children}
    </p>
  );
}

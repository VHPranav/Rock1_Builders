import Link from "next/link";

export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="grid grid-cols-3 items-center px-4 py-5 text-white sm:px-8 sm:py-6">
        <div>
          <button
            type="button"
            className="text-xs font-medium uppercase tracking-[0.08em] underline-offset-4 hover:underline"
          >
            EN
          </button>
        </div>

        <Link href="/" className="justify-self-center text-center leading-none" aria-label="Rock1 Builders home">
          <span className="block text-xl font-medium uppercase tracking-[0.2em] sm:text-2xl">Rock1</span>
          <span className="mt-1 block text-[0.55rem] uppercase tracking-[0.5em] sm:text-[0.6rem]">Builders</span>
        </Link>

        <div className="flex items-center justify-end gap-4 sm:gap-6">
          <Link
            href="/contact-us"
            className="hidden border-b border-white/80 pb-1 text-xs font-medium uppercase tracking-[0.08em] transition-colors hover:border-transparent sm:inline-block"
          >
            Enquire
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            className="grid size-10 place-items-center rounded-full bg-white/20 backdrop-blur-md transition-colors hover:bg-white/35"
          >
            <span className="flex w-4 flex-col gap-[5px]">
              <span className="h-px w-full bg-white" />
              <span className="h-px w-full bg-white" />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

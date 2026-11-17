import Link from "next/link";
import { Logo } from "@/components/layout/Logo";

/**
 * Dark-topped so the transparent navbar (ivory text) reads correctly,
 * consistent with every other page's dark header band.
 */
export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center bg-charcoal px-6 py-40 text-center text-ivory">
      <Logo dark className="mb-10" />
      <p className="eyebrow text-gold-soft">Lost in the streets</p>
      <h1 className="mt-4 max-w-2xl text-balance font-serif text-5xl font-light sm:text-6xl">
        This page isn&apos;t{" "}
        <em className="italic text-gold-soft">on our map</em>
      </h1>
      <p className="mt-5 max-w-md text-[15px] text-ivory/65">
        The page you&apos;re looking for doesn&apos;t exist — but plenty of
        property across Trivandrum does.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/properties"
          className="inline-flex h-13 items-center bg-gradient-to-r from-gold-soft via-gold to-gold-deep px-8 text-[12px] font-semibold uppercase tracking-[0.18em] text-charcoal shadow-[0_2px_14px_rgba(212,175,55,0.3)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(212,175,55,0.45)] active:scale-[0.98]"
        >
          Browse Properties
        </Link>
        <Link
          href="/"
          className="inline-flex h-13 items-center border border-ivory/30 px-8 text-[12px] font-medium uppercase tracking-[0.18em] text-ivory transition-colors hover:border-ivory/70 hover:bg-ivory/10"
        >
          Back Home
        </Link>
      </div>
    </section>
  );
}

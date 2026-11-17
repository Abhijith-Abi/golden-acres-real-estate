import Link from "next/link";
import { Logo } from "@/components/layout/Logo";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] flex-col items-center justify-center px-6 py-40 text-center">
      <Logo className="mb-10" />
      <p className="eyebrow">Lost in the streets</p>
      <h1 className="mt-4 font-serif text-5xl font-light text-charcoal sm:text-6xl">
        This page isn&apos;t <em className="italic text-gold-deep">on our map</em>
      </h1>
      <p className="mt-5 max-w-md text-[15px] text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist — but plenty of
        property across Trivandrum does.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/properties"
          className="inline-flex h-13 items-center bg-charcoal px-8 text-[12px] font-medium uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-charcoal-soft"
        >
          Browse Properties
        </Link>
        <Link
          href="/"
          className="inline-flex h-13 items-center border border-charcoal/20 px-8 text-[12px] font-medium uppercase tracking-[0.18em] text-charcoal transition-colors hover:border-charcoal/60"
        >
          Back Home
        </Link>
      </div>
    </section>
  );
}

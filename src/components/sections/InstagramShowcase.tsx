import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/motion-primitives";
import { InstagramIcon } from "@/components/ui/icons";
import { instagramPosts, instagramProfileUrl } from "@/data/instagram";

/**
 * Instagram showcase — image grid when posts are configured
 * (src/data/instagram.ts), plus a permanent profile CTA.
 */
export function InstagramShowcase() {
  return (
    <section className="py-24 lg:py-32" aria-labelledby="instagram-heading">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="On Instagram"
            title={
              <span id="instagram-heading">
                Fresh listings, <em className="italic text-gold-deep">posted daily</em>
              </span>
            }
            lede="Follow the walk-throughs, site visits and new arrivals as they happen."
          />
          <Reveal delay={0.15}>
            <a
              href={instagramProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-charcoal px-6 py-3.5 text-[12px] font-medium uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-charcoal-soft"
            >
              <InstagramIcon className="size-4" />
              @golden_acres_realestates
            </a>
          </Reveal>
        </div>

        {instagramPosts.length > 0 ? (
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {instagramPosts.map((post, i) => (
              <Reveal key={post.image + i} delay={i * 0.05}>
                <a
                  href={post.href ?? instagramProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-square overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  aria-label={`View on Instagram: ${post.alt}`}
                >
                  <Image
                    src={post.image}
                    alt={post.alt}
                    fill
                    sizes="(min-width: 640px) 25vw, 50vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-charcoal/45 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                    <InstagramIcon className="size-6 text-ivory" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="mt-14 border border-charcoal/10 bg-secondary/60 p-10 text-center">
            <p className="font-serif text-2xl font-light italic text-gold-deep">
              Follow @golden_acres_realestates
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
              Our latest walk-throughs and listings live on Instagram. Approved
              post images will appear here — add them in{" "}
              <code className="text-xs">src/data/instagram.ts</code>.
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

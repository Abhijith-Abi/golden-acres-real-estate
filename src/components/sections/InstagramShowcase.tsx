import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/motion-primitives";
import { InstagramIcon } from "@/components/ui/icons";
import { instagramPosts, instagramProfileUrl } from "@/data/instagram";
import Image from "next/image";

/**
 * Locally hosted post thumbnails avoid broken third-party embeds while linking
 * visitors to the original Instagram posts.
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
                Follow us on <em className="italic text-gold-deep">Instagram</em>
              </span>
            }
            lede="See recent property updates from Golden Acres Real Estates."
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

        {instagramPosts.length > 0 && (
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {instagramPosts.map((post, i) => (
              <Reveal key={post.href} delay={i * 0.05} className="mx-auto w-full max-w-[400px]">
                <a
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${post.alt}, posted ${post.publishedAt} — view on Instagram`}
                  className="group relative block aspect-[3/4] overflow-hidden bg-charcoal/5"
                >
                  <Image
                    src={post.image}
                    alt={post.alt}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-charcoal/0 text-white opacity-0 transition-all duration-300 group-hover:bg-charcoal/25 group-hover:opacity-100 group-focus-visible:bg-charcoal/25 group-focus-visible:opacity-100">
                    <span className="inline-flex items-center gap-2 bg-charcoal px-4 py-3 text-xs uppercase tracking-[0.16em]">
                      <InstagramIcon className="size-4" />
                      View on Instagram
                    </span>
                  </span>
                </a>
                <p className="mt-2 text-center text-xs text-muted-foreground">{post.publishedAt}</p>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

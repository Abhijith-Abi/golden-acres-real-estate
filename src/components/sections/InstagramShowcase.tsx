import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/motion-primitives";
import { InstagramIcon } from "@/components/ui/icons";
import { instagramPosts, instagramProfileUrl } from "@/data/instagram";

/**
 * Official Instagram embeds are lazy-loaded so they do not block the initial
 * page render. The profile CTA remains available when embeds are blocked.
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
                <iframe
                  src={`${post.href.replace(/\/$/, "")}/embed/`}
                  title={`Instagram post: ${post.alt} — ${post.publishedAt}`}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  className="h-[640px] w-full border-0 bg-white"
                />
                <p className="mt-2 text-center text-xs text-muted-foreground">{post.publishedAt}</p>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

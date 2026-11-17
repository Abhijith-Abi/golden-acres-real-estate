"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { navigation } from "@/data/navigation";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

/**
 * Scroll-aware navbar.
 *  - Over the home hero (page top): transparent, ivory text.
 *  - After scroll / on inner pages: warm glass panel, charcoal text.
 */
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Render-time state adjustment: a navigation resets the scroll position,
  // so the "scrolled" style must reset too — avoids a wrong-colour navbar
  // flash when moving between dark-hero and light pages.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setScrolled(false);
  }

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  // Every page starts with a dark header band (hero / PageHero), so the
  // transparent top-of-page navbar always uses light text. Once scrolled,
  // the warm glass panel takes over with charcoal text.
  const overHero = !scrolled && !menuOpen;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-charcoal/[0.08] bg-background/95 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="container-site flex h-20 items-center justify-between lg:h-24">
          <Logo dark={overHero} />

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative py-2 text-[12.5px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-right after:scale-x-0 after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100",
                    overHero
                      ? "text-ivory/85 hover:text-ivory after:bg-gold-soft"
                      : "text-charcoal/75 hover:text-charcoal after:bg-gold-deep",
                    active && (overHero ? "text-ivory" : "text-charcoal") &&
                      "after:scale-x-100 after:origin-left"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className={cn(
                "hidden h-11 items-center px-6 text-[12px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 sm:inline-flex",
                overHero
                  ? "bg-gold-soft text-charcoal hover:bg-ivory"
                  : "bg-charcoal text-ivory hover:bg-charcoal-soft"
              )}
            >
              Enquire Now
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className={cn(
                "flex size-11 items-center justify-center border transition-colors lg:hidden",
                overHero
                  ? "border-ivory/30 text-ivory"
                  : "border-charcoal/20 text-charcoal"
              )}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

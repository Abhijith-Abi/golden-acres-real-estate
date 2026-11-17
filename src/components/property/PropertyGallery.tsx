"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Swiper as SwiperCore, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode, A11y, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Property } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Property gallery — main Swiper with synced thumbnail rail.
 * Fully keyboard accessible, no autoplay.
 */
export function PropertyGallery({ property }: { property: Property }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const mainRef = useRef<SwiperType | null>(null);

  return (
    <div className="group/gallery relative">
      <SwiperCore
        modules={[Navigation, Thumbs, FreeMode, A11y, Keyboard]}
        onSwiper={(s) => (mainRef.current = s)}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        spaceBetween={0}
        keyboard={{ enabled: true }}
        a11y={{
          prevSlideMessage: "Previous image",
          nextSlideMessage: "Next image",
        }}
        onSlideChange={(s) => setActiveIndex(s.activeIndex)}
        className="aspect-[16/10] w-full bg-secondary sm:aspect-[16/9]"
      >
        {property.images.map((src, i) => (
          <SwiperSlide key={src + i}>
            <div className="relative h-full w-full">
              <Image
                src={src}
                alt={`${property.title} — image ${i + 1} of ${property.images.length}`}
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </SwiperCore>

      {/* Custom navigation arrows */}
      <div className="pointer-events-none absolute inset-x-4 top-[calc(50%-3rem)] z-10 hidden sm:block">
        <div className="flex justify-between opacity-0 transition-opacity duration-300 group-hover/gallery:opacity-100">
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => mainRef.current?.slidePrev()}
            className="pointer-events-auto flex size-11 items-center justify-center bg-charcoal/70 text-ivory backdrop-blur-sm transition-colors hover:bg-charcoal"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => mainRef.current?.slideNext()}
            className="pointer-events-auto flex size-11 items-center justify-center bg-charcoal/70 text-ivory backdrop-blur-sm transition-colors hover:bg-charcoal"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      {/* Counter */}
      <div className="absolute bottom-4 right-4 z-10 bg-charcoal/75 px-3 py-1.5 text-[11px] font-medium tracking-[0.2em] text-ivory backdrop-blur-sm">
        {String(activeIndex + 1).padStart(2, "0")} / {String(property.images.length).padStart(2, "0")}
      </div>

      {/* Thumbnails */}
      <SwiperCore
        modules={[Thumbs, FreeMode, A11y]}
        onSwiper={setThumbsSwiper}
        slidesPerView={4}
        spaceBetween={8}
        freeMode
        watchSlidesProgress
        breakpoints={{ 640: { slidesPerView: 5 } }}
        className="mt-2.5 w-full"
      >
        {property.images.map((src, i) => (
          <SwiperSlide key={src + i} className="!w-auto">
            <button
              type="button"
              aria-label={`View image ${i + 1}`}
              className={cn(
                "relative block aspect-[4/3] w-20 cursor-pointer overflow-hidden border-2 transition-opacity sm:w-24",
                i === activeIndex
                  ? "border-gold"
                  : "border-transparent opacity-60 hover:opacity-100"
              )}
              onClick={() => mainRef.current?.slideTo(i)}
            >
              <Image src={src} alt="" fill sizes="96px" className="object-cover" />
            </button>
          </SwiperSlide>
        ))}
      </SwiperCore>
    </div>
  );
}

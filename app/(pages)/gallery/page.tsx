"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  KeyboardEvent,
} from "react";
import { X, ArrowLeft, ArrowRight, Camera } from "lucide-react";
import Header from "@/app/components/sections/Header";
import Footer from "@/app/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { COLORS } from "@/app/theme/colors";
import Image from "next/image";

/* ================== Types ================== */
interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: Category;
  title: string;
  height: "tall" | "medium" | "square";
}
type Category =
  | "All"
  | "Villas"
  | "Interiors"
  | "Views"
  | "Dining"
  | "Wellness"
  | "Beach"
  | "Gardens"
  | "Amenities";

/* ================== Data ================== */
const GALLERY_IMAGES: GalleryImage[] = [
  { id: 1, src: "/images/ocean-haven/gallery/1.webp", alt: "Villa Pool at Night", category: "Villas", title: "Ocean Haven Pool", height: "medium" },
  { id: 2, src: "/images/ocean-haven/gallery/2.webp", alt: "Bedroom Interior", category: "Interiors", title: "Cozy Bedroom", height: "square" },
  { id: 3, src: "/images/ocean-haven/gallery/3.webp", alt: "Living Area with TV", category: "Interiors", title: "Modern Living Room", height: "square" },
  { id: 4, src: "/images/ocean-haven/gallery/4.webp", alt: "Evening View with Palm Trees", category: "Views", title: "Evening Vibes", height: "tall" },
  { id: 5, src: "/images/ocean-edge/gallery/1.webp", alt: "Outdoor Dining Area", category: "Dining", title: "Terrace Dining", height: "medium" },
  { id: 6, src: "/images/ocean-edge/gallery/2.webp", alt: "Garden Walkway", category: "Gardens", title: "Garden Retreat", height: "tall" },
  { id: 7, src: "/images/ocean-edge/gallery/3.webp", alt: "Bright Bedroom Interior", category: "Interiors", title: "Sunlit Bedroom", height: "square" },
  { id: 8, src: "/images/ocean-edge/gallery/4.webp", alt: "Dining Area", category: "Dining", title: "Indoor Dining", height: "medium" },
  { id: 9, src: "/images/ocean-edge/gallery/5.webp", alt: "Poolside View", category: "Amenities", title: "Pool Escape", height: "medium" },
  { id: 10, src: "/images/ocean-edge/gallery/6.webp", alt: "Seaside Deck", category: "Views", title: "Ocean Deck", height: "tall" },
];

// Derived categories (keeps source single)
const CATEGORY_OPTIONS: Category[] = [
  "All",
  ...Array.from(new Set(GALLERY_IMAGES.map((g) => g.category))).sort(),
] as Category[];

/* ================== Component ================== */
const GalleryPage: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const heroRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);

  /* -------- Scroll Handler (rAF throttled) -------- */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* -------- Filtered Images (memo) -------- */
  const filteredImages = useMemo(
    () =>
      selectedCategory === "All"
        ? GALLERY_IMAGES
        : GALLERY_IMAGES.filter((img) => img.category === selectedCategory),
    [selectedCategory]
  );

  /* -------- Intersection Observer for reveal animation -------- */
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
            if (entry.isIntersecting) {
              el.classList.add("reveal-visible");
              observerRef.current?.unobserve(el);
            }
        });
      },
      { threshold: 0.12, rootMargin: "40px 0px 0px 0px" }
    );

    itemRefs.current.forEach((node) => {
      if (node) observerRef.current?.observe(node);
    });

    return () => observerRef.current?.disconnect();
  }, [filteredImages]);

  /* -------- Lightbox Controls -------- */
  const openLightbox = useCallback((img: GalleryImage) => {
    setLightboxImage(img);
    setIsLightboxOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    setLightboxImage(null);
    document.body.style.overflow = "";
  }, []);

  const navigateLightbox = useCallback(
    (dir: "next" | "prev") => {
      if (!lightboxImage) return;
      const idx = filteredImages.findIndex((i) => i.id === lightboxImage.id);
      if (idx === -1) return;
      const nextIndex =
        dir === "next"
          ? (idx + 1) % filteredImages.length
          : (idx - 1 + filteredImages.length) % filteredImages.length;
      setLightboxImage(filteredImages[nextIndex]);
    },
    [lightboxImage, filteredImages]
  );

  /* -------- Keyboard Navigation -------- */
  useEffect(() => {
    if (!isLightboxOpen) return;
    const onKey = (e: KeyboardEvent | any) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") navigateLightbox("next");
      else if (e.key === "ArrowLeft") navigateLightbox("prev");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isLightboxOpen, closeLightbox, navigateLightbox]);

  /* -------- Preload Adjacent Lightbox Images -------- */
  useEffect(() => {
    if (!lightboxImage) return;
    const idx = filteredImages.findIndex((i) => i.id === lightboxImage.id);
    const preload = (i: number) => {
      const img = filteredImages[i];
      if (!img) return;
      const preloadImg = new (window.Image)(1);
      preloadImg.src = img.src;
    };
    preload((idx + 1) % filteredImages.length);
    preload((idx - 1 + filteredImages.length) % filteredImages.length);
  }, [lightboxImage, filteredImages]);

  /* -------- Utility: register refs -------- */
  const setItemRef = useCallback((id: number, node: HTMLDivElement | null) => {
    if (node) itemRefs.current.set(id, node);
    else itemRefs.current.delete(id);
  }, []);

  /* -------- Classes for Masonry item heights (optional) -------- */
  const getHeightClass = (h: GalleryImage["height"]) => {
    switch (h) {
      case "tall":
        return "md:row-span-2";
      default:
        return "md:row-span-1";
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: COLORS.secondary, color: COLORS.dark }}
    >
      <Header
        scrollY={scrollY}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Hero Section (avoid background-attachment: fixed for mobile perf) */}
      <div
        ref={heroRef}
        className="relative flex h-[70vh] min-h-[520px] items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/forest-path.webp"
            alt="Forest Path"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: COLORS.dark, opacity: 0.4 }}
          />
        </div>
        <div
          className="relative z-10 px-4 text-center will-change-transform transition-transform"
          style={{ transform: `translateY(${scrollY * 0.25}px)` }}
        >
          <div className="mb-6 flex justify-center">
            <Camera
              className="h-12 w-12 md:h-16 md:w-16"
              style={{ color: COLORS.light }}
            />
          </div>
            <h1
              className="mb-4 text-4xl font-light tracking-wider md:text-6xl lg:text-7xl"
              style={{ color: COLORS.light }}
            >
              GALLERY
            </h1>
            <p
              className="mx-auto max-w-2xl text-lg font-light tracking-wide opacity-90 md:text-xl"
              style={{ color: COLORS.light }}
            >
              Discover the beauty and tranquility of AYADA CLIFF through our
              curated collection of moments
            </p>
        </div>
      </div>

      {/* Category Filter */}
      <div
        className="sticky top-16 z-30 border-b border-white/5 backdrop-blur-md"
        style={{ backgroundColor: `${COLORS.secondary}E6` }}
      >
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {CATEGORY_OPTIONS.map((c) => {
              const active = c === selectedCategory;
              return (
                <Button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  variant="ghost"
                  className={`px-4 py-2 text-xs md:text-sm font-light tracking-wider transition-colors ${
                    active
                      ? "shadow-sm"
                      : "hover:bg-white/5 focus-visible:ring-1"
                  }`}
                  style={{
                    backgroundColor: active ? COLORS.primary : "transparent",
                    color: active ? COLORS.secondary : COLORS.primary,
                  }}
                  aria-pressed={active}
                >
                  {c.toUpperCase()}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Gallery Grid (CSS Masonry using columns) */}
      <div className="container mx-auto px-4 py-10 md:py-14">
        <div
          className="
            columns-1 gap-4
            sm:columns-2
            lg:columns-3
            xl:columns-4
            [column-fill:_balance]
          "
        >
          {filteredImages.map((img, i) => (
            <div
              key={img.id}
              ref={(node) => setItemRef(img.id, node)}
              className={`group mb-4 break-inside-avoid overflow-hidden rounded-lg opacity-0 will-change-transform reveal-init cursor-zoom-in ${getHeightClass(
                img.height
              )}`}
              onClick={() => openLightbox(img)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") openLightbox(img);
              }}
              style={{
                transition:
                  "opacity 0.6s ease, transform 0.6s ease, box-shadow 0.4s",
                animationDelay: `${i * 40}ms`,
              }}
              aria-label={`${img.title} – open image`}
            >
              <div className="relative w-full overflow-hidden rounded-lg">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={1000}
                  className="h-auto w-full scale-100 transform object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 25vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="pointer-events-none absolute bottom-4 left-4 right-4 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <h3
                    className="mb-1 text-lg font-light tracking-wide"
                    style={{ color: COLORS.light }}
                  >
                    {img.title}
                  </h3>
                  <p
                    className="text-xs font-light tracking-wider opacity-80"
                    style={{ color: COLORS.light }}
                  >
                    {img.category.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {filteredImages.length === 0 && (
            <div
              className="py-20 text-center text-sm font-light opacity-70"
              style={{ color: COLORS.primary }}
            >
              No images found in this category.
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Viewing ${lightboxImage.title}`}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 rounded-full p-2 text-white/90 transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Prev */}
          {filteredImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("prev");
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-3 text-white/80 transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring md:left-6"
              aria-label="Previous image"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
          )}

          {/* Next */}
          {filteredImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("next");
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-3 text-white/80 transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring md:right-6"
              aria-label="Next image"
            >
              <ArrowRight className="h-6 w-6" />
            </button>
          )}

          <div
            className="relative max-h-[90vh] max-w-[92vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              width={1600}
              height={1200}
              className="max-h-[90vh] w-auto rounded-lg object-contain"
              priority
              sizes="(max-width:768px) 90vw, 70vw"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-lg bg-gradient-to-t from-black/85 to-transparent p-5">
              <h3
                className="mb-1 text-xl font-light tracking-wide md:text-2xl"
                style={{ color: COLORS.light }}
              >
                {lightboxImage.title}
              </h3>
              <p
                className="text-xs font-light tracking-wider opacity-80 md:text-sm"
                style={{ color: COLORS.light }}
              >
                {lightboxImage.category.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />

      <style jsx global>{`
        /* Reveal animation */
        .reveal-init {
          transform: translateY(26px);
        }
        .reveal-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal-init,
          .reveal-visible {
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default GalleryPage;
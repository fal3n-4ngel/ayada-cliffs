"use client"
import React, { useState, useEffect, useRef } from "react";
import { X, ArrowLeft, ArrowRight, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/app/components/sections/Header";
import Footer from "@/app/components/sections/Footer";
import { COLORS } from "@/app/theme/colors";


// Type definitions
interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  title: string;
  height: 'tall' | 'medium' | 'square';
}

interface HeaderProps {
  scrollY: number;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

interface ImageLoadStates {
  [key: number]: boolean;
}

type NavigationDirection = 'next' | 'prev';
type Category = "All" | "Villas" | "Interiors" | "Views" | "Dining" | "Wellness" | "Beach" | "Gardens" | "Amenities";


const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/images/ocean-haven/gallery/1.webp",
    alt: "Villa Pool at Night",
    category: "Villas",
    title: "Ocean Haven Pool",
    height: "medium"
  },
  {
    id: 2,
    src: "/images/ocean-haven/gallery/2.webp",
    alt: "Bedroom Interior",
    category: "Interiors",
    title: "Cozy Bedroom",
    height: "square"
  },
  {
    id: 3,
    src: "/images/ocean-haven/gallery/3.webp",
    alt: "Living Area with TV",
    category: "Interiors",
    title: "Modern Living Room",
    height: "square"
  },
  {
    id: 4,
    src: "/images/ocean-haven/gallery/4.webp",
    alt: "Evening View with Palm Trees",
    category: "Views",
    title: "Evening Vibes",
    height: "tall"
  },
  {
    id: 5,
    src: "/images/ocean-edge/gallery/1.webp",
    alt: "Outdoor Dining Area",
    category: "Dining",
    title: "Terrace Dining",
    height: "medium"
  },
  {
    id: 6,
    src: "/images/ocean-edge/gallery/2.webp",
    alt: "Garden Walkway",
    category: "Gardens",
    title: "Garden Retreat",
    height: "tall"
  },
  {
    id: 7,
    src: "/images/ocean-edge/gallery/3.webp",
    alt: "Bright Bedroom Interior",
    category: "Interiors",
    title: "Sunlit Bedroom",
    height: "square"
  },
  {
    id: 8,
    src: "/images/ocean-edge/gallery/4.webp",
    alt: "Dining Area",
    category: "Dining",
    title: "Indoor Dining",
    height: "medium"
  },
  {
    id: 9,
    src: "/images/ocean-edge/gallery/5.webp",
    alt: "Poolside View",
    category: "Amenities",
    title: "Pool Escape",
    height: "medium"
  },
  {
    id: 10,
    src: "/images/ocean-edge/gallery/6.webp",
    alt: "Seaside Deck",
    category: "Views",
    title: "Ocean Deck",
    height: "tall"
  }
];


const categories: Category[] = ["All", "Interiors", "Views", "Dining", "Beach", "Gardens", "Amenities"];

const GalleryPage: React.FC = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [imageLoadStates, setImageLoadStates] = useState<ImageLoadStates>({});
  const galleryRef = useRef<HTMLDivElement | null>(null);

  // Handle scroll for parallax effects
  useEffect(() => {
    const handleScroll = (): void => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter images based on selected category
  const filteredImages: GalleryImage[] = selectedCategory === "All" 
    ? galleryImages 
    : galleryImages.filter((img: GalleryImage) => img.category === selectedCategory);

  // Handle image load
  const handleImageLoad = (imageId: number): void => {
    setImageLoadStates((prev: ImageLoadStates) => ({
      ...prev,
      [imageId]: true
    }));
  };

  // Open lightbox
  const openLightbox = (image: GalleryImage): void => {
    setSelectedImage(image);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Close lightbox
  const closeLightbox = (): void => {
    setIsLightboxOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  // Navigate in lightbox
  const navigateLightbox = (direction: NavigationDirection): void => {
    if (!selectedImage) return;
    
    const currentIndex: number = filteredImages.findIndex((img: GalleryImage) => img.id === selectedImage.id);
    let newIndex: number;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredImages.length;
    } else {
      newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    }
    
    setSelectedImage(filteredImages[newIndex]);
  };

  // Get grid item classes based on height
  const getGridItemClass = (height: GalleryImage['height'], index: number): string => {
    const baseClass = "relative overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-700 cursor-pointer group";
    
    switch (height) {
      case 'tall':
        return `${baseClass} row-span-2`;
      case 'medium':
        return `${baseClass} row-span-1`;
      case 'square':
        return `${baseClass} row-span-1`;
      default:
        return `${baseClass} row-span-1`;
    }
  };

  const getImageHeight = (height: GalleryImage['height']): string => {
    switch (height) {
      case 'tall':
        return 'h-96 md:h-[500px]';
      case 'medium':
        return 'h-48 md:h-64';
      case 'square':
        return 'h-48 md:h-64';
      default:
        return 'h-48 md:h-64';
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

      {/* Hero Section */}
      <div 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(/images/forest-path.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div 
          className="absolute inset-0"
          style={{ 
            backgroundColor: COLORS.dark,
            opacity: 0.4
          }}
        />
        
        <div 
          className="relative z-10 text-center px-4"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`
          }}
        >
          <div className="mb-6 flex justify-center">
            <Camera 
              className="h-12 w-12 md:h-16 md:w-16"
              style={{ color: COLORS.light }}
            />
          </div>
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wider mb-4"
            style={{ color: COLORS.light }}
          >
            GALLERY
          </h1>
          <p 
            className="text-lg md:text-xl font-light tracking-wide opacity-90 max-w-2xl mx-auto"
            style={{ color: COLORS.light }}
          >
            Discover the beauty and tranquility of AYADA CLIFF through our curated collection of moments
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="sticky top-20 z-30 py-6" style={{ backgroundColor: COLORS.secondary }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((category: Category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant="ghost"
                className={`px-4 py-2 text-xs md:text-sm font-light tracking-wider transition-all duration-300 ${
                  selectedCategory === category 
                    ? 'bg-opacity-20' 
                    : 'hover:bg-opacity-10'
                }`}
                style={{
                  color: selectedCategory === category ? COLORS.secondary :COLORS.primary,
                  backgroundColor: selectedCategory === category ? COLORS.primary : 'transparent'
                }}
              >
                {category.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto px-4 py-8 md:py-12" ref={galleryRef}>
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6">
          {filteredImages.map((image: GalleryImage, index: number) => (
            <div
              key={image.id}
              className="break-inside-avoid mb-4 md:mb-6 group cursor-pointer"
              onClick={() => openLightbox(image)}
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: 'fadeInUp 0.8s ease-out forwards',
                opacity: 0,
                transform: 'translateY(30px)'
              }}
            >
              <div className="relative overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-700">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  onLoad={() => handleImageLoad(image.id)}
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 
                      className="text-lg font-light tracking-wide mb-1"
                      style={{ color: COLORS.light }}
                    >
                      {image.title}
                    </h3>
                    <p 
                      className="text-xs font-light tracking-wider opacity-80"
                      style={{ color: COLORS.light }}
                    >
                      {image.category.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)' }}
          onClick={closeLightbox}
        >
          {/* Close button */}
          <Button
            onClick={closeLightbox}
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-60 hover:bg-white/20"
            style={{ color: COLORS.light }}
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Navigation buttons */}
          <Button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              navigateLightbox('prev');
            }}
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-60 hover:bg-white/20"
            style={{ color: COLORS.light }}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>

          <Button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              navigateLightbox('next');
            }}
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-60 hover:bg-white/20"
            style={{ color: COLORS.light }}
          >
            <ArrowRight className="h-6 w-6" />
          </Button>

          {/* Image */}
          <div 
            className="relative max-w-full max-h-full"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            
            {/* Image info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <h3 
                className="text-xl md:text-2xl font-light tracking-wide mb-2"
                style={{ color: COLORS.light }}
              >
                {selectedImage.title}
              </h3>
              <p 
                className="text-sm font-light tracking-wider opacity-80"
                style={{ color: COLORS.light }}
              >
                {selectedImage.category.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer/>

      <style jsx>{`
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default GalleryPage;
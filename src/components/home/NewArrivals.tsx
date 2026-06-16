"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PRODUCTS = [
  {
    id: 1,
    name: "Midnight Silk Chiffon",
    price: "₹24,999",
    image: "/images/demo-3.png",
    hoverImage: "/images/demo-9.png",
  },
  {
    id: 2,
    name: "Ivory Organza Drape",
    price: "₹18,500",
    image: "/images/demo-7.png",
    hoverImage: "/images/demo-7.png",
  },
  {
    id: 3,
    name: "Crimson Velvet Border",
    price: "₹32,000",
    image: "/images/demo-3.png",
    hoverImage: "/images/demo-3.png",
  },
];

export default function NewArrivals() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !titleRef.current) return;

    const ctx = gsap.context(() => {
      // Title Animation
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Auto-slide effect
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let intervalId: NodeJS.Timeout;

    const startAutoSlide = () => {
      intervalId = setInterval(() => {
        if (!container) return;
        
        // Check if we're near the end
        const isNearEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 50;
        
        if (isNearEnd) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Scroll by one card width (approx 300px)
          container.scrollBy({ left: 300, behavior: "smooth" });
        }
      }, 1500);
    };

    startAutoSlide();

    // Pause on hover/touch
    container.addEventListener('mouseenter', () => clearInterval(intervalId));
    container.addEventListener('mouseleave', startAutoSlide);
    container.addEventListener('touchstart', () => clearInterval(intervalId));
    container.addEventListener('touchend', startAutoSlide);

    return () => {
      clearInterval(intervalId);
      container.removeEventListener('mouseenter', () => clearInterval(intervalId));
      container.removeEventListener('mouseleave', startAutoSlide);
      container.removeEventListener('touchstart', () => clearInterval(intervalId));
      container.removeEventListener('touchend', startAutoSlide);
    };
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12 bg-warm-ivory text-rich-black">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="overflow-hidden">
            <h2 ref={titleRef} className="font-serif text-5xl md:text-7xl leading-tight">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/collections/new"
            className="text-sm font-sans uppercase tracking-widest border-b border-rich-black pb-1 hover:text-champagne-gold hover:border-champagne-gold transition-colors"
          >
            Explore the collection
          </Link>
        </div>

        <div className="w-full">
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 md:gap-12 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-12"
          >
            
            {PRODUCTS.map((product, index) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="group block w-[280px] md:w-[30vw] shrink-0 snap-start"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-beige mb-6 rounded-2xl">
                  {/* Primary Image */}
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0 rounded-2xl"
                  />
                  {/* Secondary Hover Image */}
                  <Image
                    src={product.hoverImage}
                    alt={`${product.name} alternate view`}
                    fill
                    className="object-cover opacity-0 scale-105 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-100 rounded-2xl"
                  />
                </div>
                
                <div className="flex flex-col gap-2 overflow-hidden px-2 md:px-0">
                  <h3 className="font-serif text-2xl transform translate-y-0 transition-transform duration-500 group-hover:-translate-y-1">
                    {product.name}
                  </h3>
                  <p className="font-sans text-sm tracking-wide text-soft-charcoal transform translate-y-0 transition-transform duration-500 group-hover:-translate-y-1">
                    {product.price}
                  </p>
                </div>
              </Link>
            ))}
            {/* Spacer for scroll end */}
            <div className="w-[10vw] shrink-0" />
          </div>
        </div>
      </div>
    </section>
  );
}

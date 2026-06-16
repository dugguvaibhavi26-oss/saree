"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const OCCASIONS = [
  {
    id: "wedding",
    title: "Wedding Guest",
    image: "/images/demo-9.png",
  },
  {
    id: "festive",
    title: "Festive Celebrations",
    image: "/images/demo-7.png",
  },
  {
    id: "evening",
    title: "Evening Soirée",
    image: "/images/demo-9.png",
  },
];

export default function ShopByOccasion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Background parallax or other effects can go here
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
    <section ref={containerRef} className="py-32 px-6 md:px-12 bg-warm-ivory text-rich-black overflow-hidden [perspective:1200px]">
      <div className="max-w-[1600px] mx-auto text-center">
        <h2 className="font-serif text-5xl md:text-7xl mb-24">Shop by Occasion</h2>
        
        <div className="w-full">
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-12 -mx-6 md:mx-0"
          >
            {/* Initial Spacer for mobile so it aligns with text */}
            <div className="w-2 md:hidden shrink-0" />

            {OCCASIONS.map((occasion, i) => (
              <Link
                key={occasion.id}
                href={`/collections/${occasion.id}`}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className="group block relative w-[280px] md:w-[30vw] aspect-[4/5] overflow-hidden rounded-2xl transform-gpu shrink-0 snap-start"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Image
                  src={occasion.image}
                  alt={occasion.title}
                  fill
                  className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 rounded-2xl"
                />
                <div className="absolute inset-0 bg-rich-black/20 group-hover:bg-rich-black/40 transition-colors duration-500 rounded-2xl" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-left z-10 [transform:translateZ(40px)]">
                  <h3 className="text-warm-ivory font-serif text-3xl md:text-4xl mb-6 transform translate-y-4 opacity-90 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {occasion.title}
                  </h3>
                  <div className="w-12 h-[2px] bg-champagne-gold transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                </div>
              </Link>
            ))}
            <div className="w-[10vw] shrink-0" />
          </div>
        </div>
      </div>
    </section>
  );
}

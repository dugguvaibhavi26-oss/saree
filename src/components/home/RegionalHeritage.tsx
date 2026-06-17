"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const REGIONS = [
  {
    id: "varanasi",
    name: "Varanasi",
    specialty: "Banarasi Brocade",
    description: "Centuries-old legacy of weaving pure gold and silver zari into intricate silk tapestries. Each drape carries the spiritual gravity of the ancient city.",
    image: "/images/demo-4.png"
  },
  {
    id: "kanchipuram",
    name: "Kanchipuram",
    specialty: "Pure Zari Silks",
    description: "Renowned for its heavy silk and contrasting borders, representing the pinnacle of South Indian weaving architecture.",
    image: "/images/demo-3.png"
  },
  {
    id: "bengal",
    name: "Bengal",
    specialty: "Jamdani & Muslin",
    description: "The fine art of illusion. Lightweight, breathable muslins with motifs that appear to float weightlessly on the surface.",
    image: "/images/demo-5.png"
  }
];

export default function RegionalHeritage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeRegion, setActiveRegion] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Use GSAP solely for scroll tracking on the 300vh container.
      // We DO NOT use pin: true. We use CSS sticky positioning instead to prevent DOM/React conflicts.
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const progress = self.progress;
          // Map progress 0-1 to index 0, 1, 2
          const newIndex = Math.min(
            Math.floor(progress * REGIONS.length),
            REGIONS.length - 1
          );
          setActiveRegion((prev) => (prev !== newIndex ? newIndex : prev));
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="varanasi" ref={containerRef} className="relative h-[300vh] w-full bg-rich-black">
      {/* Sticky Container holds the view while the user scrolls through the 300vh parent */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden text-warm-ivory">
        
        {/* Background Images Crossfade */}
        {REGIONS.map((region, idx) => (
          <div 
            key={region.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${idx === activeRegion ? "opacity-100 z-0" : "opacity-0 -z-10"}`}
          >
            <Image 
              src={region.image}
              alt={region.name}
              fill
              className="object-cover"
              style={{
                transform: idx === activeRegion ? 'scale(1)' : 'scale(1.05)',
                transition: 'transform 10s ease-out',
              }}
            />
            {/* Elegant dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-rich-black via-rich-black/60 to-transparent opacity-90" />
          </div>
        ))}

        {/* Content UI */}
        <div className="relative z-10 h-full flex flex-col justify-end px-4 md:px-12 lg:px-24 max-w-[1600px] mx-auto pb-10 md:pb-32">
          
          <div className="flex items-center gap-3 mb-6 md:mb-12">
             <MapPin className="w-4 h-4 text-champagne-gold" />
             <span className="text-stone-beige tracking-[0.2em] uppercase text-[10px] md:text-xs font-sans">
               Geographical Indications
             </span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            
            {/* Left side: Typography */}
            <div className="lg:col-span-8 relative h-[300px] md:h-[400px]">
              {REGIONS.map((region, idx) => (
                <div
                  key={region.id}
                  className={`absolute inset-0 flex flex-col justify-end transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    idx === activeRegion 
                      ? "opacity-100 translate-y-0 pointer-events-auto" 
                      : "opacity-0 translate-y-8 pointer-events-none"
                  }`}
                >
                  <h2 className="font-serif text-5xl md:text-8xl lg:text-[10rem] tracking-tighter leading-[0.9] mb-4 md:mb-6">
                    {region.name}
                  </h2>
                  <p className="font-sans text-xl md:text-3xl text-champagne-gold mb-4 md:mb-6 font-light">
                    {region.specialty}
                  </p>
                  <p className="font-sans text-stone-beige text-sm md:text-xl max-w-2xl leading-relaxed">
                    {region.description}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Right side: Navigation & Indicators */}
            <div className="lg:col-span-4 flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-end gap-6 lg:gap-12 w-full pt-4 lg:pt-0 border-t border-white/10 lg:border-t-0">
               {/* Progress Indicators */}
               <div className="flex gap-2 md:gap-4">
                 {REGIONS.map((_, idx) => (
                   <button 
                     key={idx}
                     onClick={() => {
                        if (containerRef.current) {
                           const sectionHeight = containerRef.current.offsetHeight / REGIONS.length;
                           window.scrollTo({
                              top: containerRef.current.offsetTop + (sectionHeight * idx),
                              behavior: 'smooth'
                           });
                        }
                     }}
                     className={`w-8 md:w-16 h-[2px] transition-all duration-500 ease-out ${idx === activeRegion ? "bg-champagne-gold scale-y-150" : "bg-white/20 hover:bg-white/50"}`}
                     aria-label={`View region ${idx + 1}`}
                   />
                 ))}
               </div>
               
               {/* CTA */}
               <Link 
                 href="/store"
                 className="relative z-50 group flex items-center gap-3 md:gap-6 text-[10px] md:text-sm uppercase tracking-[0.2em] font-medium text-warm-ivory hover:text-champagne-gold transition-colors"
               >
                 <span>Explore</span>
                 <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-champagne-gold transition-colors bg-white/5 backdrop-blur-sm">
                    <ArrowRight className="w-3 h-3 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                 </div>
               </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, X } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const IMAGES = [
  "/images/demo-8.png",
  "/images/demo-9.png",
  "/images/demo-3.png",
  "/images/demo-8.png",
];

export default function ProductGallery() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Slight drift animation for the main image
    gsap.to(".main-drift-image", {
      yPercent: 5,
      scale: 1.05,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      }
    });
  }, [activeIdx]);

  return (
    <div ref={containerRef} className="flex flex-col-reverse md:flex-row gap-6 relative">
      <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible no-scrollbar pb-4 md:pb-0 w-full md:w-24 shrink-0">
        {IMAGES.map((img, i) => (
          <button 
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`relative w-20 h-24 shrink-0 overflow-hidden border transition-all duration-300 ${activeIdx === i ? 'border-rich-black shadow-lg scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
          >
            <Image src={img} alt={`Thumbnail ${i}`} fill className="object-cover" />
          </button>
        ))}
      </div>

      <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-beige">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image 
              src={IMAGES[activeIdx]} 
              alt="Main Product" 
              fill 
              className="object-cover main-drift-image origin-center"
              priority
            />
          </motion.div>
        </AnimatePresence>
        
        <button className="absolute top-6 right-6 w-12 h-12 bg-warm-ivory/80 backdrop-blur-sm rounded-full flex items-center justify-center text-rich-black hover:bg-champagne-gold transition-colors z-10 shadow-xl mix-blend-screen">
          <ZoomIn className="w-5 h-5" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

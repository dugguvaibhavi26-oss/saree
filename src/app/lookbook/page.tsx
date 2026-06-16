"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SilkSimulation from "@/components/three/SilkSimulation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LookbookPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      elementsRef.current.forEach((el, index) => {
        if (!el) return;
        
        // Randomize speed and direction slightly for anti-gravity feel
        const speed = 1 + (index % 3) * 0.5;
        const yOffset = index % 2 === 0 ? 150 : -100;
        
        gsap.fromTo(el,
          { y: yOffset, opacity: 0 },
          {
            y: -yOffset * 0.5,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "bottom 10%",
              scrub: speed,
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-rich-black text-warm-ivory pt-32 pb-48 overflow-hidden relative">
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
         <SilkSimulation />
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto px-6 md:px-12">
        {/* Title */}
        <header className="mb-48 text-center h-[60vh] flex flex-col justify-center items-center" ref={el => { elementsRef.current[0] = el; }}>
          <span className="text-champagne-gold tracking-[0.5em] uppercase text-sm mb-8 block">Volume I</span>
          <h1 className="font-serif text-7xl md:text-[10rem] tracking-tighter leading-none mb-6">
            Defying <span className="italic font-light">Gravity</span>
          </h1>
          <p className="font-sans text-stone-beige max-w-xl text-xl leading-relaxed">
            Where silk transcends its physical weight. A visual exploration of our master artisan collection.
          </p>
        </header>

        {/* Spread 1 */}
        <div className="relative w-full h-[150vh] md:h-[120vh] mb-24 md:mb-32 flex flex-col md:block">
           <div className="relative md:absolute top-0 md:left-[5%] w-[90%] md:w-[45%] lg:w-[40%] aspect-[3/4] md:aspect-[3/4] mb-12 md:mb-0 mx-auto md:mx-0 shadow-2xl" ref={el => { elementsRef.current[1] = el; }}>
              <Image src="/images/demo-8.png" alt="Look 1" fill className="object-cover" />
           </div>
           
           <div className="relative md:absolute md:top-[40%] md:right-[5%] lg:right-[15%] w-[85%] md:w-[40%] lg:w-[35%] aspect-[4/5] z-20 self-end mr-4 md:mr-0 shadow-2xl" ref={el => { elementsRef.current[2] = el; }}>
              <Image src="/images/demo-4.png" alt="Look 2" fill className="object-cover" />
           </div>

           <div className="absolute top-[10%] md:top-[20%] right-[5%] md:right-[10%] lg:right-[20%] max-w-[200px] md:max-w-sm z-30 mix-blend-difference text-right md:text-left" ref={el => { elementsRef.current[3] = el; }}>
              <h2 className="font-serif text-8xl md:text-[10rem] mb-2 md:mb-6 text-warm-ivory opacity-80 md:opacity-100">01</h2>
              <p className="font-sans text-xs md:text-lg tracking-[0.2em] md:tracking-wide uppercase text-champagne-gold">The Crimson Fold</p>
           </div>
        </div>

        {/* Spread 2 */}
        <div className="relative w-full h-[180vh] md:h-[150vh] mb-32 flex flex-col md:block">
           <div className="relative md:absolute md:top-[10%] md:right-[5%] w-[100%] md:w-[60%] lg:w-[50%] aspect-[4/5] md:aspect-[16/9] mb-16 md:mb-0 shadow-2xl" ref={el => { elementsRef.current[4] = el; }}>
              <Image src="/images/demo-9.png" alt="Campaign" fill className="object-cover" />
           </div>
           
           <div className="relative md:absolute md:top-[60%] md:left-[10%] w-[90%] md:w-[40%] lg:w-[30%] aspect-square md:aspect-[3/4] z-20 mx-auto md:mx-0 shadow-2xl" ref={el => { elementsRef.current[5] = el; }}>
              <Image src="/images/demo-6.png" alt="Look 3" fill className="object-cover" />
           </div>

           <div className="absolute top-[35%] md:top-[40%] left-[5%] md:left-[15%] lg:left-[20%] max-w-[250px] md:max-w-md z-30 mix-blend-difference md:mix-blend-normal" ref={el => { elementsRef.current[6] = el; }}>
              <h2 className="font-serif text-8xl md:text-[10rem] mb-2 md:mb-6 text-warm-ivory opacity-80 md:opacity-100">02</h2>
              <h3 className="font-serif text-3xl md:text-4xl mb-4 text-champagne-gold">Midnight Resonance</h3>
              <p className="font-sans text-sm md:text-lg text-warm-ivory md:text-stone-beige leading-relaxed">Deep hues that absorb light and reflect heritage. This collection explores the depths of traditional dyeing techniques applied to contemporary, weightless silhouettes.</p>
           </div>
        </div>

      </div>
    </div>
  );
}

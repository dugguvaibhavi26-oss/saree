"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProductStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      elementsRef.current.forEach((el, index) => {
        if (!el) return;
        const yOffset = index % 2 === 0 ? 100 : -100;
        
        gsap.fromTo(el,
          { y: yOffset, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "bottom 30%",
              scrub: 1.5,
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-rich-black text-warm-ivory overflow-hidden mt-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative">
        <div className="text-center mb-32" ref={(el) => { elementsRef.current[0] = el; }}>
          <span className="text-stone-beige tracking-[0.4em] uppercase text-xs mb-6 block font-sans">
            The Artisan's Narrative
          </span>
          <h2 className="font-serif text-5xl md:text-7xl leading-tight text-champagne-gold">
            Floating Architecture
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center mb-32">
          <div className="relative aspect-square md:aspect-[4/5] w-full shadow-2xl overflow-hidden" ref={(el) => { elementsRef.current[1] = el; }}>
             <Image src="/images/demo-3.png" alt="Fabric Detail" fill className="object-cover scale-110" />
          </div>
          <div ref={(el) => { elementsRef.current[2] = el; }}>
             <h3 className="font-serif text-4xl mb-6">The Fabric</h3>
             <p className="font-sans text-stone-beige text-lg leading-relaxed mb-6">
               Hand-spun mulberry silk sourced directly from master weavers. The unique twisted yarn gives the fabric an incredible fluid drape, behaving as if weightless, while maintaining impeccable structural integrity.
             </p>
             <div className="h-[1px] w-16 bg-champagne-gold" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center">
          <div className="order-2 md:order-1" ref={(el) => { elementsRef.current[3] = el; }}>
             <h3 className="font-serif text-4xl mb-6">The Craftsmanship</h3>
             <p className="font-sans text-stone-beige text-lg leading-relaxed mb-6">
               Adorned with genuine metallic zardozi threads, each motif is meticulously embroidered by hand. The pattern naturally flows with the movement of the fabric, ensuring elegance in every rotation.
             </p>
             <div className="h-[1px] w-16 bg-champagne-gold" />
          </div>
          <div className="relative aspect-square md:aspect-[4/5] w-full order-1 md:order-2 shadow-2xl overflow-hidden" ref={(el) => { elementsRef.current[4] = el; }}>
             <Image src="/images/demo-2.png" alt="Craftsmanship Detail" fill className="object-cover scale-110" />
          </div>
        </div>
      </div>
    </section>
  );
}

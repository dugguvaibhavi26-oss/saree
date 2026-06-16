"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ArtOfWeaving() {
  const containerRef = useRef<HTMLDivElement>(null);
  const threadsRef = useRef<SVGPathElement[]>([]);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Thread drawing animation
      threadsRef.current.forEach((thread, i) => {
        if (!thread) return;
        const length = thread.getTotalLength();
        gsap.set(thread, { strokeDasharray: length, strokeDashoffset: length });
        
        gsap.to(thread, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
          }
        });
      });

      // Anti-gravity floating content
      gsap.fromTo(textRef.current, 
        { y: 100 },
        {
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          }
        }
      );

      gsap.fromTo(imageRef.current,
        { y: -50, rotation: -2 },
        {
          y: 150,
          rotation: 3,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-48 bg-warm-ivory text-rich-black overflow-hidden">
      {/* Woven Threads Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path ref={el => { if(el) threadsRef.current[0] = el }} d="M0,20 Q50,80 100,30" fill="none" stroke="currentColor" strokeWidth="0.2" />
          <path ref={el => { if(el) threadsRef.current[1] = el }} d="M0,40 Q50,10 100,60" fill="none" stroke="currentColor" strokeWidth="0.1" />
          <path ref={el => { if(el) threadsRef.current[2] = el }} d="M0,60 Q50,100 100,40" fill="none" stroke="currentColor" strokeWidth="0.3" />
          <path ref={el => { if(el) threadsRef.current[3] = el }} d="M20,0 Q80,50 30,100" fill="none" stroke="currentColor" strokeWidth="0.15" />
          <path ref={el => { if(el) threadsRef.current[4] = el }} d="M80,0 Q10,50 70,100" fill="none" stroke="currentColor" strokeWidth="0.25" />
        </svg>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          <div className="md:col-span-5 md:col-start-2" ref={textRef}>
            <span className="text-soft-charcoal tracking-[0.4em] uppercase text-xs mb-8 block font-sans">
              The Art of Weaving
            </span>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 leading-[1.1] tracking-tight">
              A Legacy <br />
              <span className="italic font-light ml-12 text-soft-charcoal">Intertwined</span>
            </h2>
            <p className="font-sans text-soft-charcoal text-base md:text-lg leading-relaxed mb-12 max-w-md">
              Behind every drape is a narrative of meticulous craftsmanship. It takes a master weaver over 120 hours to intertwine fine silk threads and pure zari, defying the constraints of time to create a single, weightless heirloom.
            </p>
            <button className="text-xs uppercase tracking-widest font-medium border-b border-rich-black pb-1 hover:text-champagne-gold hover:border-champagne-gold transition-colors">
              Discover Our Craft
            </button>
          </div>
          
          <div className="md:col-span-4 md:col-start-8 relative" ref={imageRef}>
            <div className="relative aspect-[3/4] w-full shadow-2xl overflow-hidden">
              <Image 
                src="/images/demo-6.png" 
                alt="Art of Weaving" 
                fill 
                className="object-cover" 
              />
            </div>
            {/* Floating Statistic */}
            <div className="absolute -bottom-16 -left-12 md:-bottom-24 md:-left-24 w-48 md:w-64 aspect-square bg-rich-black text-warm-ivory p-8 flex flex-col justify-center rounded-full shadow-2xl mix-blend-exclusion">
               <span className="font-serif text-5xl mb-2 text-center block">120+</span>
               <span className="font-sans text-[10px] uppercase tracking-widest text-center block opacity-80">Hours per piece</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

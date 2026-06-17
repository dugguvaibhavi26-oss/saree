"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SilkSimulation from "@/components/three/SilkSimulation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      // Intro Animation
      const tl = gsap.timeline();

      tl.fromTo(
        textRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 2, ease: "power3.out", delay: 0.5 }
      );

      // Anti-Gravity Scroll Parallax

      gsap.to(textRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-rich-black"
    >
      {/* WebGL Anti-Gravity Silk */}
      <SilkSimulation />

      {/* Video Background */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none opacity-70 mix-blend-screen">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
        >
          <source src="/vidmp3.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-rich-black via-transparent to-rich-black opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-rich-black via-transparent to-rich-black opacity-80" />
      </div>

      {/* Hero Content */}
      <div 
        ref={textRef}
        className="relative z-20 text-center md:text-left px-6 md:px-12 w-full max-w-[1600px] pointer-events-none flex flex-col items-center md:items-start -mt-[20vh] md:mt-0"
      >
        <h1 className="font-serif text-[4.5rem] md:text-8xl lg:text-[11rem] text-warm-ivory leading-[0.9] tracking-tighter mix-blend-difference mb-6 md:mb-8 text-center md:text-left">
          Gravity of <br className="hidden md:block" />
          <span className="italic font-light md:ml-32 text-champagne-gold">Elegance</span>
        </h1>
        <p className="text-stone-beige font-sans uppercase tracking-[0.3em] text-[10px] md:text-sm max-w-xs md:max-w-sm leading-relaxed border-t md:border-t-0 md:border-l border-champagne-gold/30 pt-4 md:pt-0 md:pl-6 text-center md:text-left">
          A weightless exploration of Indian textile heritage. Sourced from master weavers.
        </p>
      </div>
    </section>
  );
}

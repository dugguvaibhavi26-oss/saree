"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function EditorialStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
        },
      });

      tl.fromTo(
        imageRef.current,
        { clipPath: "inset(20% 20% 20% 20%)" },
        { clipPath: "inset(0% 0% 0% 0%)", ease: "none" }
      )
      .to(
        textRef.current,
        { opacity: 1, y: 0, ease: "none" },
        "-=0.5"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen bg-warm-ivory w-full overflow-hidden">
      <div 
        ref={imageRef} 
        className="absolute inset-0 z-0 will-change-transform"
      >
        <Image
          src="/images/demo-8.png"
          alt="Editorial Campaign"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-rich-black/40" />
      </div>

      <div 
        ref={textRef}
        className="relative z-10 h-full flex items-center justify-center text-center px-4 opacity-0 translate-y-12"
      >
        <div className="max-w-4xl">
          <span className="text-champagne-gold tracking-[0.3em] uppercase text-sm mb-8 block">
            The Heritage Campaign
          </span>
          <h2 className="text-warm-ivory font-serif text-5xl md:text-7xl lg:text-8xl leading-tight mb-8">
            Woven with intention. Worn with confidence.
          </h2>
          <p className="text-stone-beige font-sans max-w-xl mx-auto text-lg leading-relaxed">
            Every thread tells a story of meticulous craftsmanship, passed down through generations of master artisans.
          </p>
        </div>
      </div>
    </section>
  );
}

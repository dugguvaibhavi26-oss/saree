"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STORIES = [
  {
    id: 1,
    name: "Aisha R.",
    text: "The craftsmanship is unparalleled. Wearing this saree felt like being draped in pure art.",
    image: "/images/demo-6.png",
    rotation: -2,
    yOffset: 20,
  },
  {
    id: 2,
    name: "Priya S.",
    text: "I wore the Midnight Silk for my reception. It was weightless, elegant, and moved beautifully.",
    image: "/images/demo-1.png",
    rotation: 3,
    yOffset: -10,
  },
  {
    id: 3,
    name: "Meera M.",
    text: "You can feel the heritage in every thread. A true heirloom piece that I will cherish forever.",
    image: "/images/demo-6.png",
    rotation: -1,
    yOffset: 30,
  },
];

export default function CustomerStories() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        gsap.fromTo(
          card,
          { opacity: 0, y: 100, rotateZ: 10 },
          {
            opacity: 1,
            y: 0,
            rotateZ: STORIES[index].rotation,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            },
          }
        );

        // Make images colorize when in middle of screen
        const imageElement = card.querySelector('img');
        if (imageElement) {
          gsap.to(imageElement, {
            filter: "grayscale(0%)",
            duration: 0.8,
            scrollTrigger: {
              trigger: card,
              start: "top 50%", // middle of screen
              end: "bottom 50%",
              toggleActions: "play reverse play reverse",
            }
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12 bg-warm-ivory text-rich-black overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-24 text-center">
          <span className="text-soft-charcoal tracking-[0.2em] uppercase text-xs mb-6 block">The Saree Studio Community</span>
          <h2 className="font-serif text-5xl md:text-7xl">Customer Stories</h2>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-8 max-w-6xl mx-auto">
          {STORIES.map((story, index) => (
            <div
              key={story.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="flex-1 relative bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-stone-beige/30 rounded-2xl"
              style={{ marginTop: `${story.yOffset}px` }}
            >
              <div className="relative aspect-[4/5] mb-8 w-full overflow-hidden rounded-xl">
                <Image
                  src={story.image}
                  alt={`Customer ${story.name}`}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700 rounded-xl"
                />
              </div>
              <p className="font-serif text-xl md:text-2xl leading-relaxed mb-6 text-soft-charcoal italic">
                "{story.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-8 h-[1px] bg-champagne-gold" />
                <span className="font-sans text-sm tracking-widest uppercase">{story.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

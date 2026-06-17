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
    id: 4,
    name: "Golden Weave Kanjivaram",
    price: "₹45,000",
    image: "/images/demo-7.png",
  },
  {
    id: 5,
    name: "Emerald Green Georgette",
    price: "₹16,999",
    image: "/images/demo-9.png",
  },
  {
    id: 6,
    name: "Blush Pink Net Saree",
    price: "₹22,500",
    image: "/images/demo-7.png",
  },
  {
    id: 7,
    name: "Classic Banarasi Brocade",
    price: "₹38,000",
    image: "/images/demo-4.png",
  },
];

export default function BestSellers() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, scale: 1.1, filter: "blur(10px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12 bg-rich-black text-warm-ivory">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-soft-charcoal pb-8">
          <h2 className="font-serif text-5xl md:text-6xl leading-tight">
            Best Sellers
          </h2>
          <Link
            href="/store"
            className="relative z-50 text-sm font-sans uppercase tracking-widest text-champagne-gold hover:text-warm-ivory transition-colors"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {PRODUCTS.map((product, index) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="group block"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-soft-charcoal mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
              </div>
              
              <div className="flex flex-col gap-1 text-center">
                <h3 className="font-serif text-lg md:text-xl text-stone-beige transition-colors duration-300 group-hover:text-champagne-gold">
                  {product.name}
                </h3>
                <p className="font-sans text-xs tracking-widest text-warm-ivory/60">
                  {product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

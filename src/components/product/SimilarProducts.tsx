"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PRODUCTS = [
  {
    id: 8,
    name: "Onyx Velvet Drape",
    price: "₹35,999",
    image: "/images/demo-1.png",
  },
  {
    id: 9,
    name: "Champagne Tissue Silk",
    price: "₹42,500",
    image: "/images/demo-3.png",
  },
  {
    id: 10,
    name: "Sapphire Banarasi",
    price: "₹55,000",
    image: "/images/demo-1.png",
  },
  {
    id: 11,
    name: "Ruby Georgette",
    price: "₹28,999",
    image: "/images/demo-3.png",
  },
];

export default function SimilarProducts() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !wrapperRef.current) return;

    // Removed GSAP pin logic in favor of native CSS horizontal scrolling
    // Native CSS is much more reliable for swiping on mobile devices
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-warm-ivory text-rich-black overflow-hidden flex flex-col justify-center">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full mb-12">
        <h2 className="font-serif text-4xl md:text-5xl">Curated For You</h2>
      </div>

      <div className="w-full">
        <div ref={wrapperRef} className="flex gap-6 md:gap-12 px-6 md:px-12 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-12">
          {PRODUCTS.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group block w-[280px] md:w-[400px] shrink-0 snap-start"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden mb-6 bg-stone-beige">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                />
              </div>
              <h3 className="font-serif text-xl md:text-2xl mb-2 group-hover:text-champagne-gold transition-colors duration-300">
                {product.name}
              </h3>
              <p className="font-sans text-xs md:text-sm tracking-widest text-soft-charcoal">
                {product.price}
              </p>
            </Link>
          ))}
          {/* Spacer to allow scrolling all the way to the end */}
          <div className="w-[10vw] shrink-0" />
        </div>
      </div>
    </section>
  );
}

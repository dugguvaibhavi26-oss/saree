"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const CATEGORIES = [
  {
    id: "silks",
    title: "Heritage Silks",
    image: "/images/demo-7.png",
    colSpan: "md:col-span-8",
    aspect: "aspect-[16/9] md:aspect-[2/1]",
  },
  {
    id: "organza",
    title: "Modern Organza",
    image: "/images/demo-2.png",
    colSpan: "md:col-span-4",
    aspect: "aspect-[4/5] md:aspect-[3/4]",
  },
  {
    id: "bridal",
    title: "Bridal Couture",
    image: "/images/demo-4.png",
    colSpan: "md:col-span-12",
    aspect: "aspect-[16/9] md:aspect-[21/9]",
  },
];

export default function CategoryGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={containerRef} className="py-24 px-6 md:px-12 bg-rich-black text-warm-ivory">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-20 text-center">
          <h2 className="font-serif text-5xl md:text-7xl mb-6">Shop by Category</h2>
          <p className="font-sans text-stone-beige max-w-lg mx-auto">
            Discover our curated collections, where every piece tells a story of heritage and modern design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href="/store"
              className={`relative z-50 group relative overflow-hidden block ${category.colSpan} ${category.aspect} rounded-2xl border border-warm-ivory/10`}
            >
              <div className="absolute inset-0 z-0 overflow-hidden bg-soft-charcoal rounded-2xl">
                <motion.div style={{ y }} className="w-full h-[120%] -top-[10%] relative">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-rich-black/80 via-transparent to-transparent opacity-80" />
              </div>

              {/* Border animation on hover */}
              <div className="absolute inset-4 rounded-xl border border-warm-ivory/0 transition-colors duration-500 group-hover:border-warm-ivory/30 z-10 pointer-events-none" />

              <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12">
                <h3 className="font-serif text-3xl md:text-4xl text-warm-ivory transform translate-y-4 transition-all duration-500 group-hover:translate-y-0 group-hover:tracking-widest">
                  {category.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

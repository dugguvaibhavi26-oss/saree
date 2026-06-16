"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ProductInfo() {
  const [isAdded, setIsAdded] = useState(false);

  return (
    <div className="flex flex-col h-full pt-12 md:pt-0">
      <div className="mb-8">
        <span className="text-soft-charcoal uppercase tracking-[0.2em] text-xs font-medium mb-4 block">
          Heritage Collection
        </span>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-rich-black leading-tight mb-4">
          Midnight Silk Chiffon
        </h1>
        <p className="font-sans text-2xl text-rich-black">₹24,999</p>
      </div>

      <div className="mb-10 text-stone-beige font-sans text-sm leading-relaxed">
        <p>
          A masterpiece of contemporary draping. Crafted from hand-spun silk chiffon, this piece features an ethereal lightweight flow, intricate zardozi border work, and a profound midnight hue that transforms under different light.
        </p>
      </div>

      <div className="mb-10">
        <div className="flex justify-between text-xs uppercase tracking-widest font-medium mb-4 border-b border-soft-charcoal/10 pb-4">
          <span>Fabric</span>
          <span className="text-soft-charcoal">100% Pure Silk</span>
        </div>
        <div className="flex justify-between text-xs uppercase tracking-widest font-medium mb-4 border-b border-soft-charcoal/10 pb-4">
          <span>Craftsmanship</span>
          <span className="text-soft-charcoal">Handwoven Zardozi</span>
        </div>
        <div className="flex justify-between text-xs uppercase tracking-widest font-medium mb-4 border-b border-soft-charcoal/10 pb-4">
          <span>Origin</span>
          <span className="text-soft-charcoal">Varanasi, India</span>
        </div>
      </div>

      <div className="mt-auto">
        <button 
          onClick={() => {
            setIsAdded(true);
            const product = {
              id: 1,
              name: "Midnight Silk Chiffon",
              price: "₹24,999",
              image: "/images/demo-6.png"
            };
            window.dispatchEvent(new CustomEvent('add-to-cart', { detail: product }));
            setTimeout(() => setIsAdded(false), 2000);
          }}
          className="w-full h-16 bg-rich-black text-warm-ivory uppercase tracking-[0.2em] text-sm font-medium hover:bg-champagne-gold transition-colors duration-300 relative overflow-hidden"
        >
          <motion.div
            initial={false}
            animate={{ y: isAdded ? "-100%" : "0%" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            Add to Bag
          </motion.div>
          <motion.div
            initial={false}
            animate={{ y: isAdded ? "0%" : "100%" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            Added to Bag
          </motion.div>
        </button>
        <p className="text-center text-xs text-soft-charcoal uppercase tracking-widest mt-6">
          Complimentary Worldwide Shipping
        </p>
      </div>
    </div>
  );
}

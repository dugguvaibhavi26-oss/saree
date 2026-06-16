"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Heart, Eye, ShoppingBag } from "lucide-react";

const PRODUCTS = [
  {
    id: 1,
    name: "Midnight Silk Chiffon",
    price: "₹24,999",
    category: "Chiffon Sarees",
    image: "/images/demo-1.png",
    hoverImage: "/images/demo-8.png",
  },
  {
    id: 2,
    name: "Ivory Organza Drape",
    price: "₹18,500",
    category: "Organza Sarees",
    image: "/images/demo-6.png",
    hoverImage: "/images/demo-6.png",
  },
  {
    id: 3,
    name: "Crimson Velvet Border",
    price: "₹32,000",
    category: "Bridal Sarees",
    image: "/images/demo-9.png",
    hoverImage: "/images/demo-2.png",
  },
  {
    id: 4,
    name: "Golden Weave Kanjivaram",
    price: "₹45,000",
    category: "Kanjivaram Sarees",
    image: "/images/demo-1.png",
    hoverImage: "/images/demo-9.png",
  },
  {
    id: 5,
    name: "Emerald Green Georgette",
    price: "₹16,999",
    category: "Georgette Sarees",
    image: "/images/demo-1.png",
    hoverImage: "/images/demo-6.png",
  },
  {
    id: 6,
    name: "Blush Pink Net Saree",
    price: "₹22,500",
    category: "Bridal Sarees",
    image: "/images/demo-1.png",
    hoverImage: "/images/demo-2.png",
  },
  {
    id: 7,
    name: "Royal Blue Banarasi",
    price: "₹38,000",
    category: "Banarasi Sarees",
    image: "/images/demo-3.png",
    hoverImage: "/images/demo-7.png",
  },
  {
    id: 8,
    name: "Pure Silver Zari Tissue",
    price: "₹42,500",
    category: "Designer Sarees",
    image: "/images/demo-5.png",
    hoverImage: "/images/demo-1.png",
  },
  {
    id: 9,
    name: "Champagne Gold Linen",
    price: "₹14,999",
    category: "Linen Sarees",
    image: "/images/demo-8.png",
    hoverImage: "/images/demo-4.png",
  },
  {
    id: 10,
    name: "Ruby Red Patola",
    price: "₹55,000",
    category: "Silk Sarees",
    image: "/images/demo-4.png",
    hoverImage: "/images/demo-9.png",
  },
  {
    id: 11,
    name: "Pastel Mint Chanderi",
    price: "₹12,500",
    category: "Cotton Sarees",
    image: "/images/demo-2.png",
    hoverImage: "/images/demo-6.png",
  },
  {
    id: 12,
    name: "Deep Maroon Baluchari",
    price: "₹28,000",
    category: "Silk Sarees",
    image: "/images/demo-7.png",
    hoverImage: "/images/demo-3.png",
  },
  {
    id: 13,
    name: "Lavender Floral Georgette",
    price: "₹15,000",
    category: "Party Wear Sarees",
    image: "/images/demo-1.png",
    hoverImage: "/images/demo-5.png",
  },
  {
    id: 14,
    name: "Onyx Black Jamdani",
    price: "₹19,999",
    category: "Designer Sarees",
    image: "/images/demo-6.png",
    hoverImage: "/images/demo-8.png",
  },
  {
    id: 15,
    name: "Mustard Yellow Silk",
    price: "₹21,000",
    category: "Silk Sarees",
    image: "/images/demo-9.png",
    hoverImage: "/images/demo-4.png",
  },
  {
    id: 16,
    name: "Rose Gold Handloom",
    price: "₹31,500",
    category: "New Arrivals",
    image: "/images/demo-3.png",
    hoverImage: "/images/demo-2.png",
  }
];

const CATEGORIES = ["All Sarees", "Silk Sarees", "Banarasi Sarees", "Kanjivaram Sarees", "Cotton Sarees", "Organza Sarees", "Linen Sarees", "Chiffon Sarees", "Georgette Sarees", "Bridal Sarees", "Party Wear Sarees", "Designer Sarees", "Festival Collection", "Office Wear", "New Arrivals", "Best Sellers", "Sale"];

const FILTERS = {
  Fabric: ["Silk", "Cotton", "Organza", "Chiffon", "Georgette", "Linen"],
  Occasion: ["Wedding", "Festive", "Party", "Casual", "Office"],
  Color: ["Red", "Gold", "Ivory", "Black", "Blue", "Green"],
  Price: ["Under ₹10,000", "₹10,000 - ₹25,000", "₹25,000 - ₹50,000", "Above ₹50,000"]
};

const SORT_OPTIONS = ["Featured", "Newest", "Best Selling", "Price: Low to High", "Price: High to Low", "Most Popular"];

export default function CollectionGrid() {
  const [activeCategory, setActiveCategory] = useState("All Sarees");
  const [activeSort, setActiveSort] = useState("Featured");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  // Filter state
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    Fabric: [], Occasion: [], Color: [], Price: []
  });

  const toggleFilter = (group: string, value: string) => {
    setActiveFilters(prev => {
      const current = prev[group];
      if (current.includes(value)) {
        return { ...prev, [group]: current.filter(v => v !== value) };
      }
      return { ...prev, [group]: [...current, value] };
    });
  };

  const filteredProducts = PRODUCTS.filter(
    (product) => activeCategory === "All Sarees" || product.category === activeCategory
  );

  return (
    <div className="flex flex-col lg:flex-row gap-12 text-rich-black relative">
      {/* Sidebar Filters */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-32">
          {/* Categories */}
          <div className="mb-12">
            <h3 className="font-serif text-2xl mb-6">Categories</h3>
            <div className="flex flex-col gap-3 max-h-96 overflow-y-auto pr-4 no-scrollbar">
              {CATEGORIES.map(category => (
                <button 
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`text-left font-sans text-sm tracking-wide transition-colors ${
                    activeCategory === category ? "text-champagne-gold font-medium" : "text-soft-charcoal hover:text-rich-black"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="space-y-8">
            {Object.entries(FILTERS).map(([group, options]) => (
              <div key={group}>
                <h4 className="font-sans text-xs uppercase tracking-[0.2em] mb-4 text-rich-black font-medium">{group}</h4>
                <div className="flex flex-col gap-3">
                  {options.map(option => {
                    const isActive = activeFilters[group].includes(option);
                    return (
                      <label key={option} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-4 h-4 border transition-colors flex items-center justify-center ${
                          isActive ? "bg-rich-black border-rich-black" : "border-soft-charcoal/30 group-hover:border-rich-black"
                        }`}>
                          {isActive && <div className="w-2 h-2 bg-warm-ivory" />}
                        </div>
                        <span className={`font-sans text-sm transition-colors ${
                          isActive ? "text-rich-black" : "text-soft-charcoal group-hover:text-rich-black"
                        }`}>
                          {option}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full overflow-hidden">
        
        {/* Mobile Categories (Horizontal Scroll) */}
        <div className="block lg:hidden mb-8 -mx-6 px-6">
           <div className="flex overflow-x-auto gap-3 pb-4 no-scrollbar">
              {CATEGORIES.map(category => (
                 <button 
                   key={category}
                   onClick={() => setActiveCategory(category)}
                   className={`shrink-0 px-4 py-2 rounded-full border text-xs tracking-wider transition-colors ${
                     activeCategory === category 
                       ? "bg-rich-black text-warm-ivory border-rich-black" 
                       : "bg-transparent text-soft-charcoal border-soft-charcoal/20 hover:border-rich-black"
                   }`}
                 >
                   {category}
                 </button>
              ))}
           </div>
        </div>

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-soft-charcoal/10 gap-4">
          <p className="font-sans text-xs md:text-sm text-soft-charcoal tracking-wide hidden sm:block">Showing 1-{filteredProducts.length} of 124 products</p>
          
          <div className="relative ml-auto">
            <button 
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 font-sans text-xs md:text-sm uppercase tracking-widest text-rich-black"
            >
              Sort By: <span className="text-soft-charcoal normal-case tracking-wide ml-1 hidden sm:inline">{activeSort}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
            </button>
            
            <AnimatePresence>
              {isSortOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-white border border-soft-charcoal/10 shadow-xl z-30 py-2"
                >
                  {SORT_OPTIONS.map(option => (
                    <button
                      key={option}
                      onClick={() => {
                        setActiveSort(option);
                        setIsSortOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 font-sans text-sm text-soft-charcoal hover:bg-warm-ivory hover:text-rich-black transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Product Grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 gap-y-10 md:gap-y-16">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="group relative block w-full">
                  <Link href={`/products/${product.id}`} className="block relative aspect-[3/4] w-full overflow-hidden bg-stone-beige mb-3 md:mb-6 shadow-sm group-hover:shadow-xl transition-shadow duration-500">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className={`object-cover transition-opacity duration-700 ease-in-out ${hoveredProduct === product.id && product.hoverImage ? 'opacity-0' : 'opacity-100'}`}
                    />
                    {product.hoverImage && (
                      <Image
                        src={product.hoverImage}
                        alt={`${product.name} alternate view`}
                        fill
                        className={`object-cover transition-opacity duration-700 ease-in-out ${hoveredProduct === product.id ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
                      />
                    )}

                    {/* Quick Actions overlay (Hidden on very small mobile) */}
                    <div className="absolute inset-x-0 bottom-0 p-2 md:p-4 bg-gradient-to-t from-rich-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex justify-between items-end translate-y-4 group-hover:translate-y-0">
                       <button className="bg-warm-ivory text-rich-black w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center hover:bg-champagne-gold transition-colors" aria-label="Quick View">
                         <Eye className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                       </button>
                       <button className="bg-warm-ivory text-rich-black px-4 md:px-6 h-8 md:h-10 rounded-full font-sans text-[10px] md:text-xs uppercase tracking-widest font-medium flex items-center gap-2 hover:bg-champagne-gold transition-colors">
                         <ShoppingBag className="w-3 h-3 md:w-4 md:h-4" strokeWidth={1.5} /> Add
                       </button>
                    </div>
                  </Link>

                  {/* Wishlist Heart */}
                  <button className="absolute top-2 right-2 md:top-4 md:right-4 z-10 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-rich-black/50 hover:text-champagne-gold transition-colors">
                     <Heart className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                  </button>
                  
                  <div className="flex flex-col gap-1 md:gap-2">
                    <div className="flex justify-between items-start gap-2 md:gap-4">
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-serif text-[13px] sm:text-base md:text-xl text-rich-black group-hover:text-champagne-gold transition-colors duration-300 leading-tight">
                          {product.name}
                        </h3>
                      </Link>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <p className="font-sans text-[11px] sm:text-sm font-medium text-rich-black">
                        {product.price}
                      </p>
                      <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-wider text-soft-charcoal/60 hidden sm:inline">
                        {product.category.replace(" Sarees", "")}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}

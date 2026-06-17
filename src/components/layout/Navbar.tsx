"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Menu, X, Store } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    const handleOpenCart = () => {
      setIsCartOpen(true);
    };
    const handleAddToCart = (e: any) => {
      setCartItems((prev) => [...prev, e.detail]);
      setIsCartOpen(true);
    };
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("open-cart", handleOpenCart);
    window.addEventListener("add-to-cart", handleAddToCart);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("open-cart", handleOpenCart);
      window.removeEventListener("add-to-cart", handleAddToCart);
    };
  }, []);

  const shouldShowDarkNav = isScrolled || isMobileMenuOpen || !isHomePage;

  const subtotal = cartItems.reduce((acc, item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, ''), 10) || 0;
    return acc + price;
  }, 0);
  const formattedSubtotal = `₹${subtotal.toLocaleString('en-IN')}`;

  const removeItem = (indexToRemove: number) => {
    setCartItems(cartItems.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <>
      <motion.nav 
        className={`fixed top-0 w-full z-[70] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex justify-center ${
          shouldShowDarkNav ? "pt-4" : "pt-0 bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className={`flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          shouldShowDarkNav
            ? "w-[90%] md:w-auto md:min-w-[400px] bg-rich-black/80 backdrop-blur-md rounded-full px-8 py-3 border border-white/10 shadow-2xl" 
            : "w-full px-6 md:px-12 py-6"
        }`}>
          {/* Left - Hamburger & Search */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-warm-ivory hover:text-champagne-gold transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X strokeWidth={1.5} className="w-5 h-5 md:w-6 md:h-6" />
              ) : (
                <Menu strokeWidth={1.5} className="w-5 h-5 md:w-6 md:h-6" />
              )}
            </button>
            <button className="text-warm-ivory hover:text-champagne-gold transition-colors hidden md:block" aria-label="Search">
              <Search strokeWidth={1.5} className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          {/* Center - Logo */}
          <div className={`transition-all duration-500 ${shouldShowDarkNav ? "mx-8 md:mx-16" : "absolute left-1/2 -translate-x-1/2"}`}>
            <Link 
              href="/" 
              onClick={(e) => {
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
                setIsMobileMenuOpen(false);
              }}
              className="font-serif text-2xl md:text-3xl text-warm-ivory tracking-wider hover:text-champagne-gold transition-colors"
            >
              S.S.
            </Link>
          </div>

          {/* Right - Cart & Store */}
          <div className="flex items-center gap-4 md:gap-6">
            <Link href="/store" className="text-warm-ivory hover:text-champagne-gold transition-colors block" aria-label="Store">
              <Store strokeWidth={1.5} className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-warm-ivory hover:text-champagne-gold transition-colors relative" 
              aria-label="Cart"
            >
              <ShoppingBag strokeWidth={1.5} className="w-5 h-5 md:w-6 md:h-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-champagne-gold text-rich-black text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-sans font-medium">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-rich-black/40 backdrop-blur-sm z-[80]"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="fixed top-0 right-0 h-full w-[90%] md:w-[450px] bg-warm-ivory z-[90] shadow-2xl flex flex-col"
            >
              <div className="p-6 md:p-8 flex justify-between items-center border-b border-soft-charcoal/10 shrink-0">
                <h2 className="font-serif text-3xl text-rich-black">Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-soft-charcoal hover:text-rich-black transition-colors">
                  <X strokeWidth={1.5} className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto no-scrollbar p-6 md:p-8">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingBag strokeWidth={1} className="w-16 h-16 text-soft-charcoal/30 mb-6" />
                    <p className="font-sans text-soft-charcoal text-lg mb-8">Your shopping bag is empty.</p>
                    <button 
                      onClick={() => { setIsCartOpen(false); window.location.href = '/store'; }}
                      className="bg-rich-black text-warm-ivory px-8 py-3 rounded-full font-sans text-xs tracking-widest uppercase hover:bg-champagne-gold transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {cartItems.map((item, index) => (
                      <div key={index} className="flex gap-6 border-b border-soft-charcoal/10 pb-6 group">
                        <div className="relative w-24 h-32 bg-stone-beige rounded-xl overflow-hidden shrink-0">
                           <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex flex-col justify-center flex-1">
                          <h3 className="font-serif text-xl mb-1 text-rich-black">{item.name}</h3>
                          <p className="font-sans text-sm text-soft-charcoal mb-4">{item.price}</p>
                          <button 
                            onClick={() => removeItem(index)}
                            className="text-[10px] text-soft-charcoal uppercase tracking-widest border-b border-soft-charcoal w-max hover:text-rich-black hover:border-rich-black transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-6 md:p-8 border-t border-soft-charcoal/10 bg-warm-ivory shrink-0">
                  <div className="flex justify-between font-serif text-2xl mb-6">
                    <span>Subtotal</span>
                    <span>{formattedSubtotal}</span>
                  </div>
                  <button className="w-full h-14 bg-rich-black text-warm-ivory uppercase tracking-[0.2em] text-xs font-medium hover:bg-champagne-gold transition-colors rounded-full">
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "tween", duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] bg-rich-black text-warm-ivory flex flex-col pt-32"
          >
            {/* Menu Links */}
            <div className="flex-1 flex flex-col justify-center px-8 md:px-24">
              <nav className="flex flex-col gap-6 md:gap-8 items-center md:items-start text-center md:text-left">
                {["Store", "Lookbook", "Our Heritage"].map((item, i) => {
                  let href = `/${item.toLowerCase().replace(" ", "-")}`;
                  if (item === "Store") href = "/store";
                  if (item === "Our Heritage") href = "/#varanasi";

                  return (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 + 0.2, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                    >
                      <Link 
                        href={href}
                        onClick={(e) => {
                           setIsMobileMenuOpen(false);
                           if (item === "Our Heritage" && window.location.pathname === "/") {
                              e.preventDefault();
                              const el = document.getElementById("varanasi");
                              if (el) el.scrollIntoView({ behavior: "smooth" });
                           }
                        }}
                        className="font-serif text-5xl md:text-7xl text-warm-ivory hover:text-champagne-gold transition-colors inline-block"
                      >
                        {item}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>
            
            {/* Footer */}
            <div className="p-8 md:p-12 font-sans text-sm text-soft-charcoal uppercase tracking-widest flex justify-between">
              <span>Customer Care</span>
              <span>Account</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship worldwide. International orders typically take 7-14 business days to arrive, depending on the destination and customs processing."
  },
  {
    question: "What is your return policy?",
    answer: "We accept returns within 7 days of delivery for unworn and unwashed items with all original tags attached. Custom or personalized orders cannot be returned."
  },
  {
    question: "How do I care for my silk sarees?",
    answer: "We highly recommend dry cleaning for all our silk and organza sarees to maintain their luster and delicate embroidery. Store them in a breathable cotton or muslin cloth."
  },
  {
    question: "Can I request custom measurements for blouses?",
    answer: "Absolutely! We offer bespoke tailoring services. Once you place an order, our styling team will reach out to collect your exact measurements."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-6 md:px-12 bg-rich-black text-warm-ivory">
      <div className="max-w-[1000px] mx-auto">
        <h2 className="font-serif text-5xl md:text-6xl text-center mb-16 leading-tight">
          Frequently Asked <br />
          <span className="italic font-light text-champagne-gold">Questions</span>
        </h2>
        
        <div className="flex flex-col gap-4">
          {FAQS.map((faq, index) => (
            <div 
              key={index} 
              className="border-b border-soft-charcoal pb-4"
            >
              <button 
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between py-4 text-left group focus:outline-none"
              >
                <span className="font-serif text-2xl md:text-3xl group-hover:text-champagne-gold transition-colors">
                  {faq.question}
                </span>
                <div className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <ChevronDown className="w-6 h-6 text-stone-beige group-hover:text-champagne-gold transition-colors" />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="font-sans text-stone-beige leading-relaxed pb-6 pt-2 text-sm md:text-base max-w-3xl">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

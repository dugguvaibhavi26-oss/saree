"use client";

import { Mail, MessageCircle } from "lucide-react";

export default function ContactUs() {
  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-rich-black text-warm-ivory border-t border-soft-charcoal">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="font-serif text-5xl md:text-6xl leading-tight mb-6">Get in Touch</h2>
          <p className="font-sans text-stone-beige mb-10 max-w-md">
            Have questions about our collections, custom orders, or just want to say hello? We'd love to hear from you.
          </p>
          
          <div className="flex flex-col gap-6">
            <a href="mailto:hello@sareesstudio.com" className="flex items-center gap-4 hover:text-champagne-gold transition-colors">
              <Mail className="w-6 h-6" />
              <span className="font-sans text-lg">hello@sareesstudio.com</span>
            </a>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-champagne-gold transition-colors">
              <MessageCircle className="w-6 h-6" />
              <span className="font-sans text-lg">+91 98765 43210 (WhatsApp)</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-champagne-gold transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              <span className="font-sans text-lg">@sareesstudio</span>
            </a>
          </div>
        </div>

        <div className="bg-soft-charcoal/20 p-8 md:p-12 rounded-2xl border border-soft-charcoal">
          <h3 className="font-serif text-3xl mb-8">Send a Query</h3>
          <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); alert("Thanks for your query! We will get back to you soon."); }}>
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-sans text-sm text-stone-beige uppercase tracking-wider">Name</label>
              <input type="text" id="name" required className="bg-transparent border-b border-soft-charcoal py-2 focus:outline-none focus:border-champagne-gold transition-colors text-warm-ivory" placeholder="Your name" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-sans text-sm text-stone-beige uppercase tracking-wider">Email</label>
              <input type="email" id="email" required className="bg-transparent border-b border-soft-charcoal py-2 focus:outline-none focus:border-champagne-gold transition-colors text-warm-ivory" placeholder="your@email.com" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-sans text-sm text-stone-beige uppercase tracking-wider">Message</label>
              <textarea id="message" required rows={4} className="bg-transparent border-b border-soft-charcoal py-2 focus:outline-none focus:border-champagne-gold transition-colors text-warm-ivory resize-none" placeholder="How can we help you?"></textarea>
            </div>
            <button type="submit" className="mt-4 bg-champagne-gold text-rich-black font-sans uppercase tracking-widest py-4 px-8 font-medium hover:bg-warm-ivory transition-colors w-full md:w-auto self-start">
              Submit Query
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-rich-black text-warm-ivory pt-24 pb-12">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-serif text-4xl md:text-6xl mb-6">SAREES STUDIO</h2>
            <p className="text-stone-beige max-w-md font-sans text-sm md:text-base leading-relaxed">
              A modern interpretation of traditional elegance. Premium sarees crafted for the contemporary woman.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl mb-6 text-champagne-gold">Explore</h3>
            <ul className="flex flex-col gap-4 font-sans text-sm text-stone-beige">
              <li><Link href="/store" className="hover:text-warm-ivory transition-colors">Collections</Link></li>
              <li><Link href="/store" className="hover:text-warm-ivory transition-colors">Lookbook</Link></li>
              <li><Link href="/" className="hover:text-warm-ivory transition-colors">Our Story</Link></li>
              <li><Link href="/" className="hover:text-warm-ivory transition-colors">Journal</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-xl mb-6 text-champagne-gold">Assistance</h3>
            <ul className="flex flex-col gap-4 font-sans text-sm text-stone-beige">
              <li><Link href="/#contact" className="hover:text-warm-ivory transition-colors">Contact Us</Link></li>
              <li><Link href="/#faq" className="hover:text-warm-ivory transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/#faq" className="hover:text-warm-ivory transition-colors">FAQ</Link></li>
              <li><Link href="/#faq" className="hover:text-warm-ivory transition-colors">Garment Care</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-soft-charcoal flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-stone-beige uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Sarees Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-warm-ivory transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-warm-ivory transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

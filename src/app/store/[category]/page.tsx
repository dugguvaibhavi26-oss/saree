import CollectionGrid from "@/components/collection/CollectionGrid";
import Image from "next/image";

export default function CategoryPage() {
  return (
    <div className="bg-warm-ivory min-h-screen">
      {/* Header with light transparent background image */}
      <div className="relative pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden mb-12">
        <Image 
          src="/images/demo-4.png" 
          alt="Store Background" 
          fill 
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-warm-ivory/60 to-warm-ivory" />
        
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 text-center">
          <span className="text-soft-charcoal tracking-[0.3em] uppercase text-xs mb-6 block font-medium">Sarees Studio</span>
          <h1 className="font-serif text-6xl md:text-8xl text-rich-black mb-6 tracking-tight">The Store</h1>
        </div>
      </div>
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pb-24">
        <CollectionGrid />
      </div>
    </div>
  );
}

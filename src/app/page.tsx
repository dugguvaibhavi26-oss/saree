import Hero from "@/components/home/Hero";
import NewArrivals from "@/components/home/NewArrivals";
import ArtOfWeaving from "@/components/home/ArtOfWeaving";
import CategoryGrid from "@/components/home/CategoryGrid";
import RegionalHeritage from "@/components/home/RegionalHeritage";
import ShopByOccasion from "@/components/home/ShopByOccasion";
import BestSellers from "@/components/home/BestSellers";
import CustomerStories from "@/components/home/CustomerStories";
import ContactUs from "@/components/home/ContactUs";
import FAQ from "@/components/home/FAQ";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-rich-black">
      <Hero />
      <ArtOfWeaving />
      <NewArrivals />
      <RegionalHeritage />
      <CategoryGrid />
      <ShopByOccasion />
      <BestSellers />
      <CustomerStories />
      <FAQ />
      <ContactUs />
    </div>
  );
}

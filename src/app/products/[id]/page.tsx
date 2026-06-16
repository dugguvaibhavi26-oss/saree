import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductStory from "@/components/product/ProductStory";
import SimilarProducts from "@/components/product/SimilarProducts";

export default function ProductPage({ params }: { params: { id: string } }) {
  // In a real app, you'd fetch the product based on params.id
  return (
    <div className="bg-warm-ivory min-h-screen pt-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-32">
          <div className="w-full lg:w-[60%]">
            <ProductGallery />
          </div>
          <div className="w-full lg:w-[40%]">
            <ProductInfo />
          </div>
        </div>
      </div>
      
      <ProductStory />
      <SimilarProducts />
    </div>
  );
}

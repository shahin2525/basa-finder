import { RentalCardSection } from "@/components/modules/home/card-section";
import HeroSection from "@/components/modules/home/hero-section";
import TestimonialSection from "@/components/modules/home/testimonial-section";
import { getAllListingsForTenant } from "@/services/home";

const HomePage = async () => {
  const { data } = await getAllListingsForTenant();

  return (
    <div className="">
      <HeroSection />
      <RentalCardSection properties={data} />
      <TestimonialSection />
    </div>
  );
};

export default HomePage;

import { RentalCardSection } from "@/components/modules/home/card-section";
import HeroSection from "@/components/modules/home/hero-section";
import HowWork from "@/components/modules/home/how-work/HowWork";
import PopularLocation from "@/components/modules/home/popularLocation/PopularLocation";
import TestimonialSection from "@/components/modules/home/testimonial-section";
import WhyChoose from "@/components/modules/home/why-choose/WhyChoose";
import { getAllListingsForTenant } from "@/services/home";

const HomePage = async () => {
  const { data } = await getAllListingsForTenant();

  return (
    <div className="">
      <HeroSection />
      <RentalCardSection properties={data} />
      <TestimonialSection />
      <PopularLocation />
      <WhyChoose />
      <HowWork />
    </div>
  );
};

export default HomePage;

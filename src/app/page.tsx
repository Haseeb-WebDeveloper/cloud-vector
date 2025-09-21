import ClientSectionV2 from "@/components/cost-optimisation/client-section-v2";
import TestimonialsSection from "@/components/cost-optimisation/testimonials";
import HomeHeroSection from "@/components/home/hero";
import FAQSection from "@/components/faq-section";
import GetStartedSection from "@/components/cost-optimisation/get-started-section";

export default function Home() {
  return (
    <>
      <HomeHeroSection />
      <ClientSectionV2 />
      <GetStartedSection />
      <TestimonialsSection />
      <FAQSection />
  </>
  );
}

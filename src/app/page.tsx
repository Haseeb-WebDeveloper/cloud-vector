import ClientSectionV2 from "@/components/cost-optimisation/client-section-v2";
import TestimonialsSection from "@/components/cost-optimisation/testimonials";
import HomeHeroSection from "@/components/home/hero";
import FAQSection from "@/components/faq-section";
import GetStartedSection from "@/components/cost-optimisation/get-started-section";
import AnimatedSections from "@/components/animated";
import { ChartPieDonutText } from "@/components/ui/pie-chart";

export default function Home() {
  const stats = [
    {
      title: "12+",
      description: "Years in Amazon/AWS",
    },

    {
      title: "$60M+",
      description: "Annual Savings",
    },

    {
      title: "68%",
      description: "Annual Savings",
    },
  ];

  return (
    <>
      <HomeHeroSection />
      {/* <ChartPieDonutText /> */}
      <ClientSectionV2 title="Proven Savings. Real Impact" stats={stats} />
      <AnimatedSections />
      <div>
        <div className="mx-auto px-6 lg:px-8 max-w-7xl">
          <GetStartedSection />
        </div>
      </div>
      <TestimonialsSection />
      <FAQSection />
    </>
  );
}

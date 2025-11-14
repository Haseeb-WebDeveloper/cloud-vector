import CostOptimisationHeroSection from "@/components/cost-optimisation/hero-section";
import ClientSection from "@/components/cost-optimisation/client-section";
import ClientSectionV2 from "@/components/cost-optimisation/client-section-v2";
import IndustryFactsSection from "@/components/cost-optimisation/industry-facts-section";
import { RootCaseSection } from "@/components/cost-optimisation/root-case";
import StepsSection from "@/components/cost-optimisation/steps-section";
import OurApproachSection from "@/components/cost-optimisation/our-approach";
import TestimonialsSection from "@/components/cost-optimisation/testimonials";
import GetStartedSection from "@/components/cost-optimisation/get-started-section";



export default function CostOptimisation() {

  const stats = [
    { title: "12+", description: "Years in Amazon/AWS" },
    { title: "$60M+", description: "Annual Savings" },
    { title: "68%", description: "Annual Savings" },
  ];

  return (
    <div>
      <CostOptimisationHeroSection />
      <ClientSectionV2 title="Proven Savings. Real Impact" stats={stats} />
      <IndustryFactsSection />
      <RootCaseSection />
      <TestimonialsSection />
      <OurApproachSection />
      <GetStartedSection whatsappLink="https://s.cloudvictor.com/whatsapp-web-finops-2" scheduleLink="https://s.cloudvictor.com/meeting-web-finops-2" />
      <StepsSection />
    </div>
  );
}

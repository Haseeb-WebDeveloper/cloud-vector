import CostOptimisationHeroSection from "@/components/cost-optimisation/hero-section";
import ClientSection from "@/components/cost-optimisation/client-section";
import ClientSectionV2 from "@/components/cost-optimisation/client-section-v2";
import IndustryFactsSection from "@/components/cost-optimisation/industry-facts-section";
import { RootCaseSection } from "@/components/cost-optimisation/root-case";
import StepsSection from "@/components/cost-optimisation/steps-section";
import OurApproachSection from "@/components/cost-optimisation/our-approach";
import TestimonialsSection from "@/components/cost-optimisation/testimonials";
import NewsletterSection from "@/components/cost-optimisation/newsletter-section";
import { HelpSection } from "@/components/help-section";
import GetStartedSection from "@/components/cost-optimisation/get-started-section";

export default function CostOptimisation() {
  return (
    <div>
      <CostOptimisationHeroSection />
      {/* <ClientSection /> */}
      <ClientSectionV2 />
      <IndustryFactsSection />
      <RootCaseSection />
      <TestimonialsSection />
      <OurApproachSection />
      <GetStartedSection />
      <StepsSection />
    </div>
  );
}

import CostOptimisationHeroSection from "@/components/cost-optimisation/hero-section";
import ClientSection from "@/components/cost-optimisation/client-section";
import ClientSectionV2 from "@/components/cost-optimisation/client-section-v2";

export default function CostOptimisation() {
  return (
    <div>
      <CostOptimisationHeroSection />
      <ClientSection />
      <ClientSectionV2 />
    </div>
  );
}
import CostOptimisationHeroSection from "@/components/cost-optimisation/hero-section";
import ClientSectionV2 from "@/components/cost-optimisation/client-section-v2";
import IndustryFactsSection from "@/components/cost-optimisation/industry-facts-section";
import { RootCaseSection } from "@/components/cost-optimisation/root-case";
import StepsSection from "@/components/cost-optimisation/steps-section";
import OurApproachSection from "@/components/cost-optimisation/our-approach";
import TestimonialsSection from "@/components/cost-optimisation/testimonials";
import GetStartedSection from "@/components/cost-optimisation/get-started-section";
import { getCostOptimisationPageData } from "@/lib/sanity/fetch";

export default async function CostOptimisation() {
  // Fetch Cost Optimisation page data from Sanity
  // All content is editable in Sanity Studio under "Cost Optimisation Page" document
  const costOptimisationPageData = await getCostOptimisationPageData();

  // Fallback stats for client section (used if Sanity data is not available)
  const stats = costOptimisationPageData?.clientSection?.stats || [
    { title: "12+", description: "Years in Amazon/AWS" },
    { title: "$60M+", description: "Annual Savings" },
    { title: "68%", description: "Max Cost Reduction" },
  ];

  return (
    <div>
      <CostOptimisationHeroSection
        mainHeading={costOptimisationPageData?.heroSection?.mainHeading}
        subheading={costOptimisationPageData?.heroSection?.subheading}
        animatedTexts={costOptimisationPageData?.heroSection?.animatedTexts}
        animatedTextPrefix={costOptimisationPageData?.heroSection?.animatedTextPrefix}
        animatedTextSuffix={costOptimisationPageData?.heroSection?.animatedTextSuffix}
        ctaButtons={costOptimisationPageData?.heroSection?.ctaButtons}
        heroImage={costOptimisationPageData?.heroSection?.heroImage?.asset?.url}
      />
      <ClientSectionV2
        title={costOptimisationPageData?.clientSection?.title || "Proven Savings. Real Impact"}
        stats={stats}
        partnerLogos={costOptimisationPageData?.clientSection?.partnerLogos}
      />
      <IndustryFactsSection
        title={costOptimisationPageData?.industryFactsSection?.title}
        subtitle={costOptimisationPageData?.industryFactsSection?.subtitle}
        facts={costOptimisationPageData?.industryFactsSection?.facts}
      />
      <RootCaseSection
        title={costOptimisationPageData?.rootCaseSection?.title}
        videoUrl={costOptimisationPageData?.rootCaseSection?.videoUrl || costOptimisationPageData?.rootCaseSection?.video?.asset?.url}
      />
      <TestimonialsSection
        title={costOptimisationPageData?.testimonialsSection?.title}
        testimonials={costOptimisationPageData?.testimonialsSection?.testimonials}
      />
      <OurApproachSection
        title={costOptimisationPageData?.ourApproachSection?.title}
        subtitle={costOptimisationPageData?.ourApproachSection?.subtitle}
        steps={costOptimisationPageData?.ourApproachSection?.steps}
      />
      <GetStartedSection
        whatsappLink={costOptimisationPageData?.getStartedSection?.whatsappLink || "https://s.cloudvictor.com/whatsapp-web-finops-2"}
        scheduleLink={costOptimisationPageData?.getStartedSection?.scheduleLink || "https://s.cloudvictor.com/meeting-web-finops-2"}
        logo={costOptimisationPageData?.getStartedSection?.logo?.asset?.url}
        heading={costOptimisationPageData?.getStartedSection?.heading}
        bodyText={costOptimisationPageData?.getStartedSection?.bodyText}
        chips={costOptimisationPageData?.getStartedSection?.chips}
        ctaButtons={costOptimisationPageData?.getStartedSection?.ctaButtons}
        backgroundImage={costOptimisationPageData?.getStartedSection?.backgroundImage?.asset?.url}
      />
      <StepsSection
        title={costOptimisationPageData?.stepsSection?.title}
        subtitle={costOptimisationPageData?.stepsSection?.subtitle}
        steps={costOptimisationPageData?.stepsSection?.steps}
      />
    </div>
  );
}

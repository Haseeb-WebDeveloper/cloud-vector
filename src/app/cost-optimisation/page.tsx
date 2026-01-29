import type { Metadata } from "next";
import CostOptimisationHeroSection from "@/components/cost-optimisation/hero-section";
import ClientSectionV2 from "@/components/cost-optimisation/client-section-v2";
import IndustryFactsSection from "@/components/cost-optimisation/industry-facts-section";
import { RootCaseSection } from "@/components/cost-optimisation/root-case";
import StepsSection from "@/components/cost-optimisation/steps-section";
import OurApproachSection from "@/components/cost-optimisation/our-approach";
import TestimonialsSection from "@/components/cost-optimisation/testimonials";
import GetStartedSection from "@/components/cost-optimisation/get-started-section";
import { getCostOptimisationPageData } from "@/lib/sanity/fetch";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.cloudvictor.com";

export async function generateMetadata(): Promise<Metadata> {
  const costOptimisationPageData = await getCostOptimisationPageData();

  const title =
    costOptimisationPageData?.metaTitle ||
    "AWS Cost Optimisation Services | CloudVictor";
  const description =
    costOptimisationPageData?.metaDescription ||
    "Slash AWS costs without slowing down product delivery. CloudVictor finds and fixes waste across EC2, EKS, RDS, S3 and more with Amazon-grade FinOps.";

  const ogImage =
    costOptimisationPageData?.ogImage?.asset?.url ||
    `${SITE_URL}/og-cost-optimisation.jpg`;

  const url = `${SITE_URL}/cost-optimisation`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "CloudVictor",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

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

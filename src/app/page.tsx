import type { Metadata } from "next";
import ClientSectionV2 from "@/components/cost-optimisation/client-section-v2";
import TestimonialsSection from "@/components/cost-optimisation/testimonials";
import HomeHeroSection from "@/components/home/hero";
import ValueProps from "@/components/home/value-props";
import FAQSection from "@/components/faq-section";
import GetStartedSection from "@/components/cost-optimisation/get-started-section";
import AnimatedSections from "@/components/animated";
import CaseStudySection from "@/components/home/case-study-section";
import { ChartPieDonutText } from "@/components/ui/pie-chart";
import { getHomePageData } from "@/lib/sanity/fetch";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.cloudvictor.com";

export async function generateMetadata(): Promise<Metadata> {
  const homePageData = await getHomePageData();

  const title =
    homePageData?.metaTitle ||
    "AWS Cost Optimisation & FinOps Automation for Engineering Teams | CloudVictor";
  const description =
    homePageData?.metaDescription ||
    "Cut AWS costs by up to 68% while improving reliability and security. CloudVictor brings Amazon-grade FinOps, observability and infrastructure operations to your team.";

  const ogImage =
    homePageData?.ogImage?.asset?.url || `${SITE_URL}/og-default.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: SITE_URL,
    },
    openGraph: {
      title,
      description,
      url: SITE_URL,
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

export default async function Home() {
  // Fetch homepage data from Sanity
  const homePageData = await getHomePageData();

  // Debug: Log the fetched data
  console.log("Homepage data from Sanity:", JSON.stringify(homePageData, null, 2));

  // Fallback to static data if Sanity data is not available
  const stats = homePageData?.clientSection?.stats || [
    {
      title: "10+",
      description: "Companies",
    },
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

      <HomeHeroSection
        mainHeading={homePageData?.heroSection?.mainHeading}
        animatedTexts={homePageData?.heroSection?.animatedTexts}
        subheading={homePageData?.heroSection?.subheading}
        ctaButtons={homePageData?.heroSection?.ctaButtons}
      />
      {/* <ChartPieDonutText /> */}
      <ClientSectionV2
        title={homePageData?.clientSection?.title || "Proven Savings. Real Impact"}
        stats={stats}
        partnerLogos={homePageData?.clientSection?.partnerLogos}
      />
      <AnimatedSections />
      <ValueProps />
      <div>
        <div className="mx-auto px-6 lg:px-8 max-w-7xl pt-20 bg-background pb-18">
          <GetStartedSection scheduleLink="https://s.cloudvictor.com/meeting-web-home-2" />
        </div>
      </div>
      <TestimonialsSection 
        title={homePageData?.testimonialsSection?.title}
        testimonials={homePageData?.testimonialsSection?.testimonials}
      />
      <CaseStudySection />
      <FAQSection />
    </>
  );
}

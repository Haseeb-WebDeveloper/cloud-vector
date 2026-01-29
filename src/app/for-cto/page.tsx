import type { Metadata } from "next";
import ClientSectionV2 from "@/components/cost-optimisation/client-section-v2";
import HomeHeroSection from "@/components/for-cto/hero";
import TestimonialsSection from "@/components/cost-optimisation/testimonials";
import Stats from "@/components/for-cto/stats";
import { StatData } from "@/components/animated";
import {
  PiggyBank,
  Percent,
  Rocket,
  ShieldCheck,
  TrendingUp,
  Users,
  BarChart3,
  Server,
} from "lucide-react";
import HowWeSolve from "@/components/for-cto/how-we-solve";
import HowItWorks from "@/components/for-cto/how-it-works";
import GetStartedSection from "@/components/cost-optimisation/get-started-section";
import CaseStudySection from "@/components/home/case-study-section";
import { getCTOPageData } from "@/lib/sanity/fetch";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.cloudvictor.com";

export async function generateMetadata(): Promise<Metadata> {
  const ctoPageData = await getCTOPageData();

  const title =
    ctoPageData?.metaTitle ||
    "For CTOs | Operate AWS Like Amazon Without Extra Headcount | CloudVictor";
  const description =
    ctoPageData?.metaDescription ||
    "Designed for engineering-led teams: Amazon-grade AWS operations, FinOps, reliability and security without growing your internal platform team.";

  const ogImage =
    ctoPageData?.ogImage?.asset?.url ||
    `${SITE_URL}/og-for-cto.jpg`;

  const url = `${SITE_URL}/for-cto`;

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

// Icon mapping for stats
const iconMap: Record<string, React.ReactNode> = {
  PiggyBank: <PiggyBank size={40} className="text-primary" />,
  Percent: <Percent size={40} className="text-primary" />,
  Rocket: <Rocket size={40} className="text-primary" />,
  ShieldCheck: <ShieldCheck size={40} className="text-primary" />,
  TrendingUp: <TrendingUp size={40} className="text-primary" />,
  Users: <Users size={40} className="text-primary" />,
  BarChart3: <BarChart3 size={40} className="text-primary" />,
  Server: <Server size={40} className="text-primary" />,
};

export default async function ForCTO() {
  // Fetch CTO page data from Sanity
  const ctoPageData = await getCTOPageData();

  // Fallback stats for client section
  const LogoStats = ctoPageData?.clientSection?.stats || [
    { title: "12+", description: "Years in Amazon/AWS" },
    { title: "10+", description: "Companies" },
    { title: "80+", description: "AWS accounts under Management" },
    {
      title: "20+",
      description: "end-to-end product infrastructure delivered",
    },
    { title: "$60M+", description: "Annual Savings" },
  ];

  // Transform stats from Sanity to component format
  const SocialStats: StatData[] = (ctoPageData?.statsSection?.stats || []).map((stat: any) => ({
    value: stat.value,
    label: stat.label,
    icon: iconMap[stat.icon] || <BarChart3 size={40} className="text-primary" />,
  }));

  // Fallback stats if Sanity data is not available
  const fallbackStats: StatData[] = [
    {
      value: "$362k+",
      label: "Savings delivered",
      icon: <PiggyBank size={40} className="text-primary" />,
    },
    {
      value: "40%",
      label: "Avg Cost Reduction results",
      icon: <BarChart3 size={40} className="text-primary" />,
    },
    {
      value: "68%",
      label: "Max Cost Reduction results",
      icon: <Percent size={40} className="text-primary" />,
    },
    {
      value: "80+",
      label: "Production launches",
      icon: <Rocket size={40} className="text-primary" />,
    },
    {
      value: "300+",
      label: "AWS accounts under management",
      icon: <Server size={40} className="text-primary" />,
    },
    {
      value: "15+",
      label: "Compliance standards",
      icon: <ShieldCheck size={40} className="text-primary" />,
    },
    {
      value: "12+",
      label: "Years at Amazon/AWS",
      icon: <Users size={40} className="text-primary" />,
    },
    {
      value: "100%",
      label: "ROI in 3 months",
      icon: <TrendingUp size={40} className="text-primary" />,
    },
  ];

  return (
    <>
      <HomeHeroSection
        mainHeading={ctoPageData?.heroSection?.mainHeading}
        animatedTexts={ctoPageData?.heroSection?.animatedTexts}
        subheading={ctoPageData?.heroSection?.subheading}
        animatedTextLabel={ctoPageData?.heroSection?.animatedTextLabel}
        ctaButtons={ctoPageData?.heroSection?.ctaButtons}
      />
      <ClientSectionV2
        title={ctoPageData?.clientSection?.title || "Real Impact. Don't take it from us. Hear it from them."}
        stats={LogoStats}
        partnerLogos={ctoPageData?.clientSection?.partnerLogos}
      />
      <HowWeSolve
        title={ctoPageData?.howWeSolveSection?.title}
        subtitle={ctoPageData?.howWeSolveSection?.subtitle}
        painPoints={ctoPageData?.howWeSolveSection?.painPoints}
        solutions={ctoPageData?.howWeSolveSection?.solutions}
        videoUrl={ctoPageData?.howWeSolveSection?.videoUrl || ctoPageData?.howWeSolveSection?.video?.asset?.url}
      />
      <HowItWorks
        mainTitle={ctoPageData?.howItWorksSection?.mainTitle}
        subtitle={ctoPageData?.howItWorksSection?.subtitle}
        tabs={ctoPageData?.howItWorksSection?.tabs}
      />
      <Stats
        title={ctoPageData?.statsSection?.title}
        subtitle={ctoPageData?.statsSection?.subtitle}
        stats={SocialStats.length > 0 ? SocialStats : fallbackStats}
        centerImage={ctoPageData?.statsSection?.centerImage?.asset?.url}
      />
      <div className=" mx-auto px-6 lg:px-12 max-w-7xl">
        <GetStartedSection
          whatsappLink={ctoPageData?.getStartedSection?.whatsappLink || "https://s.cloudvictor.com/whatsapp-web-cto-2"}
          scheduleLink={ctoPageData?.getStartedSection?.scheduleLink || "https://s.cloudvictor.com/meeting-web-cto-2"}
          logo={ctoPageData?.getStartedSection?.logo?.asset?.url}
          heading={ctoPageData?.getStartedSection?.heading}
          bodyText={ctoPageData?.getStartedSection?.bodyText}
          chips={ctoPageData?.getStartedSection?.chips}
          ctaButtons={ctoPageData?.getStartedSection?.ctaButtons}
          backgroundImage={ctoPageData?.getStartedSection?.backgroundImage?.asset?.url}
        />
      </div>
      <TestimonialsSection
        title={ctoPageData?.testimonialsSection?.title}
        testimonials={ctoPageData?.testimonialsSection?.testimonials}
      />
      <CaseStudySection />
    </>
  );
}

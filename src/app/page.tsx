import ClientSectionV2 from "@/components/cost-optimisation/client-section-v2";
import TestimonialsSection from "@/components/cost-optimisation/testimonials";
import HomeHeroSection from "@/components/home/hero";
import ValueProps from "@/components/home/value-props";
import FAQSection from "@/components/faq-section";
import GetStartedSection from "@/components/cost-optimisation/get-started-section";
import AnimatedSections from "@/components/animated";
import Stats from "@/components/for-cto/stats";
import { ChartPieDonutText } from "@/components/ui/pie-chart";
import { PiggyBank, BarChart3, Percent, Rocket, Server, ShieldCheck, Users, TrendingUp } from "lucide-react";
  
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

  const SocialStats = [
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
      <HomeHeroSection />
      {/* <ChartPieDonutText /> */}
      <ClientSectionV2 title="Proven Savings. Real Impact" stats={stats} />
      <AnimatedSections />
      <Stats stats={SocialStats} />
      <ValueProps />
      <div>
        <div className="mx-auto px-6 lg:px-8 max-w-7xl pt-40 pb-12">
          <GetStartedSection />
        </div>
      </div>
      <TestimonialsSection />
      <FAQSection />
    </>
  );
}

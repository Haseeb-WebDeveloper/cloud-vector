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
} from "lucide-react";
import HowWeSolve from "@/components/for-cto/how-we-solve";
import HowItWorks from "@/components/for-cto/how-it-works";
import GetStartedSection from "@/components/cost-optimisation/get-started-section";

export default function ForCTO() {
  const LogoStats = [
    { title: "12+", description: "Years in Amazon/AWS" },
    { title: "10+", description: "Companies" },
    { title: "80+", description: "AWS accounts under Management" },
    {
      title: "20+",
      description: "end-to-end product infrastructure delivered",
    },
    { title: "$60M+", description: "Annual Savings" },
  ];

  const SocialStats: StatData[] = [
    {
      value: "$60M+",
      label: "Savings delivered",
      icon: <PiggyBank size={40} className="text-primary" />,
    },
    {
      value: "68%",
      label: "Max cost reduction",
      icon: <Percent size={40} className="text-primary" />,
    },
    {
      value: "80+",
      label: "Production launches",
      icon: <Rocket size={40} className="text-primary" />,
    },
    {
      value: "15+",
      label: "Compliance standards",
      icon: <ShieldCheck size={40} className="text-primary" />,
    },
    {
      value: "100%",
      label: "ROI in 3 months",
      icon: <TrendingUp size={40} className="text-primary" />,
    },
    {
      value: "12+",
      label: "Years at Amazon/AWS",
      icon: <Users size={40} className="text-primary" />,
    },
  ];

  return (
    <>
      <HomeHeroSection />
      <ClientSectionV2
        title="Real Impact. Don’t take it from us. Hear it from them."
        stats={LogoStats}
      />
      <HowWeSolve />
      <HowItWorks />
      <Stats stats={SocialStats} />
      <div className=" mx-auto px-6 lg:px-12 max-w-7xl">
        <GetStartedSection />
      </div>
      <TestimonialsSection />
    </>
  );
}

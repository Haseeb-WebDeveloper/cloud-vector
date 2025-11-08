import AboutHeroSection from "@/components/about-us/hero-section";
import ClientSectionV2 from "@/components/cost-optimisation/client-section-v2";
import FounderLetterSection from "@/components/about-us/founder-letter";
import CaseStudySection from "@/components/home/case-study-section";
import TeamSection from "@/components/about-us/team-section";
import JoinTeamSection from "@/components/about-us/join-team-section";
import GetStartedSection from "@/components/cost-optimisation/get-started-section";

export const metadata = {
  title: "About Us | CloudVictor",
  description:
    "Learn about CloudVictor's mission to empower teams with automated FinOps solutions and optimize cloud resources.",
};

export default function AboutUsPage() {
  const stats = [
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
    <main className="pt-24 bg-background">
      <AboutHeroSection />
      
      {/* Paragraph Section */}
      <section className="py-8 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="text-base lg:text-lg text-White text-center leading-relaxed">
            CloudVictor integrates and automates infrastructure monitoring, application performance monitoring, log management, real-user monitoring, and other capabilities to provide unified, real-time observability and security for customers' entire technology stacks. CloudVictor is used by organizations of all sizes and across various industries to enable digital transformation and cloud migration, drive collaboration among development, operations, security, and business teams, accelerate time to market for applications, reduce time to problem resolution, secure applications and infrastructure, understand user behavior, and track key business metrics.
          </p>
        </div>
      </section>

      {/* Proven Savings. Real Impact Section */}
      <div className="bg-background">
      <ClientSectionV2 title="Proven Savings. Real Impact" stats={stats} />
      </div>

      {/* Founder Letter Section */}
      <FounderLetterSection />

      {/* Case Study Section */}
      <CaseStudySection />

      {/* Team Section */}
      <TeamSection />

      {/* Join Our Team Section */}
      <JoinTeamSection />

      {/* Get Started Section */}
      <div className="bg-background py-16 px-16">
        <GetStartedSection />
      </div>
    </main>
  );
}


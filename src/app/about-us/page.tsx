import AboutHeroSection from "@/components/about-us/hero-section";
import ClientSectionV2 from "@/components/cost-optimisation/client-section-v2";
import FounderLetterSection from "@/components/about-us/founder-letter";
import CaseStudySection from "@/components/home/case-study-section";
import JoinTeamSection from "@/components/about-us/join-team-section";
import GetStartedSection from "@/components/cost-optimisation/get-started-section";
import AboutValuesSection from "@/components/about-us/values-section";
import AwsPartnerSection from "@/components/about-us/aws-partner-section";
import TeamGridSection from "@/components/about-us/team-grid-section";

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
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl lg:text-5xl font-semibold text-center mb-4 leading-tight">
            <span 
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(to right, #FF9900 0%, #FF9900 75%, #FFB84D 90%, white 100%)'
              }}
            >
                    <h2 className="text-3xl lg:text-4xl font-semibold mb-4 leading-tight">
            <span 
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(to right, #FF9900 0%, #FF9900 75%, #FFB84D 90%, white 100%)'
              }}
            >
            We operate your AWS Infra the way Amazon operates theirs.

            </span>
          </h2>
            </span>
          </h2>
          <p className="text-base lg:text-lg text-White text-center leading-relaxed">
            Founded by ex-Amazon/AWS engineer with a proven track record of driving $50M+ in annual business impact, $60M+ in annual AWS savings & managing 80+ AWS accounts with enterprise-grade security, CloudVictor brings the same real-world rigor to your team with a <b> success-based model</b>and a 100% ROI guarantee.
Whether you're scaling up, battling ballooning cloud bills, or squashing those holes in your security posture, if you want your AWS infrastructure run the Amazon way - lean, secure, fast - we are here to help.
Whether you're scaling up, battling ballooning cloud bills, or squashing those holes in your security posture, if you want your AWS infrastructure run the Amazon way - lean, secure, fast - we are here to help.
          </p>
        </div>
      </section>

      <AboutValuesSection />

      {/* Proven Savings. Real Impact Section */}
      <div className="bg-background">
      <ClientSectionV2 title="Proven Savings. Real Impact" stats={stats} />
      </div>

      <AwsPartnerSection />
      <TeamGridSection />

      {/* Founder Letter Section */}
      {/* <FounderLetterSection /> */}
      {/* Join Our Team Section */}
      <JoinTeamSection /> 
      {/* Get Started Section */}
      <CaseStudySection />
      <GetStartedSection />
     
    </main>
  );
}

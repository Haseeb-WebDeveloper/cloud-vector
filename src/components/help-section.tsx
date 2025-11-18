"use client";

import { SpotlightCard } from "./ui/spolight-card";
import { MessageCircle, CalendarClock, BadgeDollarSign, Calendar } from "lucide-react";
import { usePathname } from "next/navigation";

export const HelpSection = () => {
  const pathname = usePathname();
  const isHomepage = pathname === "/" || pathname === "";
  const isCTOPage = pathname?.includes("/for-cto");
  const isFinOpsPage = pathname?.includes("/cost-optimisation");
  let whatsappLink = "https://s.cloudvictor.com/whatsapp-web-home-3";
  
  if (isCTOPage) {
    whatsappLink = "https://s.cloudvictor.com/whatsapp-web-cto-3";
  } else if (isFinOpsPage) {
    whatsappLink = "https://s.cloudvictor.com/whatsapp-website-finops-3";
  } else if (pathname?.includes("/contact-us")) {
    whatsappLink = "https://s.cloudvictor.com/whatsapp-web-contactus-2";
  } else if (pathname?.includes("/blog") && pathname?.toLowerCase().includes("bolosign")) {
    whatsappLink = "https://s.cloudvictor.com/whatsapp-web-csbolosign-1";
  } else if (pathname?.includes("/blog") && pathname?.toLowerCase().includes("botgauge")) {
    whatsappLink = "https://s.cloudvictor.com/whatsapp-web-csbotgauge-1";
  } else if (pathname?.includes("/blog")) {
    whatsappLink = "https://s.cloudvictor.com/whatsapp-web-homeblog-1";
  }

  const isContactUsPage = pathname?.includes("/contact-us");
  const isBlogPage = pathname?.includes("/blog");
  const isBolosignPost = pathname?.includes("/blog") && pathname?.toLowerCase().includes("bolosign");
  const isBotGaugePost = pathname?.includes("/blog") && pathname?.toLowerCase().includes("botgauge");
  const scheduleAuditLink = isContactUsPage
    ? "https://s.cloudvictor.com/meeting-web-contactus-2"
    : isBolosignPost
    ? "https://s.cloudvictor.com/meeting-web-csbolosign-2"
    : isBotGaugePost
    ? "https://s.cloudvictor.com/meeting-web-csbotgauge-2"
    : isBlogPage
    ? "https://s.cloudvictor.com/meeting-web-homeblog-1"
    : isFinOpsPage
    ? "https://s.cloudvictor.com/meeting-web-finops-3"
    : isCTOPage
    ? "https://s.cloudvictor.com/meeting-web-cto-3"
    : isHomepage 
    ? "https://s.cloudvictor.com/meeting-web-home-3"
    : "https://calendly.com/your-calendly-link/aws-audit";
  
  const startSavingLink = "https://app.cloudvictor.com/";
  return (
    <section className="py-10  px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Main Title */}
        <div className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-[#FF9700] to-[#E85409] bg-clip-text text-transparent">
            We are here to help
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground/80 max-w-3xl mx-auto">
          Discover how much you’re overspending, where your risks are, and how we can accelerate your time to prod with cloud native solutions.
          </p>
        </div>

        {/* Three Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {isCTOPage ? (
            <>
              {/* Column 1 - Book a Strategy Call (CTO Page) */}
              <SpotlightCard className="h-full rounded-3xl border border-neutral-800 bg-neutral-900 overflow-hidden p-8">
                <div className="flex flex-col gap-6 justify-between h-full">
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Strategy Call
                    </h3>
                    <h4 className="text-2xl font-bold text-muted-foreground mb-2">
                      Book a Strategy Call
                    </h4>
                    <p className="mt-2 text-foreground/90 leading-relaxed">
                      Cut your AWS bill, boost uptime, and automate releases - Lets talk about your problems.
                    </p>
                  </div>
                  <div>
                    <a
                      href={scheduleAuditLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer w-full bg-gradient-to-r from-[#FF9900]/90 to-[#E85409]/90 hover:from-[#FF9900] hover:to-[#E85409] px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,153,0,0.6),0_0_40px_rgba(255,153,0,0.4)] flex items-center justify-center gap-2"
                      aria-label="Book a Call"
                    >
                      <Calendar className="h-5 w-5 mr-2 text-white" />
                      Book a Call
                    </a>
                  </div>
                </div>
              </SpotlightCard>

              {/* Column 2 – Chat With an Architect (CTO Page) */}
              <SpotlightCard className="h-full rounded-3xl border border-neutral-800 bg-neutral-900 overflow-hidden p-8">
                <div className="flex flex-col gap-6 justify-between h-full">
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Expert Consultation
                    </h3>
                    <h4 className="text-2xl font-bold text-muted-foreground mb-2">
                      Chat With an Architect
                    </h4>
                    <p className="mt-2 text-foreground/90 leading-relaxed">
                      Talk directly with an ex-AWS architect who's optimized 100+ stacks, just like yours, across 300+ AWS accounts.
                    </p>
                  </div>
                  <div>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center cursor-pointer w-full bg-gradient-to-r from-[#FF9900]/90 to-[#E85409]/90 hover:from-[#FF9900] hover:to-[#E85409] px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,153,0,0.6),0_0_40px_rgba(255,153,0,0.4)]"
                    >
                      <MessageCircle className="h-5 w-5 mr-2 text-white" />
                      WhatsApp Us
                    </a>
                  </div>
                </div>
              </SpotlightCard>

              {/* Column 3 – Start Risk-Free (CTO Page) */}
              <SpotlightCard className="h-full rounded-3xl border border-neutral-800 bg-neutral-900 overflow-hidden p-8">
                <div className="flex flex-col gap-6 justify-between h-full">
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Risk-Free Start
                    </h3>
                    <h4 className="text-2xl font-bold text-muted-foreground mb-2">
                      Start Risk-Free
                    </h4>
                    <p className="mt-2 text-foreground/90 leading-relaxed">
                      Let's discuss your problems and we show you a free POC of what we can deliver for you.
                    </p>
                  </div>
                  <div>
                    <a
                      href={scheduleAuditLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer w-full bg-gradient-to-r from-[#FF9900]/90 to-[#E85409]/90 hover:from-[#FF9900] hover:to-[#E85409] px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,153,0,0.6),0_0_40px_rgba(255,153,0,0.4)] flex items-center justify-center gap-2"
                      aria-label="Book a Call"
                    >
                      <Calendar className="h-5 w-5 mr-2 text-white" />
                      Book a Call
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            </>
          ) : (
            <>
              {/* Column 1 - Quick Chat */}
              <SpotlightCard className="h-full rounded-3xl border border-neutral-800 bg-neutral-900 overflow-hidden p-8">
                <div className="flex flex-col gap-6 justify-between h-full">
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Quick Chat</h3>
                    <h4 className="text-2xl font-bold text-muted-foreground mb-2">
                      Let's Talk
                    </h4>
                    <p className="mt-2 text-foreground/90 leading-relaxed">
                      Got questions about your cloud costs, security, or scaling? Our experts are here to give you clear answers and tailored guidance.
                    </p>
                  </div>
                  <div>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center cursor-pointer w-full bg-gradient-to-r from-[#FF9900]/90 to-[#E85409]/90 hover:from-[#FF9900] hover:to-[#E85409] px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,153,0,0.6),0_0_40px_rgba(255,153,0,0.4)]"
                    >
                      <MessageCircle className="h-5 w-5 mr-2 text-white" />
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </SpotlightCard>

              {/* Column 2 – Free Audit Call */}
              <SpotlightCard className="h-full rounded-3xl border border-neutral-800 bg-neutral-900 overflow-hidden p-8">
                <div className="flex flex-col gap-6 justify-between h-full">
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Free Audit Call
                    </h3>
                    <h4 className="text-2xl font-bold text-muted-foreground mb-2">
                    Schedule a Call
                    </h4>
                    <p className="mt-2 text-foreground/90 leading-relaxed">
                    Book a free call with our team to explore cost optimisation opportunities, security improvements, or architecture reviews — tailored to your cloud journey.
                    </p>
                  </div>
                  <div>
                    <a
                      href={scheduleAuditLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer w-full bg-gradient-to-r from-[#FF9900]/90 to-[#E85409]/90 hover:from-[#FF9900] hover:to-[#E85409] px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,153,0,0.6),0_0_40px_rgba(255,153,0,0.4)] flex items-center justify-center gap-2"
                      aria-label="Schedule a Free Audit Call"
                    >
                      <CalendarClock className="h-5 w-5 mr-2 text-white" />
                      Schedule a Free Audit
                    </a>
                  </div>
                </div>
              </SpotlightCard>

              {/* Column 3 – Risk-Free Start */}
              <SpotlightCard className="h-full rounded-3xl border border-neutral-800 bg-neutral-900 overflow-hidden p-8">
                <div className="flex flex-col gap-6 justify-between h-full">
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Risk-Free Start
                    </h3>
                    <h4 className="text-2xl font-bold text-muted-foreground mb-2">
                    Start Smart, No Strings Attached
                    </h4>
                    <p className="mt-2 text-foreground/90 leading-relaxed">
                    Experience Cloud Victor with zero risk. Begin with a free audit and see how we can help you save, secure, and scale your cloud - with results verified on your AWS bill.
                    </p>
                  </div>
                  <div>
                    <a
                      href={startSavingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer w-full bg-gradient-to-r from-[#FF9900]/90 to-[#E85409]/90 hover:from-[#FF9900] hover:to-[#E85409] px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,153,0,0.6),0_0_40px_rgba(255,153,0,0.4)] flex items-center justify-center gap-2"
                      aria-label="Start Saving Today"
                    >
                      <BadgeDollarSign className="h-5 w-5 mr-2 text-white" />
                      Start Saving Today.
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

"use client";

import { SpotlightCard } from "./ui/spolight-card";
import { MessageCircle, CalendarClock, BadgeDollarSign } from "lucide-react";

export const HelpSection = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Main Title */}
        <div className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-[#FF9700] to-[#E85409] bg-clip-text text-transparent">
            We are here to help
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground/80 max-w-3xl mx-auto">
            Explore how much you’re really overpaying and how fast we can fix it.
          </p>
        </div>

        {/* Three Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {/* Column 1 - Quick Chat */}
          <SpotlightCard className="h-full rounded-3xl border border-neutral-800 bg-neutral-900 overflow-hidden p-8">
            <div className="flex flex-col gap-6 justify-between h-full">
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Quick Chat
                </h3>
                <h4 className="text-2xl font-bold text-muted-foreground mb-2">
                  Stuck with Rising Bills?
                </h4>
                <p className="mt-2 text-foreground/90 leading-relaxed">
                  AWS overcharges you quietly every month, often <span className="font-bold bg-gradient-to-r from-primary to-primary via-primary text-transparent bg-clip-text">30-68% waste</span> hiding in plain sight.<br />
                  Let’s talk. Get answers instantly.
                </p>
              </div>
              <div>
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center cursor-pointer w-full bg-gradient-to-r from-[#FF9900]/90 to-[#E85409]/90 hover:from-[#FF9900] hover:to-[#E85409] px-6 py-3 rounded-lg font-medium hover:bg-foreground/10 transition-colors"
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
                  Curious How Much You Can Save?
                </h4>
                <p className="mt-2 text-foreground/90 leading-relaxed">
                  In 20 minutes, we’ll scan your account and show you exactly where &amp; how much you are overspending.<br />
                  Verified directly on your AWS bill. No fluff, just numbers.
                </p>
              </div>
              <div>
                <a
                  href="https://calendly.com/your-calendly-link/aws-audit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer w-full bg-gradient-to-r from-[#FF9900]/90 to-[#E85409]/90 hover:from-[#FF9900] hover:to-[#E85409] px-6 py-3 rounded-lg font-medium hover:bg-foreground/10 transition-colors flex items-center justify-center gap-2"
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
                  No Savings? No Fee. Risk-Free
                </h4>
                <p className="mt-2 text-foreground/90 leading-relaxed">
                  With 12+ years building AWS services at Amazon, we know where waste hides.<br />
                  Try our risk-free offering: <span className="font-bold bg-gradient-to-r from-primary to-primary via-primary text-transparent bg-clip-text">3-Month 100% ROI Guarantee.</span><br />
                  Sustained savings, zero performance risk.
                </p>
              </div>
              <div>
                <a
                  href="https://calendly.com/your-calendly-link/aws-get-started"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer w-full bg-gradient-to-r from-[#FF9900]/90 to-[#E85409]/90 hover:from-[#FF9900]  px-6 py-3 rounded-lg font-medium  transition-all duration-300 flex items-center justify-center gap-2"
                  aria-label="Start Saving Today"
                >
                  <BadgeDollarSign className="h-5 w-5 mr-2 text-white" />
                  Start Saving Today.
                </a>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};

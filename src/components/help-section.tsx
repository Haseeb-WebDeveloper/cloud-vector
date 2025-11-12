"use client";

import { SpotlightCard } from "./ui/spolight-card";
import { MessageCircle, CalendarClock, BadgeDollarSign } from "lucide-react";

export const HelpSection = () => {
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
                  href="https://wa.me/"
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
                  href="https://calendly.com/your-calendly-link/aws-audit"
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
                  href="https://calendly.com/your-calendly-link/aws-get-started"
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
        </div>
      </div>
    </section>
  );
};

"use client";

import { SpotlightCard } from "./ui/spolight-card";

// WhatsApp Icon Component
const WhatsAppIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mr-2"
  >
    <path
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"
      fill="#25D366"
    />
  </svg>
);

export const HelpSection = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Main Title */}
        <div className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-bold text-muted-foreground mb-2">
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
                  className="flex items-center justify-center cursor-pointer w-full bg-foreground/5 px-6 py-3 rounded-lg font-medium hover:bg-foreground/10 transition-colors"
                >
                  <WhatsAppIcon />
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
                <button className="cursor-pointer w-full bg-foreground/5 px-6 py-3 rounded-lg font-medium hover:bg-foreground/10 transition-colors">
                  Schedule a Free Audit
                </button>
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
                <button className="cursor-pointer w-full bg-gradient-to-r from-secondary to-primary/90 px-6 py-3 rounded-lg font-medium hover:to-primary transition-all duration-300">
                  Start Saving Today.
                </button>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};

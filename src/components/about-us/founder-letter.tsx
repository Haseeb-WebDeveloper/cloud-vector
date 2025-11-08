"use client";

import Image from "next/image";

export default function FounderLetterSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            A letter from our founder
          </h2>
        </div>

        {/* Main Content Container */}
        <div className="bg-gradient-to-br from-muted/50 via-card to-muted/30 border border-border rounded-2xl shadow-xl p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Left Side - Text Content */}
            <div className="flex-1 space-y-6 text-foreground/90">
              <p className="text-base lg:text-lg leading-relaxed">
                Twelve years ago, I walked through the doors of Amazon as a cloud architect, 
                filled with excitement and a hunger to build at scale. Little did I know that 
                this journey would shape not just my career, but my entire perspective on what 
                cloud infrastructure could truly achieve.
              </p>
              
              <p className="text-base lg:text-lg leading-relaxed">
                During my time at Amazon, I witnessed firsthand how the world's most innovative 
                companies approached cloud optimization. I saw teams spending millions on AWS 
                infrastructure, yet struggling with cost overruns, security gaps, and performance 
                bottlenecks. The problem wasn't a lack of tools—it was a lack of expertise and 
                the right approach.
              </p>
              
              <p className="text-base lg:text-lg leading-relaxed">
                After years of helping Fortune 500 companies optimize their cloud infrastructure, 
                I realized something profound: every company, regardless of size, deserves access 
                to the same level of cloud excellence that Amazon uses internally. The challenge 
                was making enterprise-grade FinOps, SecOps, and cloud architecture accessible to 
                teams that couldn't afford a dedicated team of AWS experts.
              </p>
              
          
              
              <p className="text-base lg:text-lg leading-relaxed font-medium text-foreground">
                Welcome to CloudVictor. Let's build something extraordinary together.
              </p>
            </div>

            {/* Right Side - Image and Founder Info */}
            <div className="flex-shrink-0 w-full lg:w-auto lg:min-w-[280px] flex flex-col items-center lg:items-start space-y-6">
              <div className="relative w-48 h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                <Image
                  src="/testimonials/Harsh-Vardhan-Sharma.png"
                  alt="Harsh Vardhan Sharma"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 192px, 256px"
                />
              </div>
              
              <div className="text-center lg:text-left space-y-2">
                <h3 className="text-2xl font-bold text-foreground">
                  Harsh Vardhan Sharma
                </h3>
                <p className="text-lg text-foreground/80 font-medium">
                  Founder & CEO
                </p>
                <p className="text-base text-foreground/60">
                  CloudVictor
                </p>
                <p className="text-sm text-foreground/50 italic mt-2">
                  12+ Years at Amazon/AWS
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


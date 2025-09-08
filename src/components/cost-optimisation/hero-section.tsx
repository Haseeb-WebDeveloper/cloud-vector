"use client";

import { Button } from "@/components/ui/button";
import RotatingText from "@/components/ui/rotated-text";
import { Calendar, MessageCircle } from "lucide-react";
import Image from "next/image";

export default function CostOptimisationHeroSection() {
  const rotatingTexts = ["Cost", "Size", "Configuration", "Purchase Plan"];

  return (
    <div className="min-h-screen pt-24 bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-8 w-full max-w-2xl">
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Stop Overpaying AWS <br /> Unlock Savings Up to 68%
              </h1>
            </div>

            {/* Subheadline */}
            <p className="text-xl  font-medium">
              All-in-one cloud cost optimisation
            </p>

            {/* Animated Text Section */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-lg">
                <span>Optimize</span>
                <div className="underline flex items-center">
                  <RotatingText
                    texts={rotatingTexts}
                    className="text-lg"
                    rotationInterval={2000}
                    splitBy="words"
                    mainClassName="text-primary"
                  />
                </div>
                <span>of your AWS Infrastructure</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg font-semibold"
              >
                <Calendar className="w-5 h-5" />
                Schedule a Free Audit
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 text-lg font-semibold"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </Button>
            </div>
          </div>

          {/* Right Side - Image Placeholder */}
          <div className="h-full">
            <Image
              src="/images/cost-optimisation-hero-section.png"
              alt="Cost Optimisation Hero Section"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

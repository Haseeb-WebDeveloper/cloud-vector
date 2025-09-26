"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsLoading(false);
  };

  if (isSubmitted) {
    return (
      <section className="py-28 bg-[#2C1E12]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F59E0B]">
                {/* Envelope icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1a1207"
                  strokeWidth="2"
                  className="w-8 h-8"
                >
                  <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
                  <path d="m22 8-10 6L2 8" />
                </svg>
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl text-foreground mb-3 font-semibold">
              Thanks for opting in!
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Get ready for hot tips to optimise and manage your AWS workloads. Stay tuned for actionable insights delivered straight to your inbox!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-28">
      <div className="container mx-auto px-4 border py-12 bg-[#2C1E12] rounded-2xl">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F59E0B]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1a1207"
                strokeWidth="2"
                className="w-8 h-8"
              >
                <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
                <path d="m22 8-10 6L2 8" />
              </svg>
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl lg:text-4xl text-foreground mb-3 font-semibold">
            Subscribe To Our Newsletter
          </h2>

          {/* Subheading */}
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Get the latest AWS optimization tips, security insights, and cost-saving strategies delivered to your inbox.
          </p>

          {/* Boxed Form */}
          <div className="mt-10">
            <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
              <form onSubmit={handleSubmit} className="px-6 pt-8 pb-6 sm:px-8">
                <div className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-4 max-w-2xl mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 sm:h-12 px-4 rounded-lg sm:rounded-l-lg sm:rounded-r-none bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground/70"
                    required
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !email}
                    className="h-12 px-6 sm:px-7 bg-gradient-to-r from-amber-400 to-orange-500 hover:bg-gradient-to-l text-[#1a1207] font-semibold rounded-lg sm:rounded-l-none sm:rounded-r-lg"
                  >
                    {isLoading ? "Subscribing..." : "Subscribe →"}
                  </Button>
                </div>
                <p className="mt-5 text-xs text-muted-foreground text-center">
                  No spam. Unsubscribe anytime. We respect your privacy.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

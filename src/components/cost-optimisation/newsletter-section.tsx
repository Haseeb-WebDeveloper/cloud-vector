"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Mail } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    setIsLoading(false);
  };

  if (isSubmitted) {
    return (
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 py-24 bg-[#332211] rounded-2xl box-shadow-large">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#FF9900] rounded-full flex items-center justify-center">
                <Image
                  src="/icons/check.svg"
                  alt="Check Circle"
                  width={32}
                  height={32}
                  className="w-8 h-8 text-white"
                />
              </div>
            </div>
            <h2 className="text-3xl lg:text-4xl text-white mb-4 font-bold">
              Thanks for opting in!
            </h2>
            <p className="text-lg text-[#CCCCCC] leading-relaxed">
              Get ready for hot tips to optimise and manage your AWS workloads.
              Stay tuned for actionable insights delivered straight to your
              inbox!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div
        className="max-w-6xl mx-auto px-4  lg:px-24 py-24 bg-[#332211] rounded-2xl box-shadow-large"
        // style={{
        //   boxShadow:
        //     "0 0px 20px 0 rgba(255, 153, 0, 0.721)",
        // }}
      >
        <div className="max-w-2xl mx-auto">
          {/* Newsletter Form Container */}
          <div className="text-center">
            {/* Email Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#FF9900] rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-3xl lg:text-4xl text-white mb-4 font-bold">
              Subscribe To Our Newsletter
            </h2>

            {/* Description */}
            <p className="text-lg text-[#CCCCCC] mb-8 leading-relaxed">
              Get the latest AWS optimization tips, security insights, and
              cost-saving strategies delivered to your inbox.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-12 p-3 rounded-lg bg-[#221100] border-0 text-white placeholder:text-[#AAAAAA] focus:outline-none focus:ring-0"
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="cursor-pointer px-6 py-3 bg-[#FF8C00] text-white hover:bg-[#FF8C00]/90 font-semibold rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending..." : "Subscribe →"}
                </button>
              </div>

              {/* Disclaimer */}
              <p className="text-sm text-[#CCCCCC]">
                No spam. Unsubscribe anytime. We respect your privacy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

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
      <section className="py-32 bg-[#252F3E]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Image src="/icons/check.svg" alt="Check Circle" width={64} height={64} className="w-16 h-16 text-primary" />
            </div>
            <h2 className="text-3xl lg:text-4xl text-foreground mb-4">
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
    <section className="py-32 bg-[#252F3E]">
      <div className="container mx-auto px-4">
        <div className="mx-auto text-center">
          {/* Heading */}
          <h2 className="text-3xl lg:text-4xl text-foreground mb-4 font-semibold">
            Stop Letting AWS Eat All Your Profits.
          </h2>
          
          {/* Subheading */}
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Proven strategies to slash bills, tighten security, and speed up your team.
          </p>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12 p-3 rounded-lg focus:outline-none focus:ring-0 text-center placeholder:text-center sm:text-left"
                required
              />
              <button
                type="submit"
                disabled={isLoading || !email}
                className="cursor-pointer py-3 px-8 bg-primary text-background hover:bg-primary/90 font-semibold rounded-lg"
              >
                {isLoading ? "Sending..." : "Send Me Cloud Tips."}
              </button>
            </div>
            
            {/* Trust Builder */}
            <p className="text-sm text-muted-foreground">
              No spam. Just proven AWS strategies you can apply right away.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

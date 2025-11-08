"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function JoinTeamSection() {
  return (
    <section className="relative w-full min-h-[600px] lg:min-h-[700px] overflow-hidden">
      {/* Background Image - Full Width */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/home-page/images team.jpeg"
          alt="CloudVictor Team"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Fallback gradient overlay for contrast (optional) */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700/60 via-slate-800/50 to-slate-900/70"></div>
      </div>

      {/* Dark Blue Overlay Banner - Covers lower portion of image */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[50%] lg:h-[55%] w-full max-w-5xl bg-[#1e3a5f] flex items-center justify-center rounded-t-3xl shadow-xl">
        <div className="w-full text-center space-y-6 px-6 lg:px-8 py-12 lg:py-16">
          {/* Headline */}
          <h2 className="text-4xl lg:text-6xl font-bold text-white">
            Join Our Team
          </h2>

          {/* Paragraph Text */}
          <p className="text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
            Want to do work that matters? We're changing the way businesses optimize their cloud infrastructure. Join us today to become part of something greater than yourself.
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <a
              href="#careers"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF9900] to-[#E85409] hover:from-[#FF9900]/90 hover:to-[#E85409]/90 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>View Openings</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


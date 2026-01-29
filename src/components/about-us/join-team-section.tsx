"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function JoinTeamSection() {
  return (
    <section className="relative w-full min-h-[520px] lg:min-h-[620px] overflow-visible mb-0 z-[20]">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/group-photo.png"
          alt="CloudVictor team group photo"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark gradient for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
      </div>

      {/* Bottom-anchored content card (overflows onto next section) */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-[60%] w-full flex justify-center pointer-events-none z-[30]">
        <div className="w-full max-w-3xl bg-[#0B1020]/95 border border-white/10 rounded-3xl shadow-2xl px-6 py-8 sm:px-10 sm:py-10 text-center pointer-events-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Join our team
          </h2>
          <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl mx-auto mb-6">
            Be part of a team that values innovation, ownership, and real-world results.
          </p>
          <div className="pt-2">
            <a
              href="https://s.cloudvictor.com/LI-web-as"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#FF9900] to-[#E85409] text-white font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-[1.03] transition-transform transition-shadow duration-300"
            >
              <span>Reach Out (Tech)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      {/* Add bottom padding to the section to make space for the overhanging card */}
      <div className="h-[110px] sm:h-[140px] lg:h-[190px]" aria-hidden="true"></div>
    </section>
  );
}

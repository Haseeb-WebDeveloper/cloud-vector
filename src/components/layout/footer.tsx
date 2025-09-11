"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Boxes,
  FileText,
  Users,
  Newspaper,
  Handshake,
  Star,
  Cloud,
  Settings,
  DollarSign,
  BookOpen,
  UserCircle,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="pt-16 pb-8 border-t border-foreground/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start gap-16">
          {/* Left Section - Logo and Subscription Box */}
          <div className="flex-shrink-0 lg:w-60">
            {/* Logo */}
            <div className="mb-8">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/logo/cloudVictor-horizantal-logo-text.png"
                  alt="Cloud Vector"
                  width={200}
                  height={60}
                  className="h-10 w-auto object-contain"
                />
              </Link>
            </div>
            
            {/* Subscription Box */}
            <div className="border bg-foreground/5 rounded-lg p-6">
              <p className=" text-center mb-4">
                Stay current with all things CloudVictor
              </p>
              <button className="cursor-pointer w-full border  rounded-lg px-4 py-2 transition-colors">
                Subscribe
              </button>
            </div>
          </div>

          {/* Right Section - Navigation Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-20 flex-1">
            {/* Product Column */}
            <div className="space-y-6 min-w-[280px]">
              <h3 className="text-sm text-foreground/70">Product</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3 opacity-80 hover:opacity-100 group cursor-pointer">
                  <div className="w-10 h-10 flex-shrink-0 mt-1 bg-foreground/5 group-hover:bg-foreground/10 p-2 transition rounded-full text-foreground/90 group-hover:text-foreground">
                    <Cloud className="w-full h-full" />
                  </div>
                  <div>
                    <Link href="/product/overview" className="block transition-colors">
                      Overview
                    </Link>
                    <p className="text-xs mt-1">
                      The only cloud optimization tool built for data engineers
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 opacity-80 hover:opacity-100 group cursor-pointer">
                  <div className="w-10 h-10 flex-shrink-0 mt-1 bg-foreground/5 group-hover:bg-foreground/10 p-2 transition rounded-full text-foreground/90 group-hover:text-foreground">
                    <Settings className="w-full h-full" />
                  </div>
                  <div>
                    <Link href="/product/log-guardia" className="block transition-colors">
                      Log Guardia
                    </Link>
                    <p className="text-xs mt-1">
                      Build a connector for any data source under the sun
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 opacity-80 hover:opacity-100 group cursor-pointer">
                  <div className="w-10 h-10 flex-shrink-0 mt-1 bg-foreground/5 group-hover:bg-foreground/10 p-2 transition rounded-full text-foreground/90 group-hover:text-foreground">
                    <Boxes className="w-full h-full" />
                  </div>
                  <div>
                    <Link href="/product/effdog" className="block transition-colors">
                      EffDog
                    </Link>
                    <p className="text-xs mt-1">
                      Integrate any existing data tool for any data source
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 opacity-80 hover:opacity-100 group cursor-pointer">
                  <div className="w-10 h-10 flex-shrink-0 mt-1 bg-foreground/5 group-hover:bg-foreground/10 p-2 transition rounded-full text-foreground/90 group-hover:text-foreground">
                    <DollarSign className="w-full h-full" />
                  </div>
                  <div>
                    <Link href="/pricing" className="block transition-colors">
                      Pricing
                    </Link>
                    <p className="text-xs mt-1">
                      Connectors for 600+ sources and destinations
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Resources Column */}
            <div className="space-y-6 min-w-[280px]">
              <h3 className="text-sm text-foreground/70">Resources</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3 opacity-80 hover:opacity-100 group cursor-pointer">
                  <div className="w-10 h-10 flex-shrink-0 mt-1 bg-foreground/5 group-hover:bg-foreground/10 p-2 transition rounded-full text-foreground/90 group-hover:text-foreground">
                    <BookOpen className="w-full h-full" />
                  </div>
                  <div>
                    <Link href="/documentation" className="block transition-colors">
                      Documentation
                    </Link>
                    <p className="text-xs mt-1">
                      Learn how to use CloudVictor and where to get started
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 opacity-80 hover:opacity-100 group cursor-pointer">
                  <div className="w-10 h-10 flex-shrink-0 mt-1 bg-foreground/5 group-hover:bg-foreground/10 p-2 transition rounded-full text-foreground/90 group-hover:text-foreground">
                    <Users className="w-full h-full" />
                  </div>
                  <div>
                    <Link href="/community" className="block transition-colors">
                      Community
                    </Link>
                    <p className="text-xs mt-1">
                      Join 5,500+ data professionals on Slack and GitHub
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 opacity-80 hover:opacity-100 group cursor-pointer">
                  <div className="w-10 h-10 flex-shrink-0 mt-1 bg-foreground/5 group-hover:bg-foreground/10 p-2 transition rounded-full text-foreground/90 group-hover:text-foreground">
                    <Newspaper className="w-full h-full" />
                  </div>
                  <div>
                    <Link href="/blog" className="block transition-colors">
                      Blog
                    </Link>
                    <p className="text-xs mt-1">
                      Stay up to date on CloudVictor & data engineering
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 opacity-80 hover:opacity-100 group cursor-pointer">
                  <div className="w-10 h-10 flex-shrink-0 mt-1 bg-foreground/5 group-hover:bg-foreground/10 p-2 transition rounded-full text-foreground/90 group-hover:text-foreground">
                    <Handshake className="w-full h-full" />
                  </div>
                  <div>
                    <Link href="/partners" className="block transition-colors">
                      Partners
                    </Link>
                    <p className="text-xs mt-1">
                      Bring in help to build connectors and take CloudVictor into production
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Column */}
            <div className="space-y-6 min-w-[280px]">
              <h3 className="text-sm text-foreground/70">Company</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3 opacity-80 hover:opacity-100 group cursor-pointer">
                  <div className="w-10 h-10 flex-shrink-0 mt-1 bg-foreground/5 group-hover:bg-foreground/10 p-2 transition rounded-full text-foreground/90 group-hover:text-foreground">
                    <UserCircle className="w-full h-full" />
                  </div>
                  <div>
                    <Link href="/about" className="block transition-colors">
                      About
                    </Link>
                    <p className="text-xs mt-1">
                      CloudVictor is an open source project by Arch
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="mt-12 pt-8 border-t border-foreground/10">
          <p className="text-foreground/70 text-center text-sm">
            © 2024 CloudVictor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
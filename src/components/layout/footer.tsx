"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  Users,
  Cloud,
  Settings,
  DollarSign,
  BookOpen,
  FileText,
  UserCircle,
  Phone,
  Shield,
  BarChart3,
  Globe,
  Newspaper,
  Lock,
  Info,
} from "lucide-react";

const footerColumns = [
  {
    title: "Solutions",
    icon: Briefcase,
    items: [
      {
        icon: Shield,
        href: "/for-cto",
        label: "For CTOs",
        desc: "Cost Efficiency, Performance, 24x7 Security, Monitoring, Disaster Recovery.",
      },
      {
        icon: Cloud,
        href: "/solutions/engineers",
        label: "For Engineers",
        desc: "Build faster with cost-efficient, reliable AWS architecture building blocks.",
      },
    ],
  },
  {
    title: "Products",
    icon: Settings,
    items: [
      {
        icon: Shield,
        href: "/products/secops",
        label: "SECOPS",
        desc: "InfoSec Team as a Service.",
      },
      {
        icon: BarChart3,
        href: "/cost-optimisation",
        label: "FINOPS",
        desc: "Automated cost leak detection & one-click fixes.",
      },
    ],
  },
  {
    title: "Resources",
    icon: BookOpen,
    items: [
      {
        icon: DollarSign,
        href: "/pricing",
        label: "Pricing",
        desc: "Transparent, result-based pricing.",
      },
      {
        icon: Globe,
        href: "/case-studies",
        label: "Case Studies",
        desc: "Real Teams. Real Stories. Real Numbers.",
      },
      {
        icon: Newspaper,
        href: "/blog",
        label: "Blogs",
        desc: "Everything about Cloud - Cost, Security, Performance, Disaster Recovery & IaaC insights.",
      },
    ],
  },
  {
    title: "Company",
    icon: UserCircle,
    items: [
      {
        icon: Info,
        href: "/about-us",
        label: "About Us",
        desc: "Built by ex-Amazon veteran to help you run your infra the Amazon way.",
      },
      {
        icon: Phone,
        href: "/contact-us",
        label: "Contact Us",
        desc: "Got questions? Let's connect.",
      },
      {
        icon: FileText,
        href: "/terms",
        label: "Terms & Conditions",
        desc: "Our service commitment is clearly defined.",
      },
      {
        icon: Lock,
        href: "/privacy",
        label: "Privacy Policy",
        desc: "Your data, protected with trust.",
      },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();
  const isHomepage = pathname === "/" || pathname === "";
  const isCTOPage = pathname?.includes("/for-cto");
  const isFinOpsPage = pathname?.includes("/cost-optimisation");
  const isContactUsPage = pathname?.includes("/contact-us");
  const isBlogPage = pathname?.includes("/blog");
  const isBolosignPost = pathname?.includes("/blog") && pathname?.toLowerCase().includes("bolosign");
  const isBotGaugePost = pathname?.includes("/blog") && pathname?.toLowerCase().includes("botgauge");
  const subscribeLink = isContactUsPage
    ? "https://s.cloudvictor.com/meeting-web-contactus-4"
    : isBolosignPost
    ? "https://s.cloudvictor.com/meeting-web-csbolosign-4"
    : isBotGaugePost
    ? "https://s.cloudvictor.com/meeting-web-csbotgauge-4"
    : isBlogPage
    ? "https://s.cloudvictor.com/web-homeblog-3"
    : isFinOpsPage
    ? "https://s.cloudvictor.com/meeting-web-finops-5"
    : isCTOPage
    ? "https://s.cloudvictor.com/meeting-web-cto-5"
    : isHomepage 
    ? "https://s.cloudvictor.com/meeting-web-home-5"
    : "#";

  return (
    <footer className="pt-12 sm:pt-14 md:pt-16 pb-6 sm:pb-8 border-t border-foreground/10">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex flex-col lg:flex-row items-start gap-6 sm:gap-8 lg:gap-4">
          {/* Left Section - Logo and Subscription Box */}
          <div className="flex-shrink-0 w-full lg:w-60">
            {/* Logo */}
            <div className="mb-4 sm:mb-6">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/logo/cloudVictor-horizantal-logo-text.png"
                  alt="Cloud Vector"
                  width={200}
                  height={60}
                  className="h-8 sm:h-9 md:h-10 w-auto object-contain max-w-[160px] sm:max-w-[180px] md:max-w-none"
                />
              </Link>
            </div>
            {/* Subscription Box */}
            <div className="border bg-foreground/5 rounded-lg p-3 sm:p-4">
              <p className="text-sm sm:text-base text-center mb-3 sm:mb-4 leading-relaxed">
                Stay current with all things CloudVictor
              </p>
              {(isHomepage || isCTOPage || isFinOpsPage || isContactUsPage || isBlogPage || isBolosignPost || isBotGaugePost) ? (
                <a 
                  href={subscribeLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cursor-pointer w-full border bg-gradient-to-r from-[#FF9900]/90 to-[#E85409]/90 hover:from-[#FF9900] hover:to-[#E85409] hover:shadow-[0_0_20px_rgba(255,153,0,0.6)] active:scale-[0.98] rounded-lg px-4 py-2.5 sm:py-3 transition-all duration-300 block text-center text-sm sm:text-base font-medium"
                >
                  Book a Call
                </a>
              ) : (
                <button className="cursor-pointer w-full border bg-gradient-to-r from-[#FF9900]/90 to-[#E85409]/90 hover:from-[#FF9900] hover:to-[#E85409] hover:shadow-[0_0_20px_rgba(255,153,0,0.6)] active:scale-[0.98] rounded-lg px-4 py-2.5 sm:py-3 transition-all duration-300 text-sm sm:text-base font-medium">
                  Book a Call
                </button>
              )}
            </div>
          </div>

          {/* Right Section - Navigation Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 xl:gap-20 flex-1 w-full">
            {footerColumns.map((col) => (
              <div className="space-y-4 sm:space-y-6 w-full" key={col.title}>
                <h3 className="text-primary text-base sm:text-lg text-left flex items-center px-2 sm:px-3 pt-2 gap-2 font-semibold">
                  {col.title}
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {col.items.map((item) => (
                    <div
                      className="flex items-start gap-2 sm:gap-3 opacity-80 hover:text-primary active:opacity-100 group cursor-pointer border border-transparent hover:border-foreground/10 hover:bg-muted/50 active:bg-muted/30 rounded-lg p-2.5 sm:p-3 transition-all"
                      key={item.href}
                    >
                    <div className="flex items-center justify-center p-1.5 sm:p-2 bg-primary/10 rounded-full aspect-square flex-shrink-0">
                    <item.icon className="aspect-square w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-primary" />
                    </div>
                      <div className="min-w-0 flex-1">
                        <Link href={item.href} className="block transition-colors text-xs sm:text-sm font-medium">
                          {item.label}
                        </Link>
                        {item.desc && (
                          <p className="text-xs mt-1 font-light leading-relaxed text-foreground/70">{item.desc}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Border */}
        <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-foreground/10">
          <p className="text-foreground/70 text-center text-xs sm:text-sm">
            © 2024 CloudVictor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
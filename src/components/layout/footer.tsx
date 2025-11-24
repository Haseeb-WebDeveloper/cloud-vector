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
    <footer className="pt-16 pb-8 border-t border-foreground/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start gap-4">
          {/* Left Section - Logo and Subscription Box */}
          <div className="flex-shrink-0 lg:w-60">
            {/* Logo */}
            <div className="mb-6">
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
            <div className="border bg-foreground/5 rounded-lg p-4">
              <p className=" text-center mb-4">
                Stay current with all things CloudVictor
              </p>
              {(isHomepage || isCTOPage || isFinOpsPage || isContactUsPage || isBlogPage || isBolosignPost || isBotGaugePost) ? (
                <a 
                  href={subscribeLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cursor-pointer w-full border bg-gradient-to-r from-[#FF9900]/90 to-[#E85409]/90 hover:from-[#FF9900] hover:to-[#E85409] hover:shadow-[0_0_20px_rgba(255,153,0,0.6)] rounded-lg px-4 py-2 transition-all duration-300 block text-center"
                >
                  Book a Call
                </a>
              ) : (
                <button className="cursor-pointer w-full border bg-gradient-to-r from-[#FF9900]/90 to-[#E85409]/90 hover:from-[#FF9900] hover:to-[#E85409] hover:shadow-[0_0_20px_rgba(255,153,0,0.6)] rounded-lg px-4 py-2 transition-all duration-300">
                  Book a Call
                </button>
              )}
            </div>
          </div>

          {/* Right Section - Navigation Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-20 flex-1">
            {footerColumns.map((col) => (
              <div className="space-y-6 min-w-[220px]" key={col.title}>
                <h3 className="text-primary text-center flex items-center px-3 pt-2 gap-2">
                  {col.title}
                </h3>
                <div className="space-y-3">
                  {col.items.map((item) => (
                    <div
                      className="flex items-start gap-3 opacity-80 hover:text-primary group cursor-pointer border border-transparent hover:border-foreground/10 hover:bg-muted/50 rounded-lg p-3"
                      key={item.href}
                    >
                    <div className="flex items-center justify-center p-2 bg-primary/10 rounded-full aspect-square">
                    <item.icon className="aspect-square w-5 h-5 flex-shrink-0  text-primary " />
                    </div>
                      <div>
                        <Link href={item.href} className="block transition-colors text-sm">
                          {item.label}
                        </Link>
                        {item.desc && (
                          <p className="text-xs mt-1 font-light">{item.desc}</p>
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
        <div className="mt-12 pt-8 border-t border-foreground/10">
          <p className="text-foreground/70 text-center text-sm">
            © 2024 CloudVictor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
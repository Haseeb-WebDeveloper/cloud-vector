"use client";

import Image from "next/image";
import Link from "next/link";
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
    defaultDesc: "Helping leaders win every cloud battle",
    items: [
      {
        icon: Shield,
        href: "/solutions/ctos",
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
    defaultDesc: "Purpose-built self-service solutions for AWS Cost efficiency & security",
    items: [
      {
        icon: BarChart3,
        href: "/products/finops",
        label: "FINOPS",
        desc: "Slash AWS bills by up to 68%, 100% Guaranteed ROI in 3 months.",
      },
      {
        icon: Shield,
        href: "/products/secops",
        label: "SECOPS",
        desc: "InfoSec Team As a Service.",
      },
    ],
  },
  {
    title: "Resources",
    icon: BookOpen,
    items: [
      {
        icon: Globe,
        href: "/case-studies",
        label: "Case Studies",
      },
      {
        icon: Users,
        href: "/community",
        label: "Community",
      },
      {
        icon: Newspaper,
        href: "/blog",
        label: "Blog",
      },
    ],
  },
  {
    title: "Company",
    icon: UserCircle,
    items: [
      {
        icon: DollarSign,
        href: "/pricing",
        label: "Pricing",
      },
      {
        icon: Phone,
        href: "/contact",
        label: "Contact Us",
      },
      {
        icon: Info,
        href: "/about",
        label: "About Us",
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="pt-16 pb-8 border-t border-foreground/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start gap-16">
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
              <button className="cursor-pointer w-full border bg-gradient-to-r from-[#FF9900]/90 to-[#E85409]/90 hover:from-[#FF9900] hover:to-[#E85409] rounded-lg px-4 py-2 transition-colors">
                Subscribe
              </button>
            </div>
          </div>

          {/* Right Section - Navigation Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-20 flex-1">
            {footerColumns.map((col) => (
              <div className="space-y-6 min-w-[220px]" key={col.title}>
                <h3 className="text-sm text-foreground/70 flex items-center gap-2">
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
                        <p className="text-xs mt-1 font-light">{col.defaultDesc}</p>
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
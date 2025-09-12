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
    items: [
      {
        icon: BarChart3,
        href: "/solutions/finance",
        label: "For Finance",
        desc: "Optimize cloud spend and reporting for finance teams.",
      },
      {
        icon: Shield,
        href: "/solutions/cxos",
        label: "For CXOs",
        desc: "Strategic insights and governance for leadership.",
      },
      {
        icon: Cloud,
        href: "/solutions/cloud-engineers",
        label: "For Cloud Engineers",
        desc: "Tools and automation for cloud engineering teams.",
      },
    ],
  },
  {
    title: "Product",
    icon: Settings,
    items: [
      {
        icon: FileText,
        
        href: "/product/cloud-victor",
        label: "Cloud Victor",
        desc: "Secure, monitor, and analyze your cloud logs.",
      },
      {
        icon: Users,
        href: "/product/cloud-victor",
        label: "Cloud Victor",
        desc: "Automate and optimize data workflows.",
      },
      {
        icon: DollarSign,
        href: "/pricing",
        label: "Pricing",
        desc: "Flexible plans for every team and use case.",
      },
    ],
  },
  {
    title: "Company",
    icon: UserCircle,
    items: [
      {
        icon: Phone,
        href: "/contact",
        label: "Contact",
        desc: "Get in touch with our team.",
      },
      {
        icon: FileText,
        href: "/terms",
        label: "Terms and Conditions",
        desc: "Read our terms and conditions.",
      },
      {
        icon: Lock,
        href: "/privacy-policy",
        label: "Privacy Policy",
        desc: "How we handle your data and privacy.",
      },
      {
        icon: Info,
        href: "/about",
        label: "About",
        desc: "Learn more about CloudVictor.",
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
        desc: "See how others succeed with CloudVictor.",
      },
      {
        icon: Newspaper,
        href: "/blog",
        label: "Blog",
        desc: "Insights, news, and best practices.",
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
            <div className="border bg-foreground/5 rounded-lg p-4">
              <p className=" text-center mb-4">
                Stay current with all things CloudVictor
              </p>
              <button className="cursor-pointer w-full border  rounded-lg px-4 py-2 transition-colors">
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
                <div className="space-y-5">
                  {col.items.map((item) => (
                    <div
                      className="flex items-start gap-3 opacity-80 hover:opacity-100 group cursor-pointer"
                      key={item.href}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0 mt-1 " />
                      <div>
                        <Link href={item.href} className="block transition-colors text-sm">
                          {item.label}
                        </Link>
                        <p className="text-xs mt-1 font-light">{item.desc}</p>
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
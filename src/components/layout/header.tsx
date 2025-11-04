"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Users,
  Code,
  Shield,
  FileText,
  DollarSign,
  Phone,
  Info,
  BarChart3,
  BookOpen,
  Settings,
  Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Navigation data
const navigationData = [
  {
    title: "Solutions",
    href: "/",
    description:
      "Helping leaders win every cloud battle",
    hasDropdown: true,
    submenu: [
      {
        title: "For CTOs",
        description:
          "Cost Efficiency, Performance, 24x7 Security, Monitoring, Disaster Recovery.",
        icon: Users,
        href: "/for-cto",
      },
      {
        title: "For Engineers",
        description:
          "Build faster with cost-efficient, reliable AWS architecture building blocks.",
        icon: Code,
        href: "#engineers",
      },
    ],
  },
  {
    title: "Products",
    href: "#",
    hasDropdown: true,
    description:
      "Purpose-built self-service solutions for AWS Cost efficiency & security",
    submenu: [
      {
        title: "FINOPS",
        description: "Slash AWS bills by up to 68%, 100% Guaranteed ROI in 3 months.",
        icon: DollarSign,
        href: "#finops",
      },
      {
        title: "SECOPS",
        description: "InfoSec Team As a Service.",
        icon: Shield,
        href: "#secops",
      },
    ],
  },
  {
    title: "Resources",
    href: "#",
    hasDropdown: true,
    description:
      "Insights, success stories, and community resources",
    submenu: [
      {
        title: "Case Studies",
        description: "Real-world success stories and implementation examples",
        icon: BarChart3,
        href: "#case-studies",
      },
      {
        title: "Community",
        description: "Join our community of cloud professionals",
        icon: Users,
        href: "#community",
      },
      {
        title: "Blog",
        description: "Latest insights, tutorials, and industry trends",
        icon: BookOpen,
        href: "/blog",
      },
    ],
  },
  {
    title: "Pricing",
    href: "#pricing",
    hasDropdown: false,
  },
  {
    title: "Contact Us",
    href: "#contact",
    hasDropdown: false,
  },
  {
    title: "About Us",
    href: "#about",
    hasDropdown: false,
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoveredSubItem, setHoveredSubItem] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (title: string) => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredItem(title);
  };

  const handleMouseLeave = () => {
    // Add a small delay to prevent flickering when moving between nav item and dropdown
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
      setHoveredSubItem(null);
    }, 150);
  };

  const handleDropdownMouseEnter = () => {
    // Clear timeout when hovering over dropdown
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const handleDropdownMouseLeave = () => {
    setHoveredItem(null);
    setHoveredSubItem(null);
  };

  const handleSubItemHover = (subItemTitle: string) => {
    setHoveredSubItem(subItemTitle);
  };

  const handleSubItemLeave = () => {
    setHoveredSubItem(null);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-[1px] border-foreground/10 bg-background/95 backdrop-blur-md  ",
        isScrolled
          ? "py-5"
          : "py-6 "
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo/cloudVictor-horizantal-logo-text.png"
              alt="Cloud Vector"
              width={400}
              height={400}
              className="h-8 w-full object-cover"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationData.map((item) => (
              <div
                key={item.title}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.title)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className="flex items-center space-x-1 font-light text-foreground/95 hover:text-foreground transition-colors"
                >
                  <span>{item.title}</span>
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Desktop Dropdown */}
                {item.hasDropdown && hoveredItem === item.title && (
                  <div
                    className="absolute top-10 left-1/2 transform -translate-x-1/2 mt-2 min-w-[450px] bg-background border rounded-lg shadow-lg animate-in fade-in-0 zoom-in-95 duration-200 z-[300]"
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                  >
                    <div className="flex ">
                      {/* Left Column - Description */}
                      <div className="space-y-10 bg-muted/50 border-r-[1px] p-5 w-full">
                        <h3 className="font-semibold text-sm uppercase tracking-widest">
                          {item.title}
                        </h3>
                        <p className="text-sm w-full">
                          {hoveredSubItem
                            ? item.submenu?.find(
                                (sub) => sub.title === hoveredSubItem
                              )?.description
                            : item.description}
                        </p>
                      </div>

                      {/* Right Column - Submenu */}
                      <div className="">
                        {item.submenu?.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            className="w-full flex items-center border-b last space-x-3 py-3 pl-4 pr-6 hover:bg-muted/50 transition-colors group"
                            onMouseEnter={() =>
                              handleSubItemHover(subItem.title)
                            }
                            onMouseLeave={handleSubItemLeave}
                          >
                            <subItem.icon className="w-5 h-5 transition-colors" />
                            <div>
                              <div className="text-nowrap pr-4 tracking-widest text-sm  transition-colors">
                                {subItem.title}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* <button className="group cursor-pointer flex items-center gap-2 bg-background text-foreground border border-foreground/50 hover:pr-6 hover:border-foreground/70 hover:bg-foreground/20 transition-all duration-300 px-5 py-2.5 rounded-full text-sm">
              Get Started
              <Image
                src="/icons/arrow-right.svg"
                alt="Arrow right"
                width={350}
                height={350}
                className="w-fit h-5 group-hover:translate-x-2 transition-all duration-300"
              />
            </button> */}
          </div>

          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full h-full">
              <div className="flex flex-col space-y-6 mt-20 px-4">
                {/* Mobile Navigation */}
                <div className="w-full space-y-2">
                  {navigationData.map((item) =>
                    item.hasDropdown ? (
                      <Accordion
                        key={item.title}
                        type="single"
                        collapsible
                        className="w-full"
                      >
                        <AccordionItem value={item.title}>
                          <AccordionTrigger className="text-left">
                            {item.title}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2">
                              {item.submenu?.map((subItem) => (
                                <Link
                                  key={subItem.title}
                                  href={subItem.href}
                                  className="flex items-start space-x-3 p-3 rounded-md hover:bg-muted/50 transition-colors group"
                                >
                                  <subItem.icon className="w-5 h-5 mt-0.5 group-hover:text-primary group-hover:scale-110 transition-all" />
                                  <div>
                                    <div className="font-medium tracking-widest text-sm group-hover:text-primary transition-colors">
                                      {subItem.title}
                                    </div>
                                    <div className="text-xs mt-1">
                                      {subItem.description}
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="flex items-center p-3 rounded-md hover:bg-muted/50 transition-colors group font-medium text-base"
                      >
                        {item.title}
                      </Link>
                    )
                  )}
                </div>

                {/* Mobile CTA Buttons */}
                <div className="flex flex-col space-y-3 pt-4 border-t">
                  {/* <button className="group cursor-pointer flex items-center gap-2 bg-background text-foreground border border-foreground/50 hover:pr-6 hover:border-foreground/70 hover:bg-foreground/20 transition-all duration-300 px-5 py-2.5 rounded-full text-sm">
                    Get Started
                    <Image
                      src="/icons/arrow-right.svg"
                      alt="Arrow right"
                      width={350}
                      height={350}
                      className="w-fit h-5 group-hover:translate-x-2 transition-all duration-300"
                    />
                  </button> */}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

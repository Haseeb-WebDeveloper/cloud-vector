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
  Monitor
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
    href: "#",
    hasDropdown: true,
    submenu: [
      {
        title: "For CTOs",
        description:
          "Strategic technology leadership solutions designed for Chief Technology Officers",
        icon: Users,
        href: "#ctos",
      },
      {
        title: "For Engineers",
        description:
          "Development tools and resources tailored for engineering teams",
        icon: Code,
        href: "#engineers",
      },
    ],
  },
  {
    title: "Product",
    href: "#",
    hasDropdown: true,
    submenu: [
      {
        title: "Effdog",
        description: "Advanced efficiency monitoring and optimization platform",
        icon: Monitor,
        href: "#effdog",
      },
      {
        title: "Log Guardia",
        description: "Comprehensive logging and security monitoring solution",
        icon: Shield,
        href: "#log-guardia",
      },
    ],
  },
  {
    title: "Resources",
    href: "#",
    hasDropdown: true,
    submenu: [
      {
        title: "Case Studies",
        description: "Real-world success stories and implementation examples",
        icon: BarChart3,
        href: "#case-studies",
      },
      {
        title: "Blogs",
        description: "Latest insights, tutorials, and industry trends",
        icon: BookOpen,
        href: "#blogs",
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b-[1px] border-foreground/10 py-5"
          : "bg-transparent py-6"
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
                    className="absolute top-10 left-1/2 transform -translate-x-1/2 mt-2 min-w-[450px] bg-background border rounded-lg shadow-lg animate-in fade-in-0 zoom-in-95 duration-200"
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                  >
                    <div className="flex ">
                      {/* Left Column - Description */}
                      <div className="space-y-10 bg-muted/50 border-r-[1px] p-5 w-full">
                        <h3 className="font-semibold text-sm uppercase tracking-wide">
                          {item.title}
                        </h3>
                        <p className="text-sm w-full">
                          {hoveredSubItem
                            ? item.submenu?.find(
                                (sub) => sub.title === hoveredSubItem
                              )?.description
                            : item.submenu?.[0]?.description}
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
                          >
                            <subItem.icon className="w-5 h-5  transition-colors" />
                            <div>
                              <div className="text-nowrap pr-4 font-medium text-sm  transition-colors">
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
            <Button size="sm">Get Started</Button>
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
              <div className="flex flex-col space-y-6 mt-6 px-4">
                {/* Mobile Navigation */}
                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-2"
                >
                  {navigationData.map((item) => (
                    <AccordionItem key={item.title} value={item.title}>
                      <AccordionTrigger className="text-left">
                        {item.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        {item.hasDropdown ? (
                          <div className="space-y-2 pl-4">
                            {item.submenu?.map((subItem) => (
                              <Link
                                key={subItem.title}
                                href={subItem.href}
                                className="flex items-start space-x-3 p-3 rounded-md hover:bg-muted/50 transition-colors group"
                              >
                                <subItem.icon className="w-5 h-5 mt-0.5 group-hover:text-primary group-hover:scale-110 transition-all" />
                                <div>
                                  <div className="font-medium text-sm group-hover:text-primary transition-colors">
                                    {subItem.title}
                                  </div>
                                  <div className="text-xs mt-1">
                                    {subItem.description}
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            className="flex items-start space-x-3 p-3 rounded-md hover:bg-muted/50 transition-colors group"
                          >
                              {item.title === "Pricing" ? (
                                <DollarSign className="w-5 h-5 mt-0.5 group-hover:text-primary group-hover:scale-110 transition-all" />
                              ) : item.title === "Contact Us" ? (
                                <Phone className="w-5 h-5 mt-0.5 group-hover:text-primary group-hover:scale-110 transition-all" />
                              ) : item.title === "About Us" ? (
                                <Info className="w-5 h-5 mt-0.5 group-hover:text-primary group-hover:scale-110 transition-all" />
                              ) : (
                                <Settings className="w-5 h-5 mt-0.5 group-hover:text-primary group-hover:scale-110 transition-all" />
                              )}
                            <div>
                              <div className="font-medium text-sm group-hover:text-primary transition-colors">
                                {item.title}
                              </div>
                              <div className="text-xs mt-1">
                                {item.title === "Pricing"
                                  ? "View our flexible pricing plans and choose what works for you"
                                  : item.title === "Contact Us"
                                    ? "Get in touch with our team for support and inquiries"
                                    : item.title === "About Us"
                                      ? "Learn more about our company, mission, and values"
                                      : "Learn more about this section"}
                              </div>
                            </div>
                          </Link>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                {/* Mobile CTA Buttons */}
                <div className="flex flex-col space-y-3 pt-4 border-t">
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                  <Button className="w-full">Get Started</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-3">
              {/* Cloud Logo with Data Flow Lines */}
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/logo/cloudVictor-horizantal-logo-text.png"
                  alt="Cloud Vector"
                  width={400}
                  height={400}
                  className="h-8 w-full object-cover"
                />
              </Link>
            </div>
          </div>

          {/* Navigation Sections */}
          <div className="flex flex-wrap gap-8 lg:gap-12">
            {/* Solutions */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-teal-400 border border-teal-400 px-3 py-1 inline-block">
                Solutions
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/solutions/finance"
                    className="text-green-400 hover:text-green-300 transition-colors"
                  >
                    For Finance
                  </Link>
                </li>
                <li>
                  <Link
                    href="/solutions/cxos"
                    className="text-green-400 hover:text-green-300 transition-colors"
                  >
                    For CXOs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/solutions/cloud-engineers"
                    className="text-green-400 hover:text-green-300 transition-colors"
                  >
                    For Cloud Engineers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Product */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-teal-400 border border-teal-400 px-3 py-1 inline-block">
                Product
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/product/log-guardia"
                    className="text-green-400 hover:text-green-300 transition-colors"
                  >
                    Log Guardia
                  </Link>
                </li>
                <li>
                  <Link
                    href="/product/effdog"
                    className="text-green-400 hover:text-green-300 transition-colors"
                  >
                    EffDog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-teal-400 border border-teal-400 px-3 py-1 inline-block">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/case-studies"
                    className="text-green-400 hover:text-green-300 transition-colors"
                  >
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-green-400 hover:text-green-300 transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-teal-400 border border-teal-400 px-3 py-1 inline-block rounded">
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/contact"
                    className="text-green-400 hover:text-green-300 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-and-conditions"
                    className="text-green-400 hover:text-green-300 transition-colors"
                  >
                    Terms and Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-green-400 hover:text-green-300 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-green-400 hover:text-green-300 transition-colors"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-center text-sm">
            © 2024 CloudVictor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

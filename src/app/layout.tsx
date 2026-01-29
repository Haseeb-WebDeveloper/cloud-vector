import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import NewsletterSection from "@/components/cost-optimisation/newsletter-section";
import { HelpSection } from "@/components/help-section";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.cloudvictor.com";

const bricol = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-bricol",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: {
    default: "CloudVictor | AWS Cost Optimisation & FinOps Automation",
    template: "%s | CloudVictor",
  },
  description:
    "CloudVictor helps engineering-led teams operate AWS the Amazon way – automated FinOps, cost optimisation, performance and security without extra headcount.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "CloudVictor | AWS Cost Optimisation & FinOps Automation",
    description:
      "Operate your AWS infra the way Amazon operates theirs. Automated FinOps, deep observability and cost optimisation with 100% ROI guarantee.",
    url: SITE_URL,
    siteName: "CloudVictor",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "CloudVictor – AWS Cost Optimisation & FinOps Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CloudVictor | AWS Cost Optimisation & FinOps Automation",
    description:
      "Operate your AWS infra the way Amazon operates theirs. Automated FinOps, deep observability and cost optimisation with 100% ROI guarantee.",
    images: [`${SITE_URL}/og-default.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot:
      "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CloudVictor",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    sameAs: [
      "https://www.linkedin.com/company/cloudvictor",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CloudVictor",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={`${bricol.variable} ${dmSans.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Header />
          {children}
          <NewsletterSection />
          <HelpSection />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

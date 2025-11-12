import Image from "next/image";
import Link from "next/link";
import { GradientButton } from "@/components/ui/gradient-button";
import HubSpotForm from "@/components/contact-us/hubspot-form";

export const metadata = {
  title: "Contact Us | CloudVictor",
  description:
    "Talk to an AWS Architect. Free consultation, WhatsApp, call, or email CloudVictor.",
};

// Icon Components
const VideoIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="6" width="14" height="12" rx="2" stroke="black" strokeWidth="2" fill="none" />
    <path d="M16 10L20 7V17L16 14" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"
      fill="black"
    />
  </svg>
);

const PhoneIcon = ({ color = "black" }: { color?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
      stroke={color}
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EmailIcon = ({ color = "black" }: { color?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
      stroke={color}
      strokeWidth="2"
      fill="none"
    />
    <polyline
      points="22,6 12,13 2,6"
      stroke={color}
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Modified CheckIcon for thicker tick and black stroke (update: black icon)
const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 6L9 17l-5-5"
      stroke="black"
      strokeWidth="3.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ContactUsPage() {
  const bullets = [
    "Free Consultation Call",
    "Any AWS issue in any service",
    "10+ YoE AWS Architect",
    "Upto 69% Monthly Bill Reduction",
  ];

  // Gradient classes for the CTA buttons
  const gradientButtonClass =
    "bg-gradient-to-r from-[#FF9900]/90 to-[#E85409]/90 hover:from-[#FF9900] hover:to-[#E85409] text-white border-0 shadow-none";

  return (
    <main className="pt-28 bg-background">
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="flex flex-col items-center text-center gap-8 max-w-4xl mx-auto">
          <h1
            className="text-4xl lg:text-6xl font-semibold bg-gradient-to-r from-primary via-primary to-white bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, var(--primary) 70%, #fff 100%)",
            }}
          >
            We want to hear from you!
          </h1>

          <div className="space-y-4 text-foreground/90">
            <p className="text-lg lg:text-xl leading-relaxed">
              Be it a complaint or a suggestion or a praise! We are all ears!
            </p>
            <p className="text-base lg:text-lg leading-relaxed">
              Talk to an AWS architect with 10+ YoE about your AWS issues to get
              free actionable advice & a 20-min audit of your AWS account.
            </p>
          </div>

          {/* Bullet Points with Gradient Background in One Line */}
          <ul className="flex flex-row justify-center gap-4 w-full text-center mt-4">
            {bullets.map((item) => (
              <li key={item} className="flex items-center gap-2 border border-white rounded-full px-2 py-2 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,153,0,0.6),0_0_40px_rgba(255,153,0,0.4)]">
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center"
                       style={{
                         background: 'var(--primary)',
                       }}>
                    <CheckIcon />
                  </div>
                </div>
                <span className="text-foreground/90 text-base whitespace-nowrap">{item}</span>
              </li>
            ))}
          </ul>

          {/* CTAs in One Line with Icons on Left */}
          <div className="flex flex-row flex-wrap justify-center items-center gap-4 pt-6 w-full">
            {/* Book a call - Gradient Button */}
            <Link
              href="#talk-to-architect"
              className={`group cursor-pointer flex items-center gap-3 px-5 py-3 rounded-full border-none shadow-none text-white ${gradientButtonClass} transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,153,0,0.6),0_0_40px_rgba(255,153,0,0.4)]`}
              style={{ textDecoration: 'none' }}
            >
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-foreground/10">
                <VideoIcon />
              </div>
              <span className="font-medium">Book a call</span>
            </Link>

            {/* Whatsapp - Gradient Button */}
            <a
              href="https://wa.me/919625596336"
              target="_blank"
              rel="noreferrer"
              className={`group cursor-pointer flex items-center gap-3 px-5 py-3 rounded-full border-none shadow-none text-white ${gradientButtonClass} transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,153,0,0.6),0_0_40px_rgba(255,153,0,0.4)]`}
              style={{ textDecoration: 'none' }}
            >
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-foreground/10">
                <WhatsAppIcon />
              </div>
              <span className="font-medium">Whatsapp us</span>
            </a>

            {/* Call - Circular Gradient Button with Text */}
            <a
              href="tel:+919625596336"
              className="group cursor-pointer flex items-center gap-3 text-white"
              style={{ textDecoration: "none" }}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-none shadow-none ${gradientButtonClass} transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,153,0,0.6),0_0_40px_rgba(255,153,0,0.4)]`}>
                {/* Ensure icon is white */}
                <PhoneIcon color="white" />
              </div>
              <span className="underline font-medium text-white">+91-96255-96336</span>
            </a>

            {/* Email - Circular Gradient Button with Text */}
            <a
              href="mailto:prateek@cloudvictor.com"
              className="group cursor-pointer flex items-center gap-3 text-white"
              style={{ textDecoration: "none" }}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-none shadow-none ${gradientButtonClass} transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,153,0,0.6),0_0_40px_rgba(255,153,0,0.4)]`}>
                {/* Ensure icon is white */}
                <EmailIcon color="white" />
              </div>
              <span className="underline font-medium text-white">prateek@cloudvictor.com</span>
            </a>
          </div>
        </div>
      </section>

      {/* HubSpot Form Section */}
      <section className="mx-auto max-w-4xl px-6 lg:px-8 py-16">
        <div className="bg-foreground/5 rounded-2xl p-8 lg:p-12 flex flex-col items-center gap-8">
          <div className="text-center">
            <h2
              className="text-3xl lg:text-4xl font-semibold mb-4 bg-gradient-to-r from-primary via-primary/80 to-white/60 text-transparent bg-clip-text"
            >
              Get in Touch
            </h2>
            <p className="text-base lg:text-lg text-foreground/90 max-w-2xl">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>
          <div className="w-full max-w-2xl">
            <HubSpotForm />
          </div>
        </div>
      </section>
    </main>
  );
}


"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    hbspt: {
      forms: {
        create: (options: {
          portalId: string;
          formId: string;
          region: string;
          target?: string | HTMLElement;
        }) => void;
      };
    };
  }
}

export default function HubSpotForm() {
  const formRef = useRef<HTMLDivElement>(null);
  const formCreatedRef = useRef(false);

  useEffect(() => {
    const loadForm = () => {
      if (window.hbspt && formRef.current && !formCreatedRef.current) {
        try {
          // Clear any existing form
          formRef.current.innerHTML = "";
          
          // Create the form using the element ID as target
          window.hbspt.forms.create({
            portalId: "46627753",
            formId: "83414496-e146-46d8-815f-d881d44e1166",
            region: "na2",
            target: "#hubspot-form-container",
          });
          
          formCreatedRef.current = true;
        } catch (error) {
          console.error("Error creating HubSpot form:", error);
        }
      }
    };

    // Check if script is already loaded
    if (window.hbspt) {
      // Small delay to ensure DOM is ready
      setTimeout(loadForm, 100);
    } else {
      // Wait for script to load
      const checkInterval = setInterval(() => {
        if (window.hbspt && formRef.current) {
          clearInterval(checkInterval);
          setTimeout(loadForm, 100);
        }
      }, 100);

      // Cleanup interval after 10 seconds
      const timeout = setTimeout(() => {
        clearInterval(checkInterval);
      }, 10000);

      return () => {
        clearInterval(checkInterval);
        clearTimeout(timeout);
      };
    }
  }, []);

  return (
    <>
      <Script
        src="https://js-na2.hsforms.net/forms/embed/v2.js"
        strategy="afterInteractive"
        id="hubspot-forms-script"
      />
      <div 
        ref={formRef} 
        className="hubspot-form-container min-h-[400px] w-full"
        id="hubspot-form-container"
      />
    </>
  );
}


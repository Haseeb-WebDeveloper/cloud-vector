"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How quickly can you identify cost savings, and how much can be saved?",
    answer: "Most businesses uncover 20–68% in AWS savings within the first month through rightsizing, Reserved Instances/Savings Plans, and eliminating idle resources."
  },
  {
    question: "Do you support all AWS accounts, regions, and resource types?",
    answer: "Yes—our solution integrates with Cost Optimization Hub and Compute Optimizer to cover EC2, RDS, EBS, Fargate, DynamoDB, and more."
  },
  {
    question: "What kinds of threats and misconfigurations do you detect?",
    answer: "We continuously monitor AWS API activity, IAM permissions, public access policies, resource misconfigurations, and suspicious behavior—providing 24×7 threat detection with automated alerts and remediation."
  },
  {
    question: "How do you ensure compliance and best practices?",
    answer: "Our platform maps to industry frameworks (e.g. CIS, PCI, NIST), audits IAM, encryption, logging and access policies, and secures your architecture end-to-end."
  },
  {
    question: "How is scaling managed across EC2, ECS, and managed services?",
    answer: "We leverage intelligent auto-scaling plans—including predictive and target-tracking—to dynamically adjust EC2, ECS, DynamoDB, and more, ensuring uptime and cost-efficiency."
  },
  {
    question: "What happens during traffic spikes or instance failures?",
    answer: "Our auto-scaling setup not only adds capacity but also replaces unhealthy instances, ensuring high availability, fault tolerance, and zero human intervention."
  },
  {
    question: "How does this integrate with our infrastructure and workflows?",
    answer: "We integrate via IAM roles for cross-account visibility, our agent-less API-driven monitoring, and seamless CI/CD toolchain support—no heavy agents or refactoring required."
  },
  {
    question: "What kind of reporting and alerts can we expect?",
    answer: "Get real‑time dashboards, weekly savings/security/performance reports, Slack/email alerts, and strategy reviews. All data is stored for audits and continuous improvement."
  },
  {
    question: "Who should use this service—finance, dev, ops teams?",
    answer: "Perfect for cross-functional teams: FinOps tracks savings, DevOps accelerates releases, and security teams monitor risk—all with shared dashboards and actionable alerts."
  },
  {
    question: "How fast can we see ROI & reduce cloud toil?",
    answer: "Most clients see ROI in 4–8 weeks and reclaim 10–30 hours/month from engineering teams once cost, security, and scaling automation takes over."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 bg-gradient-to-r from-[#FF9700] to-[#E85409] bg-clip-text text-transparent max-w-md mx-auto leading-[140%]">
            Frequently Asked <span className="text-foreground">Questions</span>
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-card border border-border overflow-hidden shadow-[0_1px_5px_0_rgba(255,153,0,0.521)] hover:shadow-[0_1px_6px_0_rgba(255,153,0,0.900)] rounded-xl transition-shadow duration-200 cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors duration-200"
              >
                <span className="text-foreground hover:text-primary font-medium pr-4">
                  {faq.question}
                </span>
                <motion.div
                  // animate={{ rotate: openIndex === index ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 bg-primary rounded-full p-2"
                >
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-background" />
                  ) : (
                    <Plus className="w-5 h-5 text-background" />
                  )}
                </motion.div>
              </button>

              {/* Answer Content */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 pt-2 border-t border-border">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

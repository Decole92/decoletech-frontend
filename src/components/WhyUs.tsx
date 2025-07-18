"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Search,
  Zap,
  Shield,
  Smartphone,
  BarChart3,
  Headphones,
} from "lucide-react";

const benefits = [
  {
    icon: Search,
    title: "SEO Optimization",
    description:
      "Boost your search rankings with expert SEO strategies, leveraging tools like Next.js and Firebase for optimal performance.",
    highlight: "Rank Higher",
  },
  {
    icon: Zap,
    title: "Scalable Web Solutions",
    description:
      "Build lightning-fast, scalable applications using React, Next.js, and TypeScript for seamless user experiences.",
    highlight: "High Performance",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Development",
    description:
      "Craft responsive, mobile-ready applications with React Native and Tailwind CSS for flawless cross-device performance.",
    highlight: "Mobile Optimized",
  },
  {
    icon: Shield,
    title: "Secure Cloud Integration",
    description:
      "Deploy robust solutions with Microsoft Azure, Google Cloud, and Firebase, ensuring security and reliability.",
    highlight: "Enterprise-Grade",
  },
  {
    icon: BarChart3,
    title: "AI-Powered Insights",
    description:
      "Leverage OpenAI API and LangChain for intelligent analytics and data-driven decision-making in your applications.",
    highlight: "Smart Analytics",
  },
  {
    icon: Headphones,
    title: "Real-Time Features",
    description:
      "Implement instant messaging and notifications with Socket.io and Pusher for dynamic, user-focused platforms.",
    highlight: "Live Interaction",
  },
];

export default function WhyUs() {
  return (
    <section className='py-16 bg-white'>
      <div className='container mx-auto px-4 max-w-6xl'>
        {/* Header */}
        <div className='text-center mb-12'>
          <Badge className='mb-4 bg-blue-50 text-blue-500 border-blue-200'>
            Why Partner With Us
          </Badge>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
            Empower Your Business with{" "}
            <span className='bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent'>
              Cutting-Edge Solutions
            </span>
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            From AI-driven platforms to SEO-optimized websites, we deliver
            innovative solutions tailored to your business needs.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className='group hover:shadow-lg transition-all duration-300 border border-gray-100'
            >
              <CardContent className='p-6'>
                <div className='flex items-start space-x-4'>
                  <div className='w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors'>
                    <benefit.icon className='h-6 w-6 text-blue-600' />
                  </div>
                  <div className='flex-1'>
                    <div className='flex items-center justify-between mb-2'>
                      <h3 className='font-semibold text-gray-900'>
                        {benefit.title}
                      </h3>
                      <Badge
                        variant='outline'
                        className='text-xs text-blue-600 border-blue-200'
                      >
                        {benefit.highlight}
                      </Badge>
                    </div>
                    <p className='text-gray-600 text-sm leading-relaxed'>
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

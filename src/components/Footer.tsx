"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Empty Email Input: Please enter your email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast("Invalid Email: Please enter a valid email address");
      return;
    }

    setIsSubscribing(true);

    try {
      // Here you would typically send to your newsletter API
      const source = "footer";
      const response = await fetch("/api/newsletter/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, source }),
      });

      if (response.ok) {
        toast.success(
          "Subscribed Successfully!, Thank you for subscribing to my newsletter."
        );
        setEmail("");
      } else {
        throw new Error("Failed to subscribe");
      }
    } catch (error) {
      toast.error(
        `Subscripton failed: Please try again later or contact me directly. ${error}`
      );
    } finally {
      setIsSubscribing(false);
    }
  };

  const socialLinks = [
    {
      name: "Gmail",
      href: "mailto:info@decoletech.com",
      icon: (
        <svg className='w-6 h-6' viewBox='0 0 24 24' fill='currentColor'>
          <path d='M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819l6.545 4.91 6.545-4.91h3.819A1.636 1.636 0 0 1 24 5.457z' />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/augustine-udeh", // Replace with your actual LinkedIn
      icon: (
        <svg className='w-6 h-6' viewBox='0 0 24 24' fill='currentColor'>
          <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
        </svg>
      ),
    },
    {
      name: "Phone",
      href: "tel:+420777907936",
      icon: (
        <svg className='w-6 h-6' viewBox='0 0 24 24' fill='currentColor'>
          <path d='M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z' />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com/decolemills", // Replace with your actual Instagram
      icon: (
        <svg className='w-6 h-6' viewBox='0 0 24 24' fill='currentColor'>
          <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
        </svg>
      ),
    },
    {
      name: "X (Twitter)",
      href: "https://x.com/augustine_udeh", // Replace with your actual X/Twitter
      icon: (
        <svg className='w-6 h-6' viewBox='0 0 24 24' fill='currentColor'>
          <path d='M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z' />
        </svg>
      ),
    },
  ];

  return (
    <footer className='relative overflow-hidden'>
      {/* Hero-style background */}
      <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-teal-800'>
        {/* Corner lighting effects */}
        <div className='absolute top-0 left-0 w-full h-full'>
          {/* Top-left corner light */}
          <div className='absolute -top-40 -left-40 w-96 h-96 bg-gradient-radial from-cyan-400/30 via-blue-500/20 to-transparent rounded-full blur-3xl'></div>

          {/* Top-right corner light */}
          <div className='absolute -top-20 -right-20 w-80 h-80 bg-gradient-radial from-teal-300/25 via-cyan-400/15 to-transparent rounded-full blur-2xl'></div>

          {/* Bottom-left accent */}
          <div className='absolute bottom-20 left-20 w-72 h-72 bg-gradient-radial from-blue-400/20 via-teal-500/10 to-transparent rounded-full blur-3xl'></div>
        </div>

        {/* Abstract flowing lines */}
        <div className='absolute inset-0 opacity-40'>
          <svg className='w-full h-full' viewBox='0 0 1920 1080' fill='none'>
            <path
              d='M-100 200C300 150 500 250 900 200C1300 150 1500 350 1920 300'
              stroke='url(#footerGradient1)'
              strokeWidth='1.5'
              fill='none'
            />
            <path
              d='M-100 400C200 300 400 500 800 400C1200 300 1400 600 1920 500'
              stroke='url(#footerGradient2)'
              strokeWidth='2'
              fill='none'
            />
            <path
              d='M-100 600C300 500 500 700 900 600C1300 500 1500 800 1920 700'
              stroke='url(#footerGradient3)'
              strokeWidth='3'
              fill='none'
            />

            <defs>
              <linearGradient
                id='footerGradient1'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='0%'
              >
                <stop offset='0%' stopColor='#06b6d4' stopOpacity='0.8' />
                <stop offset='50%' stopColor='#0891b2' stopOpacity='0.6' />
                <stop offset='100%' stopColor='#0e7490' stopOpacity='0.4' />
              </linearGradient>
              <linearGradient
                id='footerGradient2'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='0%'
              >
                <stop offset='0%' stopColor='#0891b2' stopOpacity='0.9' />
                <stop offset='50%' stopColor='#06b6d4' stopOpacity='0.7' />
                <stop offset='100%' stopColor='#22d3ee' stopOpacity='0.3' />
              </linearGradient>
              <linearGradient
                id='footerGradient3'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='0%'
              >
                <stop offset='0%' stopColor='#06b6d4' stopOpacity='0.7' />
                <stop offset='50%' stopColor='#0891b2' stopOpacity='0.8' />
                <stop offset='100%' stopColor='#0e7490' stopOpacity='0.5' />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Subtle grid pattern overlay */}
        <div className='absolute inset-0 opacity-10'>
          <div
            className='w-full h-full'
            style={{
              backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
      </div>

      {/* Footer content */}
      <div className='relative z-10 py-16 px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          {/* Main footer content */}
          <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-x-52 gap-y-14 mb-12'>
            {/* Brand section */}
            <div className='lg:col-span-1'>
              <h3 className='text-3xl font-bold text-white mb-4'>
                Decole{" "}
                <span className='bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-300 bg-clip-text text-transparent'>
                  Tech
                </span>
              </h3>

              <p className='text-blue-100 text-lg leading-relaxed mb-6'>
                Full-Stack Developer passionate about creating scalable,
                user-friendly web applications with modern technologies and AI
                integrations.
              </p>
              <div className='text-blue-100'>
                <p className='flex items-center mb-2'>
                  <svg
                    className='w-5 h-5 mr-3 text-cyan-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                  Prague, Czechia
                </p>
                <p className='flex items-center'>
                  <svg
                    className='w-5 h-5 mr-3 text-cyan-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  Available for Projects
                </p>
              </div>
            </div>

            <div></div>
            {/* Newsletter subscription */}
            <div className='lg:col-span-1'>
              <h4 className='text-xl font-semibold text-white mb-6'>
                Stay Updated
              </h4>
              <p className='text-blue-100 mb-6'>
                Subscribe to my newsletter for the latest updates on web
                development, AI trends, and project insights.
              </p>
              <form onSubmit={handleNewsletterSubmit} className='space-y-4'>
                <Input
                  type='email'
                  placeholder='Enter your email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-cyan-400 focus:ring-cyan-400'
                />
                <Button
                  type='submit'
                  disabled={isSubscribing}
                  className='w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300'
                >
                  {isSubscribing ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </div>
          </div>

          {/* Social links */}
          <div className='border-t border-white/20 pt-8'>
            <div className='flex flex-col md:flex-row justify-between items-center'>
              <div className='flex space-x-6 mb-6 md:mb-0'>
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target={
                      social.name !== "Gmail" && social.name !== "Phone"
                        ? "_blank"
                        : undefined
                    }
                    rel={
                      social.name !== "Gmail" && social.name !== "Phone"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className='text-blue-200 hover:text-cyan-300 transition-colors transform hover:scale-110 duration-300'
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              <div className='text-blue-200 text-center md:text-right'>
                <p className='mb-2'>
                  © 2024 Augustine Udeh. All rights reserved.
                </p>
                <p className='text-sm mb-2'>
                  (IČO) 21782326 Udeh Augustine Ekene.
                </p>
                <p className='text-sm'>
                  Built with Next.js, TypeScript & Tailwind CSS
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

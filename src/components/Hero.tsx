"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className='relative min-h-screen overflow-hidden'>
      {/* Base gradient background */}
      <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-teal-800'>
        {/* Corner lighting effects */}
        <div className='absolute top-0 left-0 w-full h-full'>
          {/* Top-left corner light */}
          <div className='absolute -top-40 -left-40 w-96 h-96 bg-gradient-radial from-cyan-400/30 via-blue-500/20 to-transparent rounded-full blur-3xl'></div>

          {/* Top-right corner light */}
          <div className='absolute -top-20 -right-20 w-80 h-80 bg-gradient-radial from-teal-300/25 via-cyan-400/15 to-transparent rounded-full blur-2xl'></div>

          {/* Bottom-left accent */}
          <div className='absolute bottom-20 left-20 w-72 h-72 bg-gradient-radial from-blue-400/20 via-teal-500/10 to-transparent rounded-full blur-3xl'></div>

          {/* Dynamic mouse-following light */}
          <div
            className='absolute w-64 h-64 bg-gradient-radial from-cyan-300/20 via-blue-400/10 to-transparent rounded-full blur-2xl transition-all duration-300 ease-out pointer-events-none'
            style={{
              left: mousePosition.x - 128,
              top: mousePosition.y - 128,
            }}
          ></div>
        </div>

        {/* Abstract flowing lines */}
        <div className='absolute inset-0 opacity-40'>
          <svg className='w-full h-full' viewBox='0 0 1920 1080' fill='none'>
            <path
              d='M-100 200C300 150 500 250 900 200C1300 150 1500 350 1920 300'
              stroke='url(#gradient1)'
              strokeWidth='1.5'
              fill='none'
            />
            <path
              d='M-100 400C200 300 400 500 800 400C1200 300 1400 600 1920 500'
              stroke='url(#gradient2)'
              strokeWidth='2'
              fill='none'
            />
            <path
              d='M-100 600C300 500 500 700 900 600C1300 500 1500 800 1920 700'
              stroke='url(#gradient3)'
              strokeWidth='3'
              fill='none'
            />
            <path
              d='M-100 800C400 700 600 900 1000 800C1400 700 1600 1000 1920 900'
              stroke='url(#gradient4)'
              strokeWidth='2'
              fill='none'
            />

            {/* Additional curved paths for more depth */}
            <path
              d='M1920 100C1600 200 1400 50 1000 150C600 250 400 100 -100 200'
              stroke='url(#gradient5)'
              strokeWidth='1'
              fill='none'
            />
            <path
              d='M1920 350C1500 450 1300 300 900 400C500 500 300 350 -100 450'
              stroke='url(#gradient6)'
              strokeWidth='1.5'
              fill='none'
            />

            <defs>
              <linearGradient id='gradient1' x1='0%' y1='0%' x2='100%' y2='0%'>
                <stop offset='0%' stopColor='#06b6d4' stopOpacity='0.8' />
                <stop offset='50%' stopColor='#0891b2' stopOpacity='0.6' />
                <stop offset='100%' stopColor='#0e7490' stopOpacity='0.4' />
              </linearGradient>
              <linearGradient id='gradient2' x1='0%' y1='0%' x2='100%' y2='0%'>
                <stop offset='0%' stopColor='#0891b2' stopOpacity='0.9' />
                <stop offset='50%' stopColor='#06b6d4' stopOpacity='0.7' />
                <stop offset='100%' stopColor='#22d3ee' stopOpacity='0.3' />
              </linearGradient>
              <linearGradient id='gradient3' x1='0%' y1='0%' x2='100%' y2='0%'>
                <stop offset='0%' stopColor='#06b6d4' stopOpacity='0.7' />
                <stop offset='50%' stopColor='#0891b2' stopOpacity='0.8' />
                <stop offset='100%' stopColor='#0e7490' stopOpacity='0.5' />
              </linearGradient>
              <linearGradient id='gradient4' x1='0%' y1='0%' x2='100%' y2='0%'>
                <stop offset='0%' stopColor='#0e7490' stopOpacity='0.6' />
                <stop offset='50%' stopColor='#06b6d4' stopOpacity='0.4' />
                <stop offset='100%' stopColor='#22d3ee' stopOpacity='0.8' />
              </linearGradient>
              <linearGradient id='gradient5' x1='0%' y1='0%' x2='100%' y2='0%'>
                <stop offset='0%' stopColor='#22d3ee' stopOpacity='0.5' />
                <stop offset='100%' stopColor='#06b6d4' stopOpacity='0.3' />
              </linearGradient>
              <linearGradient id='gradient6' x1='0%' y1='0%' x2='100%' y2='0%'>
                <stop offset='0%' stopColor='#0891b2' stopOpacity='0.4' />
                <stop offset='100%' stopColor='#0e7490' stopOpacity='0.6' />
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
        {/* Animated stars */}
      </div>

      {/* Main content */}
      <div className='relative z-10 flex items-center justify-center min-h-screen px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto text-center mt-32 mb-32 '>
          {/* Main heading */}
          <div className='mb-8 '>
            <h1 className='text-5xl md:text-7xl font-bold text-white mb-4'>
              Crafting{" "}
              <span className='bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-300 bg-clip-text text-transparent'>
                Full-Stack
              </span>{" "}
              Solutions
            </h1>
            <p className='hidden text-xl md:text-2xl text-blue-100 font-light'>
              Building Scalable Web Applications with Modern Technologies
            </p>
          </div>

          {/* Professional summary */}
          <div className='mb-12 max-w-3xl mx-auto'>
            <p className='text-lg text-blue-50/90 leading-relaxed'>
              Passionate Full-Stack Developer with{" "}
              <span className='text-cyan-300 font-semibold'>7+ years</span> of
              experience building scalable, user-friendly web applications.
              Proficient in modern JavaScript frameworks, cloud technologies,
              and AI integrations.
            </p>
          </div>

          {/* Core Services with Fancy Icons */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
            {/* Mobile Development */}
            <div className='group flex flex-col items-center text-center hover:transform hover:scale-105 transition-all duration-300'>
              <div className='relative mb-6'>
                <svg
                  width='120'
                  height='120'
                  viewBox='0 0 120 120'
                  fill='none'
                  className='drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300'
                >
                  {/* Gear background */}
                  <path
                    d='M60 10L65.5 20.5L77 18L79.5 29.5L91 29L91 41L102.5 43.5L100 55L110.5 60L100 65L102.5 76.5L91 79L91 91L79.5 90.5L77 102L65.5 99.5L60 110L54.5 99.5L43 102L40.5 90.5L29 91L29 79L17.5 76.5L20 65L9.5 60L20 55L17.5 43.5L29 41L29 29L40.5 29.5L43 18L54.5 20.5L60 10Z'
                    fill='url(#mobileGradient)'
                    className='group-hover:rotate-12 transition-transform duration-500'
                  />
                  {/* Inner circle */}
                  <circle cx='60' cy='60' r='25' fill='rgba(255,255,255,0.9)' />
                  {/* Mobile phone icon */}
                  <rect
                    x='50'
                    y='45'
                    width='20'
                    height='30'
                    rx='3'
                    fill='#1e40af'
                  />
                  <rect x='52' y='48' width='16' height='20' fill='#3b82f6' />
                  <circle cx='60' cy='71' r='1.5' fill='#1e40af' />
                  <defs>
                    <linearGradient
                      id='mobileGradient'
                      x1='0%'
                      y1='0%'
                      x2='100%'
                      y2='100%'
                    >
                      <stop offset='0%' stopColor='#3b82f6' />
                      <stop offset='100%' stopColor='#1e40af' />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h3 className='text-xl font-bold text-white mb-3'>
                Mobile Applications
              </h3>
              <p className='text-blue-100/80 text-sm leading-relaxed'>
                React Native apps for iOS and Android with seamless user
                experiences and native performance.
              </p>
            </div>

            {/* Web Application */}
            <div className='group flex flex-col items-center text-center hover:transform hover:scale-105 transition-all duration-300'>
              <div className='relative mb-6'>
                <svg
                  width='120'
                  height='120'
                  viewBox='0 0 120 120'
                  fill='none'
                  className='drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300'
                >
                  {/* Gear background */}
                  <path
                    d='M60 10L65.5 20.5L77 18L79.5 29.5L91 29L91 41L102.5 43.5L100 55L110.5 60L100 65L102.5 76.5L91 79L91 91L79.5 90.5L77 102L65.5 99.5L60 110L54.5 99.5L43 102L40.5 90.5L29 91L29 79L17.5 76.5L20 65L9.5 60L20 55L17.5 43.5L29 41L29 29L40.5 29.5L43 18L54.5 20.5L60 10Z'
                    fill='url(#webGradient)'
                    className='group-hover:rotate-12 transition-transform duration-500'
                  />
                  {/* Inner circle */}
                  <circle cx='60' cy='60' r='25' fill='rgba(255,255,255,0.9)' />
                  {/* WWW text */}
                  <text
                    x='60'
                    y='67'
                    textAnchor='middle'
                    className='text-md font-bold  '
                    fill='#ea580c'
                  >
                    WWW
                  </text>
                  <defs>
                    <linearGradient
                      id='webGradient'
                      x1='0%'
                      y1='0%'
                      x2='100%'
                      y2='100%'
                    >
                      <stop offset='0%' stopColor='#f97316' />
                      <stop offset='100%' stopColor='#ea580c' />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h3 className='text-xl font-bold text-white mb-3'>
                Web Applications
              </h3>
              <p className='text-blue-100/80 text-sm leading-relaxed'>
                Modern web apps with Next.js, React, and TypeScript for scalable
                and performant solutions.
              </p>
            </div>

            {/* DevOps */}
            <div className='group flex flex-col items-center text-center hover:transform hover:scale-105 transition-all duration-300'>
              <div className='relative mb-6'>
                <svg
                  width='120'
                  height='120'
                  viewBox='0 0 120 120'
                  fill='none'
                  className='drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300'
                >
                  {/* Gear background */}
                  <path
                    d='M60 10L65.5 20.5L77 18L79.5 29.5L91 29L91 41L102.5 43.5L100 55L110.5 60L100 65L102.5 76.5L91 79L91 91L79.5 90.5L77 102L65.5 99.5L60 110L54.5 99.5L43 102L40.5 90.5L29 91L29 79L17.5 76.5L20 65L9.5 60L20 55L17.5 43.5L29 41L29 29L40.5 29.5L43 18L54.5 20.5L60 10Z'
                    fill='url(#devopsGradient)'
                    className='group-hover:rotate-12 transition-transform duration-500'
                  />
                  {/* Inner circle */}
                  <circle cx='60' cy='60' r='25' fill='rgba(255,255,255,255)' />
                  {/* Cloud emoji */}
                  <text
                    x='60'
                    y='67'
                    textAnchor='middle'
                    className='text-2xl'
                    fill='#059669'
                  >
                    ☁️
                  </text>
                  <defs>
                    <linearGradient
                      id='devopsGradient'
                      x1='0%'
                      y1='0%'
                      x2='100%'
                      y2='100%'
                    >
                      <stop offset='0%' stopColor='#10b981' />
                      <stop offset='100%' stopColor='#059669' />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h3 className='text-xl font-bold text-white mb-3'>
                DevOps & Cloud
              </h3>
              <p className='text-blue-100/80 text-sm leading-relaxed'>
                Azure, GCP, and Vercel deployments with CI/CD pipelines and
                infrastructure automation.
              </p>
            </div>

            {/* AI/ML */}
            <div className='group flex flex-col items-center text-center hover:transform hover:scale-105 transition-all duration-300'>
              <div className='relative mb-6'>
                <svg
                  width='120'
                  height='120'
                  viewBox='0 0 120 120'
                  fill='none'
                  className='drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300'
                >
                  {/* Gear background */}
                  <path
                    d='M60 10L65.5 20.5L77 18L79.5 29.5L91 29L91 41L102.5 43.5L100 55L110.5 60L100 65L102.5 76.5L91 79L91 91L79.5 90.5L77 102L65.5 99.5L60 110L54.5 99.5L43 102L40.5 90.5L29 91L29 79L17.5 76.5L20 65L9.5 60L20 55L17.5 43.5L29 41L29 29L40.5 29.5L43 18L54.5 20.5L60 10Z'
                    fill='url(#aiGradient)'
                    className='group-hover:rotate-12 transition-transform duration-500'
                  />
                  {/* Inner circle */}
                  <circle cx='60' cy='60' r='25' fill='rgba(255,255,255,0.9)' />
                  {/* Brain emoji */}
                  <text
                    x='60'
                    y='67'
                    textAnchor='middle'
                    className='text-2xl'
                    fill='#7c3aed'
                  >
                    🧠
                  </text>
                  <defs>
                    <linearGradient
                      id='aiGradient'
                      x1='0%'
                      y1='0%'
                      x2='100%'
                      y2='100%'
                    >
                      <stop offset='0%' stopColor='#8b5cf6' />
                      <stop offset='100%' stopColor='#7c3aed' />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h3 className='text-xl font-bold text-white mb-3'>
                AI & Machine Learning
              </h3>
              <p className='text-blue-100/80 text-sm leading-relaxed'>
                OpenAI API integrations, LangChain workflows, and intelligent
                chatbot solutions.
              </p>
            </div>
          </div>

          {/* CTA buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <Button className='py-6 px-8 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25'>
              <Link href='/projects'>View Projects</Link>
            </Button>
            <Button className='py-6 px-8 border border-cyan-400/50 text-blue-500 font-semibold  hover:bg-cyan-400/10 transition-all duration-300 rounded-full bg-white'>
              <Link href='/contact'> Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
        <div className='w-6 h-10 border-2 border-cyan-400/50 rounded-full flex justify-center'>
          <div className='w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse'></div>
        </div>
      </div>
    </div>
  );
}

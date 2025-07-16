"use client";

import { motion } from "framer-motion";

export default function ScrollingText() {
  return (
    <div className='relative max-w-screen overflow-hidden bg-gray-50 py-16'>
      <div className='absolute inset-0 bg-gradient-to-r from-white via-transparent to-white z-10 pointer-events-none' />
      <div className='relative z-0 overflow-hidden'>
        <motion.div
          className='flex items-center'
          style={{
            whiteSpace: "nowrap",
            width: "200%", // Ensure we have enough width for seamless loop
          }}
          animate={{
            x: [0, "-50%"],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            duration: 20,
          }}
        >
          {[...Array(8)].map((_, index) => (
            <span
              key={index}
              className='text-7xl sm:text-8xl md:text-9xl font-bold text-transparent px-8 flex-shrink-0'
              style={{
                WebkitTextStroke: "1px rgb(156 163 175)",
              }}
            >
              Decole Tech • Smart. Scalable. Secure •
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

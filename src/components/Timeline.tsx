"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";

const timelineEvents = [
  {
    year: 2013,
    title: "Computer Graphics Foundation",
    description:
      "Started my journey in technology with computer graphics studies in Nigeria.",
    details:
      "Completed Associate of Science in Computer Graphics at Elect-Elect Computer School in Abia, Nigeria. This foundation sparked my passion for creating digital experiences and user interfaces.",
  },
  {
    year: 2018,
    title: "Professional Development Career Begins",
    description:
      "Transitioned into full-stack web development, joining B2B-CONCLAVE SOLUTION.",
    details:
      "Started as a Full-Stack Web Developer in Prague, building scalable applications using React.js, Next.js, and Firebase. Collaborated with cross-functional teams to deliver new features and optimize performance.",
  },
  {
    year: 2021,
    title: "Freelance Success & Specialization",
    description:
      "Launched independent consulting practice, focusing on hospitality and service industries.",
    details:
      "Successfully delivered projects for Sky Blue Lounge and Urban CZ Hotel & Suites. Specialized in responsive design, booking systems, SEO optimization, and admin control panels using modern tech stacks.",
  },
  {
    year: 2023,
    title: "Advanced Certifications & AI Integration",
    description:
      "Earned IBM Full Stack certification and expanded into AI/ML technologies.",
    details:
      "Completed IBM Full Stack Software Developer certification and freeCodeCamp Front End Development Libraries. Started integrating AI technologies including OpenAI API and LangChain into projects.",
  },
  {
    year: 2024,
    title: "42 Prague & Advanced Learning",
    description:
      "Joined prestigious 42 Prague coding school to enhance algorithmic thinking.",
    details:
      "Enrolled in 42 Prague's innovative peer-to-peer learning program, focusing on advanced programming concepts, algorithms, and collaborative problem-solving methodologies.",
  },
  {
    year: 2025,
    title: "SaaS Platform Launch - Quikshot",
    description:
      "Founded AI-powered SaaS platform for PDF interaction and lead generation.",
    details:
      "Launched Quikshot, an innovative platform combining AI chatbots, PDF interaction, and lead generation. Built with Next.js, Prisma ORM, PostgreSQL, and integrated LangChain for intelligent conversation flows.",
  },
];

// const CodeIcon = ({ progress }: { progress: number }) => (
//   <svg
//     viewBox='0 0 24 24'
//     fill='none'
//     xmlns='http://www.w3.org/2000/svg'
//     className='w-6 h-6'
//     style={{ transform: `scale(${progress})` }}
//   >
//     <path
//       d='M16 18L22 12L16 6M8 6L2 12L8 18'
//       stroke='currentColor'
//       strokeWidth='2'
//       strokeLinecap='round'
//       strokeLinejoin='round'
//     />
//   </svg>
// );

export default function AboutTimeline() {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section ref={containerRef} className='py-20 bg-gray-50 overflow-hidden'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          className='text-center mb-12'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            Our{" "}
            <span className='bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent'>
              Journey
            </span>
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Over 10 years of evolution from computer graphics to full-stack
            development and AI integration
          </p>
        </motion.div>

        <div className='relative'>
          {/* Vertical line */}
          <motion.div
            className='absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-cyan-500 to-blue-600'
            style={{ scaleY: scaleX }}
          />

          {/* Code icon */}

          {timelineEvents.map((event, index) => (
            <TimelineEvent
              key={event.year}
              event={event}
              index={index}
              isExpanded={expandedEvent === index}
              onToggle={() =>
                setExpandedEvent(expandedEvent === index ? null : index)
              }
            />
          ))}
        </div>

        {/* Bottom Stats */}
        {/* <motion.div
          className='mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div>
            <div className='text-3xl md:text-4xl font-bold text-cyan-600 mb-2'>
              10+
            </div>
            <div className='text-gray-600 font-medium'>Years Experience</div>
          </div>
          <div>
            <div className='text-3xl md:text-4xl font-bold text-blue-600 mb-2'>
              50+
            </div>
            <div className='text-gray-600 font-medium'>Projects Delivered</div>
          </div>
          <div>
            <div className='text-3xl md:text-4xl font-bold text-teal-600 mb-2'>
              15+
            </div>
            <div className='text-gray-600 font-medium'>
              Technologies Mastered
            </div>
          </div>
          <div>
            <div className='text-3xl md:text-4xl font-bold text-purple-600 mb-2'>
              3
            </div>
            <div className='text-gray-600 font-medium'>Countries Worked</div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}

function TimelineEvent({
  event,
  index,
  isExpanded,
  onToggle,
}: {
  event: (typeof timelineEvents)[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className={`mb-8 flex justify-between items-center w-full ${
        index % 2 === 0 ? "flex-row-reverse" : ""
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <div className='w-5/12' />
      <div className='z-20'>
        <div className='flex items-center justify-center w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-lg'>
          <div className='w-3 h-3 bg-white rounded-full' />
        </div>
      </div>
      <motion.div
        className='w-5/12 cursor-pointer'
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
      >
        <div className='p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300'>
          <span className='font-bold text-cyan-600 text-lg'>{event.year}</span>
          <h3 className='text-xl font-semibold mb-2 text-gray-900'>
            {event.title}
          </h3>
          <p className='text-gray-600 leading-relaxed'>{event.description}</p>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className='overflow-hidden'
          >
            <div className='mt-4 pt-4 border-t border-gray-200'>
              <p className='text-sm text-gray-700 leading-relaxed'>
                {event.details}
              </p>
            </div>
          </motion.div>
          <div className='mt-3 text-cyan-600 text-sm font-medium'>
            {isExpanded ? "Click to collapse" : "Click to expand"}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

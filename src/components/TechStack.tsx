"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const techStacks = [
  // Frontend
  {
    name: "React",
    category: "Frontend",
    color: "#61DAFB",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  },
  {
    name: "Next.js",
    category: "Frontend",
    color: "#000000",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg",
  },
  {
    name: "React Native",
    category: "Mobile",
    color: "#61DAFB",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  },
  {
    name: "TypeScript",
    category: "Language",
    color: "#3178C6",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
  },
  {
    name: "JavaScript",
    category: "Language",
    color: "#F7DF1E",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1024px-Unofficial_JavaScript_logo_2.svg.png",
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    color: "#06B6D4",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
  },
  {
    name: "HTML5",
    category: "Frontend",
    color: "#E34F26",
    image_url: "https://www.w3.org/html/logo/downloads/HTML5_Badge_512.png",
  },
  {
    name: "CSS3",
    category: "Styling",
    color: "#1572B6",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg",
  },

  // Backend
  {
    name: "Node.js",
    category: "Backend",
    color: "#339933",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
  },
  {
    name: "NestJS",
    category: "Backend",
    color: "#E0234E",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/NestJS.svg/2120px-NestJS.svg.png",
  },
  {
    name: "GraphQL",
    category: "API",
    color: "#E10098",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg",
  },
  {
    name: "REST API",
    category: "API",
    color: "#FF6B35",
    image_url:
      "https://www.iconpacks.net/icons/free-icons-6/free-rest-api-black-outline-logo-icon-22097-thumb.png",
  },

  // Databases
  {
    name: "PostgreSQL",
    category: "Database",
    color: "#336791",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg",
  },
  {
    name: "MySQL",
    category: "Database",
    color: "#4479A1",
    image_url: "https://www.mysql.com/common/logos/mysql-logo.svg",
  },
  {
    name: "Redis",
    category: "Database",
    color: "#DC382D",
    image_url: "https://www.jetbrains.com/guide/assets/thumbnail-0d651b12.png",
  },
  {
    name: "Firebase",
    category: "Database",
    color: "#FFCA28",
    image_url: "https://www.svgrepo.com/show/353735/firebase.svg",
  },
  {
    name: "Prisma",
    category: "ORM",
    color: "#2D3748",
    image_url: "https://www.svgrepo.com/show/354210/prisma.svg",
  },

  // Cloud & DevOps
  {
    name: "Google Cloud",
    category: "Cloud",
    color: "#4285F4",
    image_url:
      "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg",
  },
  {
    name: "Microsoft Azure",
    category: "Cloud",
    color: "#0078D4",
    image_url:
      "https://www.vectorlogo.zone/logos/microsoft_azure/microsoft_azure-icon.svg",
  },
  {
    name: "Vercel",
    category: "Deployment",
    color: "#000000",
    image_url: "https://www.vectorlogo.zone/logos/vercel/vercel-icon.svg",
  },
  {
    name: "Docker",
    category: "DevOps",
    color: "#2496ED",
    image_url:
      "https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png",
  },
  {
    name: "Kubernetes",
    category: "DevOps",
    color: "#326CE5",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg",
  },
  {
    name: "Jenkins",
    category: "CI/CD",
    color: "#D33833",
    image_url: "https://www.vectorlogo.zone/logos/jenkins/jenkins-icon.svg",
  },
  {
    name: "GitHub",
    category: "Version Control",
    color: "#181717",
    image_url: "https://www.vectorlogo.zone/logos/github/github-icon.svg",
  },
  {
    name: "Cloudflare",
    category: "CDN",
    color: "#F38020",
    image_url:
      "https://www.vectorlogo.zone/logos/cloudflare/cloudflare-icon.svg",
  },

  // Tools & Libraries
  {
    name: "Socket.io",
    category: "Real-time",
    color: "#010101",
    image_url: "https://www.vectorlogo.zone/logos/socketio/socketio-icon.svg",
  },
  {
    name: "Stripe",
    category: "Payment",
    color: "#635BFF",
    image_url: "https://www.vectorlogo.zone/logos/stripe/stripe-icon.svg",
  },
  {
    name: "OpenAI",
    category: "AI/ML",
    color: "#412991",
    image_url: "https://www.svgrepo.com/show/306500/openai.svg",
  },
  {
    name: "LangChain",
    category: "AI/ML",
    color: "#1C3C3C",
    image_url:
      "https://api.nuget.org/v3-flatcontainer/langchain.serve.openai/0.15.3-dev.14/icon",
  },
  {
    name: "Pinecone",
    category: "Vector DB",
    color: "#000000",
    image_url: "https://avatars.githubusercontent.com/u/54333248?s=200&v=4",
  },
  {
    name: "Clerk",
    category: "Auth",
    color: "#6C47FF",
    image_url: "https://clerk.com/v2/downloads/mark-mono.png",
  },
  {
    name: "NextAuth",
    category: "Auth",
    color: "#000000",
    image_url:
      "https://repository-images.githubusercontent.com/399963258/b1490f2b-d168-410a-8615-ec720aad9339",
  },
];

const duplicatedStacks = [...techStacks, ...techStacks];

export default function TechStackSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);

  return (
    <section className='py-20 bg-white overflow-hidden'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            Technology{" "}
            <span className='bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent'>
              Stack
            </span>
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Expertise across modern technologies, frameworks, and cloud
            platforms
          </p>
        </div>

        {/* Sliding Container */}
        <div className='relative overflow-hidden'>
          {/* Gradient overlays for smooth edges */}
          <div className='absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10'></div>
          <div className='absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10'></div>

          {/* Sliding track */}
          <motion.div
            ref={sliderRef}
            className='flex gap-8 py-8'
            animate={{
              x: [0, -(160 * techStacks.length)], // 160px = 128px card width + 32px gap
            }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: techStacks.length * 2, // Dynamic duration based on items
                ease: "linear",
              },
            }}
          >
            {duplicatedStacks.map((tech, index) => (
              <motion.div
                key={`${tech.name}-${index}`}
                className='flex-shrink-0 group'
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className='w-32 h-32 bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center justify-center p-4 group-hover:shadow-xl transition-all duration-300'>
                  {/* Tech Logo/Icon */}
                  {tech.image_url ? (
                    <Image
                      width={200}
                      height={300}
                      src={tech.image_url}
                      alt={tech.name + " logo"}
                      className='w-12 h-12 mb-3'
                    />
                  ) : (
                    <div
                      className='w-12 h-12 rounded-lg mb-3 flex items-center justify-center text-white font-bold text-lg'
                      style={{ backgroundColor: tech.color }}
                    >
                      {tech.name.charAt(0)}
                    </div>
                  )}

                  {/* Tech Name */}
                  <div className='text-center'>
                    <h3 className='font-semibold text-gray-900 text-sm mb-1'>
                      {tech.name}
                    </h3>
                    <span className='text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded-full'>
                      {tech.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Categories Overview */}
        <div className='mt-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4'>
          {[
            { name: "Frontend", count: 5, color: "bg-blue-100 text-blue-700" },
            { name: "Backend", count: 4, color: "bg-green-100 text-green-700" },
            {
              name: "Database",
              count: 5,
              color: "bg-purple-100 text-purple-700",
            },
            { name: "Cloud", count: 3, color: "bg-cyan-100 text-cyan-700" },
            {
              name: "DevOps",
              count: 4,
              color: "bg-orange-100 text-orange-700",
            },
            { name: "AI/ML", count: 3, color: "bg-pink-100 text-pink-700" },
            {
              name: "Mobile",
              count: 1,
              color: "bg-indigo-100 text-indigo-700",
            },
            { name: "Tools", count: 8, color: "bg-gray-100 text-gray-700" },
          ].map((category) => (
            <div key={category.name} className='text-center'>
              <div
                className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${category.color}`}
              >
                {category.name}
              </div>
              <div className='text-2xl font-bold text-gray-900 mt-2'>
                {category.count}+
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className='mt-16 text-center'>
          <p className='text-lg text-gray-600 mb-6'>
            Always learning and adapting to new technologies to deliver
            cutting-edge solutions
          </p>
          <div className='flex flex-wrap justify-center gap-4'>
            <div className='flex items-center text-gray-600'>
              <svg
                className='w-5 h-5 text-green-500 mr-2'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                  clipRule='evenodd'
                />
              </svg>
              7+ Years Experience
            </div>
            <div className='flex items-center text-gray-600'>
              <svg
                className='w-5 h-5 text-green-500 mr-2'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                  clipRule='evenodd'
                />
              </svg>
              Full-Stack Expertise
            </div>
            <div className='flex items-center text-gray-600'>
              <svg
                className='w-5 h-5 text-green-500 mr-2'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                  clipRule='evenodd'
                />
              </svg>
              Cloud & AI Ready
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

{
  /* <div className='w-32 h-32 bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center justify-center p-4 group-hover:shadow-xl transition-all duration-300'>
  {tech.image_url ? (
    <Image
      width={200}
      height={300}
      src={tech.image_url}
      alt={tech.name + " logo"}
      className='w-12 h-12 mb-3'
    />
  ) : (
    <div
      className='w-12 h-12 rounded-lg mb-3 flex items-center justify-center text-white font-bold text-lg'
      style={{ backgroundColor: tech.color }}
    >
      {tech.name.charAt(0)}
    </div>
  )}
</div>; */
}

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Danny",
    position: "Founder & CEO",
    company: "Urbancz Group",
    image: "/urbancz.png?height=80&width=80",
    content:
      "Partnering with this developer to build the Urban CZ Hotel & Suites website was an outstanding experience. From the booking system to the admin dashboard and authentication with Clerk, every feature was delivered with precision using Next.js and Firebase. Highly reliable and technically sharp.",
    rating: 5,
    project: "Urban CZ Hotel & Suites",
  },
  {
    id: 2,
    name: "Napoleon",
    position: "Founder & CEO",
    company: "SkyBlue Lounge",
    image: "/skybluelounge.png?height=80&width=80",

    content:
      "We needed a sleek, responsive web presence with a reliable reservation system for our lounge, and this developer delivered it with excellence. Their use of Next.js, Firebase, and Clerk streamlined both the user and admin experiences. Always communicative and results-driven.",
    rating: 5,
    project: "SkyBlue Lounge Website",
  },
  {
    id: 3,
    name: "Austine",
    position: "Founder & CTO",
    company: "N/A",
    image: "/quiksbot.png?height=80&width=80",
    content:
      "The AI chatbot solution transformed our customer service. The natural language processing capabilities and seamless integration with our existing systems saved us months of development time. Truly impressive technical expertise.",
    rating: 5,
    project: "AI Chatbot Assistant",
  },
];

export default function TestimonialsSection() {
  return (
    <section className='py-20 px-6 lg:px-8 bg-gray-100'>
      <div className='max-w-7xl mx-auto'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            Client{" "}
            <span className='bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent'>
              Testimonials
            </span>
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            What clients say about working with me and the solutions We&#39;ve
            delivered
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className='group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white hover:scale-105'
            >
              <CardContent className='p-8'>
                {/* Quote Icon */}
                <div className='mb-6'>
                  <svg
                    className='w-10 h-10 text-blue-500'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z' />
                  </svg>
                </div>

                {/* Testimonial Content */}
                <blockquote className='text-gray-700 leading-relaxed mb-6 text-lg'>
                  {testimonial.content}
                </blockquote>

                {/* Rating Stars */}
                <div className='flex items-center mb-6'>
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <svg
                      key={index}
                      className='w-5 h-5 text-yellow-400 fill-current'
                      viewBox='0 0 24 24'
                    >
                      <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                    </svg>
                  ))}
                </div>

                {/* Client Info */}
                <div className='flex items-center'>
                  <Image
                    height={100}
                    width={100}
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className='w-12 h-12 rounded-full object-cover mr-4 border-2 border-gray-200'
                  />
                  <div>
                    <div className='font-semibold text-gray-900 text-lg'>
                      {testimonial.name}
                    </div>
                    <div className='text-gray-600 text-sm'>
                      {testimonial.position} at {testimonial.company}
                    </div>
                    <div className='text-cyan-500 text-sm font-medium mt-1'>
                      Project: {testimonial.project}
                    </div>
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

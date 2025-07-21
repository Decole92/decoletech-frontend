import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectsSection from "@/components/Project";
import ScrollingText from "@/components/Runner";

import TechStackSlider from "@/components/TechStack";
import TestimonialsSection from "@/components/Testimonial";
import WhyUs from "@/components/WhyUs";

export default function Home() {
  return (
    <div className='min-h-screen font-[family-name:var(--font-geist-sans)]'>
      <Header />

      <main className='w-full '>
        <Hero />

        <section id='projects' className='snap-center'>
          <ProjectsSection />
        </section>

        <section id='stacks' className='snap-center'>
          <TechStackSlider />
        </section>

        {/* <section id='about' className='snap-center'>
          <AboutTimeline />
        </section> */}

        <section id='whyus' className='snap-center'>
          <WhyUs />
        </section>

        <section id='testimonial' className='snap-center'>
          <TestimonialsSection />
        </section>

        <ScrollingText />

        <section id='contact' className='snap-center'>
          <ContactForm />
        </section>

        <Footer />
      </main>
    </div>
  );
}

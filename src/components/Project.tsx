"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { useEffect, useState } from "react";
import { Project } from "../../typing";
import LoadingProjectCard from "../components/Loader/LoadingProjectCard";

export default function ProjectsSection() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/projects/getProjects");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const featured = Array.isArray(data)
          ? data.filter((project: Project) => project.featured)
          : [];

        setFeaturedProjects(featured);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch projects"
        );
        setFeaturedProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className='py-20 px-6 lg:px-8 bg-white'>
      <div className='max-w-7xl mx-auto'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            Featured{" "}
            <span className='bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent'>
              Projects
            </span>
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Showcasing innovative solutions built with modern technologies and
            best practices
          </p>
        </div>

        {/* Projects Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
          {loading ? (
            // Show loading skeleton cards
            Array.from({ length: 3 }).map((_, index) => (
              <LoadingProjectCard key={index} />
            ))
          ) : error ? (
            // Show error state
            <div className='col-span-full text-center py-12'>
              <div className='text-red-500 text-lg mb-4'>
                Error loading projects: {error}
              </div>
              <Button
                onClick={() => window.location.reload()}
                variant='outline'
              >
                Try Again
              </Button>
            </div>
          ) : featuredProjects.length === 0 ? (
            // Show empty state
            <div className='col-span-full text-center py-12'>
              <div className='text-gray-500 text-lg'>
                No featured projects found.
              </div>
            </div>
          ) : (
            // Show actual projects
            featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          )}
        </div>

        {/* Stats Section */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 py-12 border-t border-b border-gray-200'>
          <div className='text-center'>
            <div className='text-3xl md:text-4xl font-bold text-cyan-600 mb-2'>
              {featuredProjects?.length}
            </div>
            <div className='text-gray-600 font-medium'>Projects Completed</div>
          </div>
          <div className='text-center'>
            <div className='text-3xl md:text-4xl font-bold text-blue-600 mb-2'>
              10+
            </div>
            <div className='text-gray-600 font-medium'>Years Experience</div>
          </div>
          <div className='text-center'>
            <div className='text-3xl md:text-4xl font-bold text-teal-600 mb-2'>
              5+
            </div>
            <div className='text-gray-600 font-medium'>Happy Clients</div>
          </div>
          <div className='text-center'>
            <div className='text-3xl md:text-4xl font-bold text-purple-600 mb-2'>
              100%
            </div>
            <div className='text-gray-600 font-medium'>Success Rate</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className='text-center'>
          <p className='text-lg text-gray-600 mb-8'>
            Want to see more of my work? Check out my complete portfolio with
            detailed case studies.
          </p>
          <Link href='/projects'>
            <Button
              size='lg'
              className='tracking-wide py-6 px-8 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-full hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105'
            >
              View All Projects
              <svg
                className='ml-2 w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 8l4 4m0 0l-4 4m4-4H3'
                />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

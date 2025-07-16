"use client";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { ArrowRight, Filter, Loader2 } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard"; // Import the improved ProjectCard
import { toast } from "sonner";
import SubHeader from "@/components/SubHeader";
import Footer from "@/components/Footer";
import LoadingProjectCard from "@/components/Loader/LoadingProjectCard";
import { Project } from "../../../typing";
import { getServices } from "@/app/[locale]/actions/services";

interface Category {
  id: string;
  title: string;
  description?: string;
}

export default function ProjectClient({ project }: { project: Project[] }) {
  // const projects = Array.isArray(project) ? project : [];
  const [activeFilter, setActiveFilter] = useState("all");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  const projects = useMemo(() => {
    return Array.isArray(project) ? project : [];
  }, [project]);

  useEffect(() => {
    if (projects) {
      setLoadingProjects(false);
    }
  }, [projects]);

  // // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getServices();
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error(`Failed to load categories ${error}`);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts: { [key: string]: number } = { all: projects?.length };
    categories.forEach((category) => {
      counts[category.id] = projects?.filter((project) => {
        try {
          const projectCategories = Array.isArray(project.category)
            ? project.category
            : JSON.parse(project.category);
          return projectCategories.includes(category.id);
        } catch {
          return false;
        }
      }).length;
    });
    return counts;
  }, [projects, categories]);

  // // Filter projects
  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;

    return projects?.filter((project) => {
      try {
        const projectCategories = Array.isArray(project.category)
          ? project.category
          : JSON.parse(project.category);
        return projectCategories.includes(activeFilter);
      } catch {
        return false;
      }
    });
  }, [projects, activeFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects?.length / projectsPerPage);
  const paginatedProjects = filteredProjects?.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />
      <section className='relative pt-24 pb-8'>
        <div className='container mx-auto px-6'>
          <SubHeader
            title='PROJECTS'
            headline=' Showcasing innovative solutions and cutting-edge technologies.'
          />

          {/* Stats */}
          <div className='flex items-center space-x-8'>
            <div className='text-center'>
              <div className='text-2xl font-semibold text-gray-900'>
                {projects?.length}+
              </div>
              <div className='text-sm text-gray-600'>PROJECTS</div>
            </div>
            <div className='w-px h-8 bg-gray-300'></div>
            <div className='text-center'>
              <div className='text-2xl font-semibold text-gray-900'>10+</div>
              <div className='text-sm text-gray-600'>YEARS</div>
            </div>
            <div className='w-px h-8 bg-gray-300'></div>
            <div className='text-center'>
              <div className='text-2xl font-semibold text-gray-900'>100%</div>
              <div className='text-sm text-gray-600'>DELIVERED</div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </section>

      <section className='py-8 border-b border-gray-200'>
        <div className='container mx-auto px-6'>
          {loadingCategories ? (
            <div className='flex justify-center'>
              <Loader2 className='h-6 w-6 animate-spin text-gray-400' />
            </div>
          ) : (
            <div className='flex flex-wrap justify-center gap-4'>
              {[{ id: "all", title: "All Projects" }, ...categories].map(
                (category) => (
                  <Button
                    key={category.id}
                    variant={
                      activeFilter === category.id ? "default" : "outline"
                    }
                    onClick={() => setActiveFilter(category.id)}
                    className={`flex items-center space-x-2 ${
                      activeFilter === category.id
                        ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                    aria-label={`Filter by ${category.title}`}
                  >
                    <Filter className='w-4 h-4' />
                    <span>{category.title}</span>
                    <Badge variant='secondary' className='ml-1'>
                      {categoryCounts[category.id] || 0}
                    </Badge>
                  </Button>
                )
              )}
            </div>
          )}
        </div>
      </section>

      {/* Projects Grid */}
      <section className='py-16'>
        <div className='container mx-auto px-6'>
          {loadingProjects ? (
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5'>
              {Array.from({ length: 3 }).map((_, index) => (
                <LoadingProjectCard key={index} />
              ))}
            </div>
          ) : filteredProjects?.length === 0 ? (
            <div className='text-center text-gray-600'>
              No projects found for this category.
            </div>
          ) : (
            <>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {paginatedProjects?.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className='mt-12 flex justify-center items-center gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className='border-gray-300 text-gray-700 hover:bg-gray-50'
                    aria-label='Previous page'
                  >
                    Previous
                  </Button>
                  {[...Array(totalPages)].map((_, index) => (
                    <Button
                      key={index + 1}
                      variant={
                        currentPage === index + 1 ? "default" : "outline"
                      }
                      size='sm'
                      onClick={() => handlePageChange(index + 1)}
                      className={
                        currentPage === index + 1
                          ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700"
                          : "border-gray-300 text-gray-700 hover:bg-gray-50"
                      }
                      aria-label={`Page ${index + 1}`}
                    >
                      {index + 1}
                    </Button>
                  ))}
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className='border-gray-300 text-gray-700 hover:bg-gray-50'
                    aria-label='Next page'
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 bg-gray-100'>
        <div className='container mx-auto px-6 text-center'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            Ready to Build Something Amazing?
          </h2>
          <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'>
            Let&#39;s collaborate on your next project and bring your vision to
            life.
          </p>
          <Button
            className='py-6 px-8 bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700 font-semibold rounded-full transition-all duration-300 shadow-lg'
            asChild
          >
            <Link href='/contact' aria-label='Start your project'>
              Start Your Project
              <ArrowRight className='w-5 h-5 ml-2' />
            </Link>
          </Button>
        </div>
      </section>
      <Footer />
    </div>
  );
}

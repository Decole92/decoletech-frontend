"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Clock,
  DollarSign,
  ExternalLink,
  Github,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SubHeader from "../SubHeader";
import Header from "../Header";
import Footer from "../Footer";
import { Services } from "../../../typing";
import { getProjects } from "@/app/[locale]/actions/projects";

interface Project {
  id: string;
  title: string;
  icon_src: string;
  bgcover_src: string;
  description: string;
  architecture: string;
  category: string[];
  createdAt: string;
  fullDescription: string;
  featured: boolean;
  githubUrl: string;
  liveUrl: string;
  stacks: string[];
  status: string;
}

interface ServiceClientProps {
  service: Services;
}

export default function ServiceClient({ service }: ServiceClientProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        const filteredProjects = data.filter((project: Project) =>
          project.category.includes(service.id)
        );
        setProjects(filteredProjects);
      } catch (err) {
        setError("Error fetching projects");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [service.id]);

  const includedFeatures =
    service.full_description
      .split("\n\n")
      .find((section) => section.startsWith("What's Included:"))
      ?.replace("What's Included:\n\n", "")
      .split("\n")
      .filter((item) => item.trim()) || [];

  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />
      <div className='container mx-auto px-4 py-12 max-w-7xl mt-12'>
        <SubHeader title={service.title} headline={service.description} />
        <div className='grid lg:grid-cols-3 gap-8 mt-12'>
          <div className='lg:col-span-2 space-y-6'>
            <Card className='border-none shadow-sm bg-white'>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <CardTitle className='text-xl font-semibold text-gray-900'>
                    Service Overview
                  </CardTitle>
                  <Badge className='bg-blue-500 text-white'>
                    {service.category.replace("_", " ")}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className='text-gray-600 leading-relaxed'>
                  {service.full_description
                    .split("\n\n")
                    .map((paragraph, index) => (
                      <p key={index} className='mb-4'>
                        {paragraph}
                      </p>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card className='border-none shadow-sm bg-white'>
              <CardHeader>
                <CardTitle className='text-xl font-semibold text-gray-900'>
                  What&#39;s Included
                </CardTitle>
                <CardDescription className='text-gray-500'>
                  Comprehensive web application features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid md:grid-cols-2 gap-3'>
                  {includedFeatures.map((feature, index) => (
                    <div key={index} className='flex items-center space-x-2'>
                      <CheckCircle className='h-4 w-4 text-blue-500' />
                      <span className='text-gray-600'>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className='border-none shadow-sm bg-white'>
              <CardHeader>
                <CardTitle className='text-xl font-semibold text-gray-900'>
                  Case Studies
                </CardTitle>
                <CardDescription className='text-gray-500'>
                  Explore similar projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p>Loading projects...</p>
                ) : error ? (
                  <p className='text-red-500'>{error}</p>
                ) : projects.length === 0 ? (
                  <p>No related projects found.</p>
                ) : (
                  <div className='space-y-6'>
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className='group rounded-lg border border-gray-100 bg-white p-4 hover:shadow-md transition-shadow'
                      >
                        <div className='md:flex gap-4'>
                          <div className='md:w-1/3 relative h-40 rounded-md overflow-hidden'>
                            <Image
                              src={
                                project.bgcover_src ||
                                "/placeholder.svg?height=200&width=300"
                              }
                              alt={project.title}
                              fill
                              className='object-cover group-hover:scale-102 transition-transform duration-300'
                            />
                          </div>
                          <div className='md:w-2/3 pt-4 md:pt-0'>
                            <div className='flex items-center justify-between mb-2'>
                              <h3 className='text-lg font-semibold text-gray-900 group-hover:text-blue-500'>
                                {project.title}
                              </h3>
                              <div className='flex items-center space-x-2'>
                                {project.featured && (
                                  <Badge className='bg-blue-500 text-white'>
                                    <Star className='h-3 w-3 mr-1' />
                                    Featured
                                  </Badge>
                                )}
                                <Badge
                                  variant='outline'
                                  className='text-green-500 border-green-500'
                                >
                                  {project.status}
                                </Badge>
                              </div>
                            </div>
                            <p className='text-gray-600 text-sm mb-3'>
                              {project.description}
                            </p>
                            <div className='flex items-center space-x-3'>
                              <Link
                                href={project.liveUrl}
                                target='_blank'
                                className='text-blue-500 hover:text-blue-600 text-sm font-medium'
                              >
                                <ExternalLink className='h-4 w-4 mr-1 inline' />
                                Live Demo
                              </Link>
                              <Link
                                href={project.githubUrl}
                                target='_blank'
                                className='text-gray-500 hover:text-gray-600 text-sm font-medium'
                              >
                                <Github className='h-4 w-4 mr-1 inline' />
                                Source Code
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className='space-y-6'>
            <Card className='border-none shadow-sm bg-white sticky top-8'>
              <CardHeader className='text-center'>
                <CardTitle className='text-2xl font-semibold text-gray-900'>
                  ${service.price_per_hour}
                </CardTitle>
                <CardDescription className='text-gray-500'>
                  per hour
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center space-x-2 text-gray-600'>
                  <Clock className='h-4 w-4 text-blue-500' />
                  <span>Flexible hourly rates</span>
                </div>
                <div className='flex items-center space-x-2 text-gray-600'>
                  <DollarSign className='h-4 w-4 text-blue-500' />
                  <span>Project-based pricing available</span>
                </div>
                <Separator className='my-3' />
                <Button className='w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium py-2 rounded-md hover:from-cyan-600 hover:to-blue-700 transition-all duration-300'>
                  Get Started
                </Button>
                <Button
                  variant='outline'
                  className='w-full border-cyan-500 text-cyan-500 hover:bg-cyan-50'
                >
                  Request Quote
                </Button>
              </CardContent>
            </Card>

            <Card className='border-none shadow-sm bg-white'>
              <CardHeader>
                <CardTitle className='text-lg font-semibold text-gray-900'>
                  Service Stats
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='flex justify-between items-center text-sm'>
                  <span className='text-gray-600'>Service Category</span>
                  <Badge className='bg-blue-500 text-white'>
                    {service?.category}
                  </Badge>
                </div>
                <div className='flex justify-between items-center text-sm'>
                  <span className='text-gray-600'>Last Updated</span>
                  <span className='text-gray-500'>
                    {new Date(service.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

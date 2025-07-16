"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  BuildingIcon as Architecture,
  Layers,
  Share2,
  Heart,
  Eye,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { Separator } from "../ui/separator";
import { Project } from "../../../typing";

interface ProjectDetailClientProps {
  project: Project;
}

interface Category {
  id: string;
  title: string;
}

const statusColors = {
  LIVE: "bg-green-100 text-green-800 border-green-200",
  COMPLETED: "bg-blue-100 text-blue-800 border-blue-200",
  DEVELOPMENT: "bg-yellow-100 text-yellow-800 border-yellow-200",
  HOLD: "bg-orange-100 text-orange-800 border-orange-200",
  CANCELLED: "bg-red-100 text-red-800 border-red-200",
};

const architectureIcons = {
  MONOLITHIC: Layers,
  MICROSERVICES: Architecture,
};

export default function ProjectClientId({ project }: ProjectDetailClientProps) {
  const router = useRouter();
  const [imageLoading, setImageLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [technologies, setTechnologies] = useState<string[]>([]);

  // Parse technologies from stacks
  useEffect(() => {
    try {
      const parsedTechnologies =
        typeof project.stacks === "string"
          ? JSON.parse(project.stacks)
          : project.stacks || [];
      setTechnologies(parsedTechnologies);
    } catch (error) {
      console.error("Error parsing stacks:", error);
      setTechnologies([]);
    }
  }, [project.stacks]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/services/getServices");
        if (response.ok) {
          const fetchedCategories = await response.json();
          const projectCategories = fetchedCategories.filter(
            (category: Category) => project.category.includes(category.id)
          );
          setCategories(projectCategories);
        } else {
          toast.error("Failed to load categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [project.category]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    toast.success(liked ? "Removed from favorites" : "Added to favorites");
  };

  const ArchitectureIcon =
    architectureIcons[project.architecture as keyof typeof architectureIcons] ||
    Layers;

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      {/* <Header /> */}
      <div className='bg-white border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex items-center justify-between'>
            <Button
              variant='ghost'
              onClick={() => router.back()}
              className='flex items-center gap-2'
            >
              <ArrowLeft className='h-4 w-4' />
              Back to Projects
            </Button>

            <div className='flex items-center gap-2'>
              <Button variant='outline' size='sm' onClick={handleLike}>
                <Heart
                  className={`h-4 w-4 ${
                    liked ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </Button>
              <Button variant='outline' size='sm' onClick={handleShare}>
                <Share2 className='h-4 w-4' />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Hero Section */}
            <Card>
              <CardContent className='p-0'>
                {project.bgcover_src && (
                  <div className='relative aspect-video w-full overflow-hidden rounded-t-lg'>
                    <Image
                      src={project.bgcover_src || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className={`object-cover transition-opacity duration-300 ${
                        imageLoading ? "opacity-0" : "opacity-100"
                      }`}
                      onLoad={() => setImageLoading(false)}
                    />
                    {imageLoading && (
                      <div className='absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center'>
                        <Eye className='h-8 w-8 text-gray-400' />
                      </div>
                    )}
                    {project.featured && (
                      <div className='absolute top-4 right-4'>
                        <Badge className='bg-gradient-to-r from-cyan-600 to-blue-600'>
                          Featured
                        </Badge>
                      </div>
                    )}
                  </div>
                )}

                <div className='p-6'>
                  <div className='flex items-start justify-between mb-4'>
                    <div>
                      <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                        {project.title}
                      </h1>
                      <p className='text-lg text-gray-600'>
                        {project.description}
                      </p>
                    </div>

                    <Badge
                      className={`${
                        statusColors[
                          project.status as keyof typeof statusColors
                        ]
                      } border`}
                    >
                      {project.status}
                    </Badge>
                  </div>

                  {/* Action Buttons */}
                  <div className='flex flex-wrap gap-3'>
                    {project.liveUrl && (
                      <Button
                        asChild
                        className='bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700'
                      >
                        <Link
                          href={project.liveUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <ExternalLink className='h-4 w-4 mr-2' />
                          View Live Demo
                        </Link>
                      </Button>
                    )}

                    {project.githubUrl && (
                      <Button variant='outline' asChild>
                        <Link
                          href={project.githubUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <Github className='h-4 w-4 mr-2' />
                          View Source
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Full Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Project</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='prose max-w-none'>
                  <p className='text-gray-700 leading-relaxed whitespace-pre-wrap'>
                    {project.fullDescription}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Technologies */}
            <Card>
              <CardHeader>
                <CardTitle>Technologies Used</CardTitle>
                <CardDescription>
                  Tech stack and tools used in this project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex flex-wrap gap-2'>
                  {technologies.map((tech) => (
                    <Badge key={tech} variant='secondary' className='px-3 py-1'>
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Project Info */}
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center gap-3'>
                  <ArchitectureIcon className='h-5 w-5 text-gray-500' />
                  <div>
                    <p className='text-sm font-medium text-gray-900'>
                      Architecture
                    </p>
                    <p className='text-sm text-gray-600'>
                      {project.architecture}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className='flex items-center gap-3'>
                  <Calendar className='h-5 w-5 text-gray-500' />
                  <div>
                    <p className='text-sm font-medium text-gray-900'>Created</p>
                    <p className='text-sm text-gray-600'>
                      {new Date(project.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className='flex items-center gap-3'>
                  <Calendar className='h-5 w-5 text-gray-500' />
                  <div>
                    <p className='text-sm font-medium text-gray-900'>
                      Last Updated
                    </p>
                    <p className='text-sm text-gray-600'>
                      {new Date(project.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingCategories ? (
                  <div className='flex items-center gap-2'>
                    <Loader2 className='h-4 w-4 animate-spin' />
                    <span className='text-sm text-gray-500'>
                      Loading categories...
                    </span>
                  </div>
                ) : (
                  <div className='space-y-2'>
                    {categories.map((category) => (
                      <Badge
                        key={category.id}
                        variant='outline'
                        className='w-full justify-start'
                      >
                        {category.title}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <Button
                  variant='outline'
                  className='w-full justify-start bg-transparent'
                  asChild
                >
                  <Link href='/projects'>
                    <ArrowLeft className='h-4 w-4 mr-2' />
                    All Projects
                  </Link>
                </Button>

                <Button
                  variant='outline'
                  className='w-full justify-start bg-transparent'
                  asChild
                >
                  <Link href='/contact'>
                    <ExternalLink className='h-4 w-4 mr-2' />
                    Discuss Project
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import type React from "react";
// import { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import Link from "next/link";
// import { ExternalLink } from "lucide-react";
// import type { Project } from "../../typing";
// import { toast } from "sonner";

// interface Category {
//   id: string;
//   title: string;
//   description?: string;
// }

// function ProjectCard({ project }: { project: Project }) {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loadingCategories, setLoadingCategories] = useState(true);

//   // Fetch categories from API
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch("/api/services/getServices");
//         if (response.ok) {
//           const data = await response.json();
//           setCategories(data);
//         } else {
//           toast.error("Failed to load categories");
//         }
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//         toast.error("Failed to load categories");
//       } finally {
//         setLoadingCategories(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const getTechnologies = (stacks: string): string[] => {
//     try {
//       if (!stacks) return [];
//       const cleanedStacks = stacks.replace(/^"|"$/g, "").replace(/\\"/g, '"');
//       const parsed = JSON.parse(cleanedStacks);
//       return Array.isArray(parsed) ? parsed : [];
//     } catch (error) {
//       return [];
//     }
//   };

//   const getCategories = (category: string): string[] => {
//     try {
//       if (!category) return [];
//       const cleanedCategory = category
//         .replace(/^"|"$/g, "")
//         .replace(/\\"/g, '"');
//       const parsed = JSON.parse(cleanedCategory);
//       if (!Array.isArray(parsed)) return [];

//       // Map category IDs to their titles
//       return parsed
//         .map((id: string) => {
//           const category = categories.find((cat) => cat.id === id);
//           return category ? category.title : id; // Fallback to ID if category not found
//         })
//         .filter((title: string) => title); // Remove any undefined/null entries
//     } catch (error) {
//       console.error("Error parsing categories:", error);
//       return [];
//     }
//   };

//   const technologies = getTechnologies(project.stacks);
//   const categoryTitles = getCategories(project?.category as any);

//   const handleExternalLinkClick = (e: React.MouseEvent) => {
//     e.stopPropagation(); // Prevent card click when clicking external link
//     e.preventDefault();
//     if (project.liveUrl) {
//       window.open(project.liveUrl, "_blank", "noopener,noreferrer");
//     }
//   };

//   return (
//     <Link href={`/projects/${project.id}`} className='block'>
//       <Card className='group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:scale-105 cursor-pointer'>
//         <div className='relative overflow-hidden rounded-t-lg'>
//           <Image
//             src={
//               project?.bgcover_src || "/placeholder.svg?height=200&width=300"
//             }
//             alt={project.title}
//             height={200}
//             width={300}
//             className='w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300'
//           />

//           {/* Status Badge */}
//           <div className='absolute top-4 right-4'>
//             <Badge
//               variant={project.status === "LIVE" ? "default" : "secondary"}
//               className={
//                 project.status === "LIVE"
//                   ? "bg-green-500 hover:bg-green-600"
//                   : ""
//               }
//             >
//               {project.status.toLowerCase()}
//             </Badge>
//           </div>

//           {/* Categories Badge */}
//           <div className='absolute top-4 left-4'>
//             {loadingCategories ? (
//               <Badge variant='outline' className='bg-white/90 text-gray-700'>
//                 Loading...
//               </Badge>
//             ) : categoryTitles.length > 0 ? (
//               <Badge variant='outline' className='bg-white/90 text-gray-700'>
//                 {categoryTitles.length === 1
//                   ? categoryTitles[0]
//                   : `${categoryTitles.length} categories`}
//               </Badge>
//             ) : null}
//           </div>

//           {/* External Link Button */}
//           {project.liveUrl && (
//             <div className='absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
//               <Button
//                 size='sm'
//                 variant='secondary'
//                 className='bg-white/90 hover:bg-white text-gray-700 shadow-lg'
//                 onClick={handleExternalLinkClick}
//               >
//                 <ExternalLink className='w-4 h-4' />
//               </Button>
//             </div>
//           )}
//         </div>

//         <CardHeader className='pb-3'>
//           <CardTitle className='text-xl font-bold text-gray-900 group-hover:text-cyan-600 transition-colors'>
//             {project.title}
//           </CardTitle>
//           <CardDescription className='text-gray-600 leading-relaxed'>
//             {project.description}
//           </CardDescription>
//         </CardHeader>

//         <CardContent className='pt-0'>
//           {/* Categories */}
//           {categoryTitles.length > 0 && (
//             <div className='flex flex-wrap gap-1 mb-3'>
//               {categoryTitles.slice(0, 2).map((cat, index) => (
//                 <Badge
//                   key={index}
//                   variant='outline'
//                   className='text-xs text-blue-600 border-blue-200'
//                 >
//                   {cat}
//                 </Badge>
//               ))}
//               {categoryTitles.length > 2 && (
//                 <Badge
//                   variant='outline'
//                   className='text-xs text-blue-600 border-blue-200'
//                 >
//                   +{categoryTitles.length - 2}
//                 </Badge>
//               )}
//             </div>
//           )}

//           {/* Technologies */}
//           <div className='flex flex-wrap gap-1'>
//             {technologies?.slice(0, 4)?.map((tech, index) => (
//               <Badge key={index} variant='secondary' className='text-xs'>
//                 {tech}
//               </Badge>
//             ))}
//             {technologies?.length > 3 && (
//               <Badge variant='secondary' className='text-xs'>
//                 +{technologies.length - 3}
//               </Badge>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </Link>
//   );
// }

// export default ProjectCard;
"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Project } from "../../typing";
import { toast } from "sonner";

interface Category {
  id: string;
  title: string;
  description?: string;
}

const statusStyles = {
  LIVE: "bg-green-500 hover:bg-green-600 text-white",
  DEVELOPMENT: "bg-yellow-500 hover:bg-yellow-600 text-white",
  COMPLETED: "bg-blue-500 hover:bg-blue-600 text-white",
  HOLD: "bg-orange-500 hover:bg-orange-600 text-white",
  CANCELLED: "bg-red-500 hover:bg-red-600 text-white",
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Fetch categories with retry mechanism
  useEffect(() => {
    const fetchCategories = async (retries = 3, delay = 1000) => {
      try {
        const response = await fetch("/api/services/getServices");
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          throw new Error("Failed to load categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        if (retries > 0) {
          setTimeout(() => fetchCategories(retries - 1, delay * 2), delay);
        } else {
          toast.error("Failed to load categories after retries");
        }
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Memoize technologies parsing
  const technologies = useMemo(() => {
    try {
      if (!project.stacks) return [];
      const cleanedStacks = project.stacks
        .replace(/^"|"$/g, "")
        .replace(/\\"/g, '"');
      const parsed = JSON.parse(cleanedStacks);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Error parsing stacks:", error);
      return [];
    }
  }, [project.stacks]);

  // Memoize categories parsing
  const categoryTitles = useMemo(() => {
    try {
      if (!project.category) return [];
      const parsed = Array.isArray(project.category)
        ? project.category
        : JSON.parse(project.category);
      return parsed
        .map((id: string) => {
          const category = categories.find((cat) => cat.id === id);
          return category ? category.title : null;
        })
        .filter((title: string | null) => title) as string[];
    } catch (error) {
      console.error("Error parsing categories:", error);
      return [];
    }
  }, [project.category, categories]);

  const handleExternalLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (project.liveUrl) {
      window.open(project.liveUrl, "_blank", "noopener,noreferrer");
    }
  };

  // Truncate description to prevent overflow
  const truncatedDescription =
    project.description.length > 100
      ? `${project.description.slice(0, 100)}...`
      : project.description;

  return (
    <Link
      href={`/projects/${project.id}`}
      className='block'
      aria-label={`View details for ${project.title}`}
    >
      <Card className='group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] bg-white'>
        {/* Image Section */}
        <div className='relative h-48 overflow-hidden'>
          <Image
            src={project.bgcover_src || "/placeholder.svg?height=200&width=300"}
            alt={project.title}
            height={200}
            width={300}
            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
            loading='lazy'
            placeholder='blur'
            blurDataURL='/placeholder.svg?height=200&width=300'
          />
          {/* Gradient Overlay for Readability */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />

          {/* Status Badge */}
          <div className='absolute top-4 right-4'>
            <Badge
              className={`${
                statusStyles[project.status as keyof typeof statusStyles] ||
                "bg-gray-500"
              } capitalize`}
            >
              {project.status.toLowerCase()}
            </Badge>
          </div>

          {/* Featured Badge */}
          {project.architecture && (
            <div className='absolute top-4 left-4'>
              <Badge className='bg-gradient-to-r from-cyan-600 to-blue-600 text-white'>
                {project?.architecture}
              </Badge>
            </div>
          )}

          {/* Categories Badge */}
          <div className='absolute bottom-4 left-4'>
            {loadingCategories ? (
              <Badge
                variant='outline'
                className='bg-white/80 text-gray-700 animate-pulse'
              >
                Loading...
              </Badge>
            ) : categoryTitles.length > 0 ? (
              <Badge variant='outline' className='bg-white/80 text-gray-700'>
                {categoryTitles.length === 1
                  ? categoryTitles[0]
                  : `${categoryTitles.length} categories`}
              </Badge>
            ) : (
              <Badge variant='outline' className='bg-white/80 text-gray-700'>
                No categories
              </Badge>
            )}
          </div>

          {/* // External Link Button */}
          {project.liveUrl && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className='absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <Button
                      size='sm'
                      variant='secondary'
                      className='bg-white/90 hover:bg-white text-gray-700 shadow-lg'
                      onClick={handleExternalLinkClick}
                      aria-label={`Visit live demo of ${project.title}`}
                    >
                      <ExternalLink className='w-4 h-4' />
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent>Visit Live Demo</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        <CardHeader className='pb-3'>
          <CardTitle className='text-xl font-bold text-gray-900 group-hover:text-cyan-600 transition-colors'>
            {project.title}
          </CardTitle>
          <CardDescription className='text-gray-600 leading-relaxed'>
            {truncatedDescription}
          </CardDescription>
        </CardHeader>

        <CardContent className='pt-0'>
          {/* Categories */}
          {categoryTitles.length > 0 && (
            <div className='flex flex-wrap gap-1 mb-3'>
              {categoryTitles.slice(0, 2).map((cat, index) => (
                <Badge
                  key={index}
                  variant='outline'
                  className='text-xs text-blue-600 border-blue-200'
                >
                  {cat}
                </Badge>
              ))}
              {categoryTitles.length > 2 && (
                <Badge
                  variant='outline'
                  className='text-xs text-blue-600 border-blue-200'
                >
                  +{categoryTitles.length - 2}
                </Badge>
              )}
            </div>
          )}

          {/* Technologies */}
          {technologies.length > 0 && (
            <div className='flex flex-wrap gap-1'>
              {technologies.slice(0, 4).map((tech, index) => (
                <Badge key={index} variant='secondary' className='text-xs'>
                  {tech}
                </Badge>
              ))}
              {technologies.length > 4 && (
                <Badge variant='secondary' className='text-xs'>
                  +{technologies.length - 4}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default React.memo(ProjectCard);

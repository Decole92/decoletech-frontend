"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Project } from "../../../typing";

import { getProjects } from "@/app/[locale]/actions/projects";
import AdminProjectsLoading from "../AdminProjectClient";
import Image from "next/image";

export enum Status {
  LIVE = "LIVE",
  DEVELOPMENT = "DEVELOPMENT",
  COMPLETED = "COMPLETED",
  HOLD = "HOLD",
  CANCELLED = "CANCELLED",
}

export default function AdminProjectsClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProject = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getProjects();
      setProjects(Array.isArray(data) ? data : []);

      return data;
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch projects");
      setProjects([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteProject = async (id: string) => {
    if (
      confirm(
        "Are you sure you want to delete this Project? This action cannot be undone."
      )
    ) {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch Project");
      }
      fetchProject();
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || project?.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const parseStacks = (stacksString: string): string[] => {
    try {
      // Remove extra quotes and parse the JSON
      const cleanedString = stacksString
        .replace(/^"|"$/g, "")
        .replace(/\\"/g, '"');
      return JSON.parse(cleanedString);
    } catch (error) {
      console.error("Error parsing stacks:", error);
      return [];
    }
  };

  const getStatusBadgeVariant = (status: Status) => {
    switch (status) {
      case Status.LIVE:
        return "default";
      case Status.DEVELOPMENT:
        return "secondary";
      case Status.COMPLETED:
        return "outline";
      case Status.HOLD:
        return "secondary";
      case Status.CANCELLED:
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusBadgeClassName = (status: Status) => {
    switch (status) {
      case Status.LIVE:
        return "bg-green-500 hover:bg-green-600 text-white";
      case Status.DEVELOPMENT:
        return "bg-blue-500 hover:bg-blue-600 text-white";
      case Status.COMPLETED:
        return "bg-gray-500 hover:bg-gray-600 text-white";
      case Status.HOLD:
        return "bg-yellow-500 hover:bg-yellow-600 text-white";
      case Status.CANCELLED:
        return "bg-red-500 hover:bg-red-600 text-white";
      default:
        return "";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return <AdminProjectsLoading />;
  }

  if (error) {
    return (
      <div className='space-y-6'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>Projects</h1>
            <p className='text-gray-600'>
              Manage your portfolio projects and showcase your work
            </p>
          </div>
          <Button
            asChild
            className='bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700'
          >
            <Link href='/admin/projects/new'>
              <svg
                className='w-4 h-4 mr-2'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 4v16m8-8H4'
                />
              </svg>
              Add New Project
            </Link>
          </Button>
        </div>
        <Card>
          <CardContent className='p-6'>
            <div className='text-center'>
              <div className='text-red-500 mb-4'>
                <svg
                  className='w-12 h-12 mx-auto'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
                  />
                </svg>
              </div>
              <h3 className='text-lg font-medium text-gray-900 mb-2'>
                Error Loading Projects
              </h3>
              <p className='text-gray-600 mb-4'>{error}</p>
              <Button
                onClick={() => window.location.reload()}
                variant='outline'
              >
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>Projects</h1>
          <p className='text-gray-600'>
            Manage your portfolio projects and showcase your work
          </p>
        </div>
        <Button
          asChild
          className='bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700'
        >
          <Link href='/admin/projects/new'>
            <svg
              className='w-4 h-4 mr-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 4v16m8-8H4'
              />
            </svg>
            Add New Project
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className='p-6'>
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex-1'>
              <Input
                placeholder='Search projects...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full'
              />
            </div>
            <div className='flex gap-2'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline'>
                    Status: {statusFilter === "all" ? "All" : statusFilter}
                    <svg
                      className='w-4 h-4 ml-2'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 9l-7 7-7-7'
                      />
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                    All
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatusFilter(Status.LIVE)}
                  >
                    Live
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatusFilter(Status.DEVELOPMENT)}
                  >
                    Development
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatusFilter(Status.COMPLETED)}
                  >
                    Completed
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatusFilter(Status.HOLD)}
                  >
                    Hold
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatusFilter(Status.CANCELLED)}
                  >
                    Cancelled
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Projects ({filteredProjects.length})</CardTitle>
          <CardDescription>
            Manage and edit your portfolio projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Architecture</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Technologies</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className='text-center py-8'>
                    <div className='text-gray-500'>
                      {projects.length === 0 ? (
                        <div>
                          <svg
                            className='w-12 h-12 mx-auto mb-4 text-gray-400'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
                            />
                          </svg>
                          <p className='text-lg font-medium mb-2'>
                            No projects yet
                          </p>
                          <p className='text-sm'>
                            Get started by creating your first project
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className='text-lg font-medium mb-2'>
                            No projects match your search
                          </p>
                          <p className='text-sm'>
                            Try adjusting your search terms or filters
                          </p>
                        </div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredProjects.map((project) => {
                  const stacks = parseStacks(project?.stacks);
                  return (
                    <TableRow key={project.id}>
                      <TableCell>
                        <div className='flex items-center space-x-3'>
                          <Image
                            height={100}
                            width={100}
                            src={
                              project.bgcover_src ||
                              "/placeholder.svg?height=48&width=48"
                            }
                            alt={project.title}
                            className='w-12 h-12 rounded-lg object-cover'
                          />
                          <div>
                            <p className='font-medium text-gray-900'>
                              {project.title}
                            </p>
                            <p className='text-sm text-gray-500 max-w-xs truncate'>
                              {project.description}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant='outline'>{project.architecture}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={getStatusBadgeVariant(project.status)}
                          className={getStatusBadgeClassName(project.status)}
                        >
                          {project.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className='flex flex-wrap gap-1 max-w-xs'>
                          {stacks.slice(0, 2).map((tech: string) => (
                            <Badge
                              key={tech}
                              variant='secondary'
                              className='text-xs'
                            >
                              {tech}
                            </Badge>
                          ))}
                          {stacks.length > 2 && (
                            <Badge variant='secondary' className='text-xs'>
                              +{stacks.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {project.featured ? (
                          <Badge className='bg-yellow-500 hover:bg-yellow-600'>
                            Featured
                          </Badge>
                        ) : (
                          <span className='text-gray-400'>-</span>
                        )}
                      </TableCell>
                      <TableCell className='text-sm text-gray-500'>
                        {formatDate(project.updatedAt)}
                      </TableCell>
                      <TableCell className='text-right'>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant='ghost' size='sm'>
                              <svg
                                className='w-4 h-4'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
                                />
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/projects/${project.id}/edit`}>
                                Edit
                              </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => handleDeleteProject(project?.id)}
                              className='text-red-600'
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

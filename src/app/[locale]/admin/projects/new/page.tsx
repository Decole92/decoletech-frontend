"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { getServices } from "@/app/[locale]/actions/services";
import Image from "next/image";
interface Category {
  id: string;
  title: string;
}

interface ProjectFormData {
  title: string;
  description: string;
  fullDescription: string;
  architecture: string;
  categories: string[];
  status: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  image: File | null;
}

const architectures = ["MONOLITHIC", "MICROSERVICES"];
const statuses = ["LIVE", "COMPLETED", "DEVELOPMENT", "HOLD", "CANCELLED"];

const availableTechnologies = [
  "React",
  "Next.js",
  "Vue.js",
  "Angular",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Express",
  "NestJS",
  "Python",
  "Django",
  "FastAPI",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "Firebase",
  "AWS",
  "Google Cloud",
  "Azure",
  "Vercel",
  "Docker",
  "Kubernetes",
  "React Native",
  "Flutter",
  "Swift",
  "Kotlin",
  "OpenAI",
  "LangChain",
  "TensorFlow",
  "PyTorch",
  "Stripe",
  "PayPal",
  "Tailwind CSS",
  "Bootstrap",
  "Material-UI",
  "HTML5",
  "CSS3",
  "GraphQL",
  "REST API",
  "Prisma",
  "Microsoft Azure",
  "Jenkins",
  "GitHub",
  "Cloudflare",
  "Socket.io",
  "Pinecone",
  "Clerk",
  "NextAuth",
];

export default function NewProjectPage() {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    fullDescription: "",
    architecture: "",
    categories: [],
    status: "",
    technologies: [],
    githubUrl: "",
    liveUrl: "",
    featured: false,
    image: null,
  });

  const [errors, setErrors] = useState<Partial<ProjectFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [availableCategories, setAvailableCategories] = useState<Category[]>(
    []
  );
  const [loadingCategories, setLoadingCategories] = useState(true);
  const router = useRouter();

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getServices();
        setAvailableCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = <K extends keyof ProjectFormData>(
    field: K,
    value: ProjectFormData[K] | Error
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleTechnologyToggle = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.includes(tech)
        ? prev.technologies.filter((t) => t !== tech)
        : [...prev.technologies, tech],
    }));
  };

  const handleCategoryToggle = (categoryId: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter((c) => c !== categoryId)
        : [...prev.categories, categoryId],
    }));
  };

  const removeCategoryFromSelection = (categoryId: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c !== categoryId),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ProjectFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Short description is required";
    }

    if (!formData.fullDescription.trim()) {
      newErrors.fullDescription = "Full description is required";
    }

    if (!formData.architecture) {
      newErrors.architecture = "Architecture is required";
    }

    if (formData.categories.length === 0) {
      newErrors.categories = ["At least one category is required"] as string[];
    }

    if (!formData.status) {
      newErrors.status = "Status is required";
    }

    if (formData.technologies.length === 0) {
      newErrors.technologies = [
        "At least one technology is required",
      ] as string[];
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "technologies" || key === "categories") {
          submitData.append(key, JSON.stringify(value));
        } else if (key === "featured") {
          submitData.append(key, value.toString());
        } else if (value !== null) {
          submitData.append(key, value as string | Blob);
        }
      });

      const response = await fetch("/api/projects/create", {
        method: "POST",
        body: submitData,
      });

      if (response.ok) {
        toast.success(
          "Project Created! Your project has been successfully added to your portfolio."
        );
        router.push("/admin/projects");
      } else {
        throw new Error("Failed to create project");
      }
    } catch (error) {
      toast.error(`Failed to create project. Please try again. ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-gray-900'>Add New Project</h1>
        <p className='text-gray-600'>
          Create a new project to showcase in your portfolio
        </p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Essential details about your project
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-2'>
                <Label htmlFor='title'>Project Title *</Label>
                <Input
                  id='title'
                  placeholder='Enter project title'
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && (
                  <p className='text-sm text-red-600'>{errors.title}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='architecture'>Architecture *</Label>
                <Select
                  value={formData.architecture}
                  onValueChange={(value) =>
                    handleInputChange("architecture", value)
                  }
                >
                  <SelectTrigger
                    className={
                      errors.architecture ? "border-red-500 w-full" : "w-full"
                    }
                  >
                    <SelectValue placeholder='Select architecture' />
                  </SelectTrigger>
                  <SelectContent>
                    {architectures.map((architecture) => (
                      <SelectItem key={architecture} value={architecture}>
                        {architecture}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.architecture && (
                  <p className='text-sm text-red-600'>{errors.architecture}</p>
                )}
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='description'>Short Description *</Label>
              <Textarea
                id='description'
                placeholder='Brief description for project cards (max 150 characters)'
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className={`resize-none min-h-32 ${
                  errors.description ? "border-red-500" : ""
                }`}
                maxLength={150}
              />
              <div className='flex justify-between items-center'>
                {errors.description && (
                  <p className='text-sm text-red-600'>{errors.description}</p>
                )}
                <p className='text-sm text-gray-500'>
                  {formData.description.length}/150
                </p>
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='fullDescription'>Full Description *</Label>
              <Textarea
                id='fullDescription'
                placeholder='Detailed project description, features, challenges, implementation details, etc.'
                value={formData.fullDescription}
                onChange={(e) =>
                  handleInputChange("fullDescription", e.target.value)
                }
                className={`resize-none min-h-40 ${
                  errors.fullDescription ? "border-red-500" : ""
                }`}
              />
              {errors.fullDescription && (
                <p className='text-sm text-red-600'>{errors.fullDescription}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Project Categories *</CardTitle>
            <CardDescription>
              Select categories that best describe your project
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            {loadingCategories ? (
              <div className='flex items-center justify-center py-8'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
                <span className='ml-2'>Loading categories...</span>
              </div>
            ) : (
              <>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                  {availableCategories.map((category) => (
                    <div
                      key={category.id}
                      className='flex items-center space-x-2'
                    >
                      <Checkbox
                        id={category.id}
                        checked={formData.categories.includes(category.id)}
                        onCheckedChange={() =>
                          handleCategoryToggle(category.id)
                        }
                      />
                      <Label htmlFor={category.id} className='text-sm'>
                        {category.title}
                      </Label>
                    </div>
                  ))}
                </div>

                {/* Selected Categories Display */}
                {formData.categories.length > 0 && (
                  <div className='space-y-2'>
                    <Label>Selected Categories:</Label>
                    <div className='flex flex-wrap gap-2'>
                      {formData.categories.map((categoryId) => {
                        const category = availableCategories.find(
                          (c) => c.id === categoryId
                        );
                        return (
                          <Badge
                            key={categoryId}
                            variant='secondary'
                            className='flex items-center gap-1'
                          >
                            {category?.title || categoryId}
                            <X
                              className='h-3 w-3 cursor-pointer'
                              onClick={() =>
                                removeCategoryFromSelection(categoryId)
                              }
                            />
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
            {errors.categories && (
              <p className='text-sm text-red-600'>{errors.categories}</p>
            )}
          </CardContent>
        </Card>

        {/* Project Status & Links */}
        <Card>
          <CardHeader>
            <CardTitle>Status & Links</CardTitle>
            <CardDescription>Project status and relevant links</CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='space-y-2'>
                <Label htmlFor='status'>Status *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                >
                  <SelectTrigger
                    className={errors.status ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder='Select status' />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className='text-sm text-red-600'>{errors.status}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='githubUrl'>GitHub URL</Label>
                <Input
                  id='githubUrl'
                  type='url'
                  placeholder='https://github.com/username/repo'
                  value={formData.githubUrl}
                  onChange={(e) =>
                    handleInputChange("githubUrl", e.target.value)
                  }
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='liveUrl'>Live URL</Label>
                <Input
                  id='liveUrl'
                  type='url'
                  placeholder='https://project-demo.com'
                  value={formData.liveUrl}
                  onChange={(e) => handleInputChange("liveUrl", e.target.value)}
                />
              </div>
            </div>

            <div className='flex items-center space-x-2'>
              <Checkbox
                id='featured'
                checked={formData.featured}
                onCheckedChange={(checked) =>
                  handleInputChange("featured", checked === true)
                }
              />
              <Label htmlFor='featured'>Feature this project on homepage</Label>
            </div>
          </CardContent>
        </Card>

        {/* Technologies */}
        <Card>
          <CardHeader>
            <CardTitle>Technologies Used *</CardTitle>
            <CardDescription>
              Select all technologies used in this project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3'>
              {availableTechnologies.map((tech) => (
                <div key={tech} className='flex items-center space-x-2'>
                  <Checkbox
                    id={tech}
                    checked={formData.technologies.includes(tech)}
                    onCheckedChange={() => handleTechnologyToggle(tech)}
                  />
                  <Label htmlFor={tech} className='text-sm'>
                    {tech}
                  </Label>
                </div>
              ))}
            </div>
            {errors.technologies && (
              <p className='text-sm text-red-600 mt-2'>{errors.technologies}</p>
            )}
          </CardContent>
        </Card>

        {/* Project Image */}
        <Card>
          <CardHeader>
            <CardTitle>Project Image</CardTitle>
            <CardDescription>
              Upload a screenshot or preview image of your project
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-center w-full'>
              <label
                htmlFor='image'
                className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100'
              >
                {imagePreview ? (
                  <Image
                    height={100}
                    width={100}
                    src={imagePreview || "/placeholder.svg"}
                    alt='Preview'
                    className='w-full h-full object-cover rounded-lg'
                  />
                ) : (
                  <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                    <svg
                      className='w-8 h-8 mb-4 text-gray-500'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                      />
                    </svg>
                    <p className='mb-2 text-sm text-gray-500'>
                      <span className='font-semibold'>Click to upload</span> or
                      drag and drop
                    </p>
                    <p className='text-xs text-gray-500'>
                      PNG, JPG or WEBP (MAX. 5MB)
                    </p>
                  </div>
                )}
                <input
                  id='image'
                  type='file'
                  className='hidden'
                  accept='image/*'
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <div className='flex justify-end space-x-4'>
          <Button type='button' variant='outline' onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            type='submit'
            disabled={isSubmitting}
            className='bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700'
          >
            {isSubmitting ? "Creating..." : "Create Project"}
          </Button>
        </div>
      </form>
    </div>
  );
}

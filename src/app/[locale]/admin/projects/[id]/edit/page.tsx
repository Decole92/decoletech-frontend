"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, Loader2, X, Plus, Upload } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";

interface Category {
  id: string;
  title: string;
  description?: string;
}

const architectures = ["MONOLITHIC", "MICROSERVICES"];

const statusOptions = [
  { value: "LIVE", label: "Live" },
  { value: "DEVELOPMENT", label: "In Development" },
  { value: "COMPLETED", label: "Completed" },
  { value: "HOLD", label: "On Hold" },
  { value: "CANCELLED", label: "Cancelled" },
];
const commonTechnologies = [
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

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProject, setIsLoadingProject] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [newTechnology, setNewTechnology] = useState("");
  const [availableCategories, setAvailableCategories] = useState<Category[]>(
    []
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fullDescription: "",
    image: "",
    technologies: [] as string[],
    architecture: "",
    categories: [] as string[],
    status: "",
    featured: false,
    liveUrl: "",
    githubUrl: "",
  });

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/services/getServices");
        if (response.ok) {
          const categories = await response.json();
          setAvailableCategories(categories);
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
  }, []);

  // Load project data on component mount
  useEffect(() => {
    const loadProject = async () => {
      try {
        const response = await fetch(`/api/projects/${params.id}`);
        const project = await response.json();

        // Parse stacks from JSON string to array
        let technologies: string[] = [];
        try {
          technologies =
            typeof project.stacks === "string"
              ? JSON.parse(project.stacks)
              : project.stacks || [];

          // console.log("tech", technologies);
        } catch (error) {
          console.error("Error parsing stacks:", error);
          technologies = [];
        }

        setFormData({
          title: project.title || "",
          description: project.description || "",
          fullDescription: project.fullDescription || "",
          image: project.bgcover_src || "", // Use bgcover_src instead of image
          technologies: technologies, // Use parsed stacks
          architecture: project.architecture || "",
          categories: project.category || [], // Use category instead of categories
          status: project.status || "",
          featured: project.featured || false,
          liveUrl: project.liveUrl || "",
          githubUrl: project.githubUrl || "",
        });
      } catch (error) {
        console.error("Error loading project:", error);
        toast.error("Failed to load project");
      } finally {
        setIsLoadingProject(false);
      }
    };

    loadProject();
  }, [params.id]);

  const handleInputChange = (
    field: string,
    value: string | boolean | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTechnology = (tech: string) => {
    if (tech && !formData.technologies.includes(tech)) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, tech],
      }));
      setNewTechnology("");
    }
  };

  const removeTechnology = (techToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((tech) => tech !== techToRemove),
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();

      // Add form fields with correct mapping
      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      submitData.append("fullDescription", formData.fullDescription);
      submitData.append("architecture", formData.architecture);
      submitData.append("status", formData.status);
      submitData.append("featured", formData.featured.toString());
      submitData.append("liveUrl", formData.liveUrl);
      submitData.append("githubUrl", formData.githubUrl);

      // Convert technologies array back to JSON string for stacks field
      submitData.append("stacks", JSON.stringify(formData.technologies));

      // Send categories as category field
      submitData.append("category", JSON.stringify(formData.categories));

      // Add image file if uploaded
      if (imageFile) {
        submitData.append("imageFile", imageFile);
      } else if (formData.image) {
        submitData.append("bgcover_src", formData.image);
      }

      // Make API call to update the project
      const response = await fetch(`/api/projects/${params.id}`, {
        method: "PATCH",
        body: submitData,
      });

      if (!response.ok) {
        throw new Error("Failed to update project");
      }

      console.log("Project updated successfully");
      toast.success("Project updated successfully!");
      router.push("/admin/projects");
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    formData.title &&
    formData.description &&
    formData.fullDescription &&
    formData.architecture &&
    formData.categories.length > 0 &&
    formData.status;

  if (isLoadingProject) {
    return (
      <div className='space-y-6'>
        <div className='flex items-center gap-4'>
          <Button variant='outline' size='icon' asChild>
            <Link href='/admin/projects'>
              <ArrowLeft className='h-4 w-4' />
            </Link>
          </Button>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>Edit Project</h1>
            <p className='text-gray-600'>Loading project details...</p>
          </div>
        </div>
        <Card className='max-w-4xl'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-center h-64'>
              <Loader2 className='h-8 w-8 animate-spin text-gray-400' />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* // <div className='space-y-6  lg:flex lg:gap-6'> */}
      {/* Header */}
      <div className='flex items-center gap-4'>
        <Button variant='outline' size='icon' asChild>
          <Link href='/admin/projects'>
            <ArrowLeft className='h-4 w-4' />
          </Link>
        </Button>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>Edit Project</h1>
          <p className='text-gray-600'>
            Update your project details and information
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Main Form */}
        <div className='lg:col-span-2'>
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>
                Update the information for your project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className='space-y-6'>
                {/* Title */}
                <div className='space-y-2'>
                  <Label htmlFor='title'>Project Title *</Label>
                  <Input
                    id='title'
                    placeholder='e.g., E-Commerce Platform'
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />
                </div>

                {/* Architecture */}
                <div className='space-y-2'>
                  <Label htmlFor='architecture'>Architecture *</Label>
                  <Select
                    value={formData.architecture}
                    onValueChange={(value) =>
                      handleInputChange("architecture", value)
                    }
                    required
                  >
                    <SelectTrigger>
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
                </div>

                {/* Short Description */}
                <div className='space-y-2'>
                  <Label htmlFor='description'>Short Description *</Label>
                  <Textarea
                    id='description'
                    placeholder='Brief description for project cards (max 150 characters)'
                    rows={3}
                    maxLength={150}
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    required
                  />
                  <p className='text-sm text-gray-500'>
                    {formData.description.length}/150
                  </p>
                </div>

                {/* Full Description */}
                <div className='space-y-2'>
                  <Label htmlFor='fullDescription'>Full Description *</Label>
                  <Textarea
                    id='fullDescription'
                    placeholder='Detailed project description, features, challenges, implementation details, etc.'
                    rows={8}
                    value={formData.fullDescription}
                    onChange={(e) =>
                      handleInputChange("fullDescription", e.target.value)
                    }
                    required
                  />
                </div>

                {/* Image Upload */}
                <div className='space-y-2'>
                  <Label htmlFor='image'>Project Image</Label>
                  <div className='space-y-3'>
                    {/* Current Image URL */}
                    <div className='flex gap-2'>
                      <Input
                        id='image'
                        placeholder='Current image URL'
                        value={formData.image}
                        onChange={(e) =>
                          handleInputChange("image", e.target.value)
                        }
                        readOnly
                      />
                      <div className='relative'>
                        <input
                          type='file'
                          accept='image/*'
                          onChange={handleImageUpload}
                          className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                        />
                        <Button type='button' variant='outline' size='icon'>
                          <Upload className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>

                    {/* Image Preview */}
                    {(imagePreview || formData.image) && (
                      <div className='relative w-full max-w-sm'>
                        <Image
                          height={100}
                          width={100}
                          src={
                            imagePreview || formData.image || "/placeholder.svg"
                          }
                          alt='Project preview'
                          className='w-full h-32 object-cover rounded-lg border'
                        />
                        {imagePreview && (
                          <div className='absolute top-2 right-2'>
                            <Badge className='bg-green-500'>New Image</Badge>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Categories */}
                <div className='space-y-2'>
                  <Label>Project Categories *</Label>
                  {loadingCategories ? (
                    <div className='flex items-center gap-2'>
                      <Loader2 className='h-4 w-4 animate-spin' />
                      <span className='text-sm text-gray-500'>
                        Loading categories...
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-40 overflow-y-auto border rounded-lg p-3'>
                        {availableCategories.map((category) => (
                          <div
                            key={category.id}
                            className='flex items-center space-x-2'
                          >
                            <Checkbox
                              id={category.id}
                              checked={formData.categories.includes(
                                category.id
                              )}
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
                </div>

                {/* Status */}
                <div className='space-y-2'>
                  <Label htmlFor='status'>Status *</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      handleInputChange("status", value)
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select status' />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* URLs */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='liveUrl'>Live URL</Label>
                    <Input
                      id='liveUrl'
                      placeholder='https://your-project.com'
                      value={formData.liveUrl}
                      onChange={(e) =>
                        handleInputChange("liveUrl", e.target.value)
                      }
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='githubUrl'>GitHub URL</Label>
                    <Input
                      id='githubUrl'
                      placeholder='https://github.com/username/repo'
                      value={formData.githubUrl}
                      onChange={(e) =>
                        handleInputChange("githubUrl", e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* Technologies */}
                <div className='space-y-2'>
                  <Label>Technologies</Label>
                  <div className='flex flex-wrap gap-2 mb-2'>
                    {formData.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant='secondary'
                        className='flex items-center gap-1'
                      >
                        {tech}
                        <button
                          type='button'
                          onClick={() => removeTechnology(tech)}
                          className='ml-1 hover:bg-gray-300 rounded-full p-0.5'
                        >
                          <X className='h-3 w-3' />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className='flex gap-2'>
                    <Input
                      placeholder='Add technology...'
                      value={newTechnology}
                      onChange={(e) => setNewTechnology(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTechnology(newTechnology);
                        }
                      }}
                    />
                    <Button
                      type='button'
                      variant='outline'
                      onClick={() => addTechnology(newTechnology)}
                      disabled={!newTechnology}
                    >
                      <Plus className='h-4 w-4' />
                    </Button>
                  </div>
                  <div className='flex flex-wrap gap-1 mt-2'>
                    {commonTechnologies.map((tech) => (
                      <Button
                        key={tech}
                        type='button'
                        variant='ghost'
                        size='sm'
                        className='h-6 text-xs'
                        onClick={() => addTechnology(tech)}
                        disabled={formData.technologies.includes(tech)}
                      >
                        {tech}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Featured Toggle */}
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='featured'
                    checked={formData.featured}
                    onCheckedChange={(checked) =>
                      handleInputChange("featured", checked)
                    }
                  />
                  <Label htmlFor='featured'>Featured Project</Label>
                </div>

                {/* Form Actions */}
                <div className='flex gap-4 pt-4'>
                  <Button
                    type='submit'
                    disabled={!isFormValid || isLoading}
                    className='bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700'
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className='w-4 h-4 animate-spin mr-2' />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className='w-4 h-4 mr-2' />
                        Update Project
                      </>
                    )}
                  </Button>
                  <Button type='button' variant='outline' asChild>
                    <Link href='/admin/projects'>Cancel</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className='space-y-6 '>
          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>How your project will appear</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='border rounded-lg p-4 bg-gray-50'>
                {(imagePreview || formData.image) && (
                  <Image
                    height={100}
                    width={100}
                    src={imagePreview || formData.image || "/placeholder.svg"}
                    alt={formData.title}
                    className='w-full h-32 object-cover rounded-lg mb-3'
                  />
                )}
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  {formData.title || "Project Title"}
                </h3>
                <p className='text-gray-600 text-sm mb-3'>
                  {formData.description ||
                    "Project description will appear here..."}
                </p>
                <div className='flex items-center justify-between mb-2'>
                  <Badge variant='outline'>
                    {formData.architecture || "Architecture"}
                  </Badge>
                  <Badge
                    variant={
                      formData.status === "LIVE"
                        ? "default"
                        : formData.status === "DEVELOPMENT"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {formData.status || "Status"}
                  </Badge>
                </div>
                {formData.featured && (
                  <Badge className='bg-yellow-500 hover:bg-yellow-600 mb-2'>
                    Featured
                  </Badge>
                )}
                <div className='flex flex-wrap gap-1 mb-2'>
                  {formData.categories.slice(0, 2).map((categoryId) => {
                    const category = availableCategories.find(
                      (c) => c.id === categoryId
                    );
                    return (
                      <Badge
                        key={categoryId}
                        variant='outline'
                        className='text-xs'
                      >
                        {category?.title || categoryId}
                      </Badge>
                    );
                  })}
                  {formData.categories.length > 2 && (
                    <Badge variant='outline' className='text-xs'>
                      +{formData.categories.length - 2}
                    </Badge>
                  )}
                </div>
                <div className='flex flex-wrap gap-1'>
                  {formData.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant='secondary' className='text-xs'>
                      {tech}
                    </Badge>
                  ))}
                  {formData.technologies.length > 3 && (
                    <Badge variant='secondary' className='text-xs'>
                      +{formData.technologies.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Information */}
          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div>
                <span className='text-sm text-gray-500'>Project ID:</span>
                <div className='font-mono text-sm text-gray-900'>
                  {params.id}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

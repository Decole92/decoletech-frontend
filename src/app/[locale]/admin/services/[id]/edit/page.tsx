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
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    value: "Web_Application_Development",
    label: "Web Application Development",
  },
  {
    value: "Mobile_Application_Development",
    label: "Mobile Application Development",
  },
  { value: "AI_Powered_Solutions", label: "AI Powered Solutions" },
  {
    value: "Website_Translation_and_Localization_n8n",
    label: "Website Translation and Localization",
  },
  {
    value: "E_Commerce_and_Payment_Integration",
    label: "E-Commerce and Payment Integration",
  },
  { value: "Cloud_and_DevOps_Solutions", label: "Cloud and DevOps Solutions" },
  {
    value: "UIUX_Design_and_Prototyping",
    label: "UI/UX Design and Prototyping",
  },
  {
    value: "Database_Design_and_Management",
    label: "Database Design and Management",
  },
  {
    value: "API_Development_and_Integration",
    label: "API Development and Integration",
  },
  {
    value: "Performance_Optimization_and_SEO",
    label: "Performance Optimization and SEO",
  },
];

export default function EditServicePage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingService, setIsLoadingService] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "", // Set a valid default category
    price_per_hour: "",
    full_description: "",
    createdAt: "", // Add createdAt property
    updatedAt: "", // Add updatedAt property
  });

  // Load service data on component mount
  useEffect(() => {
    const loadService = async () => {
      try {
        const response = await fetch(`/api/services/${params.id}`);
        const service = await response.json();

        setFormData({
          title: service?.title || "",
          description: service?.description || "",
          category: service?.category || "",
          price_per_hour: service?.price_per_hour || "",
          createdAt: service?.createdAt || "",
          updatedAt: service?.updatedAt || "",
          full_description: service?.full_description || "",
        });
      } catch (error) {
        console.error("Error loading service:", error);
      } finally {
        setIsLoadingService(false);
      }
    };

    loadService();
  }, [params.id]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here you would typically make an API call to update the service
      await fetch(`/api/services/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      router.push(`/admin/services/${params.id}`);
    } catch (error) {
      console.error("Error updating service:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    formData.title &&
    formData.description &&
    formData.category &&
    formData.full_description &&
    formData.price_per_hour;

  if (isLoadingService) {
    return (
      <div className='space-y-6 lg:max-w-6xl lg:mx-auto md:max-w-5xl md:mx-auto'>
        <div className='flex items-center gap-4'>
          <Button variant='outline' size='icon' asChild>
            <Link href='/admin/services'>
              <ArrowLeft className='h-4 w-4' />
            </Link>
          </Button>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>Edit Service</h1>
            <p className='text-gray-600'>Loading service details...</p>
          </div>
        </div>
        <Card className='max-w-2xl'>
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
    <div className='space-y-6 lg:max-w-6xl lg:mx-auto md:max-w-5xl md:mx-auto'>
      {/* Header */}
      <div className='flex items-center gap-4'>
        <Button variant='outline' size='icon' asChild>
          <Link href={`/admin/services/${params.id}`}>
            <ArrowLeft className='h-4 w-4' />
          </Link>
        </Button>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>Edit Service</h1>
          <p className='text-gray-600'>Update your service offering details</p>
        </div>
      </div>

      {/* Form */}
      <Card className='max-w-2xl'>
        <CardHeader>
          <CardTitle>Service Details</CardTitle>
          <CardDescription>
            Update the information for your service offering
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Title */}
            <div className='space-y-2'>
              <Label htmlFor='title'>Service Title *</Label>
              <Input
                id='title'
                placeholder='e.g., Custom Web Application Development'
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className='space-y-2'>
              <Label htmlFor='description'>Description *</Label>
              <Input
                id='description'
                placeholder='Describe your service in few words..'
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='full_description'>Description *</Label>
              <Textarea
                id='full_description'
                placeholder='Describe your service in detail...'
                rows={4}
                value={formData.full_description}
                onChange={(e) =>
                  handleInputChange("full_description", e.target.value)
                }
                required
              />
            </div>
            {/* Category */}
            <div className='space-y-2'>
              <Label htmlFor='category'>Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select a service category' />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price per Hour */}
            <div className='space-y-2'>
              <Label htmlFor='price_per_hour'>Price per Hour *</Label>
              <div className='relative'>
                <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'>
                  $
                </span>
                <Input
                  id='price_per_hour'
                  type='number'
                  placeholder='75'
                  className='pl-8'
                  value={formData.price_per_hour}
                  onChange={(e) =>
                    handleInputChange("price_per_hour", e.target.value)
                  }
                  required
                />
              </div>
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
                    Update Service
                  </>
                )}
              </Button>
              <Button type='button' variant='outline' asChild>
                <Link href={`/admin/services/${params.id}`}>Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Preview Card */}
      {(formData.title || formData.description) && (
        <Card className='max-w-2xl'>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>
              This is how your updated service will appear to clients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='border rounded-lg p-4 bg-gray-50'>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                {formData.title || "Service Title"}
              </h3>
              <p className='text-gray-600 mb-3'>
                {formData.description ||
                  "Service description will appear here..."}
              </p>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-500'>
                  {formData.category
                    ? categories.find((cat) => cat.value === formData.category)
                        ?.label
                    : "Category"}
                </span>
                <span className='text-lg font-bold text-cyan-600'>
                  {formData.price_per_hour
                    ? `$${formData.price_per_hour}/hr`
                    : "$--/hr"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Service Information */}
      <Card className='max-w-2xl'>
        <CardHeader>
          <CardTitle>Service Information</CardTitle>
          <CardDescription>
            Additional details about this service
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 gap-4 text-sm'>
            <div>
              <span className='text-gray-500'>Service ID:</span>
              <div className='font-mono text-gray-900'>{params.id}</div>
            </div>
            <div>
              <span className='text-gray-500'>Created:</span>
              <div className='text-gray-900'>
                {formData?.createdAt
                  ? new Date(formData.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Unknown Date"}
              </div>
            </div>
            <div>
              <span className='text-gray-500'>Last Updated:</span>
              <div className='text-gray-900'>
                {new Date(formData?.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
            <div>
              <span className='text-gray-500'>Status:</span>
              <div className='text-green-600 font-medium'>Active</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

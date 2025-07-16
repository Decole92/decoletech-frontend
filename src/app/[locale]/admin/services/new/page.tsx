"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { ArrowLeft, Save } from "lucide-react";
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

export default function NewServicePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    full_description: "",
    price_per_hour: "",
  });

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
      // Here you would typically make an API call to create the service
      const response = await fetch("/api/services/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // For now, we'll simulate the API call
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      if (!response?.ok) {
        throw new Error("Error while creating service");
      }

      console.log("Creating service:", formData);

      // Redirect to services list
      router.push("/admin/services");
    } catch (error) {
      console.error("Error creating service:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    formData.title &&
    formData.description &&
    formData.category &&
    formData.price_per_hour &&
    formData.full_description;
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center gap-4'>
        <Button variant='outline' size='icon' asChild>
          <Link href='/admin/services'>
            <ArrowLeft className='h-4 w-4' />
          </Link>
        </Button>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>
            Create New Service
          </h1>
          <p className='text-gray-600'>
            Add a new service to your portfolio offerings
          </p>
        </div>
      </div>

      {/* Form */}
      <Card className='max-w-2xl'>
        <CardHeader>
          <CardTitle>Service Details</CardTitle>
          <CardDescription>
            Fill in the information for your new service offering
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
                placeholder='Describe your service in few words...'
                value={formData.description}
                maxLength={200}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='full_description'>Full Description *</Label>
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
                    <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2' />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className='w-4 h-4 mr-2' />
                    Create Service
                  </>
                )}
              </Button>
              <Button type='button' variant='outline' asChild>
                <Link href='/admin/services'>Cancel</Link>
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
              This is how your service will appear to clients
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
    </div>
  );
}

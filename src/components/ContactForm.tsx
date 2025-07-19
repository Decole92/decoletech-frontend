"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { toast } from "sonner";
import { getServices } from "@/app/[locale]/actions/services";
import { Services } from "../../typing";

type ServiceType =
  | "Web_Application_Development"
  | "Mobile_Application_Development"
  | "AI_Powered_Solutions"
  | "Website_Translation_and_Localization_n8n"
  | "E_Commerce_and_Payment_Integration"
  | "Cloud_and_DevOps_Solutions"
  | "UIUX_Design_and_Prototyping"
  | "Database_Design_and_Management"
  | "API_Development_and_Integration"
  | "Performance_Optimization_and_SEO";

interface InquiryFormData {
  clientName: string;
  clientEmail: string;
  clientCompany: string;
  serviceType: ServiceType | "" | "Please select a service type" | undefined;
  message: string;
  status: "pending" | "responded" | "closed";
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<InquiryFormData>({
    clientName: "",
    clientEmail: "",
    clientCompany: "",
    serviceType: "",
    message: "",
    status: "pending",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<Partial<InquiryFormData>>({});
  const [services, setServices] = useState<Services[] | []>([]);

  const validateForm = (): boolean => {
    const newErrors: Partial<InquiryFormData> = {};

    // Required field validations
    if (!formData.clientEmail.trim()) {
      newErrors.clientEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clientEmail)) {
      newErrors.clientEmail = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    if (!formData.serviceType) {
      newErrors.serviceType = "Please select a service type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof InquiryFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/inquiries/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(
          "Inquiry Sent Successfully!, Thank you for your inquiry. Please check your Spam Inbox."
        );

        // Reset form
        setFormData({
          clientName: "",
          clientEmail: "",
          clientCompany: "",
          serviceType: "",
          message: "",
          status: "pending",
        });
      } else {
        throw new Error("Failed to send inquiry");
      }
    } catch (error) {
      toast.error(
        `Failed to send inquiry. Please try again or contact me directly.${error}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    const fetchServices = async () => {
      const data = await getServices();
      setServices(Array.isArray(data) ? data : []);
      setIsLoading(false);
    };
    fetchServices();
  }, []);

  return (
    <section className='py-20 bg-gray-50'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            Let&#39;s Work{" "}
            <span className='bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent'>
              Together
            </span>
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Ready to bring your project to life? Get in touch and lets discuss
            how We can help you achieve your goals.
          </p>
        </div>

        <Card className='shadow-lg border-0 max-w-full'>
          <CardHeader className='text-center pb-8'>
            <CardTitle className='text-2xl font-bold text-gray-900'>
              Project Inquiry
            </CardTitle>
            <CardDescription className='text-lg text-gray-600'>
              Fill out the form below and we will get back to you ASAP.
            </CardDescription>
          </CardHeader>

          <CardContent className='p-8'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Client Name */}
                <div className='space-y-2'>
                  <Label
                    htmlFor='clientName'
                    className='text-sm font-medium text-gray-700'
                  >
                    Full Name
                  </Label>
                  <Input
                    id='clientName'
                    type='text'
                    placeholder='Your full name'
                    value={formData.clientName}
                    onChange={(e) =>
                      handleInputChange("clientName", e.target.value)
                    }
                    className='h-12'
                  />
                </div>

                {/* Client Email */}
                <div className='space-y-2'>
                  <Label
                    htmlFor='clientEmail'
                    className='text-sm font-medium text-gray-700'
                  >
                    Email Address *
                  </Label>
                  <Input
                    id='clientEmail'
                    type='email'
                    placeholder='your.email@example.com'
                    value={formData.clientEmail}
                    onChange={(e) =>
                      handleInputChange("clientEmail", e.target.value)
                    }
                    className={`h-12 ${
                      errors.clientEmail ? "border-red-500" : ""
                    }`}
                  />
                  {errors.clientEmail && (
                    <p className='text-sm text-red-600'>{errors.clientEmail}</p>
                  )}
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Client Company */}
                <div className='space-y-2'>
                  <Label
                    htmlFor='clientCompany'
                    className='text-sm font-medium text-gray-700'
                  >
                    Company Name
                  </Label>
                  <Input
                    id='clientCompany'
                    type='text'
                    placeholder='Your company name (optional)'
                    value={formData.clientCompany}
                    onChange={(e) =>
                      handleInputChange("clientCompany", e.target.value)
                    }
                    className='h-12'
                  />
                </div>

                {/* Service Type */}
                <div className='space-y-2 '>
                  <Label
                    htmlFor='serviceType'
                    className='text-sm font-medium text-gray-700'
                  >
                    Service Type *
                  </Label>
                  <Select
                    value={formData.serviceType}
                    onValueChange={(value) =>
                      handleInputChange("serviceType", value)
                    }
                  >
                    <SelectTrigger
                      className={`h-14 w-full py-5.5 ${
                        errors.serviceType ? "border-red-500" : ""
                      }`}
                    >
                      <SelectValue
                        className=''
                        placeholder='Select a service'
                      />
                    </SelectTrigger>
                    <SelectContent className=''>
                      {isLoading ? (
                        <SelectItem disabled value='disabled'>
                          <span className='text-gray-500 animate-pulse p-4'>
                            Loading services...
                          </span>
                        </SelectItem>
                      ) : services?.length === 0 ? (
                        <SelectItem disabled value='disabled'>
                          <span className='text-gray-500 p-4'>
                            No service is available
                          </span>
                        </SelectItem>
                      ) : (
                        services.map((option, index) => (
                          <SelectItem
                            key={`${option.id}-${index}`}
                            value={option.id}
                          >
                            {option.title}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  {errors.serviceType && (
                    <p className='text-sm text-red-600'>{errors.serviceType}</p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className='space-y-2'>
                <Label
                  htmlFor='message'
                  className='text-sm font-medium text-gray-700'
                >
                  Project Details *
                </Label>
                <Textarea
                  id='message'
                  placeholder='Tell me about your project, timeline, budget, and any specific requirements...'
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className={`min-h-32 resize-none ${
                    errors.message ? "border-red-500" : ""
                  }`}
                />
                {errors.message && (
                  <p className='text-sm text-red-600'>{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className='pt-4 justify-center items-center flex'>
                <Button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-1/2 py-6 px-8 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50'
                >
                  {isSubmitting ? (
                    <div className='flex items-center'>
                      <svg
                        className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <circle
                          className='opacity-25'
                          cx='12'
                          cy='12'
                          r='10'
                          stroke='currentColor'
                          strokeWidth='4'
                        ></circle>
                        <path
                          className='opacity-75'
                          fill='currentColor'
                          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                        ></path>
                      </svg>
                      Sending...
                    </div>
                  ) : (
                    "Send Inquiry"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Search, Plus, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import { Services } from "../../../../../typing";
import { getServices } from "../../actions/services";
import { LoadingInquiries } from "@/components/Loader/LoadingInquiries";

const categoryLabels = {
  Web_Application_Development: "Web Development",
  Mobile_Application_Development: "Mobile Development",
  AI_Powered_Solutions: "AI Solutions",
  Website_Translation_and_Localization_n8n: "Translation & Localization",
  E_Commerce_and_Payment_Integration: "E-Commerce",
  Cloud_and_DevOps_Solutions: "Cloud & DevOps",
  UIUX_Design_and_Prototyping: "UI/UX Design",
  Database_Design_and_Management: "Database Management",
  API_Development_and_Integration: "API Development",
  Performance_Optimization_and_SEO: "Performance & SEO",
};

export default function ServicesPage() {
  const [services, setServices] = useState<Services[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();

        if (data?.statusCode === 404 || !Array.isArray(data)) {
          setServices([]);
        } else {
          setServices(data);
        }
        console.log("services", data);
      } catch (error) {
        console.error("Error fetching services:", error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = services?.filter((service) => {
    const matchesSearch =
      service.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || service.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteService = async (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        const response = await fetch(`/api/services/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setServices(services.filter((service) => service.id !== id));
        } else {
          console.error("Failed to delete service");
        }
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    }
  };

  // Corrected function to calculate total inquiries
  const getTotalInquiries = () => {
    return (
      services?.reduce(
        (sum, service) => sum + (service._count?.inquiries || 0),
        0
      ) || 0
    );
  };

  const getAveragePrice = () => {
    if (!services || services.length === 0) return 0;

    const total = services.reduce((sum, service) => {
      const price = service.price_per_hour?.toString().replace("$", "") || "0";
      return sum + (Number.parseInt(price) || 0);
    }, 0);

    return Math.round(total / services.length) || 0;
  };

  const getUniqueCategories = () => {
    if (!services || services.length === 0) return 0;
    return new Set(services.map((service) => service.category)).size;
  };

  if (loading) {
    return <LoadingInquiries />;
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>Services</h1>
          <p className='text-gray-600'>
            Manage your service offerings and pricing
          </p>
        </div>
        <Button className='bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700'>
          <Link href='/admin/services/new'>
            <Plus className='w-4 h-4 mr-2' />
            Add New Service
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>
                  Total Services
                </p>
                <p className='text-3xl font-bold text-gray-900'>
                  {services?.length || 0}
                </p>
              </div>
              <div className='p-3 bg-blue-50 rounded-full'>
                <div className='w-6 h-6 text-blue-600'>
                  <svg fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M8 6a2 2 0 00-2 2v6.002'
                    />
                  </svg>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>
                  Total Inquiries
                </p>
                <p className='text-3xl font-bold text-gray-900'>
                  {getTotalInquiries()}
                </p>
              </div>
              <div className='p-3 bg-green-50 rounded-full'>
                <div className='w-6 h-6 text-green-600'>
                  <svg fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                    />
                  </svg>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>
                  Avg. Price/Hour
                </p>
                <p className='text-3xl font-bold text-gray-900'>
                  ${getAveragePrice()}
                </p>
              </div>
              <div className='p-3 bg-yellow-50 rounded-full'>
                <div className='w-6 h-6 text-yellow-600'>
                  <svg fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
                    />
                  </svg>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>Categories</p>
                <p className='text-3xl font-bold text-gray-900'>
                  {getUniqueCategories()}
                </p>
              </div>
              <div className='p-3 bg-purple-50 rounded-full'>
                <div className='w-6 h-6 text-purple-600'>
                  <svg fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M7 7h.01*M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
                    />
                  </svg>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Services Management</CardTitle>
          <CardDescription>
            View and manage all your service offerings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col sm:flex-row gap-4 mb-6'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
              <Input
                placeholder='Search services...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10'
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className='w-full sm:w-[200px]'>
                <SelectValue placeholder='Filter by category' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Categories</SelectItem>
                {Object.entries(categoryLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Services Table */}
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price/Hour</TableHead>
                  <TableHead>Inquiries</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices && filteredServices.length > 0 ? (
                  filteredServices.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>
                        <div>
                          <div className='font-medium'>
                            {service.title || "Untitled"}
                          </div>
                          <div className='text-sm text-gray-500 max-w-md truncate'>
                            {service.description || "No description"}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant='secondary'>
                          {categoryLabels[
                            service.category as keyof typeof categoryLabels
                          ] || service.category}
                        </Badge>
                      </TableCell>
                      <TableCell className='font-medium'>
                        {service.price_per_hour || "N/A"}
                      </TableCell>
                      <TableCell>
                        <Badge variant='outline'>
                          {service._count?.inquiries || 0} inquiries
                        </Badge>
                      </TableCell>
                      <TableCell className='text-sm text-gray-500'>
                        {service.createdAt
                          ? new Date(service.createdAt).toLocaleDateString()
                          : "N/A"}
                      </TableCell>
                      <TableCell className='text-right'>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant='ghost' className='h-8 w-8 p-0'>
                              <MoreHorizontal className='h-4 w-4' />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/services/${service.id}`}>
                                <Eye className='mr-2 h-4 w-4' />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/services/${service.id}/edit`}>
                                <Edit className='mr-2 h-4 w-4' />
                                Edit Service
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteService(service.id)}
                              className='text-red-600'
                            >
                              <Trash2 className='mr-2 h-4 w-4' />
                              Delete Service
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className='text-center py-8'>
                      <p className='text-gray-500'>
                        {searchTerm || categoryFilter !== "all"
                          ? "No services found matching your criteria."
                          : "No services available. Create your first service to get started."}
                      </p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

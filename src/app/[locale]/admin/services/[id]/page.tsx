// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { ArrowLeft, Edit, Trash2, Mail } from "lucide-react";
// import Link from "next/link";
// import { Services } from "../../../../../../typing";

// const mockInquiries = [
//   {
//     id: "1",
//     clientName: "Sarah Johnson",
//     clientEmail: "sarah@example.com",
//     clientCompany: "Tech Startup Inc.",
//     message:
//       "We need a custom web application for our inventory management system. Looking for a modern solution with real-time updates.",
//     status: "pending",
//     createdAt: "2024-01-20T14:30:00Z",
//   },
//   {
//     id: "2",
//     clientName: "Mike Chen",
//     clientEmail: "mike@example.com",
//     clientCompany: "Digital Solutions LLC",
//     message:
//       "Interested in developing a customer portal with authentication and dashboard features.",
//     status: "responded",
//     createdAt: "2024-01-18T09:15:00Z",
//   },
//   {
//     id: "3",
//     clientName: "Emily Davis",
//     clientEmail: "emily@example.com",
//     clientCompany: null,
//     message:
//       "Looking for a freelancer to build a portfolio website with CMS integration.",
//     status: "pending",
//     createdAt: "2024-01-16T16:45:00Z",
//   },
// ];

// const categoryLabels = {
//   Web_Application_Development: "Web Application Development",
//   Mobile_Application_Development: "Mobile Application Development",
//   AI_Powered_Solutions: "AI Powered Solutions",
//   Website_Translation_and_Localization_n8n:
//     "Website Translation and Localization",
//   E_Commerce_and_Payment_Integration: "E-Commerce and Payment Integration",
//   Cloud_and_DevOps_Solutions: "Cloud and DevOps Solutions",
//   UIUX_Design_and_Prototyping: "UI/UX Design and Prototyping",
//   Database_Design_and_Management: "Database Design and Management",
//   API_Development_and_Integration: "API Development and Integration",
//   Performance_Optimization_and_SEO: "Performance Optimization and SEO",
// };

// const statusColors = {
//   pending: "bg-yellow-100 text-yellow-800",
//   responded: "bg-green-100 text-green-800",
//   closed: "bg-gray-100 text-gray-800",
// };

// export default function ServiceDetailPage() {
//   const params = useParams();
//   const router = useRouter();
//   const [service, setService] = useState<Services | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [inquiries, setInquiries] = useState(mockInquiries);

//   const handleDeleteService = async () => {
//     if (
//       confirm(
//         "Are you sure you want to delete this service? This action cannot be undone."
//       )
//     ) {
//       // Here you would make an API call to delete the service
//       // console.log("Deleting service:", service.id);

//       const response = await fetch(`/api/services/${params.id}`, {
//         method: "DELETE",
//       });
//       if (!response.ok) {
//         throw new Error("Failed to fetch service");
//       }

//       router.push("/admin/services");
//     }
//   };

//   useEffect(() => {
//     const loadService = async () => {
//       if (!params.id) return;

//       setLoading(true);
//       try {
//         const response = await fetch(`/api/services/${params.id}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch service");
//         }
//         const data = await response.json();
//         setService(data);
//       } catch (error) {
//         console.error("Error loading service:", error);
//         setError(
//           error instanceof Error ? error.message : "Failed to load service"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadService();
//   }, [params.id]);
//   return (
//     <div className='space-y-6'>
//       {/* Header */}
//       <div className='flex items-center justify-between'>
//         <div className='flex items-center gap-4'>
//           <Button variant='outline' size='icon' asChild>
//             <Link href='/admin/services'>
//               <ArrowLeft className='h-4 w-4' />
//             </Link>
//           </Button>
//           <div>
//             <h1 className='text-3xl font-bold text-gray-900'>
//               Service Details
//             </h1>
//             <p className='text-gray-600'>
//               View and manage service information and inquiries
//             </p>
//           </div>
//         </div>
//         <div className='flex gap-2'>
//           <Button variant='outline' asChild>
//             {/* <Link href={`/admin/services/${service.id}/edit`}>
//               <Edit className='w-4 h-4 mr-2' />
//               Edit Service
//             </Link> */}
//           </Button>
//           <Button variant='destructive' onClick={handleDeleteService}>
//             <Trash2 className='w-4 h-4 mr-2' />
//             Delete Service
//           </Button>
//         </div>
//       </div>

//       {/* Service Information */}
//       <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
//         <div className='lg:col-span-2'>
//           <Card>
//             <CardHeader>
//               <div className='flex items-start justify-between'>
//                 <div>
//                   <CardTitle className='text-2xl'>{service?.title}</CardTitle>
//                   <CardDescription className='mt-2'>
//                     <Badge variant='secondary'>
//                       {
//                         categoryLabels[
//                           service?.category as keyof typeof categoryLabels
//                         ]
//                       }
//                     </Badge>
//                   </CardDescription>
//                 </div>
//                 <div className='text-right'>
//                   <div className='text-3xl font-bold text-cyan-600'>
//                     {service?.price_per_hour}
//                   </div>
//                   <div className='text-sm text-gray-500'>per hour</div>
//                 </div>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className='space-y-4'>
//                 <div>
//                   <h3 className='font-semibold text-gray-900 mb-2'>
//                     Description
//                   </h3>
//                   <p className='text-gray-600 leading-relaxed'>
//                     {service?.description}
//                   </p>
//                 </div>

//                 <div>
//                   <h3 className='font-semibold text-gray-900 mb-2'>
//                     Full Description
//                   </h3>
//                   <p className='text-gray-600 leading-relaxed'>
//                     {service?.full_description}
//                   </p>
//                 </div>
//                 <div className='grid grid-cols-2 gap-4 pt-4 border-t'>
//                   <div>
//                     <div className='text-sm text-gray-500'>Created</div>
//                     <div className='font-medium'>
//                       {service?.createdAt
//                         ? new Date(service.createdAt).toLocaleDateString(
//                             "en-US",
//                             {
//                               year: "numeric",
//                               month: "long",
//                               day: "numeric",
//                             }
//                           )
//                         : "N/A"}
//                     </div>
//                   </div>
//                   <div>
//                     <div className='text-sm text-gray-500'>Last Updated</div>
//                     <div className='font-medium'>
//                       {service?.createdAt
//                         ? new Date(service.createdAt).toLocaleDateString(
//                             "en-US",
//                             {
//                               year: "numeric",
//                               month: "long",
//                               day: "numeric",
//                             }
//                           )
//                         : "N/A"}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Stats Sidebar */}
//         <div className='space-y-6'>
//           <Card>
//             <CardHeader>
//               <CardTitle>Service Statistics</CardTitle>
//             </CardHeader>
//             <CardContent className='space-y-4'>
//               <div className='flex items-center justify-between'>
//                 <span className='text-sm text-gray-600'>Total Inquiries</span>
//                 <span className='text-2xl font-bold text-gray-900'>
//                   {inquiries.length}
//                 </span>
//               </div>
//               <div className='flex items-center justify-between'>
//                 <span className='text-sm text-gray-600'>Pending</span>
//                 <span className='text-lg font-semibold text-yellow-600'>
//                   {inquiries.filter((i) => i.status === "pending").length}
//                 </span>
//               </div>
//               <div className='flex items-center justify-between'>
//                 <span className='text-sm text-gray-600'>Responded</span>
//                 <span className='text-lg font-semibold text-green-600'>
//                   {inquiries.filter((i) => i.status === "responded").length}
//                 </span>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Quick Actions</CardTitle>
//             </CardHeader>
//             <CardContent className='space-y-2'>
//               <Button
//                 variant='outline'
//                 className='w-full justify-start'
//                 asChild
//               >
//                 <Link href={`/admin/services/${service?.id}/edit`}>
//                   <Edit className='w-4 h-4 mr-2' />
//                   Edit Service
//                 </Link>
//               </Button>
//               <Button
//                 variant='outline'
//                 className='w-full justify-start'
//                 asChild
//               >
//                 <Link href='/admin/inquiries'>
//                   <Mail className='w-4 h-4 mr-2' />
//                   View All Inquiries
//                 </Link>
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       {/* Related Inquiries */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Related Inquiries</CardTitle>
//           <CardDescription>
//             Client inquiries specifically for this service
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           {inquiries.length > 0 ? (
//             <div className='rounded-md border'>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Client</TableHead>
//                     <TableHead>Company</TableHead>
//                     <TableHead>Message</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Date</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {inquiries.map((inquiry) => (
//                     <TableRow key={inquiry.id}>
//                       <TableCell>
//                         <div>
//                           <div className='font-medium'>
//                             {inquiry.clientName}
//                           </div>
//                           <div className='text-sm text-gray-500'>
//                             {inquiry.clientEmail}
//                           </div>
//                         </div>
//                       </TableCell>
//                       <TableCell>
//                         {inquiry.clientCompany || (
//                           <span className='text-gray-400'>—</span>
//                         )}
//                       </TableCell>
//                       <TableCell>
//                         <div className='max-w-md truncate'>
//                           {inquiry.message}
//                         </div>
//                       </TableCell>
//                       <TableCell>
//                         <Badge
//                           className={
//                             statusColors[
//                               inquiry.status as keyof typeof statusColors
//                             ]
//                           }
//                         >
//                           {inquiry.status}
//                         </Badge>
//                       </TableCell>
//                       <TableCell className='text-sm text-gray-500'>
//                         {new Date(inquiry.createdAt).toLocaleDateString()}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </div>
//           ) : (
//             <div className='text-center py-8'>
//               <Mail className='w-12 h-12 text-gray-400 mx-auto mb-4' />
//               <p className='text-gray-500'>
//                 No inquiries yet for this service.
//               </p>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Edit, Trash2, Mail } from "lucide-react";
import Link from "next/link";

// Updated Services type to include inquiries
interface Inquiry {
  id?: string;
  clientName?: string;
  clientEmail: string;
  clientCompany?: string | null;
  message: string;
  status: string;
  createdAt: string;
}

interface Services {
  id: string;
  title: string;
  description: string;
  full_description: string;
  category: string;
  price_per_hour: string;
  createdAt: string;
  updatedAt: string;
  userId: string | null;
  _count: { inquiries: number };
  inquiries?: Inquiry[];
}

const categoryLabels = {
  Web_Application_Development: "Web Application Development",
  Mobile_Application_Development: "Mobile Application Development",
  AI_Powered_Solutions: "AI Powered Solutions",
  Website_Translation_and_Localization_n8n:
    "Website Translation and Localization",
  E_Commerce_and_Payment_Integration: "E-Commerce and Payment Integration",
  Cloud_and_DevOps_Solutions: "Cloud and DevOps Solutions",
  UIUX_Design_and_Prototyping: "UI/UX Design and Prototyping",
  Database_Design_and_Management: "Database Design and Management",
  API_Development_and_Integration: "API Development and Integration",
  Performance_Optimization_and_SEO: "Performance Optimization and SEO",
};

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  responded: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-800",
};

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [service, setService] = useState<Services | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadService = async () => {
      if (!params.id) return;

      setLoading(true);
      try {
        const response = await fetch(`/api/services/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch service");
        }
        const data = await response.json();
        setService(data);
      } catch (error) {
        console.error("Error loading service:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load service"
        );
      } finally {
        setLoading(false);
      }
    };

    loadService();
  }, [params.id]);

  const handleDeleteService = async () => {
    if (
      confirm(
        "Are you sure you want to delete this service? This action cannot be undone."
      )
    ) {
      try {
        const response = await fetch(`/api/services/${params.id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete service");
        }
        router.push("/admin/services");
      } catch (error) {
        console.error("Error deleting service:", error);
        setError(
          error instanceof Error ? error.message : "Failed to delete service"
        );
      }
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-64'>
        <div className='text-lg'>Loading service...</div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className='flex items-center justify-center min-h-64'>
        <div className='text-lg text-red-600'>
          {error || "Service not found"}
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Button variant='outline' size='icon' asChild>
            <Link href='/admin/services'>
              <ArrowLeft className='h-4 w-4' />
            </Link>
          </Button>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>
              Service Details
            </h1>
            <p className='text-gray-600'>
              View and manage service information and inquiries
            </p>
          </div>
        </div>
        <div className='flex gap-2'>
          <Button variant='outline' asChild>
            <Link href={`/admin/services/${service.id}/edit`}>
              <Edit className='w-4 h-4 mr-2' />
              Edit Service
            </Link>
          </Button>
          <Button variant='destructive' onClick={handleDeleteService}>
            <Trash2 className='w-4 h-4 mr-2' />
            Delete Service
          </Button>
        </div>
      </div>

      {/* Service Information */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2'>
          <Card>
            <CardHeader>
              <div className='flex items-start justify-between'>
                <div>
                  <CardTitle className='text-2xl'>{service.title}</CardTitle>
                  <CardDescription className='mt-2'>
                    <Badge variant='secondary'>
                      {categoryLabels[
                        service.category as keyof typeof categoryLabels
                      ] || service.category}
                    </Badge>
                  </CardDescription>
                </div>
                <div className='text-right'>
                  <div className='text-3xl font-bold text-cyan-600'>
                    {service.price_per_hour}
                  </div>
                  <div className='text-sm text-gray-500'>per hour</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div>
                  <h3 className='font-semibold text-gray-900 mb-2'>
                    Description
                  </h3>
                  <p className='text-gray-600 leading-relaxed'>
                    {service.description}
                  </p>
                </div>
                <div>
                  <h3 className='font-semibold text-gray-900 mb-2'>
                    Full Description
                  </h3>
                  <p className='text-gray-600 leading-relaxed'>
                    {service.full_description}
                  </p>
                </div>
                <div className='grid grid-cols-2 gap-4 pt-4 border-t'>
                  <div>
                    <div className='text-sm text-gray-500'>Created</div>
                    <div className='font-medium'>
                      {service.createdAt
                        ? new Date(service.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )
                        : "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className='text-sm text-gray-500'>Last Updated</div>
                    <div className='font-medium'>
                      {service.updatedAt
                        ? new Date(service.updatedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )
                        : "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Sidebar */}
        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Service Statistics</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-600'>Total Inquiries</span>
                <span className='text-2xl font-bold text-gray-900'>
                  {service.inquiries?.length || 0}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-600'>Pending</span>
                <span className='text-lg font-semibold text-yellow-600'>
                  {service.inquiries?.filter((i) => i.status === "pending")
                    .length || 0}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-600'>Responded</span>
                <span className='text-lg font-semibold text-green-600'>
                  {service.inquiries?.filter((i) => i.status === "responded")
                    .length || 0}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2'>
              <Button
                variant='outline'
                className='w-full justify-start'
                asChild
              >
                <Link href={`/admin/services/${service.id}/edit`}>
                  <Edit className='w-4 h-4 mr-2' />
                  Edit Service
                </Link>
              </Button>
              <Button
                variant='outline'
                className='w-full justify-start'
                asChild
              >
                <Link href='/admin/inquiries'>
                  <Mail className='w-4 h-4 mr-2' />
                  View All Inquiries
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Related Inquiries */}
      <Card>
        <CardHeader>
          <CardTitle>Related Inquiries</CardTitle>
          <CardDescription>
            Client inquiries specifically for this service
          </CardDescription>
        </CardHeader>
        <CardContent>
          {service.inquiries && service.inquiries.length > 0 ? (
            <div className='rounded-md border'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {service.inquiries.map((inquiry) => (
                    <TableRow key={inquiry.clientEmail + inquiry.createdAt}>
                      <TableCell>
                        <div>
                          <div className='font-medium'>
                            {inquiry.clientName || "Unknown"}
                          </div>
                          <div className='text-sm text-gray-500'>
                            {inquiry.clientEmail}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {inquiry.clientCompany || (
                          <span className='text-gray-400'>—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className='max-w-md truncate'>
                          {inquiry.message}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            statusColors[
                              inquiry.status as keyof typeof statusColors
                            ] || "bg-gray-100 text-gray-800"
                          }
                        >
                          {inquiry.status}
                        </Badge>
                      </TableCell>
                      <TableCell className='text-sm text-gray-500'>
                        {new Date(inquiry.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className='text-center py-8'>
              <Mail className='w-12 h-12 text-gray-400 mx-auto mb-4' />
              <p className='text-gray-500'>
                No inquiries yet for this service.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

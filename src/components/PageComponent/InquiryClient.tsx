"use client";

import { useEffect, useState, useCallback } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Inquiry, InquiryStatus } from "../../../typing";
import { toast } from "sonner";
import { LoadingInquiries } from "../Loader/LoadingInquiries";
// interface ServiceLabels {
//   [key: string]: string;
// }

// const serviceLabels: ServiceLabels = {
//   Web_Application_Development: "Web Application Development",
//   Mobile_Application_Development: "Mobile Application Development",
//   AI_Powered_Solutions: "AI Powered Solutions",
//   E_Commerce_and_Payment_Integration: "E-Commerce and Payment Integration",
//   Cloud_and_DevOps_Solutions: "Cloud and DevOps Solutions",
//   UIUX_Design_and_Prototyping: "UI/UX Design and Prototyping",
// };

type StatusFilter = "all" | "pending" | "responded" | "closed";

export default function InquiryClient() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const fetchInquiries = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/inquiries/getInquiries");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setInquiries(Array.isArray(data) ? data : []);
      console.log("data", data);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      setError("Failed to load inquiries. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleUpdateStatus = async (status: string, id: string) => {
    try {
      const response = await fetch(`/api/inquiries/${id}`, {
        headers: {
          "Content-type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setInquiries((prevInquiries) =>
        prevInquiries.map((inquiry) =>
          inquiry.id === id
            ? { ...inquiry, status: status as InquiryStatus }
            : inquiry
        )
      );
      toast.success(`Status changed to  ${status}`);

      return data;
    } catch (err) {
      setError(
        `Failed to update inquiry status. Please try again later. ${err}`
      );
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    try {
      const response = await fetch(`/api/inquiries/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setInquiries((prevInquiries) =>
        prevInquiries.filter((inquiry) => inquiry.id !== id)
      );
      return data;
    } catch (err) {
      setError(`Failed to delete inquiry. Please try again later.${err}`);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      (inquiry.clientName ?? "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      inquiry.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.clientCompany?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || inquiry.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "responded":
        return "bg-blue-100 text-blue-800";
      case "closed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center h-full'>
        <p className='text-red-600 mb-4'>{error}</p>
        <Button onClick={fetchInquiries}>Retry</Button>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-gray-900'>Client Inquiries</h1>
        <p className='text-gray-600'>
          Manage and respond to client project inquiries
        </p>
      </div>

      {isLoading ? (
        <LoadingInquiries />
      ) : (
        <>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            <Card>
              <CardContent className='p-6'>
                <div className='text-2xl font-bold text-gray-900'>
                  {inquiries.length}
                </div>
                <p className='text-sm text-gray-600'>Total Inquiries</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-6'>
                <div className='text-2xl font-bold text-yellow-600'>
                  {inquiries.filter((i) => i.status === "pending").length}
                </div>
                <p className='text-sm text-gray-600'>Pending</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-6'>
                <div className='text-2xl font-bold text-blue-600'>
                  {inquiries.filter((i) => i.status === "responded").length}
                </div>
                <p className='text-sm text-gray-600'>Responded</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-6'>
                <div className='text-2xl font-bold text-green-600'>
                  {inquiries.filter((i) => i.status === "closed").length}
                </div>
                <p className='text-sm text-gray-600'>Closed</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className='p-6'>
              <div className='flex flex-col sm:flex-row gap-4'>
                <div className='flex-1'>
                  <Input
                    placeholder='Search inquiries...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='w-full'
                  />
                </div>
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
                      onClick={() => setStatusFilter("pending")}
                    >
                      Pending
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setStatusFilter("responded")}
                    >
                      Responded
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("closed")}>
                      Closed
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>All Inquiries ({filteredInquiries.length})</CardTitle>
              <CardDescription>
                View and manage client project inquiries
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredInquiries.length === 0 ? (
                <p className='text-center text-gray-500 py-4'>
                  No inquiries found
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className='text-right'>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInquiries.map((inquiry) => (
                      <TableRow key={inquiry.id}>
                        <TableCell>
                          <div>
                            <p className='font-medium text-gray-900'>
                              {inquiry.clientName}
                            </p>
                            <p className='text-sm text-gray-500'>
                              {inquiry.clientEmail}
                            </p>
                            {inquiry.clientCompany && (
                              <p className='text-xs text-gray-400'>
                                {inquiry.clientCompany}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant='outline'>
                            {inquiry.service.title}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(inquiry.status)}>
                            {inquiry.status}
                          </Badge>
                        </TableCell>
                        <TableCell className='text-sm text-gray-500'>
                          {formatDate(inquiry.createdAt)}
                        </TableCell>
                        <TableCell className='text-right'>
                          <div className='flex justify-end gap-2'>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant='outline'
                                  size='sm'
                                  onClick={() => setSelectedInquiry(inquiry)}
                                >
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className='max-w-2xl'>
                                <DialogHeader>
                                  <DialogTitle>Inquiry Details</DialogTitle>
                                  <DialogDescription>
                                    From {selectedInquiry?.clientName} -{" "}
                                    {formatDate(
                                      selectedInquiry?.createdAt || ""
                                    )}
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedInquiry && (
                                  <div className='space-y-4'>
                                    <div className='grid grid-cols-2 gap-4'>
                                      <div>
                                        <Label className='text-sm font-medium'>
                                          Client Name
                                        </Label>
                                        <p className='text-sm text-gray-900'>
                                          {selectedInquiry.clientName}
                                        </p>
                                      </div>
                                      <div>
                                        <Label className='text-sm font-medium'>
                                          Email
                                        </Label>
                                        <p className='text-sm text-gray-900'>
                                          {selectedInquiry.clientEmail}
                                        </p>
                                      </div>
                                      <div>
                                        <Label className='text-sm font-medium'>
                                          Company
                                        </Label>
                                        <p className='text-sm text-gray-900'>
                                          {selectedInquiry.clientCompany ||
                                            "N/A"}
                                        </p>
                                      </div>
                                      <div>
                                        <Label className='text-sm font-medium'>
                                          Service
                                        </Label>
                                        <p className='text-sm text-gray-900'>
                                          {selectedInquiry.service.title}
                                        </p>
                                      </div>
                                    </div>
                                    <div>
                                      <Label className='text-sm font-medium'>
                                        Message
                                      </Label>
                                      <div className='mt-1 p-3 bg-gray-50 rounded-lg'>
                                        <p className='text-sm text-gray-900 whitespace-pre-wrap'>
                                          {selectedInquiry.message}
                                        </p>
                                      </div>
                                    </div>
                                    <div className='flex justify-end space-x-2'>
                                      <Button variant='outline'>
                                        Mark as Responded
                                      </Button>
                                      <Button className='bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700'>
                                        Reply via Email
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
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
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleUpdateStatus("pending", inquiry.id)
                                  }
                                >
                                  Mark as Pending
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleUpdateStatus("responded", inquiry.id)
                                  }
                                >
                                  Mark as Responded
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleUpdateStatus("closed", inquiry.id)
                                  }
                                >
                                  Mark as Closed
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className='text-red-600'
                                  onClick={() =>
                                    handleDeleteInquiry(inquiry.id)
                                  }
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

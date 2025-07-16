"use client";

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
import { Checkbox } from "@/components/ui/checkbox";
import { LoadingInquiries } from "@/components/Loader/LoadingInquiries";

// Define Subscriber interface based on API response
interface Subscriber {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  source: string;
  status: string;
}

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedSubscribers, setSelectedSubscribers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/newsletter/getNewsletter");
        if (!response.ok) {
          throw new Error("Failed to fetch subscribers");
        }
        const data = await response.json();
        setSubscribers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching subscribers:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load subscribers"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  const filteredSubscribers = subscribers.filter((subscriber) => {
    const matchesSearch = subscriber.email
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || subscriber.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeSubscribers = subscribers.filter(
    (s) => s.status === "active"
  ).length;
  const unsubscribedCount = subscribers.filter(
    (s) => s.status === "inactive"
  ).length;
  const thisWeekCount = subscribers.filter((s) => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return new Date(s.createdAt) > weekAgo;
  }).length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedSubscribers(filteredSubscribers.map((s) => s.id));
    } else {
      setSelectedSubscribers([]);
    }
  };

  const handleSelectSubscriber = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedSubscribers((prev) => [...prev, id]);
    } else {
      setSelectedSubscribers((prev) => prev.filter((subId) => subId !== id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "unsubscribed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSourceLabel = (source: string) => {
    switch (source) {
      case "footer":
        return "Footer Signup";
      case "contact_form":
        return "Contact Form";
      case "blog":
        return "Blog";
      default:
        return source;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const exportSubscribers = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Email,Status,Subscribed Date,Source\n" +
      filteredSubscribers
        .map(
          (s) =>
            `${s.email},${s.status},${formatDate(s.createdAt)},${getSourceLabel(
              s.source
            )}`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "newsletter_subscribers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <LoadingInquiries />;
  }

  if (error) {
    return (
      <div className='flex items-center justify-center min-h-64'>
        <div className='text-lg text-red-600'>{error}</div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>
            Newsletter Subscribers
          </h1>
          <p className='text-gray-600'>
            Manage your newsletter subscribers and send campaigns
          </p>
        </div>
        <div className='flex gap-2'>
          <Button variant='outline' onClick={exportSubscribers}>
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
                d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
              />
            </svg>
            Export CSV
          </Button>
          <Button className='bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700'>
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
                d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
              />
            </svg>
            Send Campaign
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <Card>
          <CardContent className='p-6'>
            <div className='text-2xl font-bold text-gray-900'>
              {subscribers.length}
            </div>
            <p className='text-sm text-gray-600'>Total Subscribers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-6'>
            <div className='text-2xl font-bold text-green-600'>
              {activeSubscribers}
            </div>
            <p className='text-sm text-gray-600'>Active Subscribers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-6'>
            <div className='text-2xl font-bold text-blue-600'>
              {thisWeekCount}
            </div>
            <p className='text-sm text-gray-600'>New This Week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-6'>
            <div className='text-2xl font-bold text-red-600'>
              {unsubscribedCount}
            </div>
            <p className='text-sm text-gray-600'>Unsubscribed</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className='p-6'>
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex-1'>
              <Input
                placeholder='Search subscribers...'
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
                  <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                    Active
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatusFilter("unsubscribed")}
                  >
                    Unsubscribed
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedSubscribers.length > 0 && (
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-600'>
                {selectedSubscribers.length} subscriber
                {selectedSubscribers.length > 1 ? "s" : ""} selected
              </span>
              <div className='flex gap-2'>
                <Button variant='outline' size='sm'>
                  Send Email
                </Button>
                <Button variant='outline' size='sm'>
                  Export Selected
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  className='text-red-600 hover:text-red-700'
                >
                  Remove Selected
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Subscribers Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Subscribers ({filteredSubscribers.length})</CardTitle>
          <CardDescription>
            Manage your newsletter subscriber list
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredSubscribers.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-12'>
                    <Checkbox
                      checked={
                        selectedSubscribers.length ===
                          filteredSubscribers.length &&
                        filteredSubscribers.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Subscribed Date</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscribers.map((subscriber) => (
                  <TableRow key={subscriber.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedSubscribers.includes(subscriber.id)}
                        onCheckedChange={(checked) =>
                          handleSelectSubscriber(
                            subscriber.id,
                            checked as boolean
                          )
                        }
                      />
                    </TableCell>
                    <TableCell className='font-medium'>
                      {subscriber.email}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(subscriber.status)}>
                        {subscriber.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant='outline'>
                        {getSourceLabel(subscriber.source)}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-sm text-gray-500'>
                      {formatDate(subscriber.createdAt)}
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
                          <DropdownMenuItem>Send Email</DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          {subscriber.status === "active" ? (
                            <DropdownMenuItem className='text-red-600'>
                              Unsubscribe
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className='text-green-600'>
                              Resubscribe
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className='text-red-600'>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className='text-center py-8'>
              <p className='text-gray-500'>
                {searchTerm || statusFilter !== "all"
                  ? "No subscribers found matching your criteria."
                  : "No subscribers available."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

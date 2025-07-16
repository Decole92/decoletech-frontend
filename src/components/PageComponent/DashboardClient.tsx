"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGlobalStore } from "@/store/globalStore";
import { useEffect, useState } from "react";
import { Inquiry, Newsletter, Project, Services } from "../../.././typing";
import LoadingDashboarding from "../Loader/LoadingDashboarding";

interface DashboardData {
  projects: Project[];
  services: Services[];
  inquiries: Inquiry[];
  newsletters: Newsletter[];
}

export default function DashboardClient() {
  const user = useGlobalStore((state) => state.user);
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    projects: [],
    services: [],
    inquiries: [],
    newsletters: [],
  });
  const [loading, setLoading] = useState(true);

  // Fetch all dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch all data concurrently
        const [projectsRes, servicesRes, inquiriesRes, newslettersRes] =
          await Promise.all([
            fetch("/api/projects/getProjects"),
            fetch("/api/services/getServices"),
            fetch("/api/inquiries/getInquiries"),
            fetch("/api/newsletter/getNewsletter"),
          ]);

        const [projects, services, inquiries] = await Promise.all([
          projectsRes.json(),
          servicesRes.json(),
          inquiriesRes.json(),
          newslettersRes.json(),
        ]);

        setDashboardData({
          projects: Array.isArray(projects) ? projects : [],
          services: Array.isArray(services) ? services : [],
          inquiries: Array.isArray(inquiries) ? inquiries : [],
          newsletters: Array.isArray(inquiries) ? inquiries : [],
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Calculate stats from real data
  const stats = [
    {
      name: "Total Projects",
      value: dashboardData.projects.length.toString(),
      change: `${
        dashboardData.projects.filter((p) => {
          const createdThisMonth =
            new Date(p.createdAt).getMonth() === new Date().getMonth();
          return createdThisMonth;
        }).length
      } this month`,
      changeType: "positive" as const,
      icon: (
        <svg
          className='w-6 h-6'
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
      ),
    },
    {
      name: "Pending Inquiries",
      value: dashboardData.inquiries
        .filter((i) => i.status === "pending")
        .length.toString(),
      change: `${
        dashboardData.inquiries.filter((i) => {
          const createdToday =
            new Date(i.createdAt).toDateString() === new Date().toDateString();
          return createdToday && i.status === "pending";
        }).length
      } today`,
      changeType: "positive" as const,
      icon: (
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
          />
        </svg>
      ),
    },
    {
      name: "Newsletter Subscribers",
      value: dashboardData.newsletters
        .filter((n) => n.status === "active")
        .length.toString(),
      change: `${
        dashboardData.newsletters.filter((n) => {
          const createdThisWeek =
            new Date(n.createdAt) >
            new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
          return createdThisWeek && n.status === "active";
        }).length
      } this week`,
      changeType: "positive" as const,
      icon: (
        <svg
          className='w-6 h-6'
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
      ),
    },
    {
      name: "Active Services",
      value: dashboardData.services.length.toString(),
      change: `${dashboardData.services.reduce(
        (acc, service) => acc + (service._count.inquiries | 0),
        0
      )} total inquiries`,
      changeType: "positive" as const,
      icon: (
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
          />
        </svg>
      ),
    },
  ];

  // Get recent projects (last 3, sorted by updatedAt)
  const recentProjects = dashboardData.projects
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 3)
    .map((project) => ({
      id: project.id,
      title: project.title,
      status: project.status,
      technologies: project.stacks ? JSON.parse(project.stacks) : [],
      lastUpdated: new Date(project.updatedAt).toLocaleDateString(),
    }));

  // Get recent inquiries (last 3, sorted by createdAt)
  const recentInquiries = dashboardData.inquiries
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 3)
    .map((inquiry) => ({
      id: inquiry.id,
      name: inquiry.clientName,
      service: inquiry.service.title,
      date: new Date(inquiry.createdAt).toLocaleDateString(),
      status: inquiry.status,
    }));

  // Get recent services (last 3, sorted by updatedAt)
  const recentServices = dashboardData.services
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 3)
    .map((service) => ({
      id: service.id,
      title: service.title,
      category: service.category.replace(/_/g, " "),
      price_per_hour: `$${service.price_per_hour}`,
      inquiries: service.inquiries || service._count?.inquiries || 0,
      lastUpdated: new Date(service.updatedAt).toLocaleDateString(),
    }));

  if (loading) {
    return <LoadingDashboarding />;
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold text-gray-900'>Dashboard</h1>
        <p className='text-gray-600'>
          Welcome back, {user?.name}! Here&#39;s what&#39;s happening with your
          portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>{stat.name}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{stat.value}</div>
              <p className='text-sm text-gray-500'>
                <span
                  className={
                    stat.changeType === "positive"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {stat.change}
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Frequently used actions to manage your portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <Button
              asChild
              className='h-20 flex-col bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700'
            >
              <Link href='/admin/projects/new'>
                <svg
                  className='w-6 h-6 mb-2'
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
            <Button asChild variant='outline' className='h-20 flex-col'>
              <Link href='/admin/services/new'>
                <svg
                  className='w-6 h-6 mb-2'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M8 6a2 2 0 00-2 2v6.002'
                  />
                </svg>
                Add New Service
              </Link>
            </Button>
            <Button asChild variant='outline' className='h-20 flex-col'>
              <Link href='/admin/inquiries'>
                <svg
                  className='w-6 h-6 mb-2'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                  />
                </svg>
                View Inquiries
              </Link>
            </Button>
            <Button asChild variant='outline' className='h-20 flex-col'>
              <Link href=''>
                <svg
                  className='w-6 h-6 mb-2'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                  />
                </svg>
                Analytics
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Recent Inquiries */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between'>
            <div>
              <CardTitle>Recent Inquiries</CardTitle>
              <CardDescription>
                Latest client inquiries and their status
              </CardDescription>
            </div>
            <Button variant='outline' size='sm' asChild>
              <Link href='/admin/inquiries'>View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {recentInquiries.length > 0 ? (
                recentInquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className='flex items-center justify-between p-4 border rounded-lg'
                  >
                    <div>
                      <p className='font-medium text-gray-900'>
                        {inquiry.name}
                      </p>
                      <p className='text-sm text-gray-600'>{inquiry.service}</p>
                      <p className='text-xs text-gray-500'>{inquiry.date}</p>
                    </div>
                    <div className='text-right'>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          inquiry.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : inquiry.status === "responded"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {inquiry.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className='text-center py-8 text-gray-500'>
                  No inquiries yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Projects */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between'>
            <div>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>Your latest portfolio projects</CardDescription>
            </div>
            <Button variant='outline' size='sm' asChild>
              <Link href='/admin/projects'>View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {recentProjects.length > 0 ? (
                recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className='flex items-center justify-between p-4 border rounded-lg'
                  >
                    <div>
                      <p className='font-medium text-gray-900'>
                        {project.title}
                      </p>
                      <div className='flex flex-wrap gap-1 mt-1'></div>
                      <p className='text-xs text-gray-500 mt-1'>
                        Updated {project.lastUpdated}
                      </p>
                    </div>
                    <div className='text-right'>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          project.status === "LIVE"
                            ? "bg-green-100 text-green-800"
                            : project.status === "DEVELOPMENT"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {project.status.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className='text-center py-8 text-gray-500'>
                  No projects yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Services */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between'>
            <div>
              <CardTitle>Recent Services</CardTitle>
              <CardDescription>Your latest service offerings</CardDescription>
            </div>
            <Button variant='outline' size='sm' asChild>
              <Link href='/admin/services'>View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {recentServices.length > 0 ? (
                recentServices.map((service) => (
                  <div
                    key={service.id}
                    className='flex items-center justify-between p-4 border rounded-lg'
                  >
                    <div>
                      <p className='font-medium text-gray-900'>
                        {service.title}
                      </p>
                      <p className='text-sm text-gray-600'>
                        {service.category}
                      </p>
                      <p className='text-xs text-gray-500 mt-1'>
                        Updated {service.lastUpdated}
                      </p>
                    </div>
                    <div className='text-right'>
                      <div className='text-lg font-bold text-cyan-600'>
                        {service.price_per_hour}
                      </div>
                      <div className='text-xs text-gray-500'>
                        {Array.isArray(service.inquiries)
                          ? service.inquiries.length
                          : service.inquiries || 0}{" "}
                        inquiries
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className='text-center py-8 text-gray-500'>
                  No services yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

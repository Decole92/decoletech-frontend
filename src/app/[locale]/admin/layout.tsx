"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { getSession } from "@/lib/session";
import { getUser } from "../actions/users";
import { useGlobalStore } from "@/store/globalStore";
import UserProfile from "@/components/UserProfile";
import { User } from "../../../../typing";

const sidebarItems = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: (
      <svg
        className='w-5 h-5'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z'
        />
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z'
        />
      </svg>
    ),
  },
  {
    name: "Projects",
    href: "/admin/projects",
    icon: (
      <svg
        className='w-5 h-5'
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
    name: "Inquiries",
    href: "/admin/inquiries",
    icon: (
      <svg
        className='w-5 h-5'
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
    name: "Newsletter",
    href: "/admin/newsletter",
    icon: (
      <svg
        className='w-5 h-5'
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
    name: "Services",
    href: "/admin/services",
    icon: (
      <svg
        className='w-5 h-5'
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
    ),
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useGlobalStore((state) => state.user);
  const setUser = useGlobalStore((state) => state.setUser);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    console.log("Logging out...");
    try {
      const res = await fetch("/api/auth/logout");
      if (res?.status === 201) router.push("/auth/login");
    } catch (err) {
      throw new Error((err as Error)?.message);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await getSession();

        if (!session) {
          router.push("/auth/login");
          return;
        }

        if (!user) {
          const response = await getUser();
          if (response) {
            setUser(response);
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        router.push("/auth/login");
      }
    };

    fetchUser();
  }, [router]);

  return (
    <div className='flex h-screen bg-gray-50'>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className='flex flex-col h-full'>
          {/* Logo/Brand */}
          <div className='flex items-center justify-between h-16 px-4 border-b border-gray-200'>
            <h1 className='text-xl font-bold text-gray-900'>Admin Panel</h1>
            <Button
              variant='ghost'
              size='sm'
              className='lg:hidden'
              onClick={() => setSidebarOpen(false)}
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </Button>
          </div>

          {/* Navigation */}
          <nav className='flex-1 px-4 py-4 overflow-y-auto'>
            <div className='space-y-2'>
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    {item.icon}
                    <span className='ml-3'>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          <UserProfile user={user as User} handleLogout={handleLogout} />
        </div>
      </div>

      {/* Main content */}
      <div className='flex-1 flex flex-col min-w-0'>
        {/* Top bar */}
        <header className='sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 lg:px-6'>
          <div className='flex items-center'>
            <Button
              variant='ghost'
              size='sm'
              className='lg:hidden mr-2'
              onClick={() => setSidebarOpen(true)}
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
              <span className='sr-only'>Open sidebar</span>
            </Button>
            <h2 className='text-lg font-semibold text-gray-900'>
              {sidebarItems.find((item) => item.href === pathname)?.name ||
                "Dashboard"}
            </h2>
          </div>

          {/* Mobile logout button */}
          <Button
            variant='ghost'
            size='sm'
            className='lg:hidden'
            onClick={handleLogout}
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
              />
            </svg>
          </Button>
        </header>

        {/* Main content area */}
        <main className='flex-1 overflow-auto p-4 lg:p-6'>{children}</main>
      </div>
    </div>
  );
}

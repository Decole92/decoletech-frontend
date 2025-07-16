"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ServiceLoading() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />
      <div className='container mx-auto px-4 py-12 max-w-7xl mt-12'>
        <div className='grid lg:grid-cols-3 gap-8 mt-12'>
          {/* Left Column - Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Service Overview Card */}
            <Card className='border-none shadow-sm bg-white'>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <Skeleton className='h-6 w-40' />
                  <Skeleton className='h-6 w-20 rounded-full' />
                </div>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-3/4' />
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-5/6' />
                </div>
              </CardContent>
            </Card>

            {/* What's Included Card */}
            <Card className='border-none shadow-sm bg-white'>
              <CardHeader>
                <Skeleton className='h-6 w-36 mb-2' />
                <Skeleton className='h-4 w-64' />
              </CardHeader>
              <CardContent>
                <div className='grid md:grid-cols-2 gap-3'>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className='flex items-center space-x-2'>
                      <Skeleton className='h-4 w-4 rounded-full' />
                      <Skeleton className='h-4 w-32' />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Case Studies Card */}
            <Card className='border-none shadow-sm bg-white'>
              <CardHeader>
                <Skeleton className='h-6 w-32 mb-2' />
                <Skeleton className='h-4 w-48' />
              </CardHeader>
              <CardContent>
                <div className='space-y-6'>
                  {Array.from({ length: 2 }).map((_, index) => (
                    <div
                      key={index}
                      className='rounded-lg border border-gray-100 bg-white p-4'
                    >
                      <div className='md:flex gap-4'>
                        <div className='md:w-1/3 relative h-40 rounded-md overflow-hidden'>
                          <Skeleton className='h-full w-full' />
                        </div>
                        <div className='md:w-2/3 pt-4 md:pt-0'>
                          <div className='flex items-center justify-between mb-2'>
                            <Skeleton className='h-5 w-48' />
                            <div className='flex items-center space-x-2'>
                              <Skeleton className='h-5 w-16 rounded-full' />
                              <Skeleton className='h-5 w-20 rounded-full' />
                            </div>
                          </div>
                          <Skeleton className='h-4 w-full mb-1' />
                          <Skeleton className='h-4 w-3/4 mb-3' />
                          <div className='flex items-center space-x-3'>
                            <Skeleton className='h-4 w-20' />
                            <Skeleton className='h-4 w-24' />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className='space-y-6'>
            {/* Pricing Card */}
            <Card className='border-none shadow-sm bg-white sticky top-8'>
              <CardHeader className='text-center'>
                <Skeleton className='h-8 w-20 mx-auto mb-2' />
                <Skeleton className='h-4 w-16 mx-auto' />
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center space-x-2'>
                  <Skeleton className='h-4 w-4' />
                  <Skeleton className='h-4 w-32' />
                </div>
                <div className='flex items-center space-x-2'>
                  <Skeleton className='h-4 w-4' />
                  <Skeleton className='h-4 w-40' />
                </div>
                <div className='my-3'>
                  <Skeleton className='h-px w-full' />
                </div>
                <Skeleton className='h-10 w-full rounded-md' />
                <Skeleton className='h-10 w-full rounded-md' />
              </CardContent>
            </Card>

            {/* Service Stats Card */}
            <Card className='border-none shadow-sm bg-white'>
              <CardHeader>
                <Skeleton className='h-5 w-28' />
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='flex justify-between items-center'>
                  <Skeleton className='h-4 w-24' />
                  <Skeleton className='h-5 w-16 rounded-full' />
                </div>
                <div className='flex justify-between items-center'>
                  <Skeleton className='h-4 w-20' />
                  <Skeleton className='h-4 w-20' />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

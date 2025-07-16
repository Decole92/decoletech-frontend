"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <Skeleton className='h-9 w-48 mb-2' />
        <Skeleton className='h-5 w-96' />
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-6 w-6' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-8 w-16 mb-2' />
              <Skeleton className='h-4 w-20' />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <Skeleton className='h-6 w-32 mb-1' />
          <Skeleton className='h-4 w-64' />
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className='h-20 flex flex-col items-center justify-center border rounded-md'
              >
                <Skeleton className='h-6 w-6 mb-2' />
                <Skeleton className='h-4 w-20' />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Recent Inquiries */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between'>
            <div>
              <Skeleton className='h-6 w-32 mb-1' />
              <Skeleton className='h-4 w-48' />
            </div>
            <Skeleton className='h-8 w-16' />
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between p-4 border rounded-lg'
                >
                  <div className='flex-1'>
                    <Skeleton className='h-4 w-32 mb-1' />
                    <Skeleton className='h-3 w-24 mb-1' />
                    <Skeleton className='h-3 w-16' />
                  </div>
                  <div className='text-right'>
                    <Skeleton className='h-6 w-16 rounded-full' />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Projects */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between'>
            <div>
              <Skeleton className='h-6 w-32 mb-1' />
              <Skeleton className='h-4 w-40' />
            </div>
            <Skeleton className='h-8 w-16' />
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between p-4 border rounded-lg'
                >
                  <div className='flex-1'>
                    <Skeleton className='h-4 w-36 mb-2' />
                    <div className='flex flex-wrap gap-1 mb-1'>
                      <Skeleton className='h-3 w-12' />
                      <Skeleton className='h-3 w-16' />
                      <Skeleton className='h-3 w-10' />
                    </div>
                    <Skeleton className='h-3 w-20' />
                  </div>
                  <div className='text-right'>
                    <Skeleton className='h-6 w-20 rounded-full' />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Services */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between'>
            <div>
              <Skeleton className='h-6 w-32 mb-1' />
              <Skeleton className='h-4 w-44' />
            </div>
            <Skeleton className='h-8 w-16' />
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between p-4 border rounded-lg'
                >
                  <div className='flex-1'>
                    <Skeleton className='h-4 w-40 mb-1' />
                    <Skeleton className='h-3 w-28 mb-1' />
                    <Skeleton className='h-3 w-20' />
                  </div>
                  <div className='text-right'>
                    <Skeleton className='h-6 w-12 mb-1' />
                    <Skeleton className='h-3 w-16' />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

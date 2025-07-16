import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex items-center justify-between'>
            <Skeleton className='h-10 w-32' />
            <div className='flex items-center gap-2'>
              <Skeleton className='h-8 w-8' />
              <Skeleton className='h-8 w-16' />
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Hero Section */}
            <Card>
              <CardContent className='p-0'>
                <Skeleton className='aspect-video w-full rounded-t-lg' />
                <div className='p-6 space-y-4'>
                  <div className='flex items-start justify-between'>
                    <div className='space-y-2 flex-1'>
                      <Skeleton className='h-8 w-3/4' />
                      <Skeleton className='h-6 w-full' />
                    </div>
                    <Skeleton className='h-6 w-20' />
                  </div>
                  <div className='flex gap-3'>
                    <Skeleton className='h-10 w-32' />
                    <Skeleton className='h-10 w-28' />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <Skeleton className='h-6 w-48' />
              </CardHeader>
              <CardContent className='space-y-3'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-3/4' />
              </CardContent>
            </Card>

            {/* Technologies */}
            <Card>
              <CardHeader>
                <Skeleton className='h-6 w-40' />
                <Skeleton className='h-4 w-64' />
              </CardHeader>
              <CardContent>
                <div className='flex flex-wrap gap-2'>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className='h-6 w-16' />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            <Card>
              <CardHeader>
                <Skeleton className='h-6 w-32' />
              </CardHeader>
              <CardContent className='space-y-4'>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className='flex items-center gap-3'>
                    <Skeleton className='h-5 w-5' />
                    <div className='space-y-1 flex-1'>
                      <Skeleton className='h-4 w-20' />
                      <Skeleton className='h-3 w-24' />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Skeleton className='h-6 w-24' />
              </CardHeader>
              <CardContent className='space-y-2'>
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className='h-8 w-full' />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

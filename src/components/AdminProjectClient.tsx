"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminProjectsLoading() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <div>
          <Skeleton className='h-9 w-32 mb-2' />
          <Skeleton className='h-5 w-80' />
        </div>
        <Skeleton className='h-10 w-40' />
      </div>

      {/* Filters */}
      <Card>
        <CardContent className='p-6'>
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex-1'>
              <Skeleton className='h-10 w-full' />
            </div>
            <div className='flex gap-2'>
              <Skeleton className='h-10 w-32' />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <Skeleton className='h-6 w-40 mb-1' />
          <Skeleton className='h-4 w-64' />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Skeleton className='h-4 w-16' />
                </TableHead>
                <TableHead>
                  <Skeleton className='h-4 w-20' />
                </TableHead>
                <TableHead>
                  <Skeleton className='h-4 w-12' />
                </TableHead>
                <TableHead>
                  <Skeleton className='h-4 w-24' />
                </TableHead>
                <TableHead>
                  <Skeleton className='h-4 w-16' />
                </TableHead>
                <TableHead>
                  <Skeleton className='h-4 w-24' />
                </TableHead>
                <TableHead className='text-right'>
                  <Skeleton className='h-4 w-16 ml-auto' />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {/* Project */}
                  <TableCell>
                    <div className='flex items-center space-x-3'>
                      <Skeleton className='w-12 h-12 rounded-lg' />
                      <div>
                        <Skeleton className='h-4 w-32 mb-1' />
                        <Skeleton className='h-3 w-48' />
                      </div>
                    </div>
                  </TableCell>

                  {/* Architecture */}
                  <TableCell>
                    <Skeleton className='h-6 w-20 rounded-full' />
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Skeleton className='h-6 w-24 rounded-full' />
                  </TableCell>

                  {/* Technologies */}
                  <TableCell>
                    <div className='flex flex-wrap gap-1 max-w-xs'>
                      <Skeleton className='h-5 w-16 rounded-full' />
                      <Skeleton className='h-5 w-12 rounded-full' />
                      <Skeleton className='h-5 w-8 rounded-full' />
                    </div>
                  </TableCell>

                  {/* Featured */}
                  <TableCell>
                    <Skeleton className='h-6 w-16 rounded-full' />
                  </TableCell>

                  {/* Last Updated */}
                  <TableCell>
                    <Skeleton className='h-4 w-20' />
                  </TableCell>

                  {/* Actions */}
                  <TableCell className='text-right'>
                    <Skeleton className='h-8 w-8 ml-auto' />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

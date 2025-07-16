import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function LoadingInquiries() {
  return (
    <div className='space-y-6'>
      {/* Header Loading */}
      <div>
        <Skeleton className='h-8 w-64 mb-2' />
        <Skeleton className='h-5 w-96' />
      </div>

      {/* Stats Cards Loading */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardContent className='p-6'>
              <Skeleton className='h-8 w-12 mb-2' />
              <Skeleton className='h-4 w-24' />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filter Loading */}
      <Card>
        <CardContent className='p-6'>
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex-1'>
              <Skeleton className='h-10 w-full' />
            </div>
            <Skeleton className='h-10 w-32' />
          </div>
        </CardContent>
      </Card>

      {/* Table Loading */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className='h-6 w-48' />
          </CardTitle>
          <CardDescription>
            <Skeleton className='h-4 w-72' />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Skeleton className='h-4 w-16' />
                </TableHead>
                <TableHead>
                  <Skeleton className='h-4 w-16' />
                </TableHead>
                <TableHead>
                  <Skeleton className='h-4 w-16' />
                </TableHead>
                <TableHead>
                  <Skeleton className='h-4 w-16' />
                </TableHead>
                <TableHead className='text-right'>
                  <Skeleton className='h-4 w-16 ml-auto' />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 2 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className='space-y-1'>
                      <Skeleton className='h-4 w-32' />
                      <Skeleton className='h-3 w-40' />
                      <Skeleton className='h-3 w-24' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-6 w-28 rounded-full' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-6 w-20 rounded-full' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-4 w-32' />
                  </TableCell>
                  <TableCell className='text-right'>
                    <div className='flex justify-end gap-2'>
                      <Skeleton className='h-8 w-16' />
                      <Skeleton className='h-8 w-8' />
                    </div>
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

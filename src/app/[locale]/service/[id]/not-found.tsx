import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='text-center'>
          <div className='mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
            <Search className='h-6 w-6 text-gray-400' />
          </div>
          <CardTitle>Service Not Found</CardTitle>
          <CardDescription>
            The service you are looking for doesnt exist or may have been
            removed.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Button variant='outline' asChild className='w-full bg-transparent'>
            <Link href='/'>Go to Homepage</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

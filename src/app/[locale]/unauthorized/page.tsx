import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldX } from "lucide-react";

export default function Unauthorized() {
  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='text-center'>
          <div className='mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4'>
            <ShieldX className='h-6 w-6 text-red-500' />
          </div>
          <CardTitle>Access Denied</CardTitle>
          <CardDescription>
            You dont have permission to access this resource. Please contact an
            administrator if you believe this is an error.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Button
            asChild
            className='w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300'
          >
            <Link href='/'>Go to Homepage</Link>
          </Button>
          <Button variant='outline' asChild className='w-full'>
            <Link href='/'>Contact Admin: info@decoletech.com</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

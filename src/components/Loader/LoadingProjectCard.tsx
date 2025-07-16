import { Card, CardContent, CardHeader } from "@/components/ui/card";

function LoadingProjectCard() {
  return (
    <Card className='group border-0 shadow-lg'>
      <div className='relative overflow-hidden rounded-t-lg'>
        <div className='w-full h-48 bg-gray-200 animate-pulse' />
        <div className='absolute top-4 right-4'>
          <div className='w-16 h-6 bg-gray-300 rounded-full animate-pulse' />
        </div>
      </div>
      <CardHeader className='pb-3'>
        <div className='w-3/4 h-6 bg-gray-200 rounded animate-pulse mb-2' />
        <div className='space-y-2'>
          <div className='w-full h-4 bg-gray-200 rounded animate-pulse' />
          <div className='w-2/3 h-4 bg-gray-200 rounded animate-pulse' />
        </div>
      </CardHeader>
      <CardContent className='pt-0'>
        <div className='flex flex-wrap gap-2'>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className='w-16 h-6 bg-gray-200 rounded animate-pulse'
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default LoadingProjectCard;

import React from "react";

export default function SubHeader({
  title,
  headline,
}: {
  title: string;
  headline: string;
}) {
  return (
    <div>
      <div className='flex justify-start items-start mb-8'>
        {/* Left side - PROJECT title */}
        <div className='relative'>
          <h1 className='text-2xl md:text-xl lg:text-3xl font-bold italic bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent leading-none transform -skew-x-6 '>
            {title}
          </h1>
          {/* Underlines */}
          <div className='absolute -bottom-4 left-0 flex space-x-2'>
            <div className='w-20 h-1 bg-gray-800 transform -skew-x-12'></div>
            <div className='w-24 h-1 bg-cyan-600 transform skew-x-12'></div>
            <div className='w-16 h-1 bg-gray-800 transform -skew-x-12'></div>
          </div>
          <div className='absolute -bottom-6 left-4 w-32 h-0.5 bg-gradient-to-r from-cyan-600 via-gray-600 to-transparent transform skew-x-6'></div>
        </div>
      </div>

      {/* Content below title */}
      <div className='max-w-4xl'>
        <p className='text-xl md:text-2xl text-gray-700 font-light leading-relaxed mb-6'>
          {headline}
        </p>
      </div>
    </div>
  );
}

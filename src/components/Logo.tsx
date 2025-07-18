import Image from "next/image";

import logo from "./../../public/logo12.png";
import Link from "next/link";

export default function Logo() {
  return (
    <div className='flex-shrink-0'>
      <Link
        href='/'
        className='md:text-2xl lg:text-2xl text-xl font-bold flex justify-between items-center gap-2'
      >
        <Image
          src={logo}
          height={100}
          width={100}
          alt='logo'
          // className='h-9 w-9 md:w-12 md:h-12 lg:w-12 lg:h-12 '
          className='h-12 w-52  md:h-12 lg:h-12 '
        />
      </Link>
    </div>
  );
}

import Image from "next/image";
import logo from "../.././public/logo.png";
import Link from "next/link";

export default function Logo() {
  return (
    <div className='flex-shrink-0'>
      <Link
        href='/'
        className='text-2xl font-bold flex justify-between items-center gap-2'
      >
        <Image
          src={logo}
          height={100}
          width={100}
          alt='logo'
          className='h-56 w-60 md:w-47 md:h-42 lg:w-60 lg:h-56 '
        />
      </Link>
    </div>
  );
}

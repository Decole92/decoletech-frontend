import Image from "next/image";
// import logo from "../.././public/logo.png";
import logo from "./../../public/favicon.png";
import Link from "next/link";
import { Montserrat } from "next/font/google";

const Inter = Montserrat({ weight: "600", subsets: ["latin"] });

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
          className='h-9 w-9 md:w-12 md:h-12 lg:w-12 lg:h-12 '
        />
        <div className='items-center'>
          <h1
            className='text-[#05347e] uppercase tracking-wider '
            style={{ fontFamily: '"Theo Van Doesburg", sans-serif' }}
          >
            Decole Tech
          </h1>
          <h4
            className={`${Inter} text-xs  dark:text-gray-400  md:tracking-[3px] tracking-[2px] md:pl-1 text-[#1e3a8a] `}
          >
            Smart. Scalable. Secure.
          </h4>
        </div>
      </Link>
    </div>
  );
}

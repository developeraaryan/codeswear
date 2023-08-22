import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MdDeveloperMode } from 'react-icons/md'
import { BsGithub } from 'react-icons/bs'
const Footer = () => {
  return (
    <div>
      <footer className="text-gray-600 body-font bg-gray-50 shadow-md">
        <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <Link href={'/'} legacyBehavior >
              <a className="flex  title-font font-medium items-center  justify-center text-gray-900">
                <Image src="/assets/footer bw.png" alt="wear the code" className='max-w-xs' width={1000} height={1000} />
              </a>
            </Link>
            <p className="mt-2 text-sm text-center text-gray-500 px-2">Wear What You Want!</p>
          </div>
          <div className="flex-grow flex flex-row flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div className="lg:w-1/2 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Shop</h2>
              <nav className="list-none mb-10">
                <li>
                  <Link href={'/allcollections'} className="text-gray-600 hover:text-gray-800">All Collections</Link>
                </li>
                <li>
                  <Link href={'/oversized'} className="text-gray-600 hover:text-gray-800">Oversized T-shirts</Link>
                </li>
                <li>
                  <Link href={'/allcollections'} className="text-gray-600 hover:text-gray-800">Basic T-shirts</Link>
                </li>
                <li>
                  <Link href={'/allcollections'} className="text-gray-600 hover:text-gray-800">Save upto 70%</Link>
                </li>
                <li>
                  <Link href={'/allcollections'} className="text-gray-600 hover:text-gray-800">Anime Collection</Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/2 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CONTACT</h2>
              <nav className="list-none mb-10">
                <li>
                  <Link href={'/contact'} className="text-gray-600 hover:text-gray-800">Contact Us</Link>
                </li>
                <li>
                  <Link href={'/about'} className="text-gray-600 hover:text-gray-800">About Us</Link>
                </li>
                <li>
                  <Link href={'/privacy'} className="text-gray-600 hover:text-gray-800">Privacy Policy</Link>
                </li>
                <li>
                  <Link href={'/refund'} className="text-gray-600 hover:text-gray-800">Refund Policy</Link>
                </li>
                <li>
                  <Link href={'/terms'} className="text-gray-600 hover:text-gray-800">Terms & Conditions</Link>
                </li>
              </nav>
            </div>

          </div>
        </div>
        <div className="bg-gray-100">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-500 text-sm text-center sm:text-left">© {new Date().getFullYear()} Blackworn.com — All Rights Reserved.
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
              <a className="text-gray-500 hover:text-[#0000ff]" href='https://www.facebook.com/profile.php?id=100093670233461&mibextid=ZbWKwL' target='_blank'>
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-500 hover:text-indigo-500" href='https://twitter.com/BlackWornIN?t=BC5t8PVrz56oi6mQNO-WyA&s=08' target='_blank'>
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-500 hover:text-[#ff0000]" href='https://instagram.com/blackwornfashion?igshid=MzRlODBiNWFlZA==' target='_blank'>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
            </span>
          </div>
        </div>

      </footer >
    </div >
  )
}

export default Footer
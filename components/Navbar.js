import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'

const Navbar = () => {
  return (
    <div className='flex flex-col md:flex-row md:justify-start justify-center items-center shadow-md mb-1 py-2'>
      <div className="logo mx-5">
        <Link href={'/'}>
          <Image src='/codeswear.png' alt='codeswear logo' width={250} height={40} />
        </Link>
      </div>
      <div className="nav">
        <ul className='flex items-center space-x-6 font-bold md:text-md'>
          <Link href={'/tshirts'} legacyBehavior><a><li>T-shirts</li></a></Link>
          <Link href={'/hoodies'} legacyBehavior><a><li>Hoodies</li></a></Link>
          <Link href={'/mugs'} legacyBehavior><a><li>Mugs</li></a></Link>
          <Link href={'/stickers'} legacyBehavior><a><li>Stickers</li></a></Link>
        </ul>
      </div>
      <div className="cart absolute right-0 mx-5 md:top-4">
        <AiOutlineShoppingCart className=' text-3xl md:text-2xl ' />
      </div>
    </div>
  )
}

export default Navbar
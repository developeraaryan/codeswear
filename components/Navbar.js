import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'
import { AiFillCloseCircle, AiOutlineShoppingCart, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import { BsFillBagCheckFill, BsFillCartXFill } from 'react-icons/bs';

const Navbar = () => {
  const toggleCart = () => {
    if (ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-full')
      ref.current.classList.add('translate-x-0')
    }
    else if (!ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-0')
      ref.current.classList.add('translate-x-full')
    }

  }
  const ref = useRef()
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
      <div onClick={toggleCart} className="cart absolute right-0 mx-5 md:top-4 cursor-pointer">
        <AiOutlineShoppingCart className=' text-3xl md:text-2xl' />
      </div>
      <div ref={ref} className="w-72 h-full sideCart absolute top-0 right-0 bg-pink-100 py-2 px-8 p-10 transform transition-transform translate-x-full ">
        <h2 className='font-bold text-xl text-center'>Shoping Cart</h2>
        <span onClick={toggleCart} className="absolute top-5 right-2 cursor-pointer text-2xl text-pink-500">
          <AiFillCloseCircle />
        </span>
        <ol className='list-decimal font-semibold' >
          <li>
            <div className="item flex my-5">
              <div className='w-2/3 font-semibold'>
                Tshirt-wear the code
              </div>
              <div className='flex items-center justify-center w-1/3 font-semibold text-lg'>
                <AiFillMinusCircle className='text-pink-500 cursor-pointer' /><span className='mx-2 text-sm'>1</span><AiFillPlusCircle className='text-pink-500 cursor-pointer' />
              </div>
            </div>
          </li>
          <li>
            <div className="item flex my-5">
              <div className='w-2/3 font-semibold'>
                Tshirt-wear the code
              </div>
              <div className='flex items-center justify-center w-1/3 font-semibold text-lg'>
                <AiFillMinusCircle className='text-pink-500 cursor-pointer' /><span className='mx-2 text-sm'>1</span><AiFillPlusCircle className='text-pink-500 cursor-pointer' />
              </div>
            </div>
          </li>
          <li>
            <div className="item flex my-5">
              <div className='w-2/3 font-semibold'>
                Tshirt-wear the code
              </div>
              <div className='flex items-center justify-center w-1/3 font-semibold text-lg'>
                <AiFillMinusCircle className='text-pink-500 cursor-pointer' /><span className='mx-2 text-sm'>1</span><AiFillPlusCircle className='text-pink-500 cursor-pointer' />
              </div>
            </div>
          </li>
          <li>
            <div className="item flex my-5">
              <div className='w-2/3 font-semibold'>
                Tshirt-wear the code
              </div>
              <div className='flex items-center justify-center w-1/3 font-semibold text-lg'>
                <AiFillMinusCircle className='text-pink-500 cursor-pointer' /><span className='mx-2 text-sm'>1</span><AiFillPlusCircle className='text-pink-500 cursor-pointer' />
              </div>
            </div>
          </li>
          <li>
            <div className="item flex my-5">
              <div className='w-2/3 font-semibold'>
                Tshirt-wear the code
              </div>
              <div className='flex items-center justify-center w-1/3 font-semibold text-lg'>
                <AiFillMinusCircle className='text-pink-500 cursor-pointer' /><span className='mx-2 text-sm'>1</span><AiFillPlusCircle className='text-pink-500 cursor-pointer' />
              </div>
            </div>
          </li>
          <li>
            <div className="item flex my-5">
              <div className='w-2/3 font-semibold'>
                Tshirt-wear the code
              </div>
              <div className='flex items-center justify-center w-1/3 font-semibold text-lg'>
                <AiFillMinusCircle className='text-pink-500 cursor-pointer' /><span className='mx-2 text-sm'>1</span><AiFillPlusCircle className='text-pink-500 cursor-pointer' />
              </div>
            </div>
          </li>
          <li>
            <div className="item flex my-5">
              <div className='w-2/3 font-semibold'>
                Tshirt-wear the code
              </div>
              <div className='flex items-center justify-center w-1/3 font-semibold text-lg'>
                <AiFillMinusCircle className='text-pink-500 cursor-pointer' /><span className='mx-2 text-sm'>1</span><AiFillPlusCircle className='text-pink-500 cursor-pointer' />
              </div>
            </div>
          </li>
          <li>
            <div className="item flex my-5">
              <div className='w-2/3 font-semibold'>
                Tshirt-wear the code
              </div>
              <div className='flex items-center justify-center w-1/3 font-semibold text-lg'>
                <AiFillMinusCircle className='text-pink-500 cursor-pointer' /><span className='mx-2 text-sm'>1</span><AiFillPlusCircle className='text-pink-500 cursor-pointer' />
              </div>
            </div>
          </li>
          <li>
            <div className="item flex my-5">
              <div className='w-2/3 font-semibold'>
                Tshirt-wear the code
              </div>
              <div className='flex items-center justify-center w-1/3 font-semibold text-lg'>
                <AiFillMinusCircle className='text-pink-500 cursor-pointer' /><span className='mx-2 text-sm'>1</span><AiFillPlusCircle className='text-pink-500 cursor-pointer' />
              </div>
            </div>
          </li>
          <li>
            <div className="item flex my-5">
              <div className='w-2/3 font-semibold'>
                Tshirt-wear the code
              </div>
              <div className='flex items-center justify-center w-1/3 font-semibold text-lg'>
                <AiFillMinusCircle className='text-pink-500 cursor-pointer' /><span className='mx-2 text-sm'>1</span><AiFillPlusCircle className='text-pink-500 cursor-pointer' />
              </div>
            </div>
          </li>
        </ol>
        <div className="flex">
          <button className="flex mr-2  text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"><BsFillBagCheckFill className='m-1' /> Checkout</button>
          <button className="flex mr-2  text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">Clear Cart</button>
        </div>

      </div>
    </div>
  )
}

export default Navbar
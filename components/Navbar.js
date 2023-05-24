import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { AiFillCloseCircle, AiOutlineShoppingCart, AiFillPlusCircle, AiFillMinusCircle, AiFillHome, AiOutlineHome } from 'react-icons/ai'
import { BsFillBagCheckFill, BsFillCartXFill } from 'react-icons/bs';
import { MdAccountCircle, MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { FaMugHot, FaTshirt } from 'react-icons/fa'
import { TbSticker } from 'react-icons/tb'
import { IoIosArrowDropleft } from 'react-icons/io'

const Navbar = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {
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

  // const sidebarItems = [
  //   {
  //     name: "Home",
  //     href: "/",
  //     icons: <AiFillHome />
  //   },
  //   {
  //     name: "T-Shirts",
  //     href: "/tshirts",
  //     icons: <FaTshirt />
  //   },
  //   {
  //     name: "Hoodies",
  //     href: "/hoodies",
  //     icons: <FaTshirt />
  //   },
  //   {
  //     name: "Mugs",
  //     href: "/mugs",
  //     icons: <FaMugHot />
  //   },
  //   {
  //     name: "Stickers",
  //     href: "/stickers",
  //     icons: <TbSticker />
  //   },
  // ]
  // const [isCollapsedSidebar, setIsCollapsedSidebar] = useState(false)
  // const toggleSidebarCollapseHandler = () => {
  //   setIsCollapsedSidebar((prev) => !prev)
  // }
  return (
    < div className='flex flex-col md:flex-row md:justify-start justify-center items-center shadow-md mb-1 py-2 sticky top-0 bg-gray-200 dark:bg-black dark:text-white z-10 h-14 hover:font-black ' >
      <div className="logo mx-5 invert">
        <Link href={'/'}>
          <Image src='/assets/BW LOGO White.png' alt='codeswear logo' width={25} height={50} priority={true} />
        </Link>
      </div>
      {/* < button onClick={toggleSidebarCollapseHandler} className='btn absolute right-0 top-16 border bg-white w-6 h-6 border-white text-black rounded-full' >
        <MdOutlineKeyboardArrowLeft />
      </ button>
      <aside data-collapse={isCollapsedSidebar} className='sidebar h-[100vh] absolute top-0'>
        <div className='sidebar_top'>
          <Link href={'/'}>
            <Image src='/assets/BW LOGO White.png' alt='codeswear logo' width={25} height={50} priority={true} />
          </Link>
          <p className="sidebar_logo-name">Black Worn</p>
        </div>
        <ul className="sidebar_list">
          {sidebarItems.map((item) => {
            return <li key={item.name} className="sidebar_item">
              <Link href={`${item.href}`} className='sidebar_link'>
                <span className="sidebar_icon">
                  {item.icons}
                </span>
                <span className='sidebar_name'>{item.name}</span>
              </Link>
            </li>
          })}
        </ul>
      </aside> */}
      <div className="nav">
        <ul className='flex items-center space-x-6 font-bold md:text-md'>
          <Link href={'/tshirts'} legacyBehavior><a><li className='hover:text-gray-400'>T-shirts</li></a></Link>
          <Link href={'/hoodies'} legacyBehavior><a><li className='hover:text-gray-400'>Hoodies</li></a></Link>
          <Link href={'/mugs'} legacyBehavior><a><li className='hover:text-gray-400'>Mugs</li></a></Link>
          <Link href={'/stickers'} legacyBehavior><a><li className='hover:text-gray-400'>Stickers</li></a></Link>
        </ul>
      </div>
      <div className="flex cart absolute right-0 mx-5 md:top-4 cursor-pointer  ">
        <Link href={'/login'}><MdAccountCircle className=' text-3xl md:text-2xl mx-2' /></Link>
        <AiOutlineShoppingCart className=' text-3xl md:text-2xl' onClick={toggleCart} />
      </div>
      <div ref={ref} className={`overflow-y-scroll w-72 h-[100vh] sideCart absolute top-0 right-0 bg-pink-100 dark:text-black py-2 px-8 p-10 transform transition-transform ${Object.keys(cart).length !== 0 ? `translate-x-0` : `translate-x-full`}  `}>
        <h2 className='font-bold text-xl text-center'>Shoping Cart</h2>
        <span onClick={toggleCart} className="absolute top-5 right-2 cursor-pointer text-2xl text-pink-500">
          <AiFillCloseCircle />
        </span>
        <ol className='list-decimal font-semibold' >
          {Object.keys(cart).length === 0 &&
            <div className='my-12 text-lg text-center font-normal'>Your cart is empty</div>}
          {Object.keys(cart).map((k) => {
            return <li key={k}>
              <div className="item flex my-5">
                <div className='w-2/3 font-semibold'>
                  {cart[k].name}({cart[k].size}/{cart[k].color})
                </div>
                <div className='flex items-center justify-center w-1/3 font-semibold text-lg'>
                  <AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].color) }} className='text-pink-500 cursor-pointer' /><span className='mx-2 text-sm'>{cart[k].qty}</span><AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].color) }} className='text-pink-500 cursor-pointer' />
                </div>
              </div>
            </li>
          })}
        </ol>
        <div className="font-bold my-2">SubTotal : ₹{subTotal} </div>

        <div className="flex">
          <Link href={'/checkout'}><button className="flex mr-2  text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"><BsFillBagCheckFill className='m-1' /> Checkout</button></Link>
          <button onClick={clearCart} className="flex mr-2  text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">Clear Cart</button>
        </div>

      </div>

    </div >

  )
}

export default Navbar
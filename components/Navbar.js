import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { AiFillCloseCircle, AiOutlineShoppingCart, AiFillPlusCircle, AiFillMinusCircle, AiOutlineUser, AiOutlineClose, AiOutlineHeart } from 'react-icons/ai'
import { BsFillBagCheckFill, BsFillCartCheckFill, BsHandbag, BsSearch, BsTwitter } from 'react-icons/bs';
import { MdAccountCircle, MdManageAccounts } from 'react-icons/md'
import { FaFacebookF, FaMugHot, FaTshirt } from 'react-icons/fa'
import { TbSticker } from 'react-icons/tb'
import { useRouter } from 'next/router';
import FeatherIcon from "feather-icons-react";
import { GiHoodie } from 'react-icons/gi'
import { Badge, Button, Drawer, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import {
  HomeOutlined,
} from "@material-ui/icons"
import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import { BiLogIn, BiLogOut, BiUser } from 'react-icons/bi'
import { RxCross2 } from 'react-icons/rx'
import { FiInstagram } from 'react-icons/fi'
import HeartIcon from './HeartIcon';

const Navbar = ({ logout, user, cart, addToCart, removeFromCart, clearCart, subTotal, params }) => {
  const { data: session } = useSession()
  const [sidebar, setSidebar] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  function toggleCart() {
    // if (ref.current.classList.contains('translate-x-full')) {
    //   ref.current.classList.remove('translate-x-full');
    //   ref.current.classList.add('translate-x-0');
    // }
    // else if (!ref.current.classList.contains('translate-x-full')) {
    //   ref.current.classList.remove('translate-x-0');
    //   ref.current.classList.add('translate-x-full');
    // }
    setSidebar(!sidebar)
  }
  const router = useRouter()
  useEffect(() => {
    Object.keys(cart).length !== 0 && setSidebar(true)
    const exapted = ["/checkout", "/order", "/orders", "/myaccount", "/login", "/signup"]
    if (exapted.includes(router.pathname)) {
      setSidebar(false)
    }
  }, [cart, router.pathname])




  const ref = useRef()
  const [open, setOpen] = useState(false);


  const CollectionData = [
    {
      name: "Home",
      // icon: <HomeOutlined style={{ color: "yellowgreen" }} />,
      href: "/"
    },
    {
      name: "T-Shirts",
      // icon: <FaTshirt color='yellowgreen' />,
      href: "/tshirts"
    },
    {
      name: "Hoodies",
      // icon: <GiHoodie color='yellowgreen' />,
      href: "/hoodies"
    },
    {
      name: "Mugs",
      // icon: <FaMugHot color='yellowgreen' />,
      href: "/mugs"
    },
    {
      name: "Stickers",
      // icon: <TbSticker color='yellowgreen' />,
      href: "/stickers"
    },
  ];

  const CustomerData = [
    {
      name: "Track Order",
      // icon: <HomeOutlined style={{ color: "yellowgreen" }} />,
      href: "/"
    },
    {
      name: "Wishlist",
      // icon: <FaTshirt color='yellowgreen' />,
      href: "/tshirts"
    },
    {
      name: "My Cart",
      // icon: <GiHoodie color='yellowgreen' />,
      href: "/hoodies"
    },
    {
      name: "Contact Us",
      // icon: <FaMugHot color='yellowgreen' />,
      href: "/mugs"
    },

  ];

  const socailData = [
    {
      name: "Facebook",
      icon: <FaFacebookF
        size={25}
        className='hover:text-[#0000ff]'
      />,
      href: "https://www.facebook.com/"
    },
    {
      name: "Instagram",
      icon: <FiInstagram
        size={25}
        className='hover:text-[#ff0000]'
      />,
      href: "https://www.instagram.com/"

    },
    {
      name: "Twitter",
      icon: <BsTwitter
        className='hover:text-indigo-500'
        size={25} />,
      href: "https://twitter.com/"
    },

  ]

  const getList = () => (

    <div className='bg-white' style={{
      top: 10,
      width: 250,
      color: "black",
      height: "100vh",
    }} onClick={() => setOpen(false)}>
      <ListItem ListItem className={`relative top-3 h-8`}>
        <Link className='flex' href={'/login'}>

          <ListItemIcon><BiUser className='text-3xl p-1 mt-2 bg-gray-400 rounded-full text-black' /></ListItemIcon>
          <ListItemText className='pt-2 -ml-3' primary='LOGIN/SIGNUP' />

        </Link>

      </ListItem>
      <ListItemIcon>
        <Button><RxCross2 onClick={() => setOpen(true)} className='text-xl -right-48 relative -top-8 bg-white rounded-full text-black font-bold' />
        </Button>
      </ListItemIcon>
      <Image src='/assets/free-shipping.png' width={200} height={200} className='mx-0 w-fit -mb-3' />
      <ListItem ListItem className={`relative top-3 mb-3 bg-gray-300`}>
        <Link className='flex' href={'/login'}>

          <ListItemText className='mx-4 !font-bold' primary='COLLECTIONS' />

        </Link>

      </ListItem>
      {CollectionData.map((item, index) => (
        <ListItem ListItem className={`hover:!bg-blue-400 h-10`} key={index} >
          <Link className='flex hover:translate-x-10 transition-all duration-500' href={item.href}>

            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </Link>
        </ListItem>
      ))
      }
      <ListItem ListItem className={`relative top-3 -mt-3 mb-3 bg-gray-300`}>
        <Link className='flex' href={'/login'}>

          <ListItemText className='mx-4 !font-bold' primary='CUSTOMER SERVICE' />

        </Link>

      </ListItem>
      {CustomerData.map((item, index) => (
        <ListItem ListItem className={`hover:!bg-blue-400 h-10`} key={index} >
          <Link className='flex hover:translate-x-10 transition-all duration-500' href={item.href}>

            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </Link>
        </ListItem>
      ))
      }
      <ListItem ListItem className={`relative top-3 -mt-3 mb-3 bg-gray-300`}>
        <Link className='flex' href={'/login'}>

          <ListItemText className='mx-4 !font-bold' primary='CONNECT WITH US' />

        </Link>

      </ListItem>

      <ListItem ListItem className={`relative top-0 mb-3 bg-gray-200`}>
        {socailData.map((item) => {
          return <Link key={item.name} className='flex' target='_blank' href={item.href}>

            <ListItemIcon className='mx-2 mr-3 !font-bold'  >
              {item.icon}
            </ListItemIcon>

          </Link>
        })}

      </ListItem>
      <Image src='/assets/thank-you.png' width={400} height={400} className='mx-0 w-full -mt-4' />

    </div >
  );

  return (<>

    <span>
      {dropdown && <div onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} className='absolute right-10 bg-[#272A30]  text-white  shadow-lg shadow-slate-600  top-10 py-4  rounded-md px-5 w-40 z-30 '>
        <ul>
          {!session && <>
            <li>
              <Link href={'/login'} className='flex hover:text-red-500'>
                <BiLogIn className=' text-2xl -ml-1' />
                <span className='font-bold text-sm  items-center pt-1 px-3' >Login</span>
              </Link>
            </li>
          </>
          }
          {session && <>
            <li className='py-4'>
              <Link href={'/myaccount'} className='flex hover:text-red-500'>
                <MdManageAccounts className=' text-3xl -ml-1' />
                <span className='font-bold text-sm  items-center pt-2 px-1'>My Account</span>
              </Link></li>
            <li className='py-4 '>
              <Link href={'/orders'} className='flex hover:text-red-500'>
                <BsFillCartCheckFill className=' text-2xl md:text-3xl mx-2 -ml-1' />
                <span className='font-bold text-sm  items-center pt-2'>Orders</span>
              </Link>
            </li>
            <li className='py-4'>
              <a onClick={signOut} className='flex hover:text-red-500 cursor-pointer'>
                <BiLogIn className=' text-3xl md:text-2xl mx-2 -ml-1' />
                <span className='font-bold text-sm  items-center pt-1'>Logout</span>
              </a>
            </li>
          </>
          }
        </ul>
      </div>}
    </span >


    < div className={`flex mb-0 flex-row md:flex-row md:justify-start justify-center items-center shadow-md py-2 sticky top-0 bg-black dark:bg-black space dark:text-white z-10 h-14 dark:shadow-gray-400 dark:shadow-md ${!sidebar && 'overflow-hidden'}`} >


      <div className='absolute left-0'>
        <Button onClick={() => setOpen(true)}><FeatherIcon
          style={{
            color: `white`,
          }}
          icon="align-justify"
          width="20"
          height="20"
        /></Button>
        <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)}>
          {getList()}
        </Drawer>
      </div>



      <div className=" logo right-auto mx-auto hover:font-black dark:invert-0 my-auto ">
        <Link href={'/'}>
          <Image src='/assets/BW LOGO White.png' alt='codeswear logo' width={40} height={60} priority loading='eager' />
        </Link>
      </div>


      <div className="flex cart absolute right-0 mx-5 md:top-4 cursor-pointer items-center ">

        <span className=''>
          <BsSearch className=' text-3xl md:text-xl' onClick={toggleCart} />
        </span>

        <Badge className='z-0 mx-2 ' color="primary">
          <HeartIcon className='rounded-full hover:fill-red-700 text-3xl md:text-2xl' onClick={'/wishlist'} />
        </Badge>

        <Badge className='z-0' badgeContent={Object.keys(cart).length} color="primary">
          <BsHandbag className=' text-3xl md:text-2xl' onClick={toggleCart} />
        </Badge>
        <span onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} className="dropdown" >
          <label tabIndex={0} className="cursor-pointer">
            <AiOutlineUser className=' text-3xl md:text-2xl mx-2' />
          </label>
        </span>
      </div>
      <div ref={ref} className={`overflow-y-scroll w-72 h-[100vh] sideCart absolute top-0  bg-gray-800 text-white dark:text-black py-2 px-8 p-10  transition-all ${sidebar ? `right-0` : `-right-96`}`}>
        <h2 className='font-bold text-xl text-center text-white'>Shoping Cart</h2>
        <span onClick={toggleCart} className="absolute top-5 right-2 cursor-pointer text-2xl text-indigo-300 transition-all hover:rotate-[180deg] duration-300">
          <AiOutlineClose />
        </span>
        <ol className='list-decimal font-semibold text-white' >
          {Object.keys(cart).length === 0 &&
            <div className='my-12 text-lg text-center font-normal'>Your cart is empty</div>}
          {Object.keys(cart).map((k) => {
            return <li key={k}>
              <div className="item flex my-5">
                <div className='w-2/3 font-semibold'>
                  {cart[k].name}({cart[k].size}/{cart[k].color})
                </div>
                <div className='flex items-center justify-center w-1/3 font-semibold text-lg'>
                  <AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].color) }} className='text-indigo-500 cursor-pointer' /><span className='mx-2 text-sm'>{cart[k].qty}</span><AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].color) }} className='text-indigo-500 cursor-pointer' />
                </div>
              </div>
            </li>
          })}
        </ol>
        <div className="font-bold my-2 text-white">SubTotal : ₹{subTotal} </div>

        <div className="flex">
          <Link href={'/checkout'}><button disabled={Object.keys(cart).length === 0} className="disabled:bg-indigo-400 disabled:cursor-not-allowed flex mr-2  text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm"><BsFillBagCheckFill className='m-1' /> Checkout</button></Link>
          <button disabled={Object.keys(cart).length === 0} onClick={clearCart} className="flex mr-2  text-white disabled:bg-indigo-400 disabled:cursor-not-allowed bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm">Clear Cart</button>
        </div>

      </div>

    </div >
  </>
  )
}

export default Navbar
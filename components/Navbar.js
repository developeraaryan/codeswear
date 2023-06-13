import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { AiFillCloseCircle, AiOutlineShoppingCart, AiFillPlusCircle, AiFillMinusCircle, AiFillHome } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md'
import { FaMugHot, FaTshirt } from 'react-icons/fa'
import { TbSticker } from 'react-icons/tb'
import { useRouter } from 'next/router';
import FeatherIcon from "feather-icons-react";
import { Badge, Button, Drawer, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import {
  CheckBoxOutlineBlankOutlined,
  DraftsOutlined,
  HomeOutlined,
  InboxOutlined,
  MailOutline,
  ReceiptOutlined,
} from "@material-ui/icons"

const Navbar = ({ logout, user, cart, addToCart, removeFromCart, clearCart, subTotal }) => {
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
    const exapted = ["/checkout", "/order", "/orders", "/myaccount"]
    if (exapted.includes(router.pathname)) {
      setSidebar(false)
    }
  }, [cart, router.pathname])

  const ref = useRef()
  const [open, setOpen] = useState(false);


  const data = [
    {
      name: "Home",
      icon: <HomeOutlined />,
      href: "/"
    },
    {
      name: "T-Shirts",
      icon: <InboxOutlined />,
      href: "/tshirts"
    },
    {
      name: "Hoodies",
      icon: <CheckBoxOutlineBlankOutlined />,
      href: "/hoodies"
    },
    {
      name: "Mugs",
      icon: <MailOutline />,
      href: "/mugs"
    },
    {
      name: "Stickers",
      icon: <DraftsOutlined />,
      href: "/stickers"
    },
  ];

  const getList = () => (
    <div style={{ width: 250 }} onClick={() => setOpen(false)}>
      {data.map((item, index) => (
        <ListItemButton key={index} href={item.href}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItemButton>
      ))}
    </div>
  );

  return (<>

    <span>
      {dropdown && <div onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} className='absolute right-16 bg-[#272A30]  text-white  shadow-lg shadow-slate-600  top-10 py-4  rounded-md px-5 w-32 z-30 '>
        <ul>
          {!user.value && <>
            <li>
              <Link href={'/login'}>
                {/* <BiLogIn className=' text-xl mx-2' /> */}
                <span className='font-bold text-sm hover:text-red-500'>Login</span>
              </Link>
            </li>
          </>
          }
          {user.value && <>
            <li>
              <Link href={'/myaccount'}>
                {/* <MdManageAccounts className=' text-xl' /> */}
                <span className='font-bold text-sm hover:text-red-500'>My Account</span>
              </Link></li>
            <li>
              <Link href={'/orders'}>
                {/* <BsFillCartCheckFill className=' text-3xl md:text-3xl mx-2 -ml-1' /> */}
                <span className='font-bold text-sm hover:text-red-500'>Orders</span>
              </Link>
            </li>
            <li>
              <a onClick={logout}>
                {/* <BiLogIn className=' text-3xl md:text-3xl mx-2 -ml-1' /> */}
                <span className='font-bold text-sm hover:text-red-500 cursor-pointer'>Logout</span>
              </a>
            </li>
          </>
          }
        </ul>
      </div>}
    </span>


    < div className={`flex flex-row md:flex-row md:justify-start justify-center items-center shadow-md mb-1 py-2 sticky top-0 bg-gray-200 dark:bg-black space dark:text-white z-10 h-14 dark:shadow-gray-400 dark:shadow-md ${!sidebar && 'overflow-hidden'}`} >


      <div>
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



      <div className=" logo mx-auto invert hover:font-black dark:invert-0 my-auto ">
        <Link href={'/'}>
          <Image src='/assets/BW LOGO White.png' alt='codeswear logo' width={40} height={60} priority={true} />
        </Link>
      </div>


      {/* <div className="nav">
        <ul className='flex items-center space-x-6 font-bold md:text-md'>
          <Link href={'/tshirts'} legacyBehavior><a><li className='hover:text-gray-400'>T-shirts</li></a></Link>
          <Link href={'/hoodies'} legacyBehavior><a><li className='hover:text-gray-400'>Hoodies</li></a></Link>
          <Link href={'/mugs'} legacyBehavior><a><li className='hover:text-gray-400'>Mugs</li></a></Link>
          <Link href={'/stickers'} legacyBehavior><a><li className='hover:text-gray-400'>Stickers</li></a></Link>
        </ul>
      </div> */}
      <div className="flex cart absolute right-0 mx-5 md:top-4 cursor-pointer items-center ">


        <span onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} className="dropdown" >
          <label tabIndex={0} className="cursor-pointer">
            <MdAccountCircle className=' text-3xl md:text-2xl mx-2' />
          </label>
        </span>



        <Badge className='z-0' badgeContent={Object.keys(cart).length} color="primary">
          <AiOutlineShoppingCart className=' text-3xl md:text-2xl' onClick={toggleCart} />
        </Badge>
      </div>
      <div ref={ref} className={`overflow-y-scroll w-72 h-[100vh] sideCart absolute top-0  bg-pink-100 dark:text-black py-2 px-8 p-10  transition-all ${sidebar ? `right-0` : `-right-96`}`}>
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
          <Link href={'/checkout'}><button disabled={Object.keys(cart).length === 0} className="disabled:bg-pink-400 flex mr-2  text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"><BsFillBagCheckFill className='m-1' /> Checkout</button></Link>
          <button disabled={Object.keys(cart).length === 0} onClick={clearCart} className="flex mr-2  text-white disabled:bg-pink-400 bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">Clear Cart</button>
        </div>

      </div>

    </div >
  </>
  )
}

export default Navbar
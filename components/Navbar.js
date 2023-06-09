import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { AiFillCloseCircle, AiOutlineShoppingCart, AiFillPlusCircle, AiFillMinusCircle, AiFillHome, AiOutlineHome } from 'react-icons/ai'
import { BsFillBagCheckFill, BsFillCartCheckFill, BsFillCartXFill } from 'react-icons/bs';
import { MdAccountCircle, MdManageAccounts, MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { FaMugHot, FaTshirt, FaUserAlt } from 'react-icons/fa'
import { TbSticker } from 'react-icons/tb'
import { IoIosArrowDropleft } from 'react-icons/io'
import { BiLogIn } from 'react-icons/bi'
import { RiAccountCircleFill, RiAccountPinCircleFill } from 'react-icons/ri'
import { useRouter } from 'next/router';

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
  }, [cart])

  const ref = useRef()


  const sidebarItems = [
    {
      name: "Home",
      href: "/",
      icons: <AiFillHome />
    },
    {
      name: "T-Shirts",
      href: "/tshirts",
      icons: <FaTshirt />
    },
    {
      name: "Hoodies",
      href: "/hoodies",
      icons: <FaTshirt />
    },
    {
      name: "Mugs",
      href: "/mugs",
      icons: <FaMugHot />
    },
    {
      name: "Stickers",
      href: "/stickers",
      icons: <TbSticker />
    },
  ]
  const [isCollapsedSidebar, setIsCollapsedSidebar] = useState(false)
  const toggleSidebarCollapseHandler = () => {
    setIsCollapsedSidebar((prev) => !prev)
  }

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


    < div className={`flex flex-col md:flex-row md:justify-start justify-center items-center shadow-md mb-1 py-2 sticky top-0 bg-gray-200 dark:bg-black space dark:text-white z-10 h-14 dark:shadow-gray-400 dark:shadow-md ${!sidebar && 'overflow-hidden'}`} >



      <div className=" logo mx-5 invert hover:font-black dark:invert-0 my-auto ">
        <Link href={'/'}>
          <Image src='/assets/BW LOGO White.png' alt='codeswear logo' width={40} height={60} priority={true} />
        </Link>
      </div>






      {/* <!-- Sidenav --> */}
      {/* <nav
        id="sidenav-2"
        class="fixed left-0 top-0 z-[1035] h-screen w-60 -translate-x-full overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:translate-x-0 dark:bg-zinc-800"
        data-te-sidenav-init
        data-te-sidenav-hidden="false"
        data-te-sidenav-mode="side"
        data-te-sidenav-content="#content">
        <ul class="relative m-0 list-none px-[0.2rem]" data-te-sidenav-menu-ref>
          <li class="relative">
            <a
              class="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
              data-te-sidenav-link-ref>
              <span
                class="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-4 w-4">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                </svg>
              </span>
              <span>Link 1</span>
            </a>
          </li>
          <li class="relative">
            <a
              class="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
              data-te-sidenav-link-ref>
              <span
                class="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="h-4 w-4">
                  <path
                    fill-rule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z"
                    clip-rule="evenodd" />
                </svg>
              </span>
              <span>Category 1</span>
              <span
                class="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 ease-linear motion-reduce:transition-none [&>svg]:text-gray-600 dark:[&>svg]:text-gray-300"
                data-te-sidenav-rotate-icon-ref>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-5 w-5">
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd" />
                </svg>
              </span>
            </a>
            <ul
              class="!visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block "
              data-te-sidenav-collapse-ref>
              <li class="relative">
                <a
                  class="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                  data-te-sidenav-link-ref
                >Link 2</a
                >
              </li>
              <li class="relative">
                <a
                  class="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                  data-te-sidenav-link-ref
                >Link 3</a
                >
              </li>
            </ul>
          </li>
          <li class="relative">
            <a
              class="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
              data-te-sidenav-link-ref>
              <span
                class="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="h-4 w-4">
                  <path
                    fill-rule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z"
                    clip-rule="evenodd" />
                </svg>
              </span>
              <span>Category 2</span>
              <span
                class="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 ease-linear motion-reduce:transition-none [&>svg]:text-gray-600 dark:[&>svg]:text-gray-300"
                data-te-sidenav-rotate-icon-ref>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-5 w-5">
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd" />
                </svg>
              </span>
            </a>
            <ul
              class="show !visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block "
              data-te-sidenav-collapse-ref>
              <li class="relative">
                <a
                  class="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                  data-te-sidenav-link-ref
                >Link 4</a
                >
              </li>
              <li class="relative">
                <a
                  class="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                  data-te-sidenav-link-ref
                >Link 5</a
                >
              </li>
            </ul>
          </li>
        </ul>
      </nav> */}
      {/* <!-- Sidenav --> */}

      {/* <div class="p-5 !pl-[260px] text-center" id="content">
        <!-- Toggler -->
        <button
          data-te-collapse-show
          class=" inline-block rounded bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg bg-black"
          data-te-sidenav-toggle-ref
          data-te-target="#sidenav-2"
          aria-controls="#sidenav-2"
          aria-haspopup="true">
          <span class="block [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-5 w-5">
              <path
                fill-rule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clip-rule="evenodd" />
            </svg>
          </span>
        </button>
        <!-- Toggler -->

      </div> */}


      {/* < button onClick={toggleSidebarCollapseHandler} className='btn  top-16 border bg-white w-6 h-6 border-white text-black rounded-full' >
        <MdOutlineKeyboardArrowLeft />
      </ button> */}
      {/* <aside data-collapse={isCollapsedSidebar} className='sidebar h-[100vh] absolute top-0 left-0'>
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
      <div className="flex cart absolute right-0 mx-5 md:top-4 cursor-pointer items-center ">


        <span onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} className="dropdown" >
          <label tabIndex={0} className="cursor-pointer"><MdAccountCircle className=' text-3xl md:text-2xl mx-2' /></label>

        </span>




        <AiOutlineShoppingCart className=' text-3xl md:text-2xl' onClick={toggleCart} />
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
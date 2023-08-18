import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BsFillCartCheckFill, BsHandbag, BsTwitter } from 'react-icons/bs';
import { MdManageAccounts } from 'react-icons/md';
import { FaFacebookF } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { Badge, Button, Drawer, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useSession, signOut } from 'next-auth/react';
import { BiLogIn, BiUser } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';
import { FiInstagram } from 'react-icons/fi';
import HeartIcon from './HeartIcon';
import SearchDD from '../src/layouts/header/SearchDD';
import { FaBarsStaggered } from 'react-icons/fa6';
import { Modal, useModal, Text } from '@nextui-org/react';
import emptyImg from '../public/assets/empty-cart-png.png';
import CartItem from './CartItem';
import { useUserAuth } from '../context/UserAuthContext';
import localFont from 'next/font/local';

const gotham = localFont({ src: '../assets/fonts/Gotham/GothamMedium.ttf' });

const Navbar = ({ cart, addToCart, removeFromCart, subTotal }) => {
  const router = useRouter()
  const { setVisible, bindings } = useModal();
  const { user, logOut } = useUserAuth()
  // const [visible, setVisible] = useState(false);
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const { data: session } = useSession();
  const [sidebar, setSidebar] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const toggleCartModal = () => {
    setVisible(true);
  };

  useEffect(() => {
    if (Object.keys(cart).length !== 0) {
      setSidebar(true);
    }

    const exempted = ['/checkout', '/order', '/orders', '/myaccount', '/login', '/signup'];

    if (exempted.includes(router.pathname)) {
      setSidebar(false);
    }
  }, [cart, router.pathname]);

  const [open, setOpen] = useState(false);

  const CollectionData = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'All Collections',
      href: '/allcollections',
    },
    {
      name: 'Oversized T-Shirts',
      href: '/oversized',
    },
    {
      name: 'Basic T-Shirts',
      href: '/basic',
    },
    {
      name: 'Save upto 70%',
      href: '/sale',
    },
    {
      name: 'Anime Collection',
      href: '/anime',
    },
  ];

  const CustomerData = [
    {
      name: 'Track Order',
      href: '/orders',
    },
    {
      name: 'Wishlist',
      href: '/wishlist',
    },

    {
      name: 'Contact Us',
      href: '/contact',
    },
  ];

  const socailData = [
    {
      name: 'Facebook',
      icon: (
        <FaFacebookF
          size={25}
          className="hover:text-[#0000ff]"
        />
      ),
      href: 'https://www.facebook.com/profile.php?id=100093670233461&mibextid=ZbWKwL',
    },
    {
      name: 'Instagram',
      icon: (
        <FiInstagram
          size={25}
          className="hover:text-[#ff0000]"
        />
      ),
      href: 'https://instagram.com/blackwornfashion?igshid=MzRlODBiNWFlZA==',
    },
    {
      name: 'Twitter',
      icon: (
        <BsTwitter
          className="hover:text-indigo-500"
          size={25}
        />
      ),
      href: 'https://twitter.com/BlackWornIN?t=BC5t8PVrz56oi6mQNO-WyA&s=08',
    },
  ];

  const getList = () => (
    <div
      className={`bg-white overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ${gotham.className}}`}
      style={{
        top: 10,
        width: 250,
        color: 'black',
        height: '100vh',
      }}
      onClick={() => setOpen(false)}
    >
      <Link href="/login" className="flex hover:scale-110 duration-500 transform">
        <ListItem
          className={`relative top-0 h-14  bg-black text-white`}
        >
          <ListItemIcon>
            <Image
              src="/assets/BW LOGO White.png"
              width={40}
              height={40}
              alt='logo'
            />
          </ListItemIcon>
          <ListItemText
            className="!font-bold"
            primaryTypographyProps={{ fontSize: '18px' }}
            primary="BLACK WORN"
          />
        </ListItem>
      </Link>
      <ListItem
        className={`relative top-3 h-8 ${gotham.className}`}
      >
        <Link href="/login" className="flex">
          <ListItemIcon>
            <BiUser className="text-3xl p-1 mt-3 bg-gray-400 rounded-full text-black" />
          </ListItemIcon>
          <div className={`text-center pt-3 ml-6 text-xl !${gotham.className}`}>LOGIN</div>
        </Link>
      </ListItem>
      <ListItemIcon>
        <Button>
          <RxCross2
            onClick={() => setOpen(true)}
            className="text-3xl -right-[11.5rem] relative -top-[5.75rem] bg-transparent text-red-600 rounded-full font-bold"
          />
        </Button>
      </ListItemIcon>
      <Image
        src="/assets/free-shipping.png"
        width={200}
        height={200}
        className="mx-0 w-fit -mb-3 hover:scale-110 duration-500 transform overflow-hidden"
        alt='free shipping'
      />
      <ListItem
        className={`relative top-3 mb-3 bg-gray-300`}
      >
        <Link href="/allcollection" className="flex">
          <span
            className="mx-4 !font-bold"
          >
            COLLECTIONS
          </span>
        </Link>
      </ListItem>
      {CollectionData.map((item, index) => (
        <div key={index} className="hover:!bg-red-500 hover:!text-white">
          <Link
            className="flex hover:translate-x-6 transition-all duration-500  bg-transparent"
            href={item.href}
          >
            <ListItem
              className={` h-10`}
              key={index}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <span className={`text-sm w-full ${gotham.className}`}>
                {item.name}
              </span>
            </ListItem>
          </Link>
        </div>
      ))}
      <ListItem
        className={`relative top-3 -mt-3 mb-3 bg-gray-300`}
      >
        <Link href="/privacy" className="flex">
          <span
            className="mx-4 !font-bold"
          >
            CUSTOMER SERVICE
          </span>
        </Link>
      </ListItem>
      {CustomerData.map((item, index) => (
        <div key={index} className='hover:!bg-red-500 hover:!text-white'>

          <Link
            className="flex hover:translate-x-10  transition-all duration-500"
            href={item.href}
          >
            <ListItem
              className={` h-10`}
              key={index}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <span className={gotham.className}>
                {item.name}
              </span>
            </ListItem>
          </Link>
        </div>
      ))}
      <ListItem
        className={`relative top-3 -mt-3 mb-3 bg-gray-300`}
      >
        <Link href="/login" className="flex">
          <span
            className="mx-4 !font-bold"
          >
            FOLLOW US
          </span>
        </Link>
      </ListItem>
      <ListItem
        className={`relative top-0 mb-3 bg-gray-50`}
      >
        {socailData.map((item) => (
          <Link
            key={item.name}
            className="flex"
            target="_blank"
            href={item.href}
          >
            <ListItemIcon className="mx-2 mr-3 !font-bold">
              {item.icon}
            </ListItemIcon>
          </Link>
        ))}
      </ListItem>
      <Image
        src="/assets/thank-you.png"
        width={400}
        height={400}
        className="mx-0 h-fit w-full scale-y-90 hover:scale-x-110 -mt-4 duration-500 transform overflow-hidden"
        alt='thank you'
      />
    </div>
  );

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/");
    } catch (error) {
    }
  };

  return (
    <>
      <span>
        {dropdown && (
          <div
            onMouseOver={() => {
              setDropdown(true);
            }}
            onMouseLeave={() => {
              setDropdown(false);
            }}
            className="absolute right-10 bg-[#272A30]  text-white  shadow-lg shadow-slate-600  top-10 py-4  rounded-md px-5 w-40 z-30"
          >
            <ul>
              {!user && (
                <li>
                  <Link href="/login" className="flex hover:text-red-500">
                    <BiLogIn className=" text-2xl -ml-1" />
                    <span className="font-bold text-sm  items-center pt-1 px-3">
                      Login
                    </span>
                  </Link>
                </li>
              )}
              {user && (
                <>
                  <li className="py-4">
                    <Link
                      href="/myaccount"
                      className="flex hover:text-red-500"
                    >
                      <MdManageAccounts className=" text-3xl -ml-1" />
                      <span className="font-bold text-sm  items-center pt-2 px-1">
                        My Account
                      </span>
                    </Link>
                  </li>
                  <li className="py-4 ">
                    <Link
                      href="/orders"
                      className="flex hover:text-red-500"
                    >
                      <BsFillCartCheckFill className=" text-2xl md:text-3xl mx-2 -ml-1" />
                      <span className="font-bold text-sm  items-center pt-2">
                        Orders
                      </span>
                    </Link>
                  </li>
                  <li className="py-4">
                    <a
                      onClick={handleLogout}
                      className="flex hover:text-red-500 cursor-pointer"
                    >
                      <BiLogIn className=" text-3xl md:text-2xl mx-2 -ml-1" />
                      <span className="font-bold text-sm  items-center pt-1">
                        Logout
                      </span>
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </span>

      <div className={`flex mb-0 mt-0 flex-row md:flex-row md:justify-start justify-center items-center shadow-md py-2 sticky top-0 bg-black dark:bg-black space dark:text-white z-10 h-14 dark:shadow-gray-400 dark:shadow-md ${!sidebar && 'overflow-hidden'}`}>
        <div className="absolute left-0">
          <Button onClick={() => setOpen(true)}>
            <FaBarsStaggered
              style={{
                color: 'white',
                width: '20px',
                height: '20px',
              }}
            />
          </Button>
          <Drawer open={open} anchor={'left'} onClose={() => setOpen(false)}>
            {getList()}
          </Drawer>
        </div>

        <div className="logo left-[3.75rem] md:left-[45rem] absolute hover:font-black my-auto">
          <Link href={'/'}>
            <Image
              src="/assets/BW LOGO White.png"
              alt="codeswear logo"
              width={40}
              height={60}
            />
          </Link>
        </div>

        <div className="flex cart absolute right-0 mx-5 md:top-2 cursor-pointer items-center invert dark:invert-0">
          <span className="">
            <SearchDD />
          </span>

          <HeartIcon className="rounded-full fill-black hover:fill-green-700 text-3xl md:text-2xl" />

          <button onClick={toggleCartModal}>
            <BsHandbag className="text-xl md:text-2xl" />
          </button>
          <span
            onMouseOver={() => {
              setDropdown(true);
            }}
            onMouseLeave={() => {
              setDropdown(false);
            }}
            className="dropdown"
          >
            <label tabIndex={0} className="cursor-pointer">
              <AiOutlineUser className="text-2xl md:text-2xl mx-2" />
            </label>
          </span>
        </div>

        <Modal
          blur
          scroll
          fullScreen
          closeButton
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          onClose={toggleCartModal}
          {...bindings}
        >
          <Modal.Header>
            <Text variant="h5" b id="modal-title" size={38}>
              My Cart ({Object.keys(cart).length})
            </Text>
          </Modal.Header>
          <Modal.Body
          >
            {Object.keys(cart).length === 0 ? (
              emptyCart(router)
            ) : (
              <div className='overflow-y-scroll h-screen'>
                <CartItem
                  cart={cart}
                  removeFromCart={removeFromCart}
                  addToCart={addToCart}
                  toggleCartModal={toggleCartModal}
                />
                <div className='h-56'>{" "}</div>

              </div>
            )}
          </Modal.Body>
          <Modal.Footer
          >
            {Object.keys(cart).length !== 0 && (
              <>
                <div className=" fixed bottom-0 p-4 left-0 bg-slate-50 grid grid-rows-3 w-full font-bold text-3xl">
                  <div className="shipping grid grid-cols-2 place-content-center gap-10 py-4">
                    <div className='ml-5 md:ml-10'>
                      Shippng Charge :
                    </div>
                    <div className='font-semibold text-end mr-10'>₹ 50</div>

                  </div>
                  <div className="subtotal grid grid-cols-2 place-content-center py-4 font-bold">
                    <div className='ml-5 md:ml-32'>
                      Subtotal :
                    </div>
                    <div className='font-semibold text-end mr-10'>₹ {subTotal}</div>

                  </div>


                </div>
                <div className="buttons fixed -bottom-2 -left-1 grid grid-cols-2 place-content-between py-4 bg-black text-white w-full font-black">
                  <div className='ml-5 md:ml-48 my-2 font-bold text-3xl'>
                    ₹ {subTotal + 50}
                  </div>
                  <div className='font-semibold item-end mr-10 relative -right-10 md:-right-[20rem]'>
                    <Button
                      variant="contained"
                      onClick={() => {
                        router.push('/checkout')
                      }}
                      style={{
                        backgroundColor: '#fff',
                        color: '#000',
                        fontWeight: 'bold',
                      }}
                    >
                      Procceed
                    </Button>
                  </div>
                </div >
              </>
            )}

          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

const emptyCart = (router) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center my-16">
        <Image
          src={emptyImg}
          alt="empty"
          width={200}
          height={200}
          placeholder="blur"
          blurDataURL="/assets/loading-loading-forever.gif"
          onError={() => {
            setImg('/assets/not-found.png');
          }}
        />
      </div>
      <h5 className="mx-auto text-center font-black text-2xl">Your Cart is empty</h5>
      <h6 className="mx-auto text-center text-gray-400 font-normal text-xl">
        Add something here to make us happy:)
      </h6>
      <button
        className="mx-auto my-4 flex justify-center text-center border rounded-2xl p-4 text-white !bg-black"
        type="button"
        onClick={() => {
          router.push('/');
        }}
      >
        Start Shopping
      </button>
    </>
  );
};

export default Navbar;

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { AiFillPlusCircle, AiFillMinusCircle, AiOutlineUser, AiOutlineClose } from 'react-icons/ai';
import { BsFillBagCheckFill, BsFillCartCheckFill, BsHandbag, BsTwitter } from 'react-icons/bs';
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
import CartImg from '../public/assets/oversized(styles).png';
import emptyImg from '../public/assets/empty-cart-png.png';
import CartItem from './CartItem';

const Navbar = ({ logout, user, cart, addToCart, removeFromCart, clearCart, subTotal, params }) => {
  const { setVisible, bindings } = useModal();
  // const [visible, setVisible] = useState(false);
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const { data: session } = useSession();
  const [sidebar, setSidebar] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  function toggleCart() {
    setSidebar(!sidebar);
  }
  const toggleCartModal = () => {
    setVisible(true);
  };
  const router = useRouter();

  useEffect(() => {
    const getWishlist = async () => {
      const res = await fetch(`/api/getwishes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setWishlist(data?.data);
    };

    getWishlist();
    console.log(wishlist, 'wishlist');

    if (Object.keys(cart).length !== 0) {
      setSidebar(true);
    }

    const exempted = ['/checkout', '/order', '/orders', '/myaccount', '/login', '/signup'];

    if (exempted.includes(router.pathname)) {
      setSidebar(false);
    }
  }, [cart, router.pathname]);

  const ref = useRef();
  const [open, setOpen] = useState(false);

  const CollectionData = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'T-Shirts',
      href: '/tshirts',
    },
    {
      name: 'Hoodies',
      href: '/hoodies',
    },
    {
      name: 'Mugs',
      href: '/mugs',
    },
    {
      name: 'Stickers',
      href: '/stickers',
    },
  ];

  const CustomerData = [
    {
      name: 'Track Order',
      href: '/',
    },
    {
      name: 'Wishlist',
      href: '/tshirts',
    },
    {
      name: 'My Cart',
      href: '/hoodies',
    },
    {
      name: 'Contact Us',
      href: '/mugs',
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
      href: 'https://www.facebook.com/',
    },
    {
      name: 'Instagram',
      icon: (
        <FiInstagram
          size={25}
          className="hover:text-[#ff0000]"
        />
      ),
      href: 'https://www.instagram.com/',
    },
    {
      name: 'Twitter',
      icon: (
        <BsTwitter
          className="hover:text-indigo-500"
          size={25}
        />
      ),
      href: 'https://twitter.com/',
    },
  ];

  const getList = () => (
    <div
      className="bg-white"
      style={{
        top: 10,
        width: 250,
        color: 'black',
        height: '100vh',
      }}
      onClick={() => setOpen(false)}
    >
      <ListItem
        className={`relative top-0 h-14  bg-black text-white`}
      >
        <Link href="/login" className="flex">
          <ListItemText
            className="pt-2 mx-14"
            primaryTypographyProps={{ fontSize: '18px' }}
            primary="BLACK WORN"
          />
        </Link>
      </ListItem>
      <ListItem
        className={`relative top-3 h-8`}
      >
        <Link href="/login" className="flex">
          <ListItemIcon>
            <BiUser className="text-3xl p-1 mt-2 bg-gray-400 rounded-full text-black" />
          </ListItemIcon>
          <ListItemText className="pt-2 -ml-3" primary="LOGIN/SIGNUP" />
        </Link>
      </ListItem>
      <ListItemIcon>
        <Button>
          <RxCross2
            onClick={() => setOpen(true)}
            className="text-xl -right-48 relative -top-8 bg-white rounded-full text-black font-bold"
          />
        </Button>
      </ListItemIcon>
      <Image
        src="/assets/free-shipping.png"
        width={200}
        height={200}
        className="mx-0 w-fit -mb-3"
      />
      <ListItem
        className={`relative top-3 mb-3 bg-gray-300`}
      >
        <Link href="/login" className="flex">
          <ListItemText
            className="mx-4 !font-bold"
            primary="COLLECTIONS"
          />
        </Link>
      </ListItem>
      {CollectionData.map((item, index) => (
        <ListItem
          className={`hover:!bg-blue-400 h-10`}
          key={index}
        >
          <Link
            className="flex hover:translate-x-10 transition-all duration-500"
            href={item.href}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </Link>
        </ListItem>
      ))}
      <ListItem
        className={`relative top-3 -mt-3 mb-3 bg-gray-300`}
      >
        <Link href="/login" className="flex">
          <ListItemText
            className="mx-4 !font-bold"
            primary="CUSTOMER SERVICE"
          />
        </Link>
      </ListItem>
      {CustomerData.map((item, index) => (
        <ListItem
          className={`hover:!bg-blue-400 h-10`}
          key={index}
        >
          <Link
            className="flex hover:translate-x-10 transition-all duration-500"
            href={item.href}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </Link>
        </ListItem>
      ))}
      <ListItem
        className={`relative top-3 -mt-3 mb-3 bg-gray-300`}
      >
        <Link href="/login" className="flex">
          <ListItemText
            className="mx-4 !font-bold"
            primary="CONNECT WITH US"
          />
        </Link>
      </ListItem>
      <ListItem
        className={`relative top-0 mb-3 bg-gray-200`}
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
        className="mx-0 w-full -mt-4"
      />
    </div>
  );

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
              {!session && (
                <li>
                  <Link href="/login" className="flex hover:text-red-500">
                    <BiLogIn className=" text-2xl -ml-1" />
                    <span className="font-bold text-sm  items-center pt-1 px-3">
                      Login
                    </span>
                  </Link>
                </li>
              )}
              {session && (
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
                      onClick={signOut}
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

      <div className={`flex mb-0 flex-row md:flex-row md:justify-start justify-center items-center shadow-md py-2 sticky top-0 bg-black dark:bg-black space dark:text-white z-10 h-14 dark:shadow-gray-400 dark:shadow-md ${!sidebar && 'overflow-hidden'}`}>
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

        <div className="logo left-[3.75rem] md:left-[45rem] absolute hover:font-black  dark:invert-0 my-auto">
          <Link href={'/'}>
            <Image
              src="/assets/BW LOGO White.png"
              alt="codeswear logo"
              width={40}
              height={60}
            />
          </Link>
        </div>

        <div className="flex cart absolute right-0 mx-5 md:top-2 cursor-pointer items-center">
          <span className="">
            <SearchDD />
          </span>

          <Badge className="z-0 mx-2" badgeContent={wishlist.length} color="primary">
            <HeartIcon className="rounded-full fill-black hover:fill-green-700 text-3xl md:text-2xl" />
          </Badge>

          <Badge className="z-0" badgeContent={Object.keys(cart).length} color="primary">
            <button onClick={toggleCartModal}>
              <BsHandbag className="text-3xl md:text-2xl" />
            </button>
          </Badge>
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
              <AiOutlineUser className="text-3xl md:text-2xl mx-2" />
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

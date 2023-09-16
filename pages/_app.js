import "../styles/globals.css"
import Footer from "../components/Footer"
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@milon27/react-sidebar/dist/react-sidebar.css'
import LoadingBar from 'react-top-loading-bar'
import { SessionProvider } from 'next-auth/react'
import { Roboto } from "next/font/google";
import { ScrollTop } from 'primereact/scrolltop';
import ScrollToTop from "react-scroll-to-top";
import Head from "next/head"
import ScrollButton from "../components/ScrollButton"
const roboto = Roboto({ weight: "400", subsets: ["latin"] });
import { UserAuthContextProvider } from '../context/UserAuthContext'
import localFont from "next/font/local"
import scrollToTop from "../components/ScrollToTop"
import { BsFillArrowUpCircleFill } from "react-icons/bs"


const gotham = localFont({ src: "../assets/fonts/Gotham/GothamMedium.ttf" })
export default function App({ Component,
  pageProps: { session, ...pageProps } }) {
  const [showButton, setShowButton] = useState(false);
  const [showNav, setShowNav] = useState(true)
  const router = useRouter()
  const [user, setUser] = useState({ value: null })
  const [key, setKey] = useState()
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true);


  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0)
    }
    router.events.on("routeChangeComplete", () => {
      setProgress(100)
      window.scrollTo(0, 0);
    })

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)

    }
  }, [])


  useEffect(() => {

    router.events.on("routeChangeComplete", () => {
      setProgress(100)
      window.scrollTo(0, 0);
    })

    router.events.on("routeChangeStart", () => {
      setProgress(40)
    })
    const exempted = ['admin']
    if (exempted.includes(router.pathname.split('/')[1])) {
      setVisible(false)
    }
    try {
      if (localStorage.getItem('cart')) {
        setCart(JSON.parse(localStorage.getItem('cart')))
        saveCart(JSON.parse(localStorage.getItem('cart')))
      }
    } catch (error) {
      localStorage.clear()
    }
    const myuser = JSON.parse(localStorage.getItem("myuser"))
    if (myuser) {
      setUser({ value: myuser.token, email: myuser.email });
    }
    setKey(Math.random())





  }, [router.query, router.events, router.pathname])

  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)
  const saveCart = (myCart) => {
    localStorage.setItem('cart', JSON.stringify(myCart))
    let sbt = 0;
    let keys = Object.keys(myCart)
    for (let i = 0; i < keys.length; i++) {
      sbt += myCart[keys[i]].sprice * myCart[keys[i]].qty
    }
    setSubTotal(sbt)
  }
  const addToCart = (itemCode, qty, sprice, name, size, img) => {
    if (Object.keys(cart).length == 0) {
      setKey(Math.random())
    }
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty
      toast.success('Item Quantity incremented to the cart!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

    }
    else {
      newCart[itemCode] = { itemCode, qty: 1, sprice, name, size, img: img[0]?.url }
      toast.success('Item added to the cart!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

    }
    setCart(newCart)
    saveCart(newCart)
  }
  const removeFromCart = (itemCode, qty, sprice, name, size, color, img) => {
    let newCart = JSON.parse(JSON.stringify(cart));
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty
    }
    if (newCart[itemCode]['qty'] <= 0) {
      delete newCart[itemCode]
      toast.success('Item removed from the cart!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setCart(newCart)
    saveCart(newCart)
  }
  const clearCart = () => {
    setCart({})
    saveCart({})
    toast.success('Cart cleared!', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
  const buyNow = (itemCode, qty, sprice, name, size, img) => {
    let newCart = {}
    newCart[itemCode] = { qty: 1, name, size, sprice, img }
    setCart(newCart)
    saveCart(newCart)
    router.push('/checkout')


  }
  const logout = () => {
    localStorage.removeItem("myuser");
    setUser({ value: null })
    setKey(Math.random())
    toast.success('Logout successfully!', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setTimeout(() => {
      router.push('/login')
    }, 3000);
  }

  useEffect(() => {
    const scrollFunction = () => {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', scrollFunction);

    return () => {
      window.removeEventListener('scroll', scrollFunction);
    };
  }, []);

  const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return <>
    <UserAuthContextProvider>
      <Fragment>
        <SessionProvider session={session}>
          <Head>
            <link rel="shortcut icon" href="/assets/favicon.ico" type="image/x-icon" />
            <title>Black Worn</title>
          </Head>
          <main className={`overflow-auto ${gotham.className}`}>
            <LoadingBar
              color='#f11946'
              progress={progress}
              waitingTime={400}
              onLoaderFinished={() => setProgress(0)}
            />
            {visible && key && <Navbar logout={logout} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} key={key} user={user} subTotal={subTotal} />}
            <Component user={user} buyNow={buyNow} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
            {showButton && <button id="myBtn" onClick={scrollToTop} className="fixed bottom-20 right-30 z-50 bg-red-500 hover:bg-gray-700 text-white cursor-pointer p-2 rounded-lg right-10 text-lg border-none outline-none">
              <BsFillArrowUpCircleFill />
            </button>}

            {visible && <Footer />}
          </main >
        </SessionProvider>
        {/* <ScrollButton /> */}
      </Fragment>
    </UserAuthContextProvider>
  </>
}

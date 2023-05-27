import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { useRouter } from 'next/router'
import { stringify } from 'postcss'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@milon27/react-sidebar/dist/react-sidebar.css'
import LoadingBar from 'react-top-loading-bar'



export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [user, setUser] = useState({ value: null })
  const [key, setKey] = useState()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      setProgress(100)
    })
    router.events.on("routeChangeStart", () => {
      setProgress(40)
    })
    try {
      if (localStorage.getItem('cart')) {
        setCart(JSON.parse(localStorage.getItem('cart')))
        saveCart(JSON.parse(localStorage.getItem('cart')))
      }
    } catch (error) {
      console.error(error);
      localStorage.clear()
    }
    const token = localStorage.getItem("token")
    if (token) {
      setUser({ value: token });
      setKey(Math.random())
    }
  }, [router.query, router.events])

  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)
  const saveCart = (myCart) => {
    localStorage.setItem('cart', JSON.stringify(myCart))
    let sbt = 0;
    let keys = Object.keys(myCart)
    for (let i = 0; i < keys.length; i++) {
      sbt += myCart[keys[i]].price * myCart[keys[i]].qty
    }
    setSubTotal(sbt)
  }
  const addToCart = (itemCode, qty, price, name, size, color) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty
      toast.success('Item added to the cart!', {
        position: "bottom-center",
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
      newCart[itemCode] = { qty: 1, name, size, price, color }
      toast.success('Item added to the cart!', {
        position: "bottom-center",
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
  const removeFromCart = (itemCode, qty, price, name, size, color) => {
    let newCart = JSON.parse(JSON.stringify(cart));
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty
    }
    if (newCart[itemCode]['qty'] <= 0) {
      delete newCart[itemCode]
      toast.success('Item removed from the cart!', {
        position: "bottom-center",
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
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
  const buyNow = (itemCode, qty, price, name, size, color) => {
    let newCart = { itemCode: { qty: 1, name, size, price, color } }
    setCart(newCart)
    saveCart(newCart)
    console.log(newCart);
    router.push('/checkout')


  }
  const logout = () => {
    localStorage.removeItem("token");
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
  return <>
    <LoadingBar
      color='#f11946'
      progress={progress}
      waitingTime={400}
      onLoaderFinished={() => setProgress(0)}
    />
    {key && <Navbar logout={logout} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} key={key} user={user} />}
    <Component buyNow={buyNow} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
    <Footer />
  </>
}

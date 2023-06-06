import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'
import Head from 'next/head'
import Script from 'next/script'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = ({ cart, clearCart, addToCart, removeFromCart, subTotal }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [state, setState] = useState("")
  const [pincode, setPincode] = useState("")
  const [city, setCity] = useState("")
  const [disabled, setDisabled] = useState(true)
  const [user, setUser] = useState({ value: null })


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("myuser"))
    if (!user.value) {
      setEmail(user.email)
      setUser(user)
    }
  }, [])

  const handleChange = async (e) => {

    if (e.target.name == "name") {
      setName(e.target.value)
    }
    else if (e.target.name == "email") {
      setEmail(e.target.value)
    }
    else if (e.target.name == "phone") {
      setPhone(e.target.value)
    }
    // else if (e.target.name == "state") {
    //   setState(e.target.value)
    // }
    // else if (e.target.name == "city") {
    //   setCity(e.target.value)
    // }
    else if (e.target.name == "address") {
      setAddress(e.target.value)
    }
    else if (e.target.name == "pincode") {
      setPincode(e.target.value)
      if (e.target.value.length == 6) {
        let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
        let pinsjson = await pins.json()
        if (Object.keys(pinsjson).includes(e.target.value)) {
          setCity(pinsjson[e.target.value][0])
          setState(pinsjson[e.target.value][1])
        }
        else {
          setState("")
          setCity("")
        }
      }
      else {
        setState("")
        setCity("")
      }
    }
    setTimeout(() => {

      if (name.length > 3 && email.length > 3 && phone.length > 3 && address.length > 3 && pincode.length > 3) {
        setDisabled(false)
        console.log(disabled);
      }
      else {
        setDisabled(true)
        console.log(disabled);
      }
    }, 100);
  }
  const initiatePayment = async () => {
    let oId = Math.floor(Math.random() * Date.now());
    // get a transaction token
    const data = { cart, subTotal, oId, email: email, name, address, phone, pincode, }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    let txnRes = await a.json()
    // console.log(txnRes);
    if (txnRes.success) {
      let txnToken = txnRes.txnToken
      var config = {
        flow: "DEFAULT",
        //Optional to hide paymode label when only one paymode is available
        hidePaymodeLabel: true,
        data: {
          orderId: oId,
          amount: subTotal,
          token: txnToken,
          tokenType: "TXN_TOKEN"
        },
        style: {
          //Optional: global style that will apply to all paymodes
          bodyColor: "green"
        },
        merchant: {
          mid: "mid"
        },
        handler: {
          notifyMerchant: function (eventName, data) {
            console.log("notify merchant handler function called");
            console.log("eventName => ", eventName);
            console.log("date =>", data);
          }
        }
      };



      window.Paytm.checkoutJS.init(config).then(function onSuccess() {
        window.Paytm.checkoutJS.invoke();
      }).catch(function onError(error) {
        console.log("Error => ", error);
      })

    }
    else {
      console.log(txnRes.error);
      clearCart()
      toast.error(txnRes.error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }
  return (
    <div className='container px-2 sm:m-auto'>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Head>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
      </Head>
      <Script type='application/javascript' crossOrigin='anonymous' src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} />
      <h1 className='font-bold text-3xl my-8 text-center'>Checkout</h1>
      <h2 className="font-semibold text-xl my-4">1. Delivery details</h2>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2" >
          <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input onChange={handleChange} value={name} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/" />
          </div>
        </div>
        <div className="px-2 w-1/2" >
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            {user && user.value ? <input value={user.email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/" readOnly /> : <input onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/" />}

          </div>
        </div>
      </div>
      <div className="px-2 w-full" >
        <div className="mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
          <textarea value={address} onChange={handleChange} cols="30" rows="2" id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/" ></textarea>
        </div>

      </div>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2" >
          <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
            <input onChange={handleChange} value={phone} type="phone" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/" />
          </div>
        </div>
        <div className="px-2 w-1/2" >
          <div className="mb-4">
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">PINCODE</label>
            <input onChange={handleChange} value={pincode} type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/" />
          </div>
        </div>




      </div>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2" >
          <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
            <input type="text" value={state} onChange={handleChange} id="State" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/" />
          </div>
        </div>

        <div className="px-2 w-1/2" >
          <div className="mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
            <input type="text" value={city} onChange={handleChange} id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/" />
          </div>
        </div>
      </div>
      <h2 className="font-semibold text-xl my-4">2. Review Cart Items</h2>
      <div className=" sideCart  bg-pink-100  p-6 my-8  ">
        <ol className='list-decimal font-semibold' >
          {Object.keys(cart).length === 0 &&
            <div className='my-12 text-lg text-center font-normal'>Your cart is empty</div>}
          {Object.keys(cart).map((k) => {
            return <li key={k}>
              <div className="item flex my-5">
                <div className='font-semibold'>
                  {cart[k].name}&nbsp;({cart[k].size}/{cart[k].color})
                </div>
                <div className='flex items-center justify-center w-1/3 font-semibold text-lg'>
                  <AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].color) }} className='text-pink-500 cursor-pointer' /><span className='mx-2 text-sm'>{cart[k].qty}</span><AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].color) }} className='text-pink-500 cursor-pointer' />
                </div>
                <div className='font-semibold right-8 absolute'>
                  {cart[k].img}
                </div>
              </div>
            </li>
          })}
        </ol>
        <div className="font-bold">SubTotal : ₹{subTotal} </div>
      </div>
      <div className="mx-4">
        <Link href={'/checkout'} className='cursor-default'><button disabled={disabled} onClick={initiatePayment} className="disabled:bg-pink-300 flex mr-2  text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"><BsFillBagCheckFill className='m-1' /> Pay ₹{subTotal}</button></Link>
      </div>
    </div>
  )
}

export default Checkout
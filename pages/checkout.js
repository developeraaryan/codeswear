import Link from 'next/link'
import React from 'react'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'
import Head from 'next/head'
import Script from 'next/script'

const Checkout = ({ cart, addToCart, removeFromCart, subTotal }) => {
  const initiatePayment = async () => {
    let oId = Math.floor(Math.random() * Date.now());
    // get a transaction token
    const data = { cart, subTotal, oId, email: "email" }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    let txnRes = await a.json()
    console.log(txnRes);
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
  return (
    <div className='container px-2 sm:m-auto'>
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
            <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/" />
          </div>
        </div>
        <div className="px-2 w-1/2" >
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/" />
          </div>
        </div>
      </div>
      <div className="px-2 w-full" >
        <div className="mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
          <textarea cols="30" rows="2" id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/" ></textarea>
        </div>
      </div>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2" >
          <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
            <input type="text" id="State" name="State" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/" />
          </div>
        </div>
        <div className="px-2 w-1/2" >
          <div className="mb-4">
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">PINCODE</label>
            <input type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/" />
          </div>
        </div>
      </div>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2" >
          <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
            <input type="phone" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/" />
          </div>
        </div>
        <div className="px-2 w-1/2" >
          <div className="mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
            <input type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/" />
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
        <Link href={'/checkout'}><button onClick={initiatePayment} className="flex mr-2  text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"><BsFillBagCheckFill className='m-1' /> Pay ₹{subTotal}</button></Link>
      </div>
    </div>
  )
}

export default Checkout
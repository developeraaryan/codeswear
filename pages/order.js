import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Order from '../Models/Order'
import mongoose from 'mongoose'
import { Badge } from '@mui/material'
import OrderTracker from '../components/OrderTracker'
import Image from 'next/image'

const MyOrder = ({ order, clearCart }) => {
  const products = order?.products
  const router = useRouter()
  const [date, setDate] = useState()
  const [tracker, setTracker] = useState(false)
  const handleTracker = () => {
    setTracker(!tracker)
  }
  useEffect(() => {
    const d = new Date(order.createdAt)
    setDate(d)
    if (router.query.clearcart == 1) {
      clearCart()
    }
  }, [clearCart, router?.query?.clearcart, order?.createdAt,products])
  return (
    <section className="text-gray-600 body-font overflow-hidden min-h-screen">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 w-full mx-auto flex flex-wrap">
          <div className="lg:w-full w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">BLACK WORN</h2>
            <h1 className="text-gray-900 text-xl md:text-3xl title-font font-medium mb-4">Order ID : #{order?.oId}</h1>
            <p className="leading-relaxed ">Your order has been successfully palced!</p>
            <p className="leading-relaxed ">Order palced on : {date && date?.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" }
            )}</p>
            <p className='mb-6'> Your payment is <span className={`${order?.status == "Pending" ? "text-red-700" : "text-green-700"} font-bold`}>{order?.status}</span> </p>
            <div className="grid grid-cols-4 border-t text-center border-gray-200 py-2 font-semibold">
              <span className="text-xs text-gray-900">Item</span>
              <span className="text-xs text-gray-900">Quantity</span>
              <span className="text-xs text-gray-900 text-center">Cost</span>
              <span className="text-xs text-gray-900 ">Item Total</span>
            </div>


            {Object.keys(products).map((key) => {

              return <div key={key} className="grid grid-cols-4 border-t border-gray-200 py-2 text-center">
                <span className="text-xs text-gray-900">{products[key].name}({products[key].size})</span>
                <span className="text-xs text-gray-900">{products[key].qty}</span>
                <span className="text-xs text-gray-900">₹{products[key].sprice}</span>
                <span className="text-xs text-gray-900">₹{products[key].sprice * products[key].qty}</span>
              </div>

            })}


            <div className="grid  my-10">
              <span className="title-font font-medium text-2xl text-gray-900">subTotal: ₹{order.amount}</span>
              <div className="my-6">
                <button onClick={handleTracker} className="flex mx-0 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Track Order</button>

              </div>
            </div>

          </div>
        </div>
        {tracker && <div className='' >
          <OrderTracker status={order.deliverStatus} />
        </div>
        }
      </div>
    </section >
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI)
  }
  let order = await Order.findById(context.query.id)

  return {
    props: { order: JSON.parse(JSON.stringify(order)) }
  };
}



export default MyOrder
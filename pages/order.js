import { useRouter } from 'next/router'
import React from 'react'
import Order from '@/Models/Order'
import mongoose from 'mongoose'

const MyOrder = ({ order }) => {
  const products = order.products
  const router = useRouter()
  const { id } = router.query
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">BLACK WORN</h2>
            <h1 className="text-gray-900 text-xl md:text-3xl title-font font-medium mb-4">Order ID : #{order.orderId}</h1>
            <p className="leading-relaxed ">Your order has been successfully palced!</p> <p className='mb-6'> Your payment is <span className={`${order.status == "Pending" ? "text-green-700" : "text-red-700"} `}>{order.status}</span> </p>
            <div className="flex border-t border-gray-200 py-2 font-semibold">
              <span className="text-gray-500">Item</span>
              <span className="ml-auto text-gray-900 relative left-6">Quantity</span>
              <span className="ml-auto text-gray-900 text-center -mr-[4.8rem] ">Cost</span>
              <span className="ml-auto text-gray-900 ">Item Total</span>
            </div>


            {Object.keys(products).map((key) => {

              return <div key={key} className="flex border-t border-gray-200 py-2 text-">
                <span className="text-gray-500 break-all">{products[key].name}({products[key].size}/{products[key].color})</span>
                <span className="ml-auto text-gray-900 relative right-4">{products[key].qty}</span>
                <span className="ml-auto text-gray-900">₹{products[key].price}</span>
                <span className="ml-auto text-gray-900">₹{products[key].price * products[key].qty}</span>
              </div>

            })}




            <div className="flex flex-col my-10">
              <span className="title-font font-medium text-2xl text-gray-900">subTotal: ₹{order.amount}</span>
              <div className="my-6">
                <button className="flex mx-0 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Track Order</button>
              </div>
            </div>
          </div>
          <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
        </div>
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
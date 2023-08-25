import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Order from '../Models/Order'
import mongoose from 'mongoose'
import { Badge, Box, Button, Modal, TextField, Typography } from '@mui/material'
import OrderTracker from '../components/OrderTracker'
import Image from 'next/image'

const style = {

  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MyOrder = ({ order, clearCart }) => {
  const products = order?.products
  const [open, setOpen] = React.useState(false);
  const router = useRouter()
  const [date, setDate] = useState()
  const [tracker, setTracker] = useState(false)
  const handleTracker = () => {
    setTracker(!tracker)
  }

  const handleCancel = async (e) => {
    e.preventDefault()
    setOpen(true)
  }
  const handleClose = () => setOpen(false);
  const cancelOrder = async (e) => {
    e.preventDefault()
    const reason = e.target[0].value
    const res = await fetch('/api/updateorder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: order._id, reason })
    })
    const data = await res.json()
    if (data.success) {
      router.push('/myorders')
    }

  }
  useEffect(() => {
    const d = new Date(order.createdAt)
    setDate(d)
    if (router.query.clearcart == 1) {
      clearCart()
    }
  }, [clearCart, router?.query?.clearcart, order?.createdAt, products])
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
              <div className="grid grid-cols-2 gap-4 my-6">
                <button onClick={handleTracker} className=" w-full text-center text-white bg-blue-500 border-0 p-2 focus:outline-none hover:bg-blue-600 rounded">Track Order</button>
                {order.deliverStatus === "shipped" && <button onClick={handleCancel} className=" w-full text-center text-white bg-red-500 border-0 p-2 focus:outline-none hover:bg-red-600 rounded">Cancel Order</button>}
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" color={'red'}>
                      Are You Sure to Cancel Your Order?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Please Provide a valid reason for cancellation
                    </Typography>
                    <form className="flex flex-col mt-4" onSubmit={handleClose}>
                      <TextField

                        id="outlined-multiline-static"
                        label="Reason"
                        multiline
                        rows={4}
                        defaultValue=""
                        variant="outlined"
                      />
                      <Button type='submit' onClick={cancelOrder} className="mt-4 text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Cancel Order</Button>
                    </form>
                  </Box>
                </Modal>
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
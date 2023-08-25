import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Order from '../Models/Order'
import mongoose from 'mongoose'
import { Box, Button, Modal, Typography } from '@mui/material'
import OrderTracker from '../components/OrderTracker'
import toast, { Toaster } from 'react-hot-toast';

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
    if (reason === "") {
      toast.error(`Error updating order\nPlease try after sometime!`)
    }
    else {
      const res = await fetch('/api/updateorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ oId: order.oId, reason, deliverStatus: 'canceled' })
      })
      const data = await res.json()
      console.log(data, 'data');
      if (data.success) {
        toast.success('Order Canceled!')
        setTimeout(() => {
          router.push('/orders')
        }, 2000);
      }
      else {
        toast.error(`error updating order\nPlease try after sometime!`)
      }
    }
    setOpen(false)

  }

  const [reason, setReason] = useState('')
  const handleChange = (e) => {
    setReason(e.target.value)
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
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
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
                {order.deliverStatus === "approved" && <button onClick={handleCancel} className=" w-full text-center text-white bg-red-500 border-0 p-2 focus:outline-none hover:bg-red-600 rounded">Cancel Order</button>}
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
                      <div className="relative my-4">
                        <textarea
                          onChange={handleChange}
                          value={reason}
                          name='reason'
                          rows={6}
                          cols={50}
                          type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-cyan-500 focus:outline-none focus:ring-0 focus:border-cyan-600 peer" placeholder=" " />
                        <label for="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Description</label>
                      </div>
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
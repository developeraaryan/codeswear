import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Order from '../../Models/Order'
import mongoose from 'mongoose'
import { Box, Button, Modal, Typography } from '@mui/material'
import UpdateOrder from '../../src/components/dashboard/UpdateOrder'
import theme from '../../src/theme/theme'
import FullLayout from '../../src/layouts/FullLayout'
import { ThemeProvider } from '@mui/material'
import Image from 'next/image'
import { useUserAuth } from "../../context/UserAuthContext";

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


function ChildModal({ order }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button className='!bg-[#1976d2] hover:!bg-[#1565c0]' onClick={handleOpen
            } variant='contained'>Confirm</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: "90%" }}>
                    <h2 className='text-2xl text-center mb-4' id="child-modal-title">Update the order delivery Status</h2>
                    <p className='text-lg' id="child-modal-description">
                        You are updating the order status of order with order id {" "}#<span className='text-red-500'>{order.oId}</span>
                    </p>
                    <UpdateOrder order={order} handleCloseParent={handleClose} />

                </Box>
            </Modal>
        </React.Fragment>
    );
}

const MyOrder = ({ order, clearCart }) => {
    const { user } = useUserAuth()
    const router = useRouter()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const products = order.products
    const [date, setDate] = useState()
    useEffect(() => {
        const phone = localStorage.getItem('phone')
        if (!user) {
            router.push('/login')
        }
        const getRole = async () => {
            const res = await fetch(`/api/getrole`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ phone })

            })
            const data = await res.json()
            if (data.role !== 'admin') {
                router.push('/login')
            }
        }
        getRole()
    }, [user, router])

    useEffect(() => {
        console.log(Object.values(Object.values(products)[0])[5], "products");
        const d = new Date(order.createdAt)
        setDate(d)
    }, [])


    return (
        <ThemeProvider theme={theme}>
            <FullLayout>
                <section className="flex text-gray-600 align-middle justify-center container mx-auto body-font overflow-hidden min-h-screen">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="container lg:w-full mx-auto flex flex-wrap">
                            <div className="lg:w-full w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                                <h2 className="text-sm title-font text-gray-500 tracking-widest">BLACK WORN</h2>
                                <h1 className="text-gray-900 text-xl md:text-3xl title-font font-medium mb-4">Order ID : #{order.oId}</h1>
                                <p className="leading-relaxed ">This order has been successfully palced!</p>
                                <p className="leading-relaxed ">Order palced on : {date && date.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" }
                                )}</p>
                                <p className='mb-6'> The payment is <span className={`${order.status == "Pending" ? "text-red-700" : "text-green-700"} font-bold`}>{order.status}</span> </p>
                                <div className="grid grid-cols-4 border-t border-gray-200 py-2 font-semibold">
                                    <span className="ml-auto text-gray-900">Item</span>
                                    <span className="ml-auto text-gray-900">Qty</span>
                                    <span className="ml-auto text-gray-900">Price</span>
                                    <span className="ml-auto text-gray-900">Total</span>

                                </div>


                                {Object.keys(products).map((key) => {

                                    return <div key={key} className="grid border-t border-gray-200 py-2 text- grid-cols-4">
                                        <span className="text-gray-500 text-center text-xs w-full">{products[key].name}({products[key].size})</span>
                                        <span className="ml-auto text-gray-900 relative right-4">{products[key].qty}</span>
                                        <span className="ml-auto text-gray-900">₹{products[key].sprice}</span>
                                        <span className="ml-auto text-gray-900">₹{products[key].sprice * products[key].qty}</span>
                                    </div>

                                })}


                                <div className="flex flex-col my-10">
                                    <span className="title-font font-medium text-2xl text-gray-900">subTotal: ₹{order.amount}</span>
                                </div>
                                <div className="flex flex-col my-10">
                                    <h4>User Details</h4>
                                    <div className="title-font font-medium text-2xl text-gray-900"><span className='font-mono'>Name: </span>{order?.name}</div>
                                    <div className="title-font font-medium text-2xl text-gray-900"><span className='font-mono'>Phone:</span> {order?.phone}</div>
                                    <div className="title-font font-medium text-2xl text-gray-900"><span className='font-mono'>Email:</span> {order?.email}</div>
                                    <div className="title-font font-medium text-2xl text-gray-900"><span className='font-mono'>Address:</span> {order?.address}</div>
                                    <div className="title-font font-medium text-2xl text-gray-900"><span className='font-mono'>Pincode:</span> {order?.pincode}</div>
                                    <div className="title-font font-medium text-2xl text-gray-900"><span className='font-mono'>City: </span>{order?.city}</div>
                                    <div className="title-font font-medium text-2xl text-gray-900"><span className='font-mono'>State:</span> {order?.state}</div>
                                    <div className="title-font font-medium text-2xl text-gray-900"><span className='font-mono'>Payment Method: </span>{order?.status === "COD" ? "Cash on Delivery" : ""}</div>
                                    <div className="title-font font-medium text-2xl text-gray-900"><span className="font-mono">Delivey Status: </span>{(order?.deliverStatus?.charAt(0))?.toUpperCase() + order?.deliverStatus?.slice(1)}</div>
                                    {order?.reason !== "" && <div className="title-font font-medium text-2xl text-gray-900"><span className="font-mono">Cancellation Reason: </span>{((order?.reason)?.charAt(0))?.toUpperCase() + order?.reason?.slice(1)}</div>}

                                </div>
                                <div className="flex flex-col my-10">
                                    <div className="my-6">
                                        <Button className='!bg-[#1976d2] hover:!bg-[#1565c0]' onClick={handleOpen} variant='contained'>Update order status</Button>
                                        <Modal
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>
                                                <Typography id="modal-modal-title" variant="h6" component="h2" color={'red'}>
                                                    Confirm?
                                                </Typography>
                                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                    Are you sure you want to update the order status?
                                                </Typography>
                                                <div className='flex space-x-2 justify-end mt-4'>
                                                    <Button onClick={handleClose} className='!bg-[#1976d2] hover:!bg-[#1565c0]' variant='contained'>Cancel</Button>
                                                    {/* <Button onClick={ChildModal} className='!bg-[#1976d2] hover:!bg-[#1565c0]' variant='contained'>Confirm</Button> */}
                                                    <ChildModal order={order} handleCloseMain={handleClose} handleCloseParent={handleClose} />
                                                </div>
                                            </Box>
                                        </Modal>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section >
            </FullLayout>
        </ThemeProvider>
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
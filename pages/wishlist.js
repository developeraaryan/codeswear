import React from 'react'
import emptyImg from '../public/assets/empty.png'
import Image from 'next/image'
import { useRouter } from 'next/router'

const wishlist = () => {
    const router = useRouter()
    const [isEmpty, setIsEmpty] = React.useState(true)
    return (
        <div className='container mx-auto min-h-screen'>
            <h1 className='text-3xl text-center my-4 leading-10'>Wishlist</h1>
            {!isEmpty ? emptyWishlist(router) : wishlistItem()}
        </div>
    )
}


const wishlistItem = () => {
    return (
        <div className='flex flex-row justify-between items-center border-b-2 border-gray-200 py-4'>
            <div className='flex flex-row justify-start items-center'>
                <div className='flex flex-col justify-center items-center'>
                    <Image

                        src={emptyImg}
                        alt="empty"
                        width={100}
                        height={100} />
                </div>
                <div className='flex flex-col justify-center items-start ml-4'>
                    <h5 className='text-xl font-black'>Product Name</h5>
                    <h6 className='text-gray-400 font-normal'>Product Description</h6>
                    <h6 className='text-gray-400 font-normal'>Product Price</h6>
                </div>
            </div>
            <div className='flex flex-row justify-end items-center'>
                <button className='flex justify-center items-center border rounded-2xl p-2 text-white !bg-black' type="button">Add to Cart</button>
                <button className='flex justify-center items-center border rounded-2xl p-2 text-white !bg-black ml-4' type="button">Remove</button>
            </div>
        </div>
    )
}

const emptyWishlist = (router) => {
    return (
        <>
            <div className='flex flex-col justify-center items-center my-16'>
                <Image
                    src={emptyImg}
                    alt="empty"
                    width={200}
                    height={200} />
            </div>
            <h5 className='mx-auto text-center font-black text-2xl'>Your Wishlist is empty</h5>
            <h6 className='mx-auto text-center text-gray-400 font-normal text-xl'>Save your favourite here</h6>
            <button className='mx-auto my-4 flex justify-center text-center border rounded-2xl p-4 text-white !bg-black' type="button" onClick={() => {
                router.push('/')
            }}>Start Shopping</button>
        </>
    )
}

export default wishlist
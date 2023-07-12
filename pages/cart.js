import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import emptyImg from '../public/assets/empty-cart-png.png'
import CartImg from '../public/assets/oversized(styles).png'
import { Button } from '@nextui-org/react'
import { ScrollTop } from 'primereact/scrolltop'
import CartItem from '../components/CartItem'


const cart = () => {
    const [isEmpty, setIsEmpty] = React.useState(true)
    const router = useRouter()
    return (
        <>
            <div className='container mx-auto min-h-screen overflow-x-hidden'>
                <h1 className='text-3xl text-center my-4 leading-10'>My Cart</h1>
                {!isEmpty ? emptyCart(router) : cartItem(router)}


            </div>

        </>
    )
}

const cartItem = (cart, router) => {
    const routers = useRouter()
    return (
        <>

            <main className='container relative mx-auto w-full'>
                {/* <div className='flex flex-row justify-start shadow-lg border border-separate items-baseline md:items-center my-4 ml-0 md:ml-10 w-full md:w-[95%]'>
                    <div className="img md:h-auto ml-4">
                        <Image
                            src={CartImg}
                            alt="cart"
                            width={300}
                            height={300}
                        // placeholder='blur'
                        // blurDataURL='/assets/loading-loading-forever.gif'
                        // onError={() => {
                        //     setImg('/assets/not-found.png')
                        // }}
                        // fill={true}
                        />
                    </div>
                    <div className="content flex flex-col mb-32 ml-10 items-start">
                        <h3 className='font-semibold text-xl !my-4'>Good vibes White Oversized T -Shirt</h3>
                        <div className='!my-4'>
                            Size : <span className='font-semibold'>M</span>
                        </div>
                        <div className='quantity border p-2 !my-4'>
                            <button>-</button>
                            <span className='!mx-10'>
                                1
                            </span>
                            <button>+</button>
                        </div>
                        <div className='flex flex-row justify-between items-center w-full my-4'>
                            <div className='flex flex-col justify-center items-start'>
                                <h3 className='font-semibold text-xl'>₹ 499</h3>
                            </div>
                            {/* <button className='flex justify-center items-center text-center border rounded-2xl p-4 text-white !bg-black' type="button" onClick={() => {
                            router.push('/checkout')
                        }}>Buy Now</button> */}
                {/* </div>
                        <div className='button text-gray-500 -ml-4'>
                            <button
                                className='flex justify-center items-center text-center p-4 hover:text-black'
                            >
                                Remove
                            </button>

                        </div>

                    </div> */}
                {/* </div>  */}

                <CartItem />



            </main >
            <div className=" fixed bottom-0 p-4 left-0 bg-slate-50 grid grid-rows-3 w-full">
                <div className="shipping grid grid-cols-2 place-content-center gap-10 py-4">
                    <div className='ml-5 md:ml-10'>
                        Shippng Charge :
                    </div>
                    <div className='font-semibold text-end mr-10'>₹ 50</div>

                </div>
                <div className="subtotal grid grid-cols-2 place-content-center py-4 font-bold">
                    <div className='ml-5 md:ml-10'>
                        Subtotal :
                    </div>
                    <div className='font-semibold text-end mr-10'>₹ 4450</div>

                </div>


            </div>
            <div className="buttons fixed bottom-0 left-0 grid grid-cols-2 place-content-between py-4 bg-black text-white w-full font-black">
                <div className='ml-5 md:ml-10 my-2'>
                    ₹ 4500
                </div>
                <div className='font-semibold item-end mr-10 relative -right-10 md:-right-[40rem]'>
                    <Button
                        auto
                        flat
                        ripple={false}
                        css={{ color: 'Black', backgroundColor: 'White' }}
                        onClick={() => {
                            routers.push('/checkout')
                        }}
                    >
                        Procceed
                    </Button>
                </div>
            </div >
        </>

    )
}

const emptyCart = (router) => {
    return (
        <>
            <div className='flex flex-col justify-center items-center my-16'>
                <Image
                    src={emptyImg}
                    alt="empty"
                    width={200}
                    height={200}
                    placeholder='blur'
                    blurDataURL='/assets/loading-loading-forever.gif'
                    onError={() => {
                        setImg('/assets/not-found.png')
                    }}
                // fill={true}
                />
            </div>
            <h5 className='mx-auto text-center font-black text-2xl'>Your Cart is empty</h5>
            <h6 className='mx-auto text-center text-gray-400 font-normal text-xl'>Add something here to make us happy:)</h6>
            <button className='mx-auto my-4 flex justify-center text-center border rounded-2xl p-4 text-white !bg-black' type="button" onClick={() => {
                router.push('/')
            }}>Start Shopping</button>
        </>
    )
}

export default cart
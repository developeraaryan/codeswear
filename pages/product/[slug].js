import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import mongoose from 'mongoose'
import Product from "../../Models/Product"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error from 'next/error';
import { AiOutlineDoubleRight } from 'react-icons/ai'
import { SendButton } from '../../components/SendButton';
import { SendIcon } from '../../components/SendIcon';
import { Button, Input, Modal, Text } from '@nextui-org/react';
import { Image } from '@nextui-org/react';

const { useSession } = require('next-auth/react')
const Slug = ({ addToCart, product, varients, buyNow, error }) => {
    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };
    const { data: session } = useSession()
    const router = useRouter()
    const [color, setColor] = useState()
    const [size, setSize] = useState()
    const { slug } = router.query
    const [pin, setPin] = useState()
    const [service, setService] = useState()
    useEffect(() => {
        console.log(session, 'router')
        if (!error) {
            setColor(product.color)
            setSize(product.size)
        }
    }, [router.query])

    const checkServiceability = async () => {
        let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
        let pinsjson = await pins.json()
        console.log(pin)
        if (pin && pin.length < 6) {
            toast.error('Invalid Pincode!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else if (!pin) {
            toast.error('Invalid Pincode!', {
                position: "top-center",
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
            if (Object.keys(pinsjson).includes(pin)) {
                setService(true)
                toast.success('Your pincode is serviceable!', {
                    position: "top-center",
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
                setService(false)
                toast.error('Sorry, pincode not serviceable!', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });

            }
        }
    }
    const onChangePin = (e) => {
        console.log(e.target.value, 'pin');
        setPin(e.target.value)
    }
    const refreshVarient = (newSize, newColor) => {
        let url = `${process.env.NEXT_PUBLIC_HOST}/product/${varients[newColor][newSize]['slug']}`
        // window.location = url
        router.push(url)
    }

    if (error == 404) {
        return <Error statusCode={404} />
    }


    const handleWish = async (e) => {
        e.preventDefault()
        if (session) {
            let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/wishlist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    product: product._id,
                    email: session?.user?.email
                })

            })
            let data = await res.json()
            if (data.success) {
                toast.success('Added to wishlist!', {
                    position: "top-center",
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
                toast.error('Already in wishlist!', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        }
        else {
            router.push('/login')
        }
    }


    return (
        <>
            <section className="text-gray-600 body-font overflow-hidden min-h-full">
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
                <div className="container px-5 py-16 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto px-24 object-cover object-top rounded" src={product.img} />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">BLACK WORN</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title} ({product.size}/{product.color})</h1>
                            <div className="flex mb-4">
                                {/* <span className="flex items-center">
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <span className="text-gray-600 ml-3">4 Reviews</span>
                                </span> */}
                                {/* <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                        </svg>
                                    </a>
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                        </svg>
                                    </a>
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                        </svg>
                                    </a>
                                </span> */}
                            </div>
                            {/* <p className="leading-relaxed">{product.desc}</p> */}
                            {/* <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                <div className="flex ml-6 items-center">
                                    <span className="mr-3">Size</span>
                                    <div className="relative">
                                        <select value={size} onChange={(e) => { refreshVarient(e.target.value, color) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-base pl-3 pr-10">
                                            {color && Object.keys(varients[color]).includes('S') && <option value={'S'}>S</option>}
                                            {color && Object.keys(varients[color]).includes('M') && <option value={'M'}>M</option>}
                                            {color && Object.keys(varients[color]).includes('L') && <option value={'L'}>L</option>}
                                            {color && Object.keys(varients[color]).includes('XL') && <option value={'XL'}>XL</option>}
                                            {color && Object.keys(varients[color]).includes('XXL') && <option value={'XXL'}>XXL</option>}
                                            {color && Object.keys(varients[color]).includes('XXXL') && <option value={'XXXL'}>XXXL</option>}
                                        </select>
                                        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                                                <path d="M6 9l6 6 6-6"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div> */}
                            <div className="flex fixed bottom-0 justify-center items-center bg-black w-full left-0 p-4 z-50">
                                {/* <div className='flex flex-col'>
                                    {!product.availableqty <= 0 && <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}</span>}
                                    {product.availableqty <= 0 && <span className="title-font font-medium text-2xl text-red-800">Out of stock</span>}
                                    {!product.availableqty <= 0 && product.availableqty <= 5 && <span className="title-font font-medium text-xs text-red-800">Hurry up! only {product.availableqty} left</span>}
                                </div> */}

                                <button onClick={() => { addToCart(slug, 1, product.price, product.title, size, color,product.img) }} disabled={product.availableqty <= 0} className="disabled:bg-blue-300 flex ml-8 text-white bg-blue-500 border-0 py-2 px-2 text-sm md:px-6 focus:outline-none hover:bg-blue-600 rounded">Add to cart</button>
                                <button onClick={() => { buyNow(slug, 1, product.price, product.title, size, color) }} disabled={product.availableqty <= 0} className="disabled:bg-blue-300 flex ml-4 text-white bg-blue-500 border-0 py-2 px-2 text-sm md:px-6 focus:outline-none hover:bg-blue-600 rounded">Buy Now</button>

                                {/* Wishlist */}
                                <button onClick={handleWish} className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                    </svg>
                                </button>
                            </div>

                            {(!service && service != null) && <div className="text-red-700 text-sm mt-3">Sorry! We do not deliver to this pincode yet.</div>}
                            {(service && service != null) && <div className="text-green-700 text-sm mt-3">Yey! This Pincode is serviceable</div>}
                        </div>
                    </div>
                </div>
                <div className="size flex flex-col justify-center">
                    <div className="text flex justify-center font-semibold space-x-[4.5rem] relative left-7 md:space-x-[30rem] z-0">
                        <h5>SELECT SIZE</h5>
                        <Button
                            light
                            onPress={handler}
                            color='error'
                        >
                            SEE CHART
                            <AiOutlineDoubleRight className='inline-block pl-1' size={25} />
                        </Button>
                        <Modal
                            blur
                            closeButton={true}
                            preventClose
                            aria-labelledby="modal-title"
                            animated
                            open={visible}
                            onClose={closeHandler}
                        >
                            <Modal.Header>
                                <Text id="modal-title" b size={18}>
                                    SIZE CHART
                                </Text>
                            </Modal.Header>
                            <Modal.Body>
                                <div className='flex justify-center'>

                                    <Image
                                        src={`/assets/empty.png`}
                                        alt="size chart"
                                        width={500}
                                        height={500}
                                    />
                                </div>
                            </Modal.Body>

                        </Modal>
                    </div>
                    <div className="flex justify-center my-4">
                        <button disabled={color && Object.keys(varients[color]).includes('S')} className='disabled:cursor-not-allowed disabled:opacity-40 focus:text-white focus:bg-black flex items-center justify-center w-10 h-10 border-2 border-gray-400 rounded-md mr-2'>
                            <div className="">
                                S
                            </div>

                        </button>
                        <button disabled={color && Object.keys(varients[color]).includes('M')} className='focus:text-white focus:bg-black disabled:cursor-not-allowed disabled:opacity-40 flex items-center justify-center w-10 h-10 border-2 border-gray-400 rounded-md mr-2'>
                            <div className="">
                                M
                            </div>

                        </button>
                        <button disabled={color && Object.keys(varients[color]).includes('L')} className='focus:text-white focus:bg-black disabled:cursor-not-allowed disabled:opacity-40 flex items-center justify-center w-10 h-10 border-2 border-gray-400 rounded-md mr-2'>
                            <div className="">
                                L
                            </div>

                        </button>
                        <button disabled={color && Object.keys(varients[color]).includes('XL')} className='focus:text-white focus:bg-black disabled:cursor-not-allowed disabled:opacity-40 flex items-center justify-center w-10 h-10 border-2 border-gray-400 rounded-md mr-2'>
                            <div className="">
                                XL
                            </div>

                        </button>
                        <button disabled={color && Object.keys(varients[color]).includes('XXL')} className='focus:text-white focus:bg-black disabled:cursor-not-allowed disabled:opacity-40 flex items-center justify-center w-10 h-10 border-2 border-gray-400 rounded-md mr-2'>
                            <div className="">
                                XXL
                            </div>

                        </button>
                    </div>
                    <hr className='border-t border-gray-300 my-8' />

                    {/* check avaialability */}
                    <div className="container flex flex-col justify-center my-4 mx-auto">

                        <div className="flex flex-col justify-center mr-28">
                            <div className="text flex justify-center font-semibold">
                                <Image
                                    showSkeleton
                                    src='/assets/tracking.png'
                                    width={30}
                                    height={30}
                                    className='-mt-3 mr-1'
                                />
                                <h5>CHECK AVAILABILITY</h5>
                            </div>
                        </div>

                        <div className="pin mt-6 flex flex-col max-w-xl items-center mx-0 md:mx-auto justify-center">
                            <Input
                                name='pincode'
                                id='pincode'
                                onChange={onChangePin}
                                clearable
                                contentRightStyling={false}
                                placeholder="Enter PINCODE"
                                type='text'
                                aria-label='PINCODE'
                                size='xl'
                                height={300}
                                contentRight={
                                    <SendButton onClick={checkServiceability}>
                                        <SendIcon />
                                    </SendButton>
                                }
                                className='outline-none border-none focus:outline-none '
                            />
                            <span className='ml-4 text-[0.65rem]'>Please enter a valid PINCODE to check delivery information</span>
                        </div>
                    </div>

                    <div className="flex justify-center flex-row my-4 space-x-10">
                        <Image
                            showSkeleton
                            src='/assets/100-premium-cotton.png'
                            alt='return'
                            width={80}
                            height={80}
                        //   className='h-7 relative bottom-2' 
                        />
                        <Image
                            showSkeleton
                            src='/assets/100-secure-payments.png'
                            alt='return'
                            width={80}
                            height={80}
                        //   className='h-7 relative bottom-2' 
                        />
                        <Image
                            showSkeleton
                            src='/assets/easy-returns-and-refunds.png'
                            alt='return'
                            width={80}
                            height={80}
                        //   className='h-7 relative bottom-2' 
                        />


                    </div>


                    <div className="flex flex-col justify-start container">
                        <h4 className='text-black font-black text-xl mx-8'>PRODUCT DESCRIPTION :</h4>
                        <p className='mx-10 md:mx-20 my-4'>
                            {product.desc}
                        </p>
                        <h4 className='text-black font-black text-xl mx-8'>WASH CARE :</h4>
                        <ul className='list-disc  mx-auto md:mx-20 my-4'>
                            <li>Machine Wash</li>
                            <li>Wash in cold water</li>
                            <li>Use Mild Detergent</li>
                            <li>Do Not Dry In Direct Sunlight</li>
                            <li>Do Not Soak In Water For Long Time</li>
                            <li>Dry in shade inside out</li>
                            <li>Do Not Bleach</li>
                            <li>Do Not Iron Directly On Print</li>
                            <li>Do Not Wring</li>
                            <li>Do Not Dry Clean</li>
                            <li>Do Not Tumble Dry</li>
                            <li>Wash With Like Colors</li>

                        </ul>
                    </div>

                </div>
            </section>
        </>
    )
}



export async function getServerSideProps(context) {
    let error = null;
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI)
    }
    let product = await Product.findOne({ slug: context.query.slug })
    if (product == null) {
        return {
            props: { error: 404 }
        };
    }
    let variants = await Product.find({ title: product.title, category: product.category })
    let colorSizeSlug = {} // {red:{xl:{slug:"wear-the-code-xl"}}}
    for (let items of variants) {
        if (Object.keys(colorSizeSlug).includes(items.color)) {
            colorSizeSlug[items.color][items.size] = { slug: items.slug }
        }
        else {
            colorSizeSlug[items.color] = {}
            colorSizeSlug[items.color][items.size] = { slug: items.slug }
        }
    }
    return {
        props: { error: error, varients: JSON.parse(JSON.stringify(colorSizeSlug)), product: JSON.parse(JSON.stringify(product)) }, // will be passed to the page component as props
    };
}



export default Slug
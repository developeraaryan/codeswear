import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import mongoose from 'mongoose'
import Product from "../../Models/Product"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error from 'next/error';


const Slug = ({ addToCart, product, varients, buyNow, error }) => {
    const router = useRouter()
    const [color, setColor] = useState()
    const [size, setSize] = useState()
    const { slug } = router.query
    const [pin, setPin] = useState()
    const [service, setService] = useState()
    useEffect(() => {
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

    return (
        <>
            <section className="text-gray-600 body-font overflow-hidden min-h-screen">
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
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
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
                            <p className="leading-relaxed">{product.desc}</p>
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                <div className="flex">
                                    <span className="mr-3">Color</span>
                                    {Object.keys(varients).includes('White') && Object.keys(varients['White']).includes(size) && <button onClick={(e) => { refreshVarient(size, 'White') }} className={`border-2  rounded-full w-6 h-6 focus:outline-none ${color === 'White' ? `border-black` : `border-gray-300`}`}></button>}
                                    {Object.keys(varients).includes('Black') && Object.keys(varients['Black']).includes(size) && <button onClick={(e) => { refreshVarient(size, 'Black') }} className={`border-2  ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${color === 'Black' ? `border-black` : `border-gray-300`}`}></button>}
                                    {Object.keys(varients).includes('Red') && Object.keys(varients['Red']).includes(size) && <button onClick={(e) => { refreshVarient(size, 'Red') }} className={`border-2  ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none ${color === 'Red' ? `border-black` : `border-gray-300`}`}></button>}
                                    {Object.keys(varients).includes('Purple') && Object.keys(varients['Purple']).includes(size) && <button onClick={(e) => { refreshVarient(size, 'Purple') }} className={`border-2  ml-1 bg-purple-500 rounded-full w-6 h-6 focus:outline-none ${color === 'Purple' ? `border-black` : `border-gray-300`}`}></button>}
                                    {Object.keys(varients).includes('Blue') && Object.keys(varients['Blue']).includes(size) && <button onClick={(e) => { refreshVarient(size, 'Blue') }} className={`border-2  ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none ${color === 'Blue' ? `border-black` : `border-gray-300`}`}></button>}
                                    {Object.keys(varients).includes('Green') && Object.keys(varients['Green']).includes(size) && <button onClick={(e) => { refreshVarient(size, 'Green') }} className={`border-2  ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none ${color === 'Green' ? `border-black` : `border-gray-300`}`}></button>}
                                    {Object.keys(varients).includes('Yellow') && Object.keys(varients['Yellow']).includes(size) && <button onClick={(e) => { refreshVarient(size, 'Yellow') }} className={`border-2  ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none ${color === 'Yellow' ? `border-black` : `border-gray-300`}`}></button>}
                                </div>
                                <div className="flex ml-6 items-center">
                                    <span className="mr-3">Size</span>
                                    <div className="relative">
                                        <select value={size} onChange={(e) => { refreshVarient(e.target.value, color) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10">
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
                            </div>
                            <div className="flex">
                                <div className='flex flex-col'>
                                    {!product.availableqty <= 0 && <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}</span>}
                                    {product.availableqty <= 0 && <span className="title-font font-medium text-2xl text-red-800">Out of stock</span>}
                                    {!product.availableqty <= 0 && product.availableqty <= 5 && <span className="title-font font-medium text-xs text-red-800">Hurry up! only {product.availableqty} left</span>}
                                </div>

                                <button onClick={() => { addToCart(slug, 1, product.price, product.title, size, color) }} disabled={product.availableqty <= 0} className="disabled:bg-pink-300 flex ml-8 text-white bg-pink-500 border-0 py-2 px-2 text-sm md:px-6 focus:outline-none hover:bg-pink-600 rounded">Add to cart</button>
                                <button onClick={() => { buyNow(slug, 1, product.price, product.title, size, color) }} disabled={product.availableqty <= 0} className="disabled:bg-pink-300 flex ml-4 text-white bg-pink-500 border-0 py-2 px-2 text-sm md:px-6 focus:outline-none hover:bg-pink-600 rounded">Buy Now</button>
                                {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                    </svg>
                                </button> */}
                            </div>
                            <div className="pin mt-6 flex space-x-2 text-sm">
                                <input onChange={onChangePin} type="text" className='px-2 border-2 border-gray-400 rounded-md focus:bg-inherit' placeholder='Enter your PINCODE here' required />
                                <button onClick={checkServiceability} className="text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Check</button>
                            </div>
                            {(!service && service != null) && <div className="text-red-700 text-sm mt-3">Sorry! We do not deliver to this pincode yet.</div>}
                            {(service && service != null) && <div className="text-green-700 text-sm mt-3">Yey! This Pincode is serviceable</div>}
                        </div>
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
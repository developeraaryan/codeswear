import React from 'react';
import Image from 'next/image';
import { Card } from 'flowbite-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@mui/material';

export default function ECommerceCard({ addToCart }) {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const getProducts = async () => {
            let response = await fetch(`api/allproducts`)
            let res = await response.json()
            // console.log(res.products);
            setProducts(res.products)
        }
        getProducts()
    }, [])
    console.log(products);
    return (
        <>

            <section className='container mx-auto flex flex-wrap justify-center'>
                {Object.keys(products).map((item) => {
                    return <div className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer shadow-md  hover:shadow-2xl m-5">
                        <a className="block relative  rounded overflow-hidden">
                            <img alt="ecommerce" className="m-auto  h-[30vh] md:h-[36vh]  block" src="/assets/women.jpg" />
                        </a>
                        <div className="text-center mt-4 md:text-left">
                            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[item].category}</h3>
                            <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                            <p className="mt-1">₹{products[item].price}</p>
                            <div className="mt-1">
                                {products[item].size.includes('S') && <span className='border border-gray-300 px-1 mx-1'>S</span>}
                                {products[item].size.includes('M') && <span className='border border-gray-300 px-1 mx-1'>M</span>}
                                {products[item].size.includes('L') && <span className='border border-gray-300 px-1 mx-1'>L</span>}
                                {products[item].size.includes('XL') && <span className='border border-gray-300 px-1 mx-1'>XL</span>}
                                {products[item].size.includes('XXL') && <span className='border border-gray-300 px-1 mx-1'>XXL</span>}
                                {products[item].size.includes('XXXL') && <span className='border border-gray-300 px-1 mx-1'>XXXL</span>}
                            </div>
                            <div className="mt-1">
                                {products[item].color.includes('Red') && <button className="border-2 border-gray-300 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                                {products[item].color.includes('Black') && <button className="border-2 border-gray-300 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                                {products[item].color.includes('Blue') && <button className="border-2 border-gray-300 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                                {products[item].color.includes('Purple') && <button className="border-2 border-gray-300 bg-purple-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                                {products[item].color.includes('Green') && <button className="border-2 border-gray-300 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                                {products[item].color.includes('White') && <button className="border-2 border-gray-300  rounded-full w-6 h-6 focus:outline-none"></button>}
                            </div>
                            <div className="flex mt-10 justify-center space-x-2">
                                <Button variant='contained' onClick={() => { addToCart(products[item].slug, 1, products[item].price, products[item].title, products[item].size, products[item].color) }} disabled={products[item].availableqty <= 0} disableElevation>Add to cart</Button>
                                <Button variant='contained' href={`/product/${products[item].slug}`} >View</Button>
                            </div>

                        </div>
                    </div>

                })}
            </section>


        </>


    )
}


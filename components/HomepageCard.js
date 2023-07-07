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
                    return <Link href={`/product/${products[item].slug}`} key={products[item]._id} legacyBehavior>


                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer shadow-md  hover:shadow-2xl m-5">
                            <a className="block relative  rounded overflow-hidden">
                                <img alt="ecommerce" className="m-auto  h-[30vh] md:h-[36vh]  block" src="/assets/women.jpg" />
                            </a>
                            <div className="text-center mt-4 md:text-left">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[item].category}</h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                                <p className="mt-1">₹{products[item].price}</p>

                            </div>
                        </div>
                    </Link>

                })}
            </section>


        </>


    )
}


import React from 'react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Test.module.css'


export default function ECommerceCard({ addToCart }) {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const getProducts = async () => {
            let response = await fetch(`api/allproducts`)
            let res = await response.json()
            setProducts(res.products)
        }
        getProducts()
    }, [])
    return (
        <>

            <section className='container mx-auto flex-wrap justify-center grid grid-cols-2 md:grid-cols-4 gap-4'>
                {Object.keys(products).map((item) => {
                    return <Link href={`/product/${products[item].slug}`} key={products[item]._id} >
                        <div className="max-w-fit bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
                            <Image width={400} height={400} className="rounded-t-lg h-" src={products[item].img[0].url} alt="" />
                            <div className="mx-auto">
                                <h5 className="mb-2 text-gray-900 dark:text-white">{products[item].title}</h5>
                            </div>
                            <div className="px-2">
                                <h5 className={`mb-2 text-lg  tracking-tight text-gray-900 dark:text-white ${styles.deletedPrice}`}>₹999</h5>
                                <h5 className="mb-2 text-lg text-left  tracking-tight text-gray-900 dark:text-white">₹{products[item].price}</h5>
                            </div>
                        </div>

                    </Link>

                })}
            </section>


        </>


    )
}


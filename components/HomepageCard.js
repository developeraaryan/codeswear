import React from 'react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Test.module.css'
import Product from '../Models/Product';
import mongoose from 'mongoose';


export default function ECommerceCard({ }) {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const getProducts = async () => {
            let response = await fetch(`api/allproducts`)
            let res = await response.json()
            setProducts(res.products)
        }
        getProducts()
        console.log(products, 'products');
    }, [products])
    return (
        <>

            <section className=' mx-1 flex-wrap justify-center grid grid-cols-2 md:grid-cols-4 gap-2'>
                {Object.keys(products).map((item) => {
                    return <Link href={`/product/${products[item].slug}`} key={products[item]._id} >
                        <div className="max-w-fit bg-white border border-gray-200 rounded-lg shadow dark:bg-white dark:border-gray-200 text-black ">
                            <Image width={400} height={400} className="rounded-t-lg h-56 w-80" src={products[item].img[0].url} alt="" />
                            <div className="mx-auto">
                                <h3 className="mb-2 mt-2 ml-3 text-xs text-black dark:text-black">{products[item].title.substring(0, 40)}</h3>
                            </div>
                            <div className="px-2">
                                <h4 className="mb-2 text-base text-left  tracking-tight text-gray-900 dark:text-black">₹{products[item].sprice}</h4>
                                <h5 className={`mb-2 text-xs  tracking-tight text-gray-900 dark:text-black ${styles.deletedPrice}`}>₹{products[item].lprice}</h5>
                                <div className='ml-24 text-xs relative left-2  text-red-700'>{Math.floor((products[item]?.sprice / products[item]?.lprice) * 100)}% OFF</div>
                            </div>
                        </div>

                    </Link>

                })}
            </section>


        </>


    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI)
    }
    let products = await Product.find({})
    let tshirts = {}
    for (let items of products) {
        if (items.title in tshirts) {
            if (!tshirts[items.title].color.includes(items.color) && items.availableqty > 0) {
                tshirts[items.title].color.push(items.color)
            }
            if (!tshirts[items.title].size.includes(items.size) && items.availableqty > 0) {
                tshirts[items.title].size.push(items.size)
            }

        } else {
            tshirts[items.title] = JSON.parse(JSON.stringify(items))
            if (items.availableqty > 0) {
                tshirts[items.title].color = [items.color]
                tshirts[items.title].size = [items.size]
            }
            else {
                tshirts[items.title].color = []
                tshirts[items.title].size = []
            }
        }
    }
    return {
        props: { products: JSON.parse(JSON.stringify(tshirts)) }, // will be passed to the page component as props
    };
}

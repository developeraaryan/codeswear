import Link from 'next/link'
import React from 'react'
import mongoose from 'mongoose'
import Product from "../Models/Product"
import Image from 'next/image'
import styles from '../styles/Test.module.css'


const Oversized = ({ products }) => {
  if (Object.keys(products).length === 0) {
    return emptyList()
  }
  return ListProducts(products)
}

const emptyList = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center relative px-4">
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1604093882750-3ed498f3178b')" }}>
      </div>
      <h1 className="text-5xl md:text-7xl text-white font-bold mb-8 z-10">Coming Soon</h1>
      <p className="text-white text-xl md:text-2xl">
        We&apos;re working hard to bring you something amazing. Stay tuned!
      </p>
    </div>

  )
}

const ListProducts = ({ products }) => {
  return (
    <div>
      <section className="text-gray-600 body-font overflow-x-hidden">
        <Image className='w-full h-full' src='/assets/product-layout-poster.jpg' alt='offer banner' width={400} height={10} />
        <div className="container px-5 py-24 mx-auto">
          <div className="container mx-auto  flex-wrap justify-center grid grid-cols-2 md:grid-cols-4 gap-4">
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


          </div>
        </div>
      </section>

    </div>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI)
  }
  let products = await Product.find({ category: 'Oversized' })
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

export default Oversized
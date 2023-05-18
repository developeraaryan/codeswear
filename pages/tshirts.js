import Link from 'next/link'
import React from 'react'
import mongoose from 'mongoose'
import Product from "@/Models/Product"

const Tshirts = ({ products }) => {
  return (
    <div>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {products.map((item) => {
              return <Link href={`/product/${item.slug}`} key={item._id} legacyBehavior><div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-md  hover:shadow-2xl m-5">
                <a className="block relative  rounded overflow-hidden">
                  <img alt="ecommerce" className="m-auto  h-[30vh] md:h-[36vh]  block" src="/assets/women.jpg" />
                </a>
                <div className="text-center mt-4 md:text-left">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.category}</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{item.title}</h2>
                  <p className="mt-1">₹{item.price}</p>
                  <p className="mt-1">{item.size}</p>
                </div>
              </div></Link>
            })}


          </div>
        </div>
      </section>

    </div>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products = await Product.find({category:"tshirts"})
  return {
    props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
  };
}

export default Tshirts
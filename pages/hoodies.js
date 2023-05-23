import Link from 'next/link'
import React from 'react'
import mongoose from 'mongoose'
import Product from "@/Models/Product"

const Hoodies = ({ products }) => {
  return (
    <div>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {Object.keys(products).length === 0 && <p>Sorry, All the hoodies are out of stock , Please stay tuned! </p>}
            {Object.keys(products).map((item) => {
              return <Link href={`/product/${products[item].slug}`} key={products[item]._id} legacyBehavior><div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-md  hover:shadow-2xl m-5">
                <a className="block relative  rounded overflow-hidden">
                  <img alt="ecommerce" className="m-auto  h-[30vh] md:h-[36vh]  block" src={products[item].img} />
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
                    {products[item].size.includes('xxl') && <span className='border border-gray-300 px-1 mx-1'>XXL</span>}
                    {products[item].size.includes('xxxl') && <span className='border border-gray-300 px-1 mx-1'>XXXL</span>}
                  </div>
                  <div className="mt-1">
                    {products[item].color.includes('Red') && <button className="border-2 border-gray-300 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('Black') && <button className="border-2 border-gray-300 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('Blue') && <button className="border-2 border-gray-300 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('Purple') && <button className="border-2 border-gray-300 bg-purple-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('Green') && <button className="border-2 border-gray-300 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('White') && <button className="border-2 border-gray-300  rounded-full w-6 h-6 focus:outline-none"></button>}
                  </div>
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
  let products = await Product.find({ category: "Hoodies" })
  let Hoodies = {}
  for (let items of products) {
    if (items.title in Hoodies) {
      if (!Hoodies[items.title].color.includes(items.color) && items.availableqty > 0) {
        Hoodies[items.title].color.push(items.color)
      }
      if (!Hoodies[items.title].size.includes(items.size) && items.availableqty > 0) {
        Hoodies[items.title].size.push(items.size)
      }

    } else {
      Hoodies[items.title] = JSON.parse(JSON.stringify(items))
      if (items.availableqty > 0) {
        Hoodies[items.title].color = [items.color]
        Hoodies[items.title].size = [items.size]
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(Hoodies)) }, // will be passed to the page component as props
  };
}

export default Hoodies
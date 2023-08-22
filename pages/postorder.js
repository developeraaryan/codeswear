import Link from 'next/link'
import React from 'react'

const PostOrder = () => {
  return (
    <main className='container mx-auto min-h-full flex flex-col justify-center'>
      <div className='font-bold text-lg text-center text-green-600'>
        Order placed successfully!
      </div>
      <Link href='/orders' className='text-white mx-auto text-center bg-black w-fit p-1 rounded-full'>
        My Orders
      </Link>
    </main>
  )
}

export default PostOrder
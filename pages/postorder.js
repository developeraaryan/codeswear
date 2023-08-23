import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PostOrder = () => {
  return (
    <main className='container mx-auto min-h-full -m-20 flex flex-col justify-center'>
      <div className='font-bold text-lg text-center my-4 text-green-600'>
        <Image
          src='/assets/orderd.jpg'
          alt='checkmark'
          width={500}
          height={500}
          className='mx-auto'
        />
        Order placed successfully!
      </div>
      <Link href='/orders' className='text-white mx-auto text-center bg-black w-fit p-2 rounded-full'>
        My Orders
      </Link>
    </main>
  )
}

export default PostOrder
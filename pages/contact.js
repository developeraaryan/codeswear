import React from 'react'

const Contact = () => {
  return (
    <>
      <div className='h-screen'>
        <div className="flex  flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-2xl">BLACK WORN</h2>
            <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700 w-3/4  mx-auto" />
            <h2 className="mt-4 text-center text-5xl/8 font-serif leading-9 tracking-tight text-gray-900">
              CONTACT US
            </h2>
          </div>
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        </div>
        <section className="container mx-auto justify-center md:pl-10 md:pr-10 ">
          <h4 className='font-bold text-base text-center'>
            Thank you for choosing BLACK WORN
          </h4>
          <p className='text-center md:text-2xl'>
            as your preferred brand.We strive to provide our customers with the best quality products and services.
          </p>
        </section>
        <section className="container mx-auto justify-center md:pl-10 md:pr-10 pt-8 ">
          <h4 className='font-bold text-base text-center'>
            For any queries, please contact us at:
          </h4>
          <div className='text-start md:text-2xl flex pt-24'>
            <h5 className='font-semibold'>Email - </h5>
            <span className='px-1'>
              <a href="mailto:support@blackworn.com"> support@blackworn.com</a>
            </span>
          </div>
          <div className='text-start md:text-2xl flex py-1'>
            <h5 className='font-semibold'>Call Us - </h5>
            <span className='px-1'>
              <a href="tel:+918235172505">xxxxxxxxxxx</a>
            </span>
          </div>
          <div className='text md:text-2xl flex py-1'>
            <h5 className='font-semibold'>Availability - </h5>
            <span className='px-2 pt-1 text-sm md:text-lg'>
              Monday - Saturaday [10Am - 6Pm]
            </span>
          </div>
          <div className='text-start md:text-2xl flex py-1'>
            <h5 className='font-semibold'>Instagram</h5>
            <h5 className='font-semibold px-2'> - </h5>
            <span className=' text-sm md:text-lg px-2 pt-1'>
              Your queriesn will be answered within 1 to 1 business days.
            </span>
          </div>

        </section>
      </div>
    </>
  )
}

export default Contact
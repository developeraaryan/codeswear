import React from 'react'

const Refund = () => {
    return (
        <div className='min-h-full'>
            <div className="flex  flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl">BLACK WORN</h2>
                    <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700 w-3/4  mx-auto" />
                    <h2 className="mt-4 text-center text-4xl md:text-5xl/8 font-serif leading-9 tracking-tight text-gray-900">
                        REFUND POLICY
                    </h2>
                </div>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            </div>
            <section lassName="container mx-auto justify-center md:pl-10 md:pr-10 ">
                <h3 className='font-bold text-base text-center'>
                    Thank you for choosing BLACK WORN
                </h3>
                <p className='text-center md:text-2xl'>
                    as your preferred brand.We strive to provide our customers with the best quality products and services.Please find below our refund policy.
                </p>
            </section>
            <section className="container mx-auto justify-center md:pl-10 md:pr-10 pt-8 ">
                <div className='text-start md:text-2xl flex pt-24'>
                    <h5 className='font-semibold'>1. </h5>
                    <h5 className='font-semibold'>a. </h5>
                    <span className='px-1'>
                        Our products are eligible for return within 7 days of delivery date.
                    </span>
                </div>
                <div className='text-start md:text-2xl flex pt-2 pl-4'>
                    <h5 className='font-semibold'>b. </h5>
                    <span className='px-1'>
                        The product must be unused, unwashed and in its original packaging with all tags intact.
                    </span>
                </div>
            </section>
            <section className="container mx-auto justify-center md:pl-10 md:pr-10 pt-2 ">
                <div className='text-start md:text-2xl flex pt-24'>
                    <h5 className='font-semibold'>2.Return Policy :</h5>
                </div>
                <div className='flex px-4'>
                    <h5 className='font-semibold'>a.</h5>
                    <span className='px-1'>
                        To intiate a return, go to profile section,my orders and then select the product you want to return.
                    </span>
                </div>
            </section>
            <section className="container mx-auto justify-center md:pl-10 md:pr-10 pt-2 ">
                <div className='text-start md:text-2xl flex pt-24'>
                    <h5 className='font-semibold'>3.Refund Policy : </h5>
                </div>
                <div className='flex px-4'>
                    <h5 className='font-semibold'>a.</h5>
                    <span className='px-1'>
                        Once we receive the returened product, our team will inspect it for any damages or defects
                    </span>
                </div>
                <div className='flex px-4'>
                    <h5 className='font-semibold'>b.</h5>
                    <span className='px-1'>
                        If the product is found to be in its original condition, we will initiate the refund process.
                    </span>
                </div>
                <div className='flex px-4'>
                    <h5 className='font-semibold'>c.</h5>
                    <span className='px-1'>
                        The refund amount will be credited to the customer's account which has been given in the refund form after deducting a processing fee of INR 60.
                    </span>
                </div>
            </section>
            <section className="container mx-auto justify-center md:pl-10 md:pr-10 pt-2 ">
                <div className='text-start md:text-2xl flex pt-24'>
                    <h6 className='font-semibold text-center'>We hope this policy is clear to you. Please feel free to contact us if you have any further queries or concerns.We value your trust in our brand and look forward to serving you again in the future.
                    </h6>
                </div>
            </section>
        </div>
    )
}

export default Refund
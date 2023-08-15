import Image from 'next/image'
import React from 'react'
import styles from '../styles/Test.module.css'

const Test = () => {
    return (
        <>
            <main className='container mx-auto my-auto'>
                <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
                        <Image width={400} height={400} className="rounded-t-lg h-60" src="/assets/home-poster-mobile.jpg" alt="" />
                        <div className="m-2 text-left">
                            <h3 className="text-gray-300 text-xs tracking-widest title-font mb-1">Oversized T-shirts</h3>
                        </div>
                        <div className="px-5">
                            <h5 className="mb-2 text-xl text-justify font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                        </div>
                        <div className="px-5">
                            <h5 className={`mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ${styles.deletedPrice}`}>₹999</h5>
                            <h5 className="mb-2 text-2xl text-left ml-1 font-bold tracking-tight text-gray-900 dark:text-white">₹499</h5>
                        </div>
                    </div>

                </section>
            </main>
        </>
    )
}

export default Test
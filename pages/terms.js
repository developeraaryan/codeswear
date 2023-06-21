import React from 'react'
import styles from '../styles/Privacy.module.css'

const Privacy = () => {
    return (
        <div className='min-h-screen mb-10'>
            <div className="flex  flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl">BLACK WORN</h2>
                    <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700 ml-14 mr-14" />
                    <h2 className="mt-4 text-center text-4xl md:text-5xl/10 font-serif leading-9 tracking-tight text-gray-900">
                        TERMS AND CONDITIONS
                    </h2>
                </div>

                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            </div>
            <section>
                <div className="container mx-auto mb-10 flex flex-col justify-center md:pl-10 md:pr-10 text-center">
                    <h3 className='font-bold text-2xl'>WELCOME TO BLACK WORN</h3>
                    <p className='text-lg'>
                        These terms and conditions outline the rules and regulations for the use of our website. By accessing our using our website, you agree to be bound by these terms and conditions. Please read them carefully before proceeding.
                    </p>
                </div>
            </section>

            <section className="container mx-auto flex justify-stretch md:pl-10 md:pr-10 ">
                <ul >
                    <li className={styles.customListItem}>
                        <h4 className='mx-4 text-justify md:text-2xl font-bold relative -top-6'>
                            Introduction:
                        </h4>
                        <div className='text-justify mx-4 mt-0 md:text-2xl'>
                            <span className='font-bold mx-1'>a.</span>
                            The website <a className='text-blue-600 underline' target='_blank' href='https://www.blackworn.com'>blackworn.com</a> (referred to as "the website" or "our website") is owned and operated by Black Worn (referred to as "we," "us," or "our")

                        </div>
                        <div className='text-justify mx-4 mt-1 md:text-2xl'>
                            <span className='font-bold mx-1'>b.</span>
                            By using our website, you agree to comply with and be bound by these terms and conditions, our Privacy Policy, and any other applicable laws and regulations.

                        </div>
                    </li>
                    <li className={styles.customListItem}>
                        <h4 className='mx-4 text-justify md:text-2xl font-bold relative -top-6'>
                            Product Information:
                        </h4>
                        <div className='text-justify mx-4 mt-0 md:text-2xl'>
                            <span className='font-bold mx-1'>a.</span>
                            We strive to provide accurate and up-to-date information about our products, including descriptions, prices, and availability. However, we do not warrant the accuracy or completeness of such information
                        </div>
                        <div className='text-justify mx-4 mt-1 md:text-2xl'>
                            <span className='font-bold mx-1'>b.</span>
                            We reserve the right to modify, discontinue, or update any product without prior notice.
                        </div>
                    </li>
                    <li className={styles.customListItem}>
                        <h4 className='mx-4 text-justify md:text-2xl font-bold relative -top-6'>
                            Orders and Payments:
                        </h4>
                        <div className='text-justify mx-4 mt-0 md:text-2xl'>
                            <span className='font-bold mx-1'>a.</span>
                            By placing an order through our website, you
                            warrant that you are legally capable of entering into a binding contract
                        </div>
                        <div className='text-justify mx-4 mt-1 md:text-2xl'>
                            <span className='font-bold mx-1'>b.</span>
                            Prices listed on our website are in the designated
                            currency and exclude applicable taxes, shipping, and
                            handling charges, unless otherwise stated.
                        </div>
                        <div className='text-justify mx-4 mt-1 md:text-2xl'>
                            <span className='font-bold mx-1'>c.</span>
                            We accept payment through the methods
                            specified on our website. You agree to provide
                            accurate and complete payment information. d. We reserve the right to refuse or cancel any order at our discretion.
                        </div>
                        <div className='text-justify mx-4 mt-1 md:text-2xl'>
                            <span className='font-bold mx-1'>d.</span>
                            We reserve the right to refuse or cancel any order at our discretion.
                        </div>
                    </li>
                    <li className={styles.customListItem}>
                        <h4 className='mx-4 text-justify md:text-2xl font-bold relative -top-6'>
                            Shipping and Delivery:
                        </h4>
                        <div className='text-justify mx-4 mt-0 md:text-2xl'>
                            <span className='font-bold mx-1'>a.</span>
                            We will make reasonable efforts to ensure timely
                            delivery of your order. However, we are not
                            responsible for any delays or damages caused by
                            shipping carriers or unforeseen events.
                        </div>
                        <div className='text-justify mx-4 mt-1 md:text-2xl'>
                            <span className='font-bold mx-1'>b.</span>
                            The risk of loss or damage to the products passes
                            to you upon delivery. Please review our Shipping
                        </div>
                    </li>
                    <li className={styles.customListItem}>
                        <h4 className='mx-4 text-justify md:text-2xl font-bold relative -top-6'>
                            Return and Exchanges:
                        </h4>
                        <div className='text-justify mx-4 mt-0 md:text-2xl'>
                            <span className='font-bold mx-1'>a.</span>
                            We accept returns and refund within the
                            guidelines outlined in our Refund Policy, which is available on our website.
                        </div>
                        <div className='text-justify mx-4 mt-0 md:text-2xl'>
                            <span className='font-bold mx-1'>b.</span>
                            You are responsible for return shipping costs unless the return is due to our error or a defective product.
                        </div>
                    </li>
                    <li className={styles.customListItem}>
                        <h4 className='mx-4 text-justify md:text-2xl font-bold relative -top-6'>
                            Privacy:
                        </h4>
                        <div className='text-justify mx-4 mt-0 md:text-2xl'>
                            <span className='font-bold mx-1'>a.</span>
                            We value your privacy and handle your personal information in accordance with our Privacy Policy. By using our website, you consent to the collection, use, and disclosure of your information as described therein.
                        </div>
                    </li>
                    <li className={styles.customListItem}>
                        <h4 className='mx-4 text-justify md:text-2xl font-bold relative -top-6'>
                            Governing Law and Jurisdiction:
                        </h4>
                        <div className='text-justify mx-4 mt-0 md:text-2xl'>
                            <span className='font-bold mx-1'>a.</span>
                            These terms and conditions shall be governed by and construed in accordance with the laws of [INDIA]. Any disputes arising out of or in connection with these terms and conditions shall be subject to the exclusive jurisdiction of the courts in [INDIA].
                        </div>
                    </li>
                    <li className={styles.customListItem}>
                        <h4 className='mx-4 text-justify md:text-2xl font-bold relative -top-6'>
                            Modifications:
                        </h4>
                        <div className='text-justify mx-4 mt-0 md:text-2xl'>
                            <span className='font-bold mx-1'>a.</span>
                            We reserve the right to modify or update these terms and conditions at any time without prior notice. Any changes will be effective immediately upon posting on our website.
                        </div>
                    </li>
                </ul>

            </section>
        </div>
    )
}

export default Privacy
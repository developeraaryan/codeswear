import React from 'react'
import styles from '../styles/Privacy.module.css'

const Privacy = () => {
    return (
        <div className='min-h-screen mb-10'>
            <div className="flex  flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl">BLACK WORN</h2>
                    <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
                    <h2 className="mt-4 text-center text-4xl md:text-5xl/8 font-serif leading-9 tracking-tight text-gray-900">
                        PRIVACY POLICY
                    </h2>
                </div>

                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            </div>
            <section className="container mx-auto flex justify-stretch md:pl-10 md:pr-10 ">
                <ul >
                    <li className={styles.customListItem}>
                        <div className='mx-4 text-justify md:text-2xl relative -top-6'>
                            At Black Worn, we are committed to protecting
                            the privacy of our customers. This privacy policy outlines how we collect, use, and protect your personal information when you use our website or purchase our products.
                        </div>
                    </li>
                    <li className={styles.customListItem}>
                        <h4 className='mx-4 text-justify md:text-2xl font-bold relative -top-6'>
                            Information We Collect:
                        </h4>
                        <div className='text-justify mx-4 mt-0 md:text-2xl'>
                            When you visit our website or purchase our 
                            
                            products, we may collect personal information 
                            
                            such as your name, email address, shipping 
                            
                            address, and payment information. We may also 
                            
                            collect non-personal information such as your 
                            IP address, browser type, and operating system.

                        </div>
                    </li>
                    <li className={styles.customListItem}>
                        <h4 className='mx-4 text-justify md:text-2xl font-bold relative -top-6'>
                            How do we use your information:
                        </h4>
                        <div className='text-justify mx-4 mt-0 md:text-2xl'>
                            We use your personal information to process your orders, communicate with you about your orders, and provide customer support. We may also use your information to send you promotional offers and updates about our products.

                        </div>
                    </li>
                    <li className={styles.customListItem}>
                        <h4 className='mx-4 text-justify md:text-2xl font-bold relative -top-6'>
                            How we protect your information:
                        </h4>
                        <div className='text-justify mx-4 mt-0 md:text-2xl'>
                            We use industry-standard security measures to protect your personal information from unauthorized access, disclosure, or modification. We also use secure payment processing services to ensure the safety of your payment information.

                        </div>
                    </li>
                    <li className={styles.customListItem}>
                        <h4 className='mx-4 text-justify md:text-2xl font-bold relative -top-6'>
                            Sharing your information:
                        </h4>
                        <div className='text-justify mx-4 mt-0 md:text-2xl'>
                            We do not sell or share your personal information with third parties for marketing purposes. However, we may share your information with third-party service providers who help us process orders or provide customer support.

                        </div>
                    </li>
                    <li className={styles.customListItem}>
                        <h4 className='mx-4 text-justify md:text-2xl font-bold relative -top-6'>
                            Cookies:
                        </h4>
                        <div className='text-justify mx-4 mt-0 md:text-2xl'>
                            We use cookies to enhance your browsing experience and improve our website. Cookies are small text files that are stored on your device when you visit our website. You can disable cookies in your browser settings if you prefer.


                        </div>
                    </li>
                    <li className={styles.customListItem}>
                        <h4 className='mx-4 text-justify md:text-2xl font-bold relative -top-6'>
                            Change to this policy:
                        </h4>
                        <div className='text-justify mx-4 mt-0 md:text-2xl'>
                            We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on our website
                        </div>
                    </li>
                    <li className={styles.customListItem}>
                        <h4 className='mx-4 text-justify md:text-2xl font-bold relative -top-6'>
                            Contact us:
                        </h4>
                        <div className='text-justify mx-4 mt-0 md:text-2xl'>
                            If you have any questions or concerns about our privacy policy, please contact us at
                            <a className='px-2 text-blue-600' href="mailto:support@blackworn.com">
                                support@blackworn.com.
                            </a>
                        </div>
                    </li>
                </ul>

            </section>
        </div>
    )
}

export default Privacy
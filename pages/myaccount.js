import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserAuth } from '../context/UserAuthContext';

const Myaccount = ({ }) => {
    const { user } = useUserAuth()
    const router = useRouter()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")



    useEffect(() => {
        if (!user) {
            router.push('/login')
        }
        const userInfo = async () => {
            const res = await fetch('/api/getuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ phone: user?.phoneNumber })
            })
            const data = await res.json()
            setFirstName(data?.user?.firstName)
            setLastName(data?.user?.lastName)
            setEmail(data?.user?.email)
            setPhone(data?.user?.phone)
        }
        userInfo()
    }, [user, router])


    const handleChange = async (e) => {

        if (e.target.name == "fname") {
            setFirstName(e.target.value)
        }
        if (e.target.name == "lname") {
            setLastName(e.target.value)
        }
        else if (e.target.name == "phone") {
            setPhone(e.target.value)
        }
        else if (e.target.name == "email") {
            setEmail(e.target.value)
        }
    }

    return (
        <>
            <main className='container mx-auto'>
                <div className="flex flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">My Account</h2>
                        <p className="mt-2 text-sm text-center text-gray-600 max-w">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                {user ? user?.phoneNumber : ""}
                            </a>
                        </p>
                    </div>
                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        FIRST NAME
                                    </label>
                                    <div className="mt-1">
                                        <input

                                            type="text"
                                            name="fname"
                                            id="name"
                                            value={firstName}
                                            onChange={handleChange}
                                            autoComplete="name"
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        LAST NAME
                                    </label>
                                    <div className="mt-1">
                                        <input

                                            type="text"
                                            name="lname"
                                            id="name"
                                            value={lastName}
                                            onChange={handleChange}
                                            autoComplete="name"
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black  sm:text-sm"
                                            readOnly />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email address
                                    </label>
                                    <div className="mt-1">
                                        <input

                                            type="text"
                                            name="email"
                                            id="email"
                                            value={email}
                                            onChange={handleChange}
                                            autoComplete="email"
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div>

                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                        Phone Number
                                    </label>
                                    <div className="mt-1">
                                        <input


                                            type="text"
                                            name="phone"
                                            id="phone"

                                            value={phone}
                                            onChange={handleChange}
                                            autoComplete="phone"
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                            readOnly
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}








export default Myaccount
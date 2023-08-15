import React, { useState, useEffect } from 'react'
import { useUserAuth } from '../context/UserAuthContext'
import { useRouter } from 'next/router'


const Welcome = () => {
    const { user } = useUserAuth()

    const router = useRouter()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        if (!user) {
            router.push('/login')
        }
        const userExists = async () => {
            const res = await fetch('/api/userexists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ phone: user?.phoneNumber })
            })
            const data = await res.json()
            if (data.exist) {
                router.push('/')
            }
        }
        userExists()
    }, [user,router])
    const handleChange = (e) => {
        if (e.target.name === 'fname') {
            setFirstName(e.target.value)
        }
        if (e.target.name === 'lname') {
            setLastName(e.target.value)
        }
        if (e.target.name === 'email') {
            setEmail(e.target.value)
        }
        // if (e.target.name === 'phone') {
        //     setPhone(e.target.value)
        // }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const userData = {
            firstName,
            lastName,
            email,
            phone: user?.phoneNumber
        }
        if (!userData.fName || !userData.lName || !userData.email || !userData.phone) return alert('Please fill all the fields')
        const res = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        const data = await res.json()
        if (data.success) {
            router.push('/')
        }
    }

    return (
        <main className='container mx-auto min-h-screen my-10'>
            <h2 className='text-center text-2xl md:text-3xl font-black'>Welcome to Black Worn</h2>
            <div className='flex justify-center items-center'>
                <form className='flex flex-col' onSubmit={handleSubmit}>
                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-bold text-gray-700">
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
                                    <label htmlFor="name" className="block text-sm font-bold text-gray-700">
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
                                    <label htmlFor="email" className="block text-sm font-bold text-gray-700">
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

                                    <label htmlFor="phone" className="block text-sm font-bold text-gray-700">
                                        Phone Number
                                    </label>
                                    <div className="mt-1">
                                        <input


                                            type="text"
                                            name="phone"
                                            id="phone"

                                            value={user?.phoneNumber}
                                            onChange={handleChange}
                                            autoComplete="phone"
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                            readOnly
                                        />
                                    </div>
                                </div>
                                    <button className='!bg-black text-white rounded-md p-2 m-4 w-full mx-auto' type='submit'>Submit</button>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Welcome
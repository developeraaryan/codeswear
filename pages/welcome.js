import React, { useState, useEffect } from 'react'
import { useUserAuth } from '../context/UserAuthContext'
import { useRouter } from 'next/router'


const Welcome = () => {
    const { user } = useUserAuth()

    const router = useRouter()
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
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
    }, [user])
    const handleChange = (e) => {
        if (e.target.name === 'fname') {
            setFName(e.target.value)
        }
        if (e.target.name === 'lname') {
            setLName(e.target.value)
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
            fName,
            lName,
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
                    <input onChange={handleChange} value={fName} name='fname' type="text" placeholder='Enter your First name' className='border-2 border-gray-300 m-4 rounded-md' />
                    <input onChange={handleChange} value={lName} name='lname' type="text" placeholder='Enter your Last name' className='border-2 border-gray-300 m-4 rounded-md' />
                    <input onChange={handleChange} value={email} name='email' type="text" placeholder='Enter your email' className='border-2 border-gray-300 m-4 rounded-md' />
                    <input value={user?.phoneNumber} name='phone' type="text" placeholder='Enter your phone number' className='border-2 border-gray-300 m-4 rounded-md' readOnly />
                    <button className='!bg-black text-white rounded-md p-2 m-4' type='submit'>Submit</button>
                </form>
            </div>
        </main>
    )
}

export default Welcome
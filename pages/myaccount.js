import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Myaccount = ({ }) => {
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [state, setState] = useState("")
    const [pincode, setPincode] = useState("")
    const [city, setCity] = useState("")
    const [user, setUser] = useState({ value: null })
    const [password, setPassword] = useState("")
    const [cpassword, setCpassword] = useState("")
    const [npassword, setNpassword] = useState("")


    useEffect(() => {
        const myuser = JSON.parse(localStorage.getItem("myuser"))
        if (!myuser) {
            router.push('/')
        }
        if (myuser && myuser.token) {
            setUser(myuser)
            setEmail(myuser.email)
            fetchData(myuser.token)
        }
    }, [router, router.query])

    const fetchData = async (token) => {
        const data = { token: token }
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        })
        const userData = await res.json()
        setName(userData.name)
        setAddress(userData.address)
        setPhone(userData.phone)
        setPincode(userData.pincode)
    }


    const handleUserSubmit = async () => {
        const data = { token: user.token, name, phone, address, pincode }
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        })
        const userData = await res.json()
        toast.success(`Successfully updated details!`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "dark",
        });
    }

    const handlePasswordSubmit = async () => {
        let userData;
        if (npassword == cpassword) {
            const data = { token: user.token, password, npassword, cpassword }
            let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(data)
            })
            userData = await res.json()
        }
        else {
            userData = { success: false }
        }
        if (userData.success) {
            toast.success('Successfully updated password!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast.error('Error updating password!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "dark",
            });
        }
        setPassword("")
        setNpassword("")
        setCpassword("")
    }

    const handleChange = async (e) => {

        if (e.target.name == "name") {
            setName(e.target.value)
        }
        else if (e.target.name == "phone") {
            setPhone(e.target.value)
        }
        else if (e.target.name == "address") {
            setAddress(e.target.value)
        }
        else if (e.target.name == "password") {
            setPassword(e.target.value)
        }
        else if (e.target.name == "cpassword") {
            setCpassword(e.target.value)
        }
        else if (e.target.name == "npassword") {
            setNpassword(e.target.value)
        }
        else if (e.target.name == "pincode") {
            setPincode(e.target.value)
        }

    }

    return (
        <div className='container mx-auto my-9'>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
                theme="dark"
            />
            <h1 className='text-3xl text-center font-bold'>Upadate your Account</h1>

            <h2 className="font-semibold text-xl my-4">1. Delivery details</h2>
            <div className="mx-auto flex">
                <div className="px-2 w-1/2" >
                    <div className="mb-4">
                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                        <input onChange={handleChange} value={name} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/" required />
                    </div>
                </div>
                <div className="px-2 w-1/2" >
                    <div className="mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email(<span className='text-red-700'>can&apos;t update</span>)</label>
                        {user && user.token ? <input value={user.email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/" readOnly /> : <input onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/" required />}

                    </div>
                </div>
            </div>
            <div className="px-2 w-full" >
                <div className="mb-4">
                    <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
                    <textarea value={address} onChange={handleChange} cols="30" rows="2" id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/" required></textarea>
                </div>

            </div>
            <div className="mx-auto flex">
                <div className="px-2 w-1/2" >
                    <div className="mb-4">
                        <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                        <input onChange={handleChange} value={phone} type="phone" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/" maxLength={10} required />
                    </div>
                </div>
                <div className="px-2 w-1/2" >
                    <div className="mb-4">
                        <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">PINCODE</label>
                        <input onChange={handleChange} value={pincode} type="number" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/" required />
                    </div>
                </div>



            </div>
            <button onClick={handleUserSubmit} className="disabled:bg-pink-300 flex mr-2 m-2 mb-5 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">Update details</button>


            <h2 className="font-semibold text-xl my-4">2.Change your password</h2>
            <div className="mx-auto flex">
                <div className="px-2 w-1/2" >
                    <div className="mb-4">
                        <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                        <input onChange={handleChange} value={password} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/" required />
                    </div>
                </div>
                <div className="px-2 w-1/2" >
                    <div className="mb-4">
                        <label htmlFor="npassword" className="leading-7 text-sm text-gray-600">New Password</label>
                        <input onChange={handleChange} value={npassword} type="password" id="npassword" name="npassword" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/" required />
                    </div>
                </div>
                <div className="px-2 w-1/2" >
                    <div className="mb-4">
                        <label htmlFor="cpassword" className="leading-7 text-sm text-gray-600">Confirm New Password</label>
                        <input onChange={handleChange} value={cpassword} type="password" id="cpassword" name="cpassword" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out/" required />
                    </div>
                </div>



            </div>

            <button onClick={handlePasswordSubmit} className="disabled:bg-pink-300 flex mr-2 m-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">Change password</button>
        </div>
    )
}








export default Myaccount
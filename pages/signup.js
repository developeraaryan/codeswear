import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import { register_validation } from '../lib/validate';
import { HiAtSymbol, HiFingerPrint, HiOutlineUser, } from 'react-icons/hi2'
import { HiPhone } from 'react-icons/hi2'
import styles from '../styles/Form.module.css'
import { getSession } from 'next-auth/react';

const Login = () => {
    const onSubmit = async (values) => {
        const options = {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(values)
        }
        await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/signup`, options)
            .then(res => res.json())
            .then((data) => {
                if (data.ok) {
                    router.push('/')
                }
            })



    }
    const formilk = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            cpassword: ""
        },
        validate: register_validation,
        onSubmit
    })
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    useEffect(() => {
        if (localStorage.getItem("token")) {
            router.push("/")
        }

    }, [router])
    const handleChange = (e) => {
        if (e.target.name == "name") {
            setName(e.target.value)
        }
        else if (e.target.name == "email") {
            setEmail(e.target.value)
        }
        else if (e.target.name == "phone") {
            setPhone(e.target.value)
        }
        else if (e.target.name == "password") {
            setPassword(e.target.value)
        }

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if ((typeof name == "string") && (Number.isInteger(Number(phone))) && name && email && phone && password && phone.length == 10) {

            try {
                const data = { name, email, password, phone }
                let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
                    method: "POST",
                    headers: {
                        "content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                let res = await response.json()
                console.log(res);
                setName("")
                setEmail("")
                setPhone("")
                setPassword("")
                toast.success('Your account has been created !', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    toast.info('Redirecting to Home page!', {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }, 1000);
                setTimeout(() => {
                    router.push('/')
                }, 3000);

            } catch (error) {
                console.error(error);
                toast.error('User already exists!', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            }
        } else {
            toast.error('Invalid Details !', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className='text-center text-2xl'>BLACK WORN</h2>
                    <hr className="h-px  bg-gray-200 border-0 dark:bg-gray-700" />
                    <h2 className="mt-4 text-center text-5xl/8 font-serif leading-9 tracking-tight text-gray-900">
                        SIGNUP
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form method="POST"
                        // onSubmit={handleSubmit}
                        onSubmit={formilk.handleSubmit}
                        className="flex flex-col gap-5" action="#" >
                        <div className=''>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                            </label>
                            <div className={`${styles.input_groups} ${formilk.touched.name && formilk.errors.name ? "border-rose-600 border" : ""}`}>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    // value={name}
                                    // onChange={handleChange}
                                    {...formilk.getFieldProps("name")}
                                    // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    className={styles.input_text}
                                />
                                <span className='icon flex items-center px-4'>
                                    <HiOutlineUser size={25} />
                                </span>

                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className={`${styles.input_groups} ${formilk.touched.email && formilk.errors.email ? "border-rose-600 border" : ""}`}>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    // value={email}
                                    // onChange={handleChange}
                                    {...formilk.getFieldProps("email")}
                                    // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    className={styles.input_text}
                                />
                                {/* {formilk.touched.email && formilk.errors.email ? (
                                    <div className="text-rose-500 text-sm">{formilk.errors.email}</div>
                                ) : null} */}
                                <span className='icon flex items-center px-4'>
                                    <HiAtSymbol size={25} />
                                </span>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                    Phone Number
                                </label>

                            </div>
                            <div className={`${styles.input_groups} ${formilk.touched.phone && formilk.errors.phone ? "border-rose-600 border" : ""}`}>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    autoComplete="current-phone"
                                    required
                                    min={10}
                                    // value={phone}
                                    // onChange={handleChange}
                                    {...formilk.getFieldProps("phone")}
                                    // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    className={styles.input_text}
                                />
                                {/* {formilk.touched.phone && formilk.errors.phone ? (
                                    <div className="text-rose-500 text-sm">{formilk.errors.phone}</div>
                                ) : null} */}
                                <span className='icon flex items-center px-4'>
                                    <HiPhone size={25} />
                                </span>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>

                            </div>
                            <div className={`${styles.input_groups} ${formilk.touched.password && formilk.errors.password ? "border-rose-600 border" : ""}`}>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    min={8}
                                    // value={password}
                                    // onChange={handleChange}
                                    {...formilk.getFieldProps("password")}
                                    // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    className={styles.input_text}
                                />
                                {/* {formilk.touched.password && formilk.errors.password ? (
                                    <div className="text-rose-500 text-sm">{formilk.errors.password}</div>
                                ) : null} */}
                                <span className='icon flex items-center px-4'>
                                    <HiFingerPrint size={25} />
                                </span>

                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="cpassword" className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirm Password
                                </label>

                            </div>
                            <div className={`${styles.input_groups} ${formilk.touched.cpassword && formilk.errors.cpassword ? "border-rose-600 border" : ""}`}>
                                <input
                                    id="cpassword"
                                    name="cpassword"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    // onChange={handleChange}
                                    {...formilk.getFieldProps("cpassword")}
                                    // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    className={styles.input_text}
                                />
                                {/* {formilk.touched.cpassword && formilk.errors.cpassword ? (
                                    <div className="text-rose-500 text-sm">{formilk.errors.cpassword}</div>
                                ) : null} */}
                                <span className='icon flex items-center px-4'>
                                    <HiFingerPrint size={25} />
                                </span>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md !bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:!bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                                "
                            >
                                Sign up
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already a member?{' '}
                        <Link href={'/login'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default Login


export async function getServerSideProps({ req }) {
    const session = await getSession({ req })
    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    return {
        props: { session },
    }
}
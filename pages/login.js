import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';
// import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
// import { AiOutlineMail } from 'react-icons/ai'
import { Formik, useFormik } from 'formik';
import { login_validation } from '../lib/validate';
import { HiAtSymbol } from 'react-icons/hi'

let status;


const onSubmit = async (values) => {
  // console.log(values);
  status = await signIn('credentials',
    {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/"
    })
  console.log(status.ok);

}

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validate: login_validation,
    onSubmit
  })
  console.log(formik.errors);
  const { data: session } = useSession()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  useEffect(() => {
    if (localStorage.getItem("myuser")) {
      router.push("/")
    }
    if (status?.ok) {
      // router.push(status.url)
      // window.history.back()
      router.back()
    }
    // else if (session) {
    //   router.push("/")
    // }
    console.log(session);

  }, [router, session])

  const handleGoogle = async () => {
    await signIn('google', { callbackUrl: 'http://localhost:3000/' })
  }

  const handleFacebook = async () => {
    await signIn('facebook', { callbackUrl: 'http://localhost:3000/' })
  }

  const handleChange = (e) => {
    if (e.target.name == "email") {
      setEmail(e.target.value)
    }
    else if (e.target.name === "password") {
      setPassword(e.target.value)
    }

  }
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = { email, password }
      let response = await fetch(`api/login`, {
        method: "POST",
        headers: {
          "content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      let res = await response.json()
      console.log(res);
      if (res.success) {
        localStorage.setItem('myuser', JSON.stringify({ token: res.token, email: res.email }))

      }
      setEmail("")
      setPassword("")

    } catch (error) {
      console.error(error);


    }
  }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className='text-center text-2xl'>BLACK WORN</h2>
          <hr className="h-px  bg-gray-200 border-0 dark:bg-gray-700" />
          <h2 className="mt-4 text-center text-5xl/8 font-serif leading-9 tracking-tight text-gray-900">
            LOGIN
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            // onSubmit={handleSubmit}
            onSubmit={formik.handleSubmit}
            className="space-y-6" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  // onChange={handleChange}
                  // value={email}
                  // onChange={formilk.handleChange}
                  // value={formilk.values.email}
                  {...formik.getFieldProps('email')}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder='Enter your email'
                />
                <span>
                  {formik.errors.email && formik.touched.email ? (
                    <div className="text-rose-500 text-sm">{formik.errors.email}</div>
                  ) : null}
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <span className="text-sm flex justify-between">
                  <Link href={'/forgot'} className="font-semibold text-indigo-600 hover:text-indigo-500 right-0">
                    Forgot password?
                  </Link>
                </span>

              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  // onChange={handleChange}
                  // value={password}
                  // onChange={formilk.handleChange}
                  // value={formilk.values.password}
                  {...formik.getFieldProps('password')}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder-black dark:placeholder-gray-400"
                  placeholder="•••••••••"
                />
                <span>
                  {formik.errors.password && formik.touched.password ? (
                    <div className="text-rose-500 text-sm">{formik.errors.password}</div>
                  ) : null}
                </span>


              </div>

            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md !bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:!bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:!bg-indigo-600"
              >
                Login
              </button>
            </div>
          </form>

          <hr className=" h-px mt-8 bg-gray-200 border-0 dark:bg-gray-700" />
          <button onClick={handleGoogle} type="button" className="flex w-full justify-center rounded-md !bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:!bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:!bg-indigo-600">Sign In with Google<FcGoogle className='relative top-[0.4rem] left-2' /></button>
          <button onClick={handleFacebook} type="button" className="flex w-full justify-center rounded-md !bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:!bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:!bg-indigo-600 my-2">Sign In with Facebook<FaFacebook className='relative top-[0.4rem] left-2' /></button>



          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link href={'/signup'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
export default Login

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  console.log(session);
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
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useUserAuth } from '../context/UserAuthContext';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Button } from '@material-ui/core';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const { user } = useUserAuth()
  const router = useRouter()
  React.useEffect(() => {
    if (user) {
      router.push('/welcome')
    }
  }, [user, router])
  const [error, setError] = useState("");
  const { setUpRecaptha } = useUserAuth();
  const [number, setNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [flag, setFlag] = useState(false)
  const [confirmObj, setConfirmObj] = useState(false)

  const getOtp = async (e) => {
    e.preventDefault();
    console.log("number", number);
    setError("");
    if (number === "" || number === undefined) {
      return toast.error('Please enter phone number')

    }
    try {
      const response = await setUpRecaptha(number);
      console.log("response", response);
      setConfirmObj(response)
      setFlag(true)
      toast.success('OTP sent successfully')
    } catch (error) {
      setError(error.message);
    }
  }

  const verifyOtp = async (e) => {
    e.preventDefault();
    console.log("otp", otp);
    setError("");
    if (otp === "" || otp === undefined) {
      return setError("Please enter otp")
    }
    try {
      await confirmObj.confirm(otp)
      router.push('/welcome')
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <style jsx>
        {`
        /* Chrome, Safari, Edge, Opera */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        /* Firefox */
        input[type=number] {
          -moz-appearance: textfield;
        }
        `}
      </style>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className='text-center text-2xl'>BLACK WORN</h2>
          <hr className="h-px  bg-gray-200 border-0 dark:bg-gray-700" />
          <h2 className="mt-4 text-center text-5xl/8 font-serif leading-9 tracking-tight text-gray-900">
            LOGIN
          </h2>
        </div>

        <div className={`mt-10 sm:mx-auto sm:w-full sm:max-w-sm shadow-lg ${!flag ? "block" : "hidden"}`}>

          <form className='my-10 mx-1 md:mx-10'>
            <h4 className='text-center my-2'>Enter Phone Number</h4>
            <PhoneInput
              defaultCountry={'IN'}
              placeholder='Enter phone number'
              value={number}
              onChange={setNumber}
              enableSearch
            />
          </form>
          <div id="recaptcha-container" className='mx-1 md:mx-10' />
          <div className="space-x-2 flex justify-end my-4 mr-4">
            <Link href='/'>
              <Button className='!bg-red-700' variant='contained'>cancel</Button>
            </Link>
            <Button className='!bg-blue-700' variant='contained' onClick={getOtp}>Send OTP</Button>
          </div>

        </div>
        <div className={`mt-10 sm:mx-auto sm:w-full sm:max-w-sm shadow-lg ${flag ? "block" : "hidden"}`}>

          <form className='my-10 mx-1 md:mx-10'>
            <h4 className='text-center my-2 text-black'>Enter Otp</h4>
            <input
              type="number"
              name="otp"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className='mx-4 w-[90%] border-2 border-gray-300 rounded-md py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
            />
          </form>
          <div className="space-x-2 flex justify-end my-4 mr-4">
            <Link href='/'>
              <Button className='!bg-red-700' variant='contained'>cancel</Button>
            </Link>
            <Button className='!bg-blue-700' variant='contained' onClick={verifyOtp}>Verify OTP</Button>
          </div>

        </div>
      </div>
    </>
  )
}
export default Login;
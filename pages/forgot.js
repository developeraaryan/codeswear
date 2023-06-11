import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const router = useRouter();
  const [npassword, setNpassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
    let rToken = router.query.token;
    setToken(rToken);
    console.log(token);
  }, [router]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (npassword === cpassword) {
      let data = {
        email:"aryanak9163@gamil.com",
        sendMail: false,
        password: npassword,
        token: token,
      };
      let json = await fetch(`api/forgot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let res = await json.json();
      if (res.success) {
        toast.success("Password reset successfully!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Unknown error occurred!", {
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
    } else {
      toast.error("Password mismatch!", {
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
  };

  const handleResetSendEmail = async (e) => {
    e.preventDefault();
    let data = {
      email,
      sendMail: true,
    };
    let json = await fetch(`api/forgot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await json.json();
    if (res.mailSent) {
      toast.success("Recovery email sent!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("Unknown error occurred sending mail!", {
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
  };

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "npassword") {
      setNpassword(e.target.value);
    } else if (e.target.name === "cpassword") {
      setCpassword(e.target.value);
    }
  };

  return (
    <>
      <div className="relative flex min-h-full flex-1 flex-col justify-center px-6 pb-10 lg:px-8 -top-14">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image src={'/assets/BW-LOGO-in-sqaure-shape.png'} alt='logo' width={100} height={100} className='m-auto my-6' />
          <h2 className='text-center text-2xl mt-8'>BLACK WORN</h2>
          <hr className="h-px  bg-gray-200 border-0 dark:bg-gray-700" />
          <h2 className="mt-4 text-center text-4xl/8 font-serif leading-9 tracking-tight text-gray-900">
            FORGOT PASSWORD
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {router.query.token && (
            <div>
              <div>
                <label htmlFor="npassword" className="block text-sm font-medium leading-6 text-gray-900">
                  New password
                </label>
                <div className="mt-2">
                  <input
                    id="npassword"
                    name="npassword"
                    type="password"
                    autoComplete="npassword"
                    required
                    onChange={handleChange}
                    value={npassword}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder='Enter your New Password'
                  />
                </div>
              </div>
              <div>
                <label htmlFor="cpassword" className="block text-sm font-medium leading-6 text-gray-900 my-4">
                  Confirm New password
                </label>
                <div className="mt-2">
                  <input
                    id="cpassword"
                    name="cpassword"
                    type="password"
                    autoComplete="cpassword"
                    required
                    onChange={handleChange}
                    value={cpassword}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder='Confirm New Password'
                  />
                </div>
              </div>
              <div>
                <button
                  onClick={handleResetPassword}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:!bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:!bg-indigo-600 my-4"
                >
                  Forgot Password
                </button>
              </div>
            </div>
          )}
          {!router.query.token && (
            <>
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
                    onChange={handleChange}
                    value={email}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder='Enter your email'
                  />
                </div>
              </div>
              <div>
                <button
                  onClick={handleResetSendEmail}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:!bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:!bg-indigo-600 my-4"
                >
                  Continue
                </button>
              </div>
            </>
          )}
          {!router.query.token && (
            <p className="mt-10 text-center text-sm text-gray-500">
              Remember password?{' '}
              <Link href={'/login'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Login
              </Link>
            </p>
          )}
          {npassword !== cpassword && (
            <span className='text-red-600'>password didn&apos;t match</span>
          )}
          {npassword && npassword === cpassword && (
            <span className='text-green-600'>password matched</span>
          )}
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
  );
};

export default Login;

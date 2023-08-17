"use client"
import Head from 'next/head'
// import Slider from '@madzadev/image-slider'
// import "@madzadev/image-slider/dist/index.css";
// import MuiImageSlider from 'mui-image-slider';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
// import ImageSlider from '../components/ImageSlider'
import dynamic from 'next/dynamic'
import HomepageCard from '../components/HomepageCard'
import localFont from "next/font/local"
import { useUserAuth } from '../context/UserAuthContext'

const neutro = localFont({ src: "../assets/fonts/neutro/Neutro-ExtraBold.otf" })

const DynamicCarousel = dynamic(async () => await import('../components/ImageSlider'), { ssr: false })





export default function Home() {
  const { user } = useUserAuth()
  const [comingSrc, setComingSrc] = useState('')
  useEffect(() => {
    localStorage.setItem("phone", user?.phoneNumber?.split('+')[1])
    window.scrollTo(0, 0)
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setComingSrc('/assets/crazy-deal-mobile.jpg')
      }
      else {
        setComingSrc('/assets/crazy-deal-web-mode.jpg')
      }

      handleResize()


      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }

  }, [user])


  return (
    <>
      <div className='overflow-x-hidden'>
        <Head>
          <title>blackworn.com - Wear What You Want</title>
          <meta name="description" content="Online Shopping Site For Men And Women Clothing In India. Buy Premium Quality T-shirt And More Trendiest Design & Styles Available At blackworn.com." key='description' />
          <meta name="keywords" content="blackworn, blackworn.com, blackworn.in , blackworn.in, blackworn, blackworn.com, blackworn.in , blackworn.in, blackworn, blackworn.com, blackworn.in , blackworn.in, blackworn, blackworn.com, blackworn.in , blackworn.in, blackworn, blackworn.com, blackworn.in , blackworn.in, blackworn, blackworn.com, blackworn.in , blackworn.in, blackworn, blackworn.com, blackworn.in , blackworn.in, blackworn, blackworn.com, blackworn.in , blackworn.in, blackworn, blackworn.com, blackworn.in,clothing , blackworn.in" key='keywords' />
          <meta name="author" content="blackworn.com" key='author' />
          <meta name="robots" content="index, follow" key='robots' />
          <meta name="googlebot" content="index, follow" key='googlebot' />
          <meta name="google-site-verification" content="index, follow" key='google-site-verification' />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/assets/favicon.ico" />
        </Head>


        <div>

          <DynamicCarousel />
          {/* 
          to do : sytles section
          */}
          <section className='bg-white relative bottom-10'>
            <div className="my-10 container  pt-7 mx-auto">
              <div className="relative mx-auto justify-center flex">
                <hr className="border-gray-400 h- w-9/12" />
                <div className="absolute inset-x-0 flex items-center justify-center -mt-[0.875rem]">
                  <div className={neutro.className}>
                    <span className="bg-white font-bold style px-3 text-black
                    text-xl md:text-5xl">STYLES</span>
                  </div>
                </div>
              </div>
              <div className={neutro.className}>
                <div className="image space-x-2 md:space-x-0 md:justify-center flex relative -ml-5 mt-10 md:mt-20 text-center">
                  <div className="ml-0 md:ml-10  relative left-0 md:-left-10">
                    <span className='pr-7 text-base md:text-[2.25rem] relative left-4 font-bold'>OVERSIZED</span>
                    <Image
                      src="/assets/oversized(styles).jpg"
                      alt="oversized"
                      width={4000}
                      height={10}
                      unoptimized={false}
                      placeholder='blur'
                      blurDataURL='/assets/blur.png'


                    />
                  </div>
                  <div className="ml-0 md:ml-10 relative left-0 md:left-0">
                    <span className='pr-7 text-base md:text-[2.25rem] relative -right-4 text-red-600 font-bold'>BASIC<span className='text-black'>TEES</span></span>
                    <Image
                      src="/assets/coming-(styles).png"
                      alt="oversized"
                      width={4000}
                      height={10}
                      unoptimized={false}
                      placeholder='blur'
                      blurDataURL='/assets/blur.png'


                    />
                  </div>

                </div>
              </div>
            </div>
          </section>
          <Image
            src={'/assets/crazy-deal-mobile.jpg'}
            alt='crazy deals'
            width={4000}
            height={10}
            unoptimized={false}
            placeholder='blur'
            blurDataURL='/assets/blur.png'
            className='-mt-20 '


          />
          <Image
            src={'/assets/comming-soon-web-mode .jpg'}
            alt='Commig soon'
            width={4000}
            height={10}
            unoptimized={false}
            placeholder='blur'
            blurDataURL='/assets/blur.png'


          />
          <Image
            src={'/assets/feature-web.png'}
            alt='features'
            width={4000}
            height={10}
            unoptimized={false}
            placeholder='blur'
            blurDataURL='/assets/blur.png'

          />
        </div>
        <div className='my-14'>
          <div className={neutro.className}>
            <h4 className='font-bold md:text-4xl text-center'>
              PREMIUM <span className='text-red-600'>OVERSIZRED</span> T SHIRT
            </h4>
          </div>
        </div>
        <HomepageCard />
        <Image
          src={'/assets/premium-design.png'}
          alt='premium designs'
          width={400}
          height={400}
          className='mx-auto'
        />
      </div>
    </>
  )
}



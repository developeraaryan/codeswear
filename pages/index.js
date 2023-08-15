"use client"
import Head from 'next/head'
// import Slider from '@madzadev/image-slider'
// import "@madzadev/image-slider/dist/index.css";
import { useSession } from 'next-auth/react'
// import MuiImageSlider from 'mui-image-slider';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
// import ImageSlider from '../components/ImageSlider'
import dynamic from 'next/dynamic'
import HomepageCard from '../components/HomepageCard'
import localFont from "next/font/local"
import ScrollToTop from 'react-scroll-to-top'


const neutro = localFont({ src: "../assets/fonts/neutro/Neutro-ExtraBold.otf" })

const DynamicCarousel = dynamic(async () => await import('../components/ImageSlider'), { ssr: false })





export default function Home() {
  const { data: session } = useSession()
  const [comingSrc, setComingSrc] = useState('')
  useEffect(() => {
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

  }, [])


  const getUserRole = async () => {
    const data = {
      email: session?.user?.email
    }
    let response = await fetch(`api/getrole`, {
      method: "POST",
      headers: {
        "content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    let res = await response.json()
  }
  useEffect(() => {
    const getgoogle = async () => {
      const data = {
        name: session?.user?.name,
        email: session?.user?.email,
        image: session?.user?.image

      }
      let response = await fetch(`api/getgoogle`, {
        method: "POST",
        headers: {
          "content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      let res = await response.json()

    }
    if (session) {
      getgoogle()
      getUserRole()
    }

  }, [session, getUserRole, session?.id])
  // ]
  return (
    <>
      <div className='overflow-x-hidden'>
        <Head>
          <title>blackworn.com - wear the style</title>
          <meta name="description" content="blackworn.com - wear the style" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
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



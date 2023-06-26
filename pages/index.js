import Head from 'next/head'
import { Inter } from 'next/font/google'
import Slider from '../components/Slider'
// import Slider from '@madzadev/image-slider'
// import "@madzadev/image-slider/dist/index.css";
import { signOut, useSession } from 'next-auth/react'
// import MuiImageSlider from 'mui-image-slider';
import Image from 'next/image'
import React, { useEffect } from 'react'
// import ImageSlider from '../components/ImageSlider'
import dynamic from 'next/dynamic'
import mongoose from 'mongoose'
import Product from '../Models/Product'
import HomepageCard from '../components/HomepageCard'


const DynamicCarousel = dynamic(() => import('../components/ImageSlider'), { ssr: false })

const images = [
  'https://picsum.photos/seed/a/1600/900',
  'https://picsum.photos/seed/b/1600/900',
  'https://picsum.photos/seed/c/1600/900',
];


const inter = Inter({ subsets: ['latin'] })

const image = [
  { url: 'https://picsum.photos/seed/a/1600/900' },
  { url: 'https://picsum.photos/seed/b/1920/1080' },
  { url: 'https://picsum.photos/seed/c/1366/768' }
]

export default function Home() {
  const { data: session } = useSession()
  const getUserRole = async () => {
    const data = {
      email: session?.user?.email
    }
    console.log(data.email);
    let response = await fetch(`api/getrole`, {
      method: "POST",
      headers: {
        "content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    let res = await response.json()
    console.log(res);
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
      console.log(res);

    }
    if (session) {
      getgoogle()
      getUserRole()
    }

  }, [session])
  // ]
  return (
    <>
      <div className=''>
        <Head>
          <title>blackworn.com - wear the style</title>
          <meta name="description" content="blackworn.com - wear the style" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {session && <div className="data">
          Name : {session?.user?.name}
          <br />
          Email : {session?.user?.email}
          <br />
          <Image src={session?.user?.image} height={100} width={100} alt='user profile' />
          <br />
          <button onClick={signOut}>Signout</button>
        </div>}
        <div>
          {/* <Image src="/assets/men.jpg" alt="wear the code" width={4000} height={10} /> */}
          {/* <Carousel>
            {
              items.map((item, i) => <Item key={i} item={item} />)
            }
          </Carousel> */}

          {/* <Slider imageList={images} width={1000} height={300} /> */}
          {/* <Slider /> */}
          <DynamicCarousel />
          {/* 
          to do : sytles section
          */}
          <section className='bg-gray-300 relative bottom-10'>
            <div className="my-10 container  pt-7 mx-auto">
              <div className="relative mx-auto justify-center flex">
                <hr className="border-gray-400 h- w-9/12" />
                <div className="absolute inset-x-0 flex items-center justify-center -mt-[0.875rem]">
                  <span className="bg-gray-300 font-bold  px-3 text-black text-2xl">STYLES</span>
                </div>
              </div>
              <div className="image flex my-5 text-center">
                <div className="ml10">
                  <span className='pr-7 font-bold'>OVERSIZED</span>
                  <Image
                    src="/assets/oversized(styles).png"
                    alt="oversized"
                    width={4000}
                    height={10}
                    className='relative -left-2'
                  />
                </div>

                <div className="">
                  <span className='pl-11 text-red-700 font-bold'>BASIC</span>
                  <Image
                    src="/assets/coming-soon-(styles).png"
                    alt="oversized"
                    width={4000}
                    height={10}
                    className='h-[12.5rem] relative -right-7'
                  />
                </div>
              </div>
            </div>
          </section>
          <Image
            src={'/assets/crazy-deal-web.png'}
            alt='crazy deals'
            width={4000}
            height={10}
            className='mb-0 relative bottom-20'
          />
          <Image
            src={'/assets/coming-soon-web.png'}
            alt='Commig soon'
            width={4000}
            height={10}
            className='relative md:-top-[7.5rem] right-0 bottom-[6.75rem]'
          />
          <Image
            src={'/assets/feature-web.png'}
            alt='features'
            width={4000}
            height={10}
            className='relative bottom-[8.55rem] md:-top-[15.25rem] right-0'
          />
        </div>
        <div className='-mt-28 md:-mt-52'>
          <h4 className='font-bold md:text-4xl text-center'>
            PREMIUM <span className='text-red-600'>OVERSIZRED</span> T SHIRT
          </h4>
        </div>
      </div>
      <HomepageCard />
    </>
  )
}



import Head from 'next/head'
import { Inter } from 'next/font/google'
// import Slider from '../components/Slider'
// import Slider from '@madzadev/image-slider'
// import "@madzadev/image-slider/dist/index.css";
import { signOut, useSession } from 'next-auth/react'
// import MuiImageSlider from 'mui-image-slider';
import Image from 'next/image'
import React, { useEffect } from 'react'
// import ImageSlider from '../components/ImageSlider'
// import dynamic from 'next/dynamic'


// const DynamicCarousel = dynamic(() => import('../components/ImageSlider'), { ssr: false })

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
      <div>
        <Head>
          <title>codeswear.com - wear the code</title>
          <meta name="description" content="codeswear.com - wear the code " />
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
          {/* <DynamicCarousel /> */}
        </div>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Wear the code with Codeswear.com</h1>
              <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Whatever you want? What do you want? You want code? so why not wear the code!</p>
              <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Whatever you want? What do you want? You want code? so why not wear the code!</p>
              <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Whatever you want? What do you want? You want code? so why not wear the code!</p>
              <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Whatever you want? What do you want? You want code? so why not wear the code!</p>
            </div>
            <div className="flex flex-wrap -m-4">
              <div className="xl:w-1/3 md:w-1/2 p-4">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Shooting Stars</h2>
                  <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
                </div>
              </div>
              <div className="xl:w-1/3 md:w-1/2 p-4">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                      <circle cx="6" cy="6" r="3"></circle>
                      <circle cx="6" cy="18" r="3"></circle>
                      <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                    </svg>
                  </div>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-2">The Catalyzer</h2>
                  <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
                </div>
              </div>
              <div className="xl:w-1/3 md:w-1/2 p-4">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Neptune</h2>
                  <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
                </div>
              </div>
              <div className="xl:w-1/3 md:w-1/2 p-4">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path>
                    </svg>
                  </div>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Melanchole</h2>
                  <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
                </div>
              </div>
              <div className="xl:w-1/3 md:w-1/2 p-4">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                    </svg>
                  </div>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Bunker</h2>
                  <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
                </div>
              </div>
              <div className="xl:w-1/3 md:w-1/2 p-4">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Ramona Falls</h2>
                  <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
                </div>
              </div>
            </div>
            <button className="flex mx-auto mt-16 text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg">Button</button>
          </div>
        </section>

      </div>

    </>
  )
}

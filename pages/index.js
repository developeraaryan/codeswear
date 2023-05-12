import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div>
        <Head>
          <title>codeswear.com - wear the code</title>
          <meta name="description" content="codeswear.com - wear the code " />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>Hey this is codeswear</h1>
        <div className="mx-4 bg-slate-500">Hey this is me</div>
      </div>

    </>
  )
}

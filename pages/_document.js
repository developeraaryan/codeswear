import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className='overflow-x-hidden'>
      <Head />
      <body className='bg-white text-black min-h-full'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

import React from 'react';

const About = () => {
  return (
    <div className='h-screen'>
      <div className="flex  flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl">BLACK WORN</h2>
          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
          <h2 className="mt-4 text-center text-5xl/8 font-serif leading-9 tracking-tight text-gray-900">
            ABOUT US
          </h2>
        </div>
      </div>
      <section className="container mx-auto flex justify-center md:pl-10 md:pr-10 ">
        <ul style={{
          listStyle: "disc inside url('sqpurple.gif')",
          listStyleType: "disc"
        }} >
          <li >
            <span className='text-justify md:text-2xl'>
              Black Worn is a clothing brand that is dedicated to providing high-quality and stylish clothing for men and women. We are committed to creating unique designs that reflect the latest fashion trends while also maintaining a timeless appeal. Our products are made with the finest materials to ensure durability and comfort. We believe that fashion should be accessible to everyone, which is why we offer our products at affordable prices. We are based in Patna, India, and sell our products online through our website. At Black Worn, we value our customers&apos; privacy and are committed to protecting their personal information.
            </span>

          </li>
        </ul>
      </section>
    </div>
  );
};

export default About;

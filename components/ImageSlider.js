import React, { useEffect, useState } from "react";
import { Alert, Carousel } from "flowbite-react";
import Image from "next/image";

const ImageSlider = () => {




  return (
    <>
      <CarouselExample />
    </>
  );
};

function CarouselExample() {
  const [imageSrc1, setImageSrc1] = useState('')
  const [imageSrc2, setImageSrc2] = useState('')
  const [imageSrc3, setImageSrc3] = useState('')

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setImageSrc1('/assets/home-poster-mobile.jpg')
        setImageSrc2('/assets/home-poster-mobile.jpg')
        setImageSrc3('/assets/home-poster-mobile.jpg')
      }
      else {
        setImageSrc1('/assets/web-home-screen-1st.jpg')
        setImageSrc2('/assets/web-home-screen-1st.jpg')
        setImageSrc3('/assets/web-home-screen-1st.jpg')
      }
    }

    handleResize()


    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, [])
  return (
    <div className="h-96 md:h-[37rem]   rounded-b-lg">
      <Carousel leftControl=" "
        rightControl=" "
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}

        <Image
          src={imageSrc1}
          alt="wear the code"
          width={4000}
          height={10}
          className="h-96 md:h-[37rem]"
        />
        <Image
          src={imageSrc2}
          alt="wear the code"
          width={4000}
          height={10}
          className="h-96 md:h-[37rem]"
        />
        <Image
          src={imageSrc3}
          alt="wear the code"
          width={4000}
          height={10}
          className="h-96 md:h-[37rem]"
        />

      </Carousel>
    </div>
  );
}



export default ImageSlider;

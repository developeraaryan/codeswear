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
        setImageSrc1('/assets/top-poster.jpg')
        setImageSrc2('/assets/top-poster.jpg')
        setImageSrc3('/assets/top-poster.jpg')
      }
      else {
        setImageSrc1('/assets/top-poster-web.jpg')
        setImageSrc2('/assets/top-poster-web.jpg')
        setImageSrc3('/assets/top-poster-web.jpg')
      }
    }

    handleResize()


    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, [])
  return (
    <div className="h-96 md:h-[26rem]   rounded-b-lg">
      <Carousel leftControl=" "
        rightControl=" "
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}

        <Image
          src={imageSrc1}
          alt="wear the code"
          width={4000}
          height={10}
          className="h-96 md:h-[26rem]"
        />
        <Image
          src={imageSrc2}
          alt="wear the code"
          width={4000}
          height={10}
          className="h-96 md:h-[26rem]"
        />
        <Image
          src={imageSrc3}
          alt="wear the code"
          width={4000}
          height={10}
          className="h-96 md:h-[26rem]"
        />

      </Carousel>
    </div>
  );
}



export default ImageSlider;

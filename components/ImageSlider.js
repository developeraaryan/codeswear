import React from "react";
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
  return (
    <div className="h-36 md:h-[26rem]   rounded-b-lg">
      <Carousel leftControl=" "
        rightControl=" "
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}

        <Image
          src="/assets/top-poster-web.jpg"
          alt="wear the code"
          width={4000}
          height={10} 
          className="h-36 md:h-[26rem]"
          />
        <Image
          src="/assets/top-poster-web.jpg"
          alt="wear the code"
          width={4000}
          height={10} 
          className="h-36 md:h-[26rem]"
          />
        <Image
          src="/assets/top-poster-web.jpg"
          alt="wear the code"
          width={4000}
          height={10} 
          className="h-36 md:h-[26rem]"
          />
        <Image
          src="/assets/top-poster-web.jpg"
          alt="wear the code"
          width={4000}
          height={10} 
          className="h-36 md:h-[26rem]"
          />
      </Carousel>
    </div>
  );
}



export default ImageSlider;

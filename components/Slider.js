import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import React from 'react'
import '@splidejs/react-splide/css';
// import '@splidejs/react-splide/css/sea-green';
// import '@splidejs/react-splide/css/skyblue';
import '@splidejs/react-splide/css/core';
import Image from 'next/image';

const Slider = () => {
    return (
        <Splide options={{
            rewind: true,
            // width: 2000,
            gap: '1rem',
        }}
            aria-label="My Favorite Images">
            <SplideSlide >
                <Image width={700} height={100} className='w-1/1 m-auto ' src="/assets/top poster.jpg" alt="Image 1" />
            </SplideSlide>
            <SplideSlide>
                <Image width={700} height={100} className='w-1/1 m-auto' src="/assets/images/slide-2.jpg" alt="Image 2" />
            </SplideSlide>
            <SplideSlide>
                <Image width={700} height={100} className='w-1/1 m-auto' src="/assets/images/slide-3.jpg" alt="Image 3" />
            </SplideSlide>
            <SplideSlide>
                <Image width={700} height={100} className='w-1/1 m-auto' src="/assets/images/slide-4.jpg" alt="Image 4" />
            </SplideSlide>
        </Splide>
        // <Splide hasTrack={false} aria-label="...">
        //     <SplideTrack>
        //         <SplideSlide>
        //             <Image width={700} height={100} src="/assets/images/slide-1.jpg" alt="Image 1" />
        //         </SplideSlide>
        //         <SplideSlide>
        //             <Image width={700} height={100} src="/assets/images/slide-2.jpg" alt="Image 2" />
        //         </SplideSlide>
        //         <SplideSlide>
        //             <Image width={700} height={100} src="/assets/images/slide-3.jpg" alt="Image 3" />
        //         </SplideSlide>
        //         <SplideSlide>
        //             <Image width={700} height={100} src="/assets/images/slide-4.jpg" alt="Image 4" />
        //         </SplideSlide>
        //     </SplideTrack>

        //     <div className="splide__arrows">
        //         <button className="splide__arrow splide__arrow--prev">Prev</button>
        //         <button className="splide__arrow splide__arrow--next">Next</button>
        //     </div>


        // </Splide>
    )
}

export default Slider
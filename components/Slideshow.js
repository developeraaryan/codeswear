import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CarouselComponent = ({ images }) => {

    return (
        <Carousel
            showThumbs={false}
            autoPlay
            infiniteLoop
            swipeable
            // dynamicHeight
            emulateTouch
            showStatus={false}
            // width={400}
            showArrows={false}
            centerSlidePercentage={1}
            interval={3000} // Change this value to set the interval between slides (in milliseconds)
            className='w-screen relative  right-10 md:right-10 -top-16'
        >
            {images?.map((item) => (
                <div key={item._id} className=''>
                    <Image
                        src={item.url}
                        width={400}
                        height={400}
                        alt={item.public_id}
                        className='max-h-96 '
                        />
                </div>
            ))}
        </Carousel>
    );
};

export default CarouselComponent;

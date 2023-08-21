import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Styles from '../styles/Slides.module.css'

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
            interval={3000} // Change this value to set the interval between slides (in milliseconds)
            className={`${Styles.carousel}`}
        >
            {images?.map((item) => (
                <div key={item._id} className=''>
                    <Image
                        src={item.url}
                        width={400}
                        height={400}
                        alt={item.public_id}
                        className={`object-cover ${Styles.images}`}
                    />
                </div>
            ))}
        </Carousel>
    );
};

export default CarouselComponent;

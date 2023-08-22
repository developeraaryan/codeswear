import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Error from 'next/error';
import { AiOutlineDoubleRight, AiOutlineShareAlt } from 'react-icons/ai'
import { FaCopy, FaShare } from 'react-icons/fa'
import { Button, Input, Modal, Text } from '@nextui-org/react';
import { Image } from '@nextui-org/react';
import SlideShow from '../../components/Slideshow'
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon, TelegramIcon, TelegramShareButton, LinkedinShareButton, LinkedinIcon, RedditShareButton, RedditIcon, EmailShareButton, EmailIcon } from 'next-share';
import toast, { Toaster } from 'react-hot-toast';
import { useUserAuth } from '../../context/UserAuthContext';

const Slug = ({ addToCart, buyNow, error }) => {
    const { user } = useUserAuth()
    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
    };
    const sHandler = () => setSVisible(true);
    const sCloseHandler = () => {
        setSVisible(false);
    };
    const router = useRouter()
    const [size, setSize] = useState("")
    const { slug } = router.query
    const [pin, setPin] = useState()
    const [service, setService] = useState()
    const [sVisible, setSVisible] = useState(false);
    const [product, setProduct] = useState()
    useEffect(() => {
        const slugDetails = async () => {
            let res = await fetch(`/api/slugproduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    slug: slug
                })
            })
            let data = await res.json()
            setProduct(data.products[0])
        }
        slugDetails()


    }, [slug])
    const checkServiceability = async () => {
        let pins = await fetch(`https://api.postalpincode.in/pincode/${pin}`)
        let pinData = await pins.json()
        if (pinData[0].Status == 'Success') {
            // setService(true)
            toast.success('Service Available!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            toast.error('Invalid Pincode!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

    }
    const onChangePin = (e) => {
        let currentPin = e.target.value
        currentPin = Number.parseInt(currentPin)
        setPin(currentPin)
    }

    if (error == 404) {
        return <Error statusCode={404} />
    }


    const handleWish = async (e) => {
        e.preventDefault()
        if (user) {
            let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/wishlist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    product: product?._id,
                    phone: user?.phoneNumber
                })

            })
            let data = await res.json()
            if (data.success) {
                toast.success('Added to wishlist!', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
            else {
                toast.error('Already in wishlist!', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        }
        else {
            toast.error('Login Please!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const copyHandler = () => {
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_SHARE_DOMAIN}/product/${product?.slug}`)
        toast.success('Link Copied!')
    }
    return (
        <>
            <section className="text-gray-600 body-font overflow-hidden min-h-full">
                <SlideShow images={product?.img} />
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />

                <div className="container py-16 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap flex-col">
                        <button onClick={handleWish} className="z-50 rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center relative bottom-28 -right-72 md:-right-[45rem] justify-center text-gray-500 ml-4">
                            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                            </svg>
                        </button>
                        <div className="relative left-[55rem] top-20">
                        </div>
                        <Button
                            icon={<AiOutlineShareAlt size={25} />}
                            auto
                            light
                            ripple={false}
                            className='hover:text-slate-700 relative left-[17rem] md:left-[55rem] -top-10'
                            onPress={sHandler}
                        />

                        <Modal
                            closeButton
                            aria-labelledby="modal-title"
                            open={sVisible}
                            onClose={sCloseHandler}
                        >
                            <Modal.Header>
                                <Text b id="modal-title" size={25}>
                                    Share Now!
                                </Text>
                            </Modal.Header>
                            <Modal.Body>
                                <div className='flex flex-row'>
                                    <Input
                                        readOnly
                                        value={`${process.env.NEXT_PUBLIC_SHARE_DOMAIN}/product/${product?.slug}`}
                                        width='90%'
                                    />
                                    <Button
                                        icon={<FaCopy />}
                                        auto
                                        light
                                        ripple={false}
                                        onPress={copyHandler}
                                    />
                                </div>
                                <div className="grid grid-cols-7 gap-8">
                                    <FacebookShareButton
                                        url={`https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_SHARE_DOMAIN}/product/${product?.slug}`}
                                        quote={product?.title}
                                        hashtag="#fashion"
                                        className="Demo__some-network__share-button">
                                        <FacebookIcon size={32} round />
                                    </FacebookShareButton>
                                    <TwitterShareButton
                                        url={`https://twitter.com/intent/tweet?text=${product?.title}&url=${process.env.NEXT_PUBLIC_SHARE_DOMAIN}/product/${product?.slug}`}
                                        title={product?.title}
                                        className="Demo__some-network__share-button">
                                        <TwitterIcon size={32} round />
                                    </TwitterShareButton>
                                    <WhatsappShareButton
                                        url={`${process.env.NEXT_PUBLIC_SHARE_DOMAIN}/product/${product?.slug}`}
                                        title={product?.title}
                                        separator=":: "
                                        windowPosition='screenCenter'
                                        windowHeight={1000}
                                        windowWidth={1000}
                                        className="Demo__some-network__share-button">
                                        <WhatsappIcon size={32} round />
                                    </WhatsappShareButton>
                                    <TelegramShareButton
                                        url={`https://telegram.me/share/url?url=${process.env.NEXT_PUBLIC_SHARE_DOMAIN}/product/${product?.slug}&text=${product?.title}`}
                                        title={product?.title}
                                        className="Demo__some-network__share-button">
                                        <TelegramIcon size={32} round />
                                    </TelegramShareButton>
                                    <LinkedinShareButton
                                        url={`https://www.linkedin.com/shareArticle?mini=true&url=${process.env.NEXT_PUBLIC_SHARE_DOMAIN}/product/${product?.slug}&title=${product?.title}&summary=${product?.title}&source=${process.env.NEXT_PUBLIC_SHARE_DOMAIN}`}
                                        className="Demo__some-network__share-button">
                                        <LinkedinIcon size={32} round />
                                    </LinkedinShareButton>
                                    <RedditShareButton
                                        url={`https://www.reddit.com/submit?url=${process.env.NEXT_PUBLIC_SHARE_DOMAIN}/product/${product?.slug}&title=${product?.title}`}
                                        title={product?.title}
                                        windowWidth={660}
                                        windowHeight={460}
                                        className="Demo__some-network__share-button">
                                        <RedditIcon size={32} round />
                                    </RedditShareButton>
                                    <EmailShareButton
                                        url={`mailto:?subject=${product?.title}&body=${product?.title} ${process.env.NEXT_PUBLIC_SHARE_DOMAIN}/product/${product?.slug}`}
                                        subject={product?.title}
                                        body={product?.title}
                                        className="Demo__some-network__share-button">
                                        <EmailIcon size={32} round />
                                    </EmailShareButton>
                                </div>



                            </Modal.Body>

                        </Modal>
                        <div className="lg:w-1/2 w-full -pl-10 lg:pl-10 lg:py-6 -mt-32 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">BLACK WORN</h2>
                            <h1 className="text-gray-900 text-xl title-font font-medium mb-1">{product?.title}</h1>
                            <div className="flex space-x-4">
                                <h2 className='font-bold text-xl'>₹{product?.sprice}</h2>
                                <h3 className='font-bold line-through font-mono text-red-600'>₹{product?.lprice}</h3>
                                <h4 className='bg-black text-white p-1 text-sm border-none rounded-full shadow-xl'>57% OFF</h4>
                            </div>
                            <div className="grid grid-cols-2 gap-2 fixed bottom-0 justify-center items-center bg-slate-50 w-full left-0 p-4 z-50">

                                <button onClick={() => {
                                    if (user) {
                                        if (size == "") {
                                            toast.error('Select Size!')
                                        }
                                        else {
                                            addToCart(slug, 1, product?.sprice, product?.title, size, product?.img)
                                            toast.success('Added to cart!')
                                        }
                                    }
                                    else {
                                        toast.error('Login Please!')
                                    }
                                }} disabled={product?.availableqty <= 0} className="disabled:bg-blue-300 p-2 text-white bg-rose-500 border-0  text-sm text-center w-full  focus:outline-none hover:bg-rose-600 rounded">Add to cart</button>
                                <button onClick={() => {
                                    if (size == "") {
                                        toast.error('Select Size!')
                                    }
                                    else {

                                        user ? buyNow(slug, 1, product?.sprice, product?.title, size) : toast.error('Login Please!')
                                    }
                                }} disabled={product?.availableqty <= 0} className="disabled:bg-blue-300 p-2 text-white bg-black border-0 text-sm  focus:outline-none hover:bg-[#4b5563] rounded">Buy Now</button>

                                {/* Wishlist */}

                            </div>

                        </div>
                    </div>
                </div>
                <div className="size flex flex-col justify-center">
                    <div className="text flex justify-center font-semibold space-x-[4.5rem] relative left-7 md:space-x-[30rem] z-0">
                        <h5 className='text-sm mt-3'>SELECT SIZE</h5>
                        <Button
                            light
                            onPress={handler}
                            color='error'
                        >
                            SEE CHART
                            <AiOutlineDoubleRight className='inline-block pl-1' size={25} />
                        </Button>
                        <Modal
                            blur
                            closeButton={true}
                            aria-labelledby="modal-title"
                            animated
                            open={visible}
                            onClose={closeHandler}
                        >
                            <Modal.Header>
                                <Text id="modal-title" b size={18}>
                                    SIZE CHART
                                </Text>
                            </Modal.Header>
                            <Modal.Body>
                                <div className='flex justify-center'>

                                    <Image
                                        src={`/assets/size-chart-bw.jpg`}
                                        alt="size chart"
                                        width={500}
                                        height={500}
                                    />
                                </div>
                            </Modal.Body>

                        </Modal>
                    </div>
                    <div className="flex justify-center my-4">


                        <button disabled={(!product?.size.includes("M"))}
                            onClick={() => setSize('M')}
                            className='focus:text-white focus:bg-black disabled:cursor-not-allowed disabled:opacity-40 flex items-center justify-center w-10 h-10 border-2 border-gray-400 rounded-md mr-2'>
                            <div className="">
                                M
                            </div>

                        </button>
                        <button disabled={(!product?.size.includes("L"))}
                            onClick={() => setSize('L')}
                            className='focus:text-white focus:bg-black disabled:cursor-not-allowed disabled:opacity-40 flex items-center justify-center w-10 h-10 border-2 border-gray-400 rounded-md mr-2'>
                            <div className="">
                                L
                            </div>

                        </button>
                        <button disabled={(!product?.size.includes("XL"))}
                            onClick={() => setSize('XL')}
                            className='focus:text-white focus:bg-black disabled:cursor-not-allowed disabled:opacity-40 flex items-center justify-center w-10 h-10 border-2 border-gray-400 rounded-md mr-2'>
                            <div className="">
                                XL
                            </div>

                        </button>
                    </div>
                    <hr className='border-t border-gray-300 my-8' />

                    {/* check avaialability */}
                    <div className="container flex flex-col justify-center my-4 mx-auto">

                        <div className="flex flex-col justify-center mr-28">
                            <div className="text flex justify-center font-semibold">
                                <Image
                                    showSkeleton
                                    src='/assets/tracking.png'
                                    width={30}
                                    height={30}
                                    className='-mt-3 mr-1'
                                    alt='tracking'
                                />
                                <h5 className='relative right-0 md:right-[37rem] text-sm top-3'>CHECK AVAILABILITY</h5>
                            </div>
                        </div>

                        <div className="pin mt-6 flex flex-col max-w-xl items-center mx-0 md:mx-auto justify-center">
                            <Input
                                name='pincode'
                                id='pincode'
                                onChange={onChangePin}
                                clearable
                                contentRightStyling={false}
                                placeholder="Enter PINCODE"
                                type='text'
                                aria-label='PINCODE'
                                size='xl'
                                height={300}
                                contentRight={
                                    <Button light size={'xs'} onClick={checkServiceability}>
                                        CHECK
                                    </Button>
                                }
                                className='outline-none border-none focus:outline-none '
                            />
                            <span className='ml-4 text-[0.65rem]'>Please enter a valid PINCODE to check delivery information</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3">
                        <Image
                            showSkeleton
                            src='/assets/100-premium-cotton.png'
                            alt='return'
                            width={80}
                            height={80}
                        //   className='h-7 relative bottom-2' 
                        />
                        <Image
                            showSkeleton
                            src='/assets/100-secure-payments.png'
                            alt='return'
                            width={80}
                            height={80}
                        //   className='h-7 relative bottom-2' 
                        />
                        <Image
                            showSkeleton
                            src='/assets/easy-returns-and-refunds.png'
                            alt='return'
                            width={80}
                            height={80}
                        //   className='h-7 relative bottom-2' 
                        />


                    </div>


                    <div className="flex flex-col justify-start container my-4">
                        <h4 className='text-black font-black text-lg mx-7'>PRODUCT DESCRIPTION :</h4>
                        <ul className='list-disc mx-10 md:mx-20 my-4 container'>
                            <li>
                                {product?.desc}
                            </li>
                            <li>100% premium cotton with bio washed</li>
                            <li>High Quality Graphics Print</li>
                            <li>Comfort and Durability</li>
                        </ul>
                        <h4 className='text-black font-black text-xl mx-8'>WASH CARE :</h4>
                        <ul className='list-disc  mx-12 md:mx-20 my-4'>
                            <li>Machine Wash</li>
                            <li>Wash in cold water</li>
                            <li>Use Mild Detergent</li>
                            <li>Do Not Dry In Direct Sunlight</li>
                            <li>Do Not Soak In Water For Long Time</li>
                            <li>Dry in shade inside out</li>
                            <li>Do Not Bleach</li>
                            <li>Do Not Iron Directly On Print</li>
                            <li>Do Not Wring</li>
                            <li>Do Not Dry Clean</li>
                            <li>Do Not Tumble Dry</li>
                            <li>Wash With Like Colors</li>
                        </ul>
                    </div>

                </div>
            </section >
        </>
    )
}





export default Slug
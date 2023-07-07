import React from 'react'
import emptyImg from '../public/assets/empty.png'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Card, Grid, Row, Text, Button } from "@nextui-org/react";
import CrossIcon from "../components/CrossIcon";

const wishlist = () => {
    const router = useRouter()
    const [isEmpty, setIsEmpty] = React.useState(true)
    return (
        <div className='container mx-auto min-h-screen overflow-x-hidden'>
            <h1 className='text-3xl text-center my-4 leading-10'>Wishlist</h1>
            {!isEmpty ? emptyWishlist(router) : wishlistItem()}
        </div>
    )
}


const wishlistItem = () => {
    const list = [
        {
            title: "Orange",
            img: "/images/fruit-1.jpeg",
            price: "$5.50",
        },
        {
            title: "Tangerine",
            img: "/images/fruit-2.jpeg",
            price: "$3.00",
        },
        {
            title: "Cherry",
            img: "/images/fruit-3.jpeg",
            price: "$10.00",
        },
        {
            title: "Lemon",
            img: "/images/fruit-4.jpeg",
            price: "$5.30",
        },
        {
            title: "Avocado",
            img: "/images/fruit-5.jpeg",
            price: "$15.70",
        },
        {
            title: "Lemon 2",
            img: "/images/fruit-6.jpeg",
            price: "$8.00",
        },
        {
            title: "Banana",
            img: "/images/fruit-7.jpeg",
            price: "$7.50",
        },
        {
            title: "Watermelon",
            img: "/images/fruit-8.jpeg",
            price: "$12.20",
        },
    ];
    return (
        <>
            <Grid.Container gap={2} className='overflow-y-hidden' justify="flex-start">
                {list.map((item, index) => (
                    <Grid xs={6} sm={3} key={index}>
                        <Card isPressable>
                            <Card.Body className='shadow-lg rounded-md shadow-slate-500' css={{ p: 0 }}>
                                <Card.Image
                                    src={"https://nextui.org" + item.img}
                                    objectFit="cover"
                                    width="100%"
                                    height={300}
                                    alt={item.title}
                                />
                            </Card.Body>
                            <Card.Body className='overflow-x-hidden' css={{ justifyItems: "flex-start" }}>
                                <Row wrap="wrap" justify="space-between" align="center">
                                    <Text b>{item.title}</Text>

                                </Row>
                                <Row wrap="wrap" justify="space-between" align="flex-start">
                                    <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
                                        {item.price}
                                    </Text>

                                </Row>
                                <Row wrap="wrap" justify="space-between" align="flex-start">
                                    <Text className='  line-through ' css={{ color: "$red600", fontWeight: "$semibold", fontSize: "$sm" }}>
                                        {'$9.99'}
                                    </Text>

                                </Row>
                            </Card.Body>
                            <Card.Header className='absolute left-[4.5rem] md:left-[18rem]' css={{ justifyItems: "flex-start" }} >
                                <Row wrap="wrap" justify="space-between" align="center">
                                    <Button
                                        auto
                                        size="md"
                                        color="error"
                                        icon={<CrossIcon />}
                                        variant="outlined"
                                        css={{ borderRadius: '50%', padding: '0.5rem', color: 'red', borderColor: 'red', backgroundColor: 'white' }}
                                    />



                                </Row>
                            </Card.Header>
                            <Card.Footer className='relative bottom-2 md:bottom-0 md:left-[14rem]' css={{ justifyItems: "flex-start" }} >
                                <Row wrap="wrap" justify="space-between" align="center">
                                    <Button auto size="md" color="success" variant="contained">
                                        Add to cart
                                    </Button>

                                </Row>
                            </Card.Footer>
                        </Card>
                    </Grid>
                ))}
            </Grid.Container>
        </>
    )
}

const emptyWishlist = (router) => {
    return (
        <>
            <div className='flex flex-col justify-center items-center my-16'>
                <Image
                    src={emptyImg}
                    alt="empty"
                    width={200}
                    height={200} />
            </div>
            <h5 className='mx-auto text-center font-black text-2xl'>Your Wishlist is empty</h5>
            <h6 className='mx-auto text-center text-gray-400 font-normal text-xl'>Save your favourite here</h6>
            <button className='mx-auto my-4 flex justify-center text-center border rounded-2xl p-4 text-white !bg-black' type="button" onClick={() => {
                router.push('/')
            }}>Start Shopping</button>
        </>
    )
}

export default wishlist
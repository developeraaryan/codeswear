"use client"
import React, { useEffect } from 'react'
import emptyImg from '../public/assets/empty.png'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Card, Grid, Row, Text, Button } from "@nextui-org/react";
import CrossIcon from "../components/CrossIcon";
import mongoose from 'mongoose'
import Wishlist from '../Models/Wishlist'
import Product from '../Models/Product'
import { Toaster, toast } from 'react-hot-toast'
import { getSession, useSession } from "next-auth/react"




const Wishlist = ({ wishes, context }) => {
    const { data: session, status } = useSession()
    // const [wishes, setWishes] = React.useState()
    const router = useRouter()
    const [isEmpty, setIsEmpty] = React.useState(true)
    useEffect(() => {

        if (wishes.length > 0) {
            setIsEmpty(false)
        }
    }, [])

    return (
        <div className='container mx-auto min-h-screen overflow-x-hidden'>
            <h1 className='text-3xl text-center my-4 leading-10'>Wishlist</h1>
            {isEmpty ? emptyWishlist(router) : wishlistItem(wishes, router)}
        </div>
    )
}






const wishlistItem = (wishes, router) => {
    const removeWish = async (id) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/deletewish`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
        const data = await res.json()
        if (data.success) {
            toast.success(data.message)
            // router.push('/wishlist')
        }

        return data
    }
    return (
        <>
            < Grid.Container gap={2} className='overflow-y-hidden' justify="flex-start">
                <Toaster
                    position='top-center'
                />
                {wishes && wishes.map((item, index) => (
                    <Grid xs={6} sm={3} key={index}>
                        <Card isPressable isHoverable>
                            <Card.Body className='shadow-lg rounded-md shadow-gray-300' css={{ p: 0 }}>
                                <Card.Image
                                    src={item.img}
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
                                        onClick={() => removeWish(item._id)}
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
            </ Grid.Container>
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

export default Wishlist


export async function getServerSideProps(context) {

    const session = await getSession(context)
    console.log(session, 'email');


    if (!session?.user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }
    else {




        if (!mongoose.connections[0].readyState) {
            await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI)
        }

        const wishes = await Wishlist.find({ email: session?.user?.email })
        let result = [];
        if (wishes.length > 0) {
            for (let i = 0; i < wishes.length; i++) {
                result[i] = wishes[i]?.product.toString()
            }
        }

        let data = [];
        if (result.length > 0) {
            for (let i = 0; i < result.length; i++) {
                data[i] = await Product.findById(result[i])
            }
        }



        return {
            props: {
                wishes: JSON.parse(JSON.stringify(data)),
            },
        }
    }
}
"use client"
import React, { useEffect } from 'react'
import FullLayoyt from '../../../src/layouts/FullLayout'
import theme from '../../../src/theme/theme'
import { ThemeProvider, Grid } from '@mui/material'
import BaseCard from '../../../src/components/baseCard/BaseCard'
import { Button } from 'flowbite-react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'

const UpdateProduct = () => {
    const router = useRouter()
    const id = router.query.slug
    const [title, setTitle] = React.useState('');
    const [slug, setSlug] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [size, setSize] = React.useState('');
    const [color, setColor] = React.useState('');
    const [availableqty, setAvailableqty] = React.useState('');
    const [img, setImg] = React.useState('');
    useEffect(() => {
        const getDetails = async () => {
            const res = await fetch('/api/getproduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id }),
            })
            const data = await res.json()
            console.log(data)
            setTitle(data?.product?.title)
            setSlug(data?.product?.slug)
            setPrice(data?.product?.price)
            setDesc(data?.product?.desc)
            setCategory(data?.product?.category)
            setSize(data?.product?.size)
            setColor(data?.product?.color)
            setAvailableqty(data?.product?.availableqty)
            setImg(data?.product?.img)

        }
        getDetails()
    }, [router.query.slug, id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({ title, slug, price, desc, category, size, color, availableqty, img, id });
        const res = await fetch('/api/updateproducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id: id, title: title, slug: slug, price: price, desc: desc, category: category, size: size, color: color, availableqty: availableqty, img: img }),
        })
        const data = await res.json()
        console.log(data)
        if (data.success) {
            toast.success('Product Updated Successfully'), {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark'
            }

            setTimeout(() => {
                router.push('/admin/allproducts')
            }, 3000);

        }

    }

    const handleChange = async (e) => {
        if (e.target.name === 'title') {
            setTitle(e.target.value)
        }
        else if (e.target.name === 'slug') {
            setSlug(e.target.value)
        }
        else if (e.target.name === 'price') {
            setPrice(e.target.value)
        }
        else if (e.target.name === 'desc') {
            setDesc(e.target.value)
        }
        else if (e.target.name === 'category') {
            setCategory(e.target.value)
        }
        else if (e.target.name === 'size') {
            setSize(e.target.value)
        }
        else if (e.target.name === 'color') {
            setColor(e.target.value)
        }
        else if (e.target.name === 'availableqty') {
            setAvailableqty(e.target.value)
        }
        else if (e.target.name === 'img') {
            setImg(e.target.value)
        }
    }
    return (
        <>
            <ThemeProvider theme={theme}>
                <FullLayoyt>
                    <Grid container spacing={0}>
                        <Grid item xs={12} lg={12}>
                            <BaseCard title={`Update Product @${id}`}>
                                <form sx={{ m: 1, width: '100%' }} variant="filled"
                                    onSubmit={handleSubmit}
                                >
                                    <div class="relative my-4">
                                        <input
                                            onChange={handleChange}
                                            value={title}
                                            name='title'
                                            type="text" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-cyan-500 focus:outline-none focus:ring-0 focus:border-cyan-600 peer" placeholder=" " />
                                        <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Title</label>
                                    </div>
                                    <div class="relative my-4">
                                        <input
                                            onChange={handleChange}
                                            value={slug}
                                            name='slug'
                                            type="text" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-cyan-500 focus:outline-none focus:ring-0 focus:border-cyan-600 peer" placeholder=" " />
                                        <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Slug</label>
                                    </div>
                                    <div class="relative my-4">
                                        <input
                                            onChange={handleChange}
                                            value={category}
                                            name='category'
                                            type="text" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-cyan-500 focus:outline-none focus:ring-0 focus:border-cyan-600 peer" placeholder=" " />
                                        <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Category</label>
                                    </div>
                                    <div class="relative my-4">
                                        <textarea
                                            onChange={handleChange}
                                            value={desc}
                                            name='desc'
                                            type="text" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-cyan-500 focus:outline-none focus:ring-0 focus:border-cyan-600 peer" placeholder=" " />
                                        <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Description</label>
                                    </div>
                                    <div class="relative my-4">
                                        <input
                                            onChange={handleChange}
                                            value={size}
                                            name='size'
                                            type="text" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-cyan-500 focus:outline-none focus:ring-0 focus:border-cyan-600 peer" placeholder=" " />
                                        <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Size</label>
                                    </div>
                                    <div class="relative my-4">
                                        <input
                                            onChange={handleChange}
                                            value={color}
                                            name='color'
                                            type="text" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-cyan-500 focus:outline-none focus:ring-0 focus:border-cyan-600 peer" placeholder=" " />
                                        <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Color</label>
                                    </div>
                                    <div class="relative my-4">
                                        <input
                                            onChange={handleChange}
                                            value={price}
                                            name='price'
                                            type="number" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-cyan-500 focus:outline-none focus:ring-0 focus:border-cyan-600 peer" placeholder=" " />
                                        <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Price</label>
                                    </div>
                                    <div class="relative my-4">
                                        <input
                                            onChange={handleChange}
                                            value={availableqty}
                                            name='availableqty'
                                            type="number" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-cyan-500 focus:outline-none focus:ring-0 focus:border-cyan-600 peer" placeholder=" " />
                                        <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">availableqty</label>
                                    </div>
                                    <div class="relative my-4">
                                        <input
                                            onChange={handleChange}
                                            value={img}
                                            name='img'
                                            type="text" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-cyan-500 focus:outline-none focus:ring-0 focus:border-cyan-600 peer" placeholder=" " />
                                        <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">img URL</label>
                                    </div>


                                    <Button
                                        pill
                                        type='submit'
                                        className={`!bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-500   hover:to-blue-500 `} gradientDuoTone="cyanToBlue">
                                        Update Product
                                    </Button>
                                </form>
                            </BaseCard>
                        </Grid>
                    </Grid>
                    <ToastContainer
                        position="top-center"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme='dark' />

                </FullLayoyt>
            </ThemeProvider>
        </>
    )
}

export default UpdateProduct
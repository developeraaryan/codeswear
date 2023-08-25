"use client"
import React, { useEffect } from 'react'
import FullLayoyt from '../../../src/layouts/FullLayout'
import theme from '../../../src/theme/theme'
import { ThemeProvider, Grid } from '@mui/material'
import BaseCard from '../../../src/components/baseCard/BaseCard'
import { Button } from 'flowbite-react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import { useUserAuth } from '../../../context/UserAuthContext'
let role = 'user'
const UpdateProduct = () => {
    const { user } = useUserAuth()
    const router = useRouter()
    useEffect(() => {
        const phone = localStorage.getItem('phone')
        if (!user) {
            router.push('/login')
        }
        const getRole = async () => {
            const res = await fetch(`/api/getrole`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ phone })

            })
            const data = await res.json()
            if (data.role !== 'admin') {
                router.push('/login')
            }
        }
        getRole()
    }, [user, router])
    const id = router.query.slug
    const [title, setTitle] = React.useState('');
    const [slug, setSlug] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [lprice, setLprice] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [size, setSize] = React.useState('');
    const [availableqty, setAvailableqty] = React.useState('');
    const [img1, setImg1] = React.useState('');
    const [img2, setImg2] = React.useState('');
    const [img3, setImg3] = React.useState('');
    const [img1_public_id, setImg1_public_id] = React.useState('');
    const [img2_public_id, setImg2_public_id] = React.useState('');
    const [img3_public_id, setImg3_public_id] = React.useState('');
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
            setTitle(data?.product?.title)
            setSlug(data?.product?.slug)
            setPrice(data?.product?.sprice)
            setLprice(data?.product?.lprice)
            setDesc(data?.product?.desc)
            setCategory(data?.product?.category)
            setSize(data?.product?.size)
            setAvailableqty(data?.product?.availableqty)
            setImg1(data?.product?.img[0].url)
            setImg2(data?.product?.img[1].url)
            setImg3(data?.product?.img[2].url)
            setImg1_public_id(data?.product?.img[0].public_id)
            setImg2_public_id(data?.product?.img[1].public_id)
            setImg3_public_id(data?.product?.img[2].public_id)


        }
        getDetails()
    }, [router.query.slug, id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const info = {
            _id: id, title: title, slug: slug, sprice: price, lprice: lprice, desc: desc, category: category, size: size, availableqty: availableqty, img: [
                {
                    public_id: img1_public_id,
                    url: img1
                },
                {
                    public_id: img2_public_id,
                    url: img2
                },
                {
                    public_id: img3_public_id,
                    url: img3
                },
            ]
        }
        console.log(info, 'info');
        const res = await fetch('/api/updateproducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(info),
        })
        const data = await res.json()
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
        else if (e.target.name === 'sprice') {
            setPrice(e.target.value)
        }
        else if (e.target.name === 'lprice') {
            setLprice(e.target.value)
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
        else if (e.target.name === 'img1') {
            setImg1(e.target.value)
        }
        else if (e.target.name === 'img2') {
            setImg2(e.target.value)
        }
        else if (e.target.name === 'img3') {
            setImg3(e.target.value)
        }
        else if (e.target.name === 'img1_public_id') {
            setImg1_public_id(e.target.value)
        }
        else if (e.target.name === 'img2_public_id') {
            setImg2_public_id(e.target.value)
        }
        else if (e.target.name === 'img3_public_id') {
            setImg3_public_id(e.target.value)
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
                                    <div className="relative my-4">
                                        <input
                                            onChange={handleChange}
                                            value={title}
                                            name='title'
                                            type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-cyan-500 focus:outline-none focus:ring-0 focus:border-cyan-600 peer" placeholder=" " />
                                        <label for="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Title</label>
                                    </div>
                                    <div className="relative my-4">
                                        <input
                                            onChange={handleChange}
                                            value={slug}
                                            name='slug'
                                            type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-cyan-500 focus:outline-none focus:ring-0 focus:border-cyan-600 peer" placeholder=" " />
                                        <label for="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Slug</label>
                                    </div>
                                    <div className="relative my-4">
                                        <input
                                            onChange={handleChange}
                                            value={category}
                                            name='category'
                                            type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-cyan-500 focus:outline-none focus:ring-0 focus:border-cyan-600 peer" placeholder=" " />
                                        <label for="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Category</label>
                                    </div>
                                    <div className="relative my-4">
                                        <textarea
                                            onChange={handleChange}
                                            value={desc}
                                            name='desc'
                                            type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-cyan-500 focus:outline-none focus:ring-0 focus:border-cyan-600 peer" placeholder=" " />
                                        <label for="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Description</label>
                                    </div>
                                    <div className="relative my-4">
                                        <input
                                            onChange={handleChange}
                                            value={size}
                                            name='size'
                                            type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-cyan-500 focus:outline-none focus:ring-0 focus:border-cyan-600 peer" placeholder=" " />
                                        <label for="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Size</label>
                                    </div>
                                    <div className="relative my-4">
                                        <input
                                            onChange={handleChange}
                                            value={lprice}
                                            name='lprice'
                                            type="number" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-cyan-500 focus:outline-none focus:ring-0 focus:border-cyan-600 peer" placeholder=" " />
                                        <label for="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">List Price</label>
                                    </div>
                                    <div className="relative my-4">
                                        <input
                                            onChange={handleChange}
                                            value={price}
                                            name='sprice'
                                            type="number" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-cyan-500 focus:outline-none focus:ring-0 focus:border-cyan-600 peer" placeholder=" " />
                                        <label for="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Selling Price</label>
                                    </div>
                                    <div className="relative my-4">
                                        <input
                                            onChange={handleChange}
                                            value={availableqty}
                                            name='availableqty'
                                            type="number" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-cyan-500 focus:outline-none focus:ring-0 focus:border-cyan-600 peer" placeholder=" " />
                                        <label for="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">availableqty</label>
                                    </div>
                                    <div className="relative my-4">
                                        <h5 className="text-center font-semibold text-xl">Images</h5>
                                        <div className="relative my-4">
                                            <input onChange={handleChange} name="img1_public_id" value={img1_public_id} type="text" id="img1_public_id" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                            <label htmlFor="img1_public_id" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-none px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Image 1 Public ID</label>
                                        </div>
                                        <div className="relative my-4">
                                            <input onChange={handleChange} name="img1" value={img1} type="text" id="img1" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                            <label htmlFor="img1" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-none px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Image 1 URL</label>
                                        </div>
                                        <div className="relative my-4">
                                            <input onChange={handleChange} name="img2_public_id" value={img2_public_id} type="text" id="img2_public_id" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                            <label htmlFor="img2_public_id" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-none px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Image 2 Public ID</label>
                                        </div>
                                        <div className="relative my-4">
                                            <input onChange={handleChange} name="img2" value={img2} type="text" id="img2" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                            <label htmlFor="img2" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-none px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Image 2 URL</label>
                                        </div>
                                        <div className="relative my-4">
                                            <input onChange={handleChange} name="img3_public_id" value={img3_public_id} type="text" id="img3_public_id" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                            <label htmlFor="img3_public_id" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-none px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Image 3 Public ID</label>
                                        </div>
                                        <div className="relative my-4">
                                            <input onChange={handleChange} name="img3" value={img3} type="text" id="img3" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                            <label htmlFor="img3" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-none px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Image 3 URL</label>
                                        </div>

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
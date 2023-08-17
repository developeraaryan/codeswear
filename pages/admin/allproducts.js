import React, { useEffect } from 'react'
import FullLayoyt from '../../src/layouts/FullLayout'
import theme from '../../src/theme/theme'
import { ThemeProvider, Grid } from '@mui/material'
import AllProducts from "../../src/components/dashboard/AllProducts";
import mongoose from 'mongoose';
import Product from '../../Models/Product'
import { useUserAuth } from '../../context/UserAuthContext';
import { useRouter } from 'next/router';

const Allproducts = ({ Products }) => {
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
    }, [user,router])
    return (
        <ThemeProvider theme={theme}>
            <FullLayoyt>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <AllProducts Products={Products} />
                    </Grid>
                </Grid>
            </FullLayoyt>
        </ThemeProvider>)
}



export async function getServerSideProps() {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI)
    }
    let Products = await Product.find()
    return {
        props: { Products: JSON.parse(JSON.stringify(Products)) },
    };
}



export default Allproducts

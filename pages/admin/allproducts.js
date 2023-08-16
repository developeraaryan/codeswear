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
        if (!user) {
            router.push('/login')
        }

        const getUserRole = async () => {
            const userData = user?.phoneNumber
            let response = await fetch(`/api/getrole`, {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            })
            let res = await response.json()
            if (res.role === "admin") {
                role = "admin"
            }
            else {
                role = "user"
            }

        }
        getUserRole()
    }, [router, user])
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



export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI)
    }
    let Products = await Product.find()
    return {
        props: { Products: JSON.parse(JSON.stringify(Products)) },
    };
}



export default Allproducts

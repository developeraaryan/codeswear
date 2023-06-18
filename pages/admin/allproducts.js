import React from 'react'
import FullLayoyt from '../../src/layouts/FullLayout'
import theme from '../../src/theme/theme'
import { ThemeProvider, Grid } from '@mui/material'
import AllProducts from "../../src/components/dashboard/AllProducts";
import mongoose from 'mongoose';
import Product from '../../Models/Product'



const Allproducts = ({ Products }) => {
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

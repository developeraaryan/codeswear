import { Grid, ThemeProvider } from "@mui/material";
import BlogCard from "../../src/components/dashboard/BlogCard";
import SalesOverview from "../../src/components/dashboard/SalesOverview";
import DailyActivity from "../../src/components/dashboard/DailyActivity";
import ProductPerfomance from "../../src/components/dashboard/AllProducts";
import theme from "../../src/theme/theme"
import FullLayout from "../../src/layouts/FullLayout"
import mongoose from 'mongoose'
import Product from '../../Models/Product'

export default function Index({ Products }) {
    return (
        <ThemeProvider theme={theme}>
            <style jsx global>
                {`
                    footer{
                    display:none;
                    }
                `}
            </style>
            <FullLayout>

                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <SalesOverview />
                    </Grid>
                    {/* ------------------------- row 1 ------------------------- */}
                    {/* <Grid item xs={12} lg={4}>
                        <DailyActivity />
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <ProductPerfomance Products={Products} />
                    </Grid>
                    <Grid item xs={12} lg={12}>
                        <BlogCard />
                    </Grid>
                */}
                </Grid>
            </FullLayout>
        </ThemeProvider>
    );
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

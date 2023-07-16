import { Grid, ThemeProvider } from "@mui/material";
import BlogCard from "../../src/components/dashboard/BlogCard";
import SalesOverview from "../../src/components/dashboard/SalesOverview";
import DailyActivity from "../../src/components/dashboard/DailyActivity";
import ProductPerfomance from "../../src/components/dashboard/AllProducts";
import theme from "../../src/theme/theme"
import FullLayout from "../../src/layouts/FullLayout"
import mongoose from 'mongoose'
import Product from '../../Models/Product'
import { getSession, useSession } from "next-auth/react"
import { useEffect } from "react";
import { red } from "@mui/material/colors";
import { useRouter } from "next/router";

let role = "user";

export default function Index({ Products }) {
    const router = useRouter()
    const { data: session } = useSession()
    console.log(session?.user?.email);
    const getUserRole = async () => {
        const userEmail = session?.user?.email
        console.log(userEmail);
        let response = await fetch(`api/getrole`, {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(userEmail)
        })
        let res = await response.json()
        console.log(res);
        if (res.role === "admin") {
            role = "admin"
        }
        else {
            role = "user"
        }

    }
    useEffect(() => {
        getUserRole()
    }, [getUserRole])
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


export async function getServerSideProps({ req }) {
    const session = await getSession({ req })
    if (!session && role === "user") {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }


    else if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI)
    }
    let Products = await Product.find()
    return {
        props: { session, Products: JSON.parse(JSON.stringify(Products)) },
    };
}


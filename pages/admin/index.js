import {Grid, ThemeProvider} from "@mui/material";
import SalesOverview from "../../src/components/dashboard/SalesOverview";
import theme from "../../src/theme/theme"
import FullLayout from "../../src/layouts/FullLayout"
import mongoose from 'mongoose'
import Product from '../../Models/Product'
import {useEffect} from "react";
import {useRouter} from "next/router";
import {useUserAuth} from "../../context/UserAuthContext";

let role = "user";

export default function Index() {
    const {user} = useUserAuth()
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push('/login')
        }

        const getUserRole = async () => {
        const phone =await user.phoneNumber
            console.log(phone, "usedata")
            let response = await fetch(`/api/getrole`, {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify({
                    phone: phone
                        + 9
                })
            })
            let res = await response.json()
            console.log(res, "res");
            if (res.role !== "admin") {
                await router.push("login")
            }

        }
        getUserRole()
    }, [router, user])
    return (
        <ThemeProvider theme={theme}>
            <style jsx global>
                {`
                  footer {
                    display: none;
                  }
                `}
            </style>
            <FullLayout>

                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <SalesOverview/>
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


export async function getServerSideProps() {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI)
    }
    let Products = await Product.find()
    return {
        props: {Products: JSON.parse(JSON.stringify(Products))},
    };
}


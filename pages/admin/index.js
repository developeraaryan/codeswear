import { Grid, ThemeProvider } from "@mui/material";
import SalesOverview from "../../src/components/dashboard/SalesOverview";
import theme from "../../src/theme/theme"
import FullLayout from "../../src/layouts/FullLayout"
import mongoose from 'mongoose'
import Product from '../../Models/Product'
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUserAuth } from "../../context/UserAuthContext";

export default function Index() {
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
    }, [user])
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




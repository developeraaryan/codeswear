import React, { useEffect } from 'react'
import FullLayoyt from '../../src/layouts/FullLayout'
import theme from '../../src/theme/theme'
import { Grid, ThemeProvider } from '@mui/material'
import AllOrders from '../../src/components/dashboard/AllOrders'
import mongoose from 'mongoose'
import Order from '../../Models/Order'
import { useUserAuth } from '../../context/UserAuthContext';
import { useRouter } from 'next/router'

const Allorders = ({ Orders }) => {
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
            <style jsx global>
                {
                    `
          footer{
            display:none;
          }
          `
                }
            </style>
            <FullLayoyt>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <AllOrders orders={Orders} />
                    </Grid>
                </Grid>
            </FullLayoyt>
        </ThemeProvider>)

}


export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI)
    }
    let Orders = await Order.find()
    return {
        props: { Orders: JSON.parse(JSON.stringify(Orders)) },
    };
}


export default Allorders
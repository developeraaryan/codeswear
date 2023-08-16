import React, { useEffect } from 'react'
import FullLayoyt from '../../src/layouts/FullLayout'
import theme from '../../src/theme/theme'
import { ThemeProvider } from '@mui/material'
import { useUserAuth } from '../../context/UserAuthContext'
import { useRouter } from 'next/router'
let role = "user"
function Login() {
    const { user } = useUserAuth()
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push('/login')
        }

        const getUserRole = async () => {
            const userData = user?.phoneNumber.split('+')[1]
            console.log(userData, "usedata")
            let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getrole`, {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify({ phone: userData })
            })
            let res = await response.json()
            console.log(res, "res");
            if (res.role === "admin") {
                role = "admin"

            } else {
                role = "user"
            }
            if (role === "user") {
                router.push('/login')
            }

        }
        getUserRole()
    }, [router, user])

    return (
        <ThemeProvider theme={theme}>
            <FullLayoyt>
                <div>Login</div>
            </FullLayoyt>
        </ThemeProvider>
    )
}

export default Login
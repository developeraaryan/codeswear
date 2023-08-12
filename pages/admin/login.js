import React, { useEffect } from 'react'
import FullLayoyt from '../../src/layouts/FullLayout'
import theme from '../../src/theme/theme'
import { ThemeProvider } from '@mui/material'
import { useUserAuth } from '../../context/UserAuthContext'
import { useRouter } from 'next/router'

function Login() {
    const { user } = useUserAuth()
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push('/login')
        }

        const getUserRole = async () => {
            const userData = user?.phoneNumber
            let response = await fetch(`api/getrole`, {
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
                <div>Login</div>
            </FullLayoyt>
        </ThemeProvider>
    )
}

export default Login
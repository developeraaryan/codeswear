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
                <div>Login</div>
            </FullLayoyt>
        </ThemeProvider>
    )
}

export default Login
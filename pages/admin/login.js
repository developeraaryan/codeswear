import React from 'react'
import FullLayoyt from '../../src/layouts/FullLayout'
import theme from '../../src/theme/theme'
import { ThemeProvider } from '@mui/material'

function Login() {
    return (
        <ThemeProvider theme={theme}>
            <FullLayoyt>
                <div>Login</div>
            </FullLayoyt>
        </ThemeProvider>
    )
}

export default Login
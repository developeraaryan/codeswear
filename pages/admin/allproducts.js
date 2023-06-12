import React from 'react'
import FullLayoyt from '../../src/layouts/FullLayout'
import theme from '../../src/theme/theme'
import { ThemeProvider } from '@mui/material'

const Allproducts = () => {
    return (
        <ThemeProvider theme={theme}>
            <FullLayoyt>
                <div>Allproducts</div>
            </FullLayoyt>
        </ThemeProvider>)
}

export default Allproducts
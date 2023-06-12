import React from 'react'
import FullLayoyt from '../../src/layouts/FullLayout'
import theme from '../../src/theme/theme'
import { ThemeProvider } from '@mui/material'

const Allorders = () => {
    return (
        <ThemeProvider theme={theme}>
            <FullLayoyt>
                <div>Allorders</div>
            </FullLayoyt>
        </ThemeProvider>
    )
}

export default Allorders
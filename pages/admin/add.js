import React from 'react'
import FullLayoyt from '../../src/layouts/FullLayout'
import theme from '../../src/theme/theme'
import { ThemeProvider } from '@mui/material'

const Add = () => {
    return (
        <ThemeProvider theme={theme}>
            <FullLayoyt>
                <div>Add</div>
            </FullLayoyt>
        </ThemeProvider>
    )
}

export default Add
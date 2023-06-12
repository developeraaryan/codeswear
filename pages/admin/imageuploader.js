import React from 'react'
import FullLayoyt from '../../src/layouts/FullLayout'
import theme from '../../src/theme/theme'
import { ThemeProvider } from '@mui/material'

const Imageuploader = () => {
  return (
<ThemeProvider theme={theme}>
            <FullLayoyt>
                <div>Imageuploader</div>
            </FullLayoyt>
        </ThemeProvider>  )
}

export default Imageuploader
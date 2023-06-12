import React from 'react'
import FullLayoyt from '../../src/layouts/FullLayout'
import theme from '../../src/theme/theme'
import { ThemeProvider, Grid } from '@mui/material'
import ProductPerfomance from "../../src/components/dashboard/ProductPerfomance";

const Allproducts = () => {
    return (
        <ThemeProvider theme={theme}>
            <FullLayoyt>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <ProductPerfomance />
                    </Grid>
                </Grid>
            </FullLayoyt>
        </ThemeProvider>)
}

export default Allproducts
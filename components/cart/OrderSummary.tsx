import { Grid, Typography } from '@mui/material'
import React, {useContext} from 'react'
import { CartContext } from '../../context'
import { currency } from '../../utils'

export const OrderSummary = () => {
  
    const {numberOfItems, subTotal, total, tax } = useContext(CartContext)
    const {formatting} = currency

    return (
    <Grid container spacing={2}>
        <Grid item xs={6}>
            <Typography>No. Products</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="end">
            <Typography>{numberOfItems} {numberOfItems > 1 ? 'items' : 'item'}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Subtotal</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="end">
            <Typography>{formatting(subTotal)}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Taxes({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100})%</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="end">
            <Typography>{formatting(tax)}</Typography>
        </Grid>
        <Grid item xs={6} sx={{mt: 2}}>
            <Typography variant="subtitle1">Total</Typography>
        </Grid>
        <Grid item xs={6} sx={{mt: 2}} display="flex" justifyContent="end">
            <Typography>{formatting(total)}</Typography>
        </Grid>
    </Grid>
  )
}

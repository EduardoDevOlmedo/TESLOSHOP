import { Grid, Typography } from '@mui/material'
import React from 'react'

export const OrderSummary = () => {
  return (
    <Grid container spacing={2}>
        <Grid item xs={6}>
            <Typography>No. Products</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="end">
            <Typography>3 items</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Subtotal</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="end">
            <Typography>{`$${155.36}`}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Taxes(15%)</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="end">
            <Typography>{`$${32.43}`}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="subtitle1">Total</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="end">
            <Typography>{`$${188.23}`}</Typography>
        </Grid>
    </Grid>
  )
}

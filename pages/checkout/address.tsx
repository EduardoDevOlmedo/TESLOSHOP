import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import {ShopLayout} from "../../components/layouts"

const address = () => {
  return (
    <ShopLayout title='Adress' pageDescription='Confirm address'>
        <Typography variant="h1" component="h1">
            Dirección
        </Typography>
        <Grid container spacing={2}>


            <Grid item xs={12} sm={6}>
                <TextField label="Name" variant="filled" fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label="Surname" variant="filled" fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label="Address 1" variant="filled" fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label="Address 2 (Optional)" variant="filled" fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label="ZIP Code" variant="filled" fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label="City" variant="filled" fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel>Country</InputLabel>
                    <Select
                        variant="filled"
                        label="País"
                        value={1}
                    >   
                        <MenuItem value={1}>Costa Rica</MenuItem>
                        <MenuItem value={2}>Honduras</MenuItem>
                        <MenuItem value={3}>El Salvador</MenuItem>
                        <MenuItem value={4}>México</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label="Telephone" variant="filled" fullWidth/>
            </Grid>
        </Grid>

        <Box sx={{mt: 5}} display="grid" justifyContent="end">
            <Button color="secondary" className="circular-btn" size="large">
                Check order 
            </Button>
        </Box>

    </ShopLayout>
  )
}

export default address
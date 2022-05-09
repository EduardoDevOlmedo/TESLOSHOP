import {  Grid,Button,Typography, Chip } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { ShopLayout } from '../../components/layouts'
import { ProductSizeSelector, ProductSlideshow } from '../../components/products'
import { ItemCounter } from '../../components/ui'
import { initialData } from '../../database/products'

const product = initialData.products[0]

const ProductPage = () => {

    
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={7}>
                <ProductSlideshow images={product.images}/>
            </Grid>

            <Grid item xs={12} sm={5}>
                <Box display='flex' flexDirection="column">
                    <Typography variant="h1" component="h1">
                        {product.title}
                    </Typography>
                    <Typography variant="subtitle1" component="h1">
                        ${product.price}
                    </Typography>
                        {/* CANTIDAD         */}
                    <Box sx={{my: 2}}>
                        <Typography variant="subtitle2">Quantity</Typography>
                        <ItemCounter />
                        <ProductSizeSelector sizes={product.sizes} selectedSize={product.sizes[0]}/>
                    </Box>
                    {/* AGREGAR AL CARRITO */}
                    <Button color="secondary" className="circular-btn">
                        Add to the cart
                    </Button>
                    {/* <Chip label="No stock available" color="error" variant="outlined" /> */}
                    <Box sx={{mt: 3}}>
                        <Typography variant="subtitle2">Description</Typography>
                        <Typography variant="body2">{product.description}</Typography>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default ProductPage
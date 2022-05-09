import { Typography, Grid, Card, CardActionArea, CardMedia } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout } from '../components/layouts'
import { ProductsList } from '../components/products'
import { initialData } from '../database/products'

const Home: NextPage = () => {

  return (
    <ShopLayout  title={'Teslo Shop - Home'} pageDescription="Teslo Shop Oficial Page">
        <Typography variant='h1' component="h1">Tienda</Typography>
        <Typography variant='h2' sx={{mb: 1}}>Todos los productos</Typography>
        <ProductsList 
          products={initialData.products as any}
        />       
    </ShopLayout>
  )
}

export default Home

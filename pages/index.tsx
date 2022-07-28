import { Typography, Grid, Card, CardActionArea, CardMedia } from '@mui/material'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { ShopLayout } from '../components/layouts'
import { ProductsList } from '../components/products'
import FullScreenLoading from '../components/ui/FullScreenLoading'
import { useProducts } from '../HOOKS'




const Home: NextPage = () => {

  const session = useSession()
  console.log({session})
  const {products, isLoading} = useProducts("/products")

  return (
    <ShopLayout  title={'Teslo Shop - Home'} pageDescription="Teslo Shop Oficial Page">
        <Typography variant='h1' component="h1">Tienda</Typography>
        <Typography variant='h2' sx={{mb: 1}}>Todos los productos</Typography>
        {
          isLoading ? 
          <FullScreenLoading />
          : <ProductsList products={products!} /> 
        }
    </ShopLayout>
  )
}

export default Home

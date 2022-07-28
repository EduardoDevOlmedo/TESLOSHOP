import { GetServerSideProps } from 'next'
import { Typography, Grid, Card, CardActionArea, CardMedia, capitalize } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout } from '../../components/layouts'
import { ProductsList } from '../../components/products'
import FullScreenLoading from '../../components/ui/FullScreenLoading'
import { useProducts } from '../../HOOKS'
import {dbProducts} from "../../database"
import { IProduct } from '../../interfaces'
import { Box } from '@mui/system'

interface Props {
  products: IProduct[]
  foundProducts: boolean;
  query: string;
}


const SearchPage: NextPage<Props> = ({products, foundProducts, query}) => {


  return (
    <ShopLayout  title={'Teslo Shop - Home'} pageDescription="Teslo Shop Oficial Page">
        <Typography variant='h1' component="h1">Search</Typography>

        {
          foundProducts
            ?  <Typography variant='h2' sx={{mb: 1}}>We found {products.length} matching results with &apos;{`${query}`}&apos;</Typography>
            :   (
              <>
              <Box display="flex">
                <Typography variant='h2' sx={{mb: 1, mr: 0.5}}>No products were found matching </Typography>
                <Typography variant='h2' sx={{mb: 1}} color="secondary">&apos;{`${capitalize(query)}`}&apos;</Typography>
              </Box>
                <Typography variant='h2' sx={{mb: 1}} color="secondary">You can still check out or other products:</Typography>
              </>
            ) 
        }

          <ProductsList products={products} /> 
    </ShopLayout>
  )
}


export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const { query = '' } = params as {query: string}  

  if(query.length === 0){
    return {
      redirect: {
        destination: "/",
        permanent: true
      }
    }
  }

  let products = await dbProducts.getProductsByTerm(query)
  const foundProducts = products.length > 0
  //TODO: RETORNAR OTROS:
  if(!foundProducts){
    products = await dbProducts.getAllProducts()
  }

  return {
    props: {
      products, foundProducts, query
    }
  }
}

export default SearchPage

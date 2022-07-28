import { Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"
import { ProductsList } from "../../components/products"
import FullScreenLoading from "../../components/ui/FullScreenLoading"
import { useProducts } from "../../HOOKS"

const Women = () => {
    const {products, isLoading} = useProducts("/products?gender=women")
    

    return (
        <ShopLayout  title={'Teslo Shop - Women'} pageDescription="Teslo Shop Oficial Page - Women">
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

export default Women
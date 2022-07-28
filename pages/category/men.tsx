import { Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"
import { ProductsList } from "../../components/products"
import FullScreenLoading from "../../components/ui/FullScreenLoading"
import { useProducts } from "../../HOOKS"

const Men = () => {
    const {products, isLoading} = useProducts("/products?gender=men")
    

    return (
        <ShopLayout  title={'Teslo Shop - Men'} pageDescription="Teslo Shop Oficial Page - Men">
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

export default Men
import { Grid } from "@mui/material"
import React from "react"
import { IProduct } from "../../interfaces"
import { ProductCard } from "./ProductCard"

interface Props {
    products: IProduct[]
}

export const ProductsList: React.FC<Props> = ({products}) => {
  return (
    <Grid container spacing={4}>
        {   
            products.map(product => (
                <ProductCard 
                    key={product.slug}
                    products={product}
                />
            ))
        }
    </Grid>
  )
}

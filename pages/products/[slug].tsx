import { GetStaticProps } from 'next'
import { GetStaticPaths } from 'next'
import {  Grid,Button,Typography, Chip } from '@mui/material'
import { Box } from '@mui/system'
import { NextPage } from 'next'
import React, { useContext, useEffect, useState } from 'react'
import { ShopLayout } from '../../components/layouts'
import { ProductSizeSelector, ProductSlideshow } from '../../components/products'
import { ItemCounter } from '../../components/ui'
import { ICartProduct, IProduct, ISize } from '../../interfaces'
import { dbProducts } from '../../database'
import { useRouter } from 'next/router'
import { CartContext } from '../../context'

interface Props {
    product: IProduct
}

const ProductPage: NextPage<Props> = ({product}) => {
    
    const router = useRouter()
    const {addProductToCart} = useContext(CartContext)


    
    
    

    const [TempCartProduct, setTempCartProduct] = useState<ICartProduct>({
        _id: product._id,
        price: product.price,
        images: product.images[0],
        size: undefined,
        slug: product.slug,
        title: product.title,
        gender: product.gender,
        quantity: 1
    })

        const onUpdateQuantity = ( quantity: number ) => {
            setTempCartProduct( currentProduct => ({
              ...currentProduct,
              quantity
            }));
        }
        
    const selectSize = (size: ISize) => {
        
        setTempCartProduct(currentProduct => ({
            ...currentProduct,
            size: size
        }))
    }

    const addToCart = () => {
        if(!TempCartProduct.size) return
        addProductToCart(TempCartProduct)
        router.push("/cart")
    }

    

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
                        <ItemCounter 
                           currentValue={ TempCartProduct.quantity }
                           onUpdateQuantity={ onUpdateQuantity  }
                           maxValue={ product.inStock > 10 ? 10: product.inStock }
                        />
                        <ProductSizeSelector 
                        sizes={product.sizes} selectedSize={TempCartProduct.size}
                        onSelectedSize={selectSize}
                        />
                    </Box>
                    {/* AGREGAR AL CARRITO */}
                    {
                        (product.inStock > 0)
                        ? (
                    <Button color="secondary" onClick={addToCart} className="circular-btn">
                       {
                           TempCartProduct.size && TempCartProduct.quantity > 0 ?
                           "Save to the cart"
                           : "Fill all the needed values"
                       }
                    </Button>
                        )
                        : (
                         <Chip label="No stock available" color="error" variant="outlined" /> 
                        )
                    }
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


export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const slug = await dbProducts.getAllProductSlugs() // your fetch function here 
    const slugs = slug.map(el => el.slug)

    return {
        paths: slugs.map(slg => ({
            params: {slug: slg}
        })),
        fallback: "blocking"
    }
}



export const getStaticProps: GetStaticProps = async ({params}) => {
    const { slug } =  params as {slug: string} 
    
    const product = await dbProducts.getProductBySlug(slug)


    if(!slug){
        return {
            redirect: {
                destination: `/${slug}`,
                permanent: false
            }
        }
    }

    return {
        props: {
            product: product ?? null
        }, revalidate: 86400
    }
}

export default ProductPage
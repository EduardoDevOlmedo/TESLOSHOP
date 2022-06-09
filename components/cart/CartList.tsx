import { Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material'
import React, {FC, useContext} from 'react'
import NextLink from "next/link"
import { Box } from '@mui/system'
import { ItemCounter } from '../ui'
import { CartContext } from '../../context'
import { ICartProduct } from '../../interfaces'



interface Props {
    editable: boolean;
}

export const CartList:FC<Props> = ({editable}) => {
  
    const {cart, updateCartQuantity, removeCartProducts} = useContext(CartContext)

    const productsInCart = [...cart]

    const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
        product.quantity = newQuantityValue
        updateCartQuantity(product)
    }


    

    return (
      <>
    {
        productsInCart.map(product => {
            return(
               <Grid container key={product.slug + product.size} 
               spacing={2}
               sx={{mb:1, mr: 2}}
               >    
                    <Grid item xs={3}>
                        {/* LLEVAR A PAG DEL PRODUCTO */}
                        <NextLink href={`/products/${product.slug}`} passHref>
                            <Link>
                                <CardActionArea>
                                    <CardMedia 
                                        image={`/products/${product.images}`}
                                        component="img"
                                        sx={{borderRadius: '5px'}}
                                    />
                                </CardActionArea>
                            </Link>
                        </NextLink>
                    </Grid>
                    <Grid item xs={7}>
                        <Box display="flex" flexDirection="column">
                            <Typography variant="body1">{product.title}</Typography>
                            <Typography variant="body1">Size <b>{product.size}</b> </Typography>
                            {
                                editable
                                ? <ItemCounter currentValue={product.quantity} onUpdateQuantity={(value) => onNewCartQuantityValue(product, value)} maxValue={10} />
                                : <Typography>{product.quantity} {product.quantity > 1 ? 'items' : 'item'}</Typography>
                            }
                        </Box>
                    </Grid>
                    <Grid item xs={2} display="flex" alignItems="center" flexDirection="column">
                        <Typography> {`$${product.price}`} </Typography>
                         {
                             editable && (
                                <Button variant="text" color="secondary" onClick={() => removeCartProducts(product)}>
                                Delete
                                </Button>
                             )
                         }
                    </Grid>
               </Grid>
            )
        })
    }
    </>
  )
}

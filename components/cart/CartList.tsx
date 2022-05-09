import { Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material'
import React, {FC} from 'react'
import { initialData } from '../../database/products'
import NextLink from "next/link"
import { Box } from '@mui/system'
import { ItemCounter } from '../ui'

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]

interface Props {
    editable: boolean;
}

export const CartList:FC<Props> = ({editable}) => {
  return (
      <>
    {
        productsInCart.map(product => {
            return(
               <Grid container key={product.slug} 
               spacing={2}
               sx={{mb:1, mr: 2}}
               >    
                    <Grid item xs={3}>
                        {/* LLEVAR A PAG DEL PRODUCTO */}
                        <NextLink href="/product" passHref>
                            <Link>
                                <CardActionArea>
                                    <CardMedia 
                                        image={`/products/${product.images[0]}`}
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
                            <Typography variant="body1">Size <b>M</b> </Typography>
                            {
                                editable
                                ? <ItemCounter />
                                : <Typography>3 items</Typography>
                            }
                        </Box>
                    </Grid>
                    <Grid item xs={2} display="flex" alignItems="center" flexDirection="column">
                        <Typography> {`$${product.price}`} </Typography>
                         {
                             editable && (
                                <Button variant="text" color="secondary">
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

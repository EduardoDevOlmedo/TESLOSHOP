import { Grid, Card,Chip, CardActionArea, CardMedia, Box, Typography, Link} from "@mui/material"
import React, { useMemo, useState } from "react"
import { IProduct } from "../../interfaces"
import NextLink from "next/link"

interface Props {
    products: IProduct
}

export const ProductCard:React.FC<Props> = ({products}) => {
  
  const [isHovered, setIsHovered] = useState(false)
  const [isImageLoaded, setisImageLoaded] = useState(false)

  const productImage = useMemo(() => {
      return isHovered 
      ? `/products/${products.images[1]}`
      : `/products/${products.images[0]}`
  } ,[isHovered, products.images])
  
  return (
    <Grid item xs={8} sm={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
    <Card
     
    >
      <NextLink href={`/products/${products.slug}`} passHref prefetch={false}>
        <Link>
        

        <CardActionArea
        >
        {
          products.inStock === 0 && (
            <Chip 
              label="Out of stock"
              color="primary"
              sx={{position: 'absolute', zIndex: 90, top: '10px', left: '10px'}}
            />
          )
        }
        <CardMedia
         sx={{filter: products.inStock === 0 ? "blur(8px)" : 'initial'}}
         className="fade-in-fwd"
          component={'img'}
          image={productImage}
          alt={products.title}
          onLoad={() => setisImageLoaded(true)}
        />
        </CardActionArea>
        </Link>
      </NextLink>
    </Card>
    <Box sx={{mt:1, display: isImageLoaded ? 'block' : 'none'}} className="fade-in-fwd">
      <Typography fontWeight={700}>{products.title}</Typography>
      <Typography fontWeight={500}>{`$${products.price}`}</Typography>
    </Box>

</Grid>
  )
}

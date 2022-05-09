import { RemoveShoppingCartOutlined } from "@mui/icons-material"
import { Box, Link, Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"
import NextLink from "next/link"

const Empty = () => {
  return (
    <ShopLayout title="Cart empty" pageDescription="There are no articles in the cart">
          <Box display="flex" sx={{flexDirection: {xs: "column", sm: "row"}}} justifyContent="center" alignItems="center" height="calc(100vh - 200px)">
                <RemoveShoppingCartOutlined sx={{fontSize: 180}}/>
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography >
                    Your cart is empty.
                </Typography>
                <NextLink href="/" passHref>
                    <Link typography="h3" color="secondary">
                        Go back
                    </Link>
                </NextLink>
            </Box>
        </Box>
    </ShopLayout>
  )
}

export default Empty
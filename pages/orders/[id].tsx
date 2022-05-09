import { Box, Chip, Button, Card, CardContent, Divider, Grid, Typography, Link } from '@mui/material';
import { CartList } from '../../components/cart';
import { OrderSummary } from '../../components/cart/OrderSummary';
import NextLink from "next/link"
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CreditCardOutlined, CreditScoreOutlined } from '@mui/icons-material';

const OrderPage = () => {
  return (
    <ShopLayout title='Order 1323 summary' pageDescription={'User order summary'}>
        <Typography variant='h1' component='h1'>Order Summary</Typography>

        {/* <Chip 
            sx={{my: 2}}
            label="Pay pending"
            variant="outlined"
            color="error"
            icon={<CreditCardOutlined />}
        /> */}

         <Chip 
            sx={{my: 2}}
            label="Order already paid"
            variant="outlined"
            color="success"
            icon={<CreditScoreOutlined />}
        />

        <Grid container>
            <Grid item xs={ 12 } sm={ 7 }>
                <CartList editable={false}/>
            </Grid>
            <Grid item xs={ 12 } sm={ 5 }>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Summary (3 products)</Typography>
                        <Divider sx={{ my:1 }} />
                        <Box display="flex" justifyContent="end">
                            <NextLink passHref href="/checkout/address">
                                <Link underline="always">Edit</Link>
                            </NextLink>
                        </Box>

                         <Typography variant="subtitle1">Delivery Address:</Typography>   
                         <Typography>Fernando Herrera</Typography>   
                         <Typography>323 Pizza Street</Typography>   
                         <Typography>Stittsville, IWA 235 </Typography>   
                         <Typography>Canada</Typography>   
                         <Typography>+1 2132341</Typography>   

                    <Divider sx={{my:1}}/>

                    <Box display="flex" justifyContent="end">
                            <NextLink passHref href="/checkout/address">
                                <Link underline="always">Edit</Link>
                            </NextLink>
                        </Box>
                        <OrderSummary />
                        <Box sx={{ mt: 3 }}>
                            {/* TODO */}
                            <Chip 
                                sx={{my: 2}}
                                label="Order already paid"
                                variant="outlined"
                                color="success"
                                icon={<CreditScoreOutlined />}
                            />
                            <h1>Pay</h1>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>


    </ShopLayout>
  )
}

export default OrderPage;
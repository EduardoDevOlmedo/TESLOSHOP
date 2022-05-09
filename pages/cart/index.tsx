import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { CartList } from '../../components/cart';
import { OrderSummary } from '../../components/cart/OrderSummary';

import { ShopLayout } from '../../components/layouts/ShopLayout';

const CartPage = () => {
  return (
    <ShopLayout title='Cart - 3' pageDescription={'Teslo Shop User Cart'}>
        <Typography variant='h1' component='h1'>Cart</Typography>

        <Grid container>
            <Grid item xs={ 12 } sm={ 7 }>
                <CartList editable={true}/>
            </Grid>
            <Grid item xs={ 12 } sm={ 5 }>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Order</Typography>
                        <Divider sx={{ my:1 }} />

                        <OrderSummary />
                        <Box sx={{ mt: 3 }}>
                            <Button color="secondary" className='circular-btn' fullWidth>
                                Checkout
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>


    </ShopLayout>
  )
}

export default CartPage;
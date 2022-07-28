import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { CartList } from '../../components/cart';
import { OrderSummary } from '../../components/cart/OrderSummary';

import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartContext } from '../../context';

const CartPage = () => {
  
  const {isLoaded, cart} = useContext(CartContext)

    const router = useRouter()

    useEffect(() => {
        if(isLoaded && cart.length === 0){ 
            router.replace('/cart/empty')  
        }
    }, [isLoaded, cart.length, router])
    

    if(!isLoaded || cart.length === 0){
        return <></>
    }

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
                            <Button 
                            color="secondary" 
                            className='circular-btn' 
                            fullWidth
                            href="checkout/address"
                            >
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
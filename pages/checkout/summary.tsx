import { useContext, useEffect, useState } from 'react';
import NextLink from 'next/link';

import { Link, Box, Button, Card,Chip, CardContent, Divider, Grid, Typography } from '@mui/material';

import { CartContext } from '../../context';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList } from '../../components/cart';
import { OrderSummary } from '../../components/cart/OrderSummary';
import Cookies from 'js-cookie';
import { Router } from '@mui/icons-material';
import { useRouter } from 'next/router';

const SummaryPage = () => {

    const { shippingAddress, numberOfItems, createOrder } = useContext( CartContext );
    const router = useRouter()
    
    const [isPosting, setIsPosting] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if(!Cookies.get('firstName')){
            router.push("/checkout/address");
        }
    }, [router])
    

    const onCreateOrder = async() => {
        setIsPosting(true)
        const {hasError, message} = await createOrder()

        if(hasError){
            setIsPosting(false)
            setErrorMessage(message)
            return
        }

        router.replace("/orders/" + message)

    }


    if ( !shippingAddress ) {
        return <></>;
    }
    
    const { firstName, lastName, address, address2 = '', city, country, phone, zip } = shippingAddress;

  return (
    <ShopLayout title='Resumen de orden' pageDescription={'Resumen de la orden'}>
        <Typography variant='h1' component='h1'>Resumen de la orden</Typography>

        <Grid container>
            <Grid item xs={ 12 } sm={ 7 }>
                <CartList editable/>
            </Grid>
            <Grid item xs={ 12 } sm={ 5 }>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resumen ({numberOfItems} { numberOfItems === 1 ? 'producto':'productos' })</Typography>
                        <Divider sx={{ my:1 }} />

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Dirección de entrega</Typography>
                            <NextLink href='/checkout/address' passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>

                        
                        <Typography>{ firstName } { lastName }</Typography>
                        <Typography>{ address }{ address2 ? `, ${address2}` : ''  } </Typography>
                        <Typography>{ city }, { zip }</Typography>
                        <Typography>{ country }</Typography>
                        <Typography>{ phone }</Typography>

                        <Divider sx={{ my:1 }} />

                        <Box display='flex' justifyContent='end'>
                            <NextLink href='/cart' passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>

                        <OrderSummary />

                        <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                            <Button
                            disabled={isPosting}
                            onClick={onCreateOrder}
                            color="secondary" className='circular-btn' fullWidth>
                                Confirmar Orden
                            </Button>
                            <Chip 
                                color='error'
                                sx={{ display: errorMessage ? 'flex' : 'none', mt: 2}}
                                label={errorMessage}
                            />
                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>


    </ShopLayout>
  )
}

export default SummaryPage;
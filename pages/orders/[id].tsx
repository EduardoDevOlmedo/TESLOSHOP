import { Box, Chip, Button, Card, CardContent, Divider, Grid, Typography, Link, CircularProgress } from '@mui/material';
import { CartList } from '../../components/cart';
import { OrderSummary } from '../../components/cart/OrderSummary';
import NextLink from "next/link"
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { GetServerSideProps, NextPage } from 'next'
import { CreditCardOutlined, CreditScoreOutlined } from '@mui/icons-material';
import {PayPalButtons} from "@paypal/react-paypal-js";

interface Props {
    order: IOrder
}

export type OrderResponseBody = {

    id: string;

    status:
        | "COMPLETED"
        | "SAVED"
        | "APPROVED"
        | "VOIDED"
        | "COMPLETED"
        | "PAYER_ACTION_REQUIRED";
};


const OrderPage:NextPage<Props> = ({order}) => {
  
    const router = useRouter()
    const {shippingAddress: {firstName, lastName, address, address2, phone, country, zip, city}, numberOfItems, subTotal, tax, total} = order
    const [isPaying, setIsPaying] = useState(false)

    const elementsForOrderList = {
        numberOfItems, subTotal, tax, total
    } 

    const onOrderCompleted = async(details: OrderResponseBody) => {
       
       
        if(details.status !== 'COMPLETED'){
            return alert("No hay pago en PayPal");
        }

        setIsPaying(true)

        try {
            const {data} = await teslOApi.post('/orders/paid', {
                transactionid: details.id,
                orderId: order._id
            })

            router.reload();
        } catch (error) {
            setIsPaying(false)
            console.error(error)
        }

    }

    return (
    <ShopLayout title='Order  summary' pageDescription={'User order summary'}>
        <Typography variant='h1' component='h1'>Order: {order._id}</Typography>

        {
            order.isPaid 
            ? (
                <Chip 
                   sx={{my: 2}}
                   label="Order already paid"
                   variant="outlined"
                   color="success"
                   icon={<CreditScoreOutlined />}
               />
            ) : 
            (
                <Chip 
                   sx={{my: 2}}
                   label="Pay pending"
                   variant="outlined"
                   color="error"
                   icon={<CreditCardOutlined />}
               /> 
            )
        }



        <Grid container>
            <Grid item xs={ 12 } sm={ 7 }>
                <CartList editable={false} products={order.orderItems}/>
            </Grid>
            <Grid item xs={ 12 } sm={ 5 }>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Summary ({order.numberOfItems} {order.numberOfItems > 1 ? 'products' : 'product'})</Typography>
                        <Divider sx={{ my:1 }} />
                        <Box display="flex" justifyContent="end">
                            <NextLink passHref href="/checkout/address">
                                <Link underline="always">Edit</Link>
                            </NextLink>
                        </Box>

                         <Typography variant="subtitle1">Delivery Address:</Typography>   
                         <Typography> {firstName} {lastName} </Typography>   
                         <Typography> {address} {address2 && address2} </Typography>   
                         <Typography> {city} {zip} </Typography>   
                         <Typography> {country} </Typography>   
                         <Typography> {phone} </Typography>   

                    <Divider sx={{my:1}}/>

                    <Box display="flex" justifyContent="end">
                            <NextLink passHref href="/checkout/address">
                                <Link underline="always">Edit</Link>
                            </NextLink>
                        </Box>
                        <OrderSummary elements={elementsForOrderList} />
                        <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                            <Box display="flex" 
                                justifyContent="center"
                                 className="fadeIn"
                                 sx={{display: !isPaying ? 'none' : 'flex'}}
                                 >
                                <CircularProgress />
                            </Box>      

                            <Box sx={{display: isPaying ? 'none' : 'flex', flex: 1, flexDirection: 'column'}}>
                            {
                                order.isPaid ? 
                                (
                                    <Chip 
                                sx={{my: 2}}
                                label="Order already paid"
                                variant="outlined"
                                color="success"
                                icon={<CreditScoreOutlined />}
                            />
                                ) 
                                : <PayPalButtons 
                                createOrder={(data, actions) => {
                                    
                                    return actions.order.create({
                                        
                                        purchase_units: [
                                            {
                                                amount: {
                                                    value: order.total.toFixed(2)
                                                },
                                            },
                                        ],
                                    });
                                }}
                                onApprove={(data, actions) => {
                                    return actions!.order!.capture().then((details) => {
                                        onOrderCompleted(details);
                                    });
                                }}
                                />
                            }
                            </Box>

                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>


    </ShopLayout>
  )
}

export default OrderPage;

import { getSession } from 'next-auth/react';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';
import { teslOApi } from '../../API';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
    const { id = '' } = query;
    const session:any = await getSession({ req });

    
    if ( !session ) {
        return {
            redirect: {
                destination: `/auth/login?p=/orders/${ id }`,
                permanent: false,
            }
        }
    }

    
    const order = await dbOrders.getOrderById(id.toString())
   
    if(!order){
        return {
            redirect: {
                destination: `/orders/history`,
                permanent: false,
            }
        }
    }

    if(order.user !== session.user._id){
        return {
            redirect: {
                destination: `/orders/history`,
                permanent: false,
            }
        }
    }

    return {
        props: {
            order
        }
    }
}

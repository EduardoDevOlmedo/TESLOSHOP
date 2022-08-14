import { ConfirmationNumberOutlined } from "@mui/icons-material";
import { Typography, Grid, Card, CardContent, Divider, Box, Link, Chip } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import NextLink from "next/link"
import { useRouter } from "next/router";
import { CartList } from "../../../components/cart";
import { OrderSummary } from "../../../components/cart/OrderSummary";
import { AdminLayout, ShopLayout } from "../../../components/layouts";
import { dbOrders } from "../../../database";
import { IOrder } from "../../../interfaces";



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

    const elementsForOrderList = {
        numberOfItems, subTotal, tax, total
    } 

    

    return (
    <AdminLayout icon={<ConfirmationNumberOutlined />} title={"Orders - Admin"} subTitle={"Order by ID"} >
        <Typography variant='h1' component='h1'>Order: {order._id}</Typography>

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
                       
                   <Box display="flex" justifyContent="center">
                   {
                        order.isPaid ? 
                        (<Chip variant="outlined" label="Paid" color="success" />) :
                        (<Chip variant="filled" label="Not Paid" color="error" />) 
                    }
                   </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>


    </AdminLayout>
  )
}

export default OrderPage



export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
    const { id = '' } = query;
   
    
    const order = await dbOrders.getOrderById(id.toString())
   
    if(!order){
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

import { Typography, Grid, Chip, Link } from "@mui/material"
import { ShopLayout } from "../../components/layouts"
import { DataGrid, GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import NextLink from "next/link"
import { dbOrders } from "../../database";

import { GetServerSideProps, NextPage } from 'next'
import { getSession } from "next-auth/react";
import { IOrder } from "../../interfaces";

interface Props { 
    orders: IOrder[]
}

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 100},
    {field: 'fullName', headerName: 'Full Name', width: 300},
    {
        field: 'paid',
        headerName: 'Status',
        description: 'Shows if order is wheter paid or not',
        width: 200,
        renderCell: (params: GridValueGetterParams) => {
            return (
                params.row.paid 
                ? <Chip color="success" label="Paid" variant="outlined"/>
                : <Chip color="error" label="Payment pending" variant="outlined"/>
            )
        }
    },
    {
    field: 'order', headerName: 'Order', 
    width: 200,
    sortable: false,
    renderCell: (params: GridValueGetterParams) => {
        const link = params.row.orderId
        return(
            <NextLink passHref href={`/orders/${link}`}>
                <Link underline="always"> 
                Order
                </Link>
            </NextLink>

        )
    }
    }
]



const HistoryPage:NextPage<Props> = ({orders}) => {
  

    const rows = orders.map((order, i) => {
        return { 
            id: i + 1, paid: order.isPaid, fullName: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`, orderId: order._id
         }
    })
  
    return (
    <ShopLayout title="Order History" pageDescription="User order history">
        <Typography variant="h1" component="h1">Order History</Typography>
        <Grid container className="fadeIn">
            <Grid item xs={12} sx={{height: 650, width: '100%'}}>
                <DataGrid 
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
            </Grid>
        </Grid>
    </ShopLayout>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    
    const session: any = await getSession({ req });

    if ( !session ) {
        return {
            redirect: {
                destination: '/auth/login?p=/orders/history',
                permanent: false,
            }
        }
    }

    const orders = await dbOrders.getOrdersByUser( session.user._id );


    return {
        props: {
            orders
        }
    }
}


export default HistoryPage
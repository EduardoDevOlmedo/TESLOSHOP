import { Typography, Grid, Chip, Link } from "@mui/material"
import { ShopLayout } from "../../components/layouts"
import { DataGrid, GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import NextLink from "next/link"

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
        const link = params.row.order
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

const row = [
    {id:  1, paid: true, fullName: 'Fernando Herrera', order: "14214"},
    {id:  2, paid: true, fullName: 'Melissa Flores', order: "35214"},
    {id:  3, paid: false, fullName: 'Andrea Nicole', order: "17694"},
    {id:  4, paid: true, fullName: 'Jair Hernández', order: "84219"},
    {id:  5, paid: false, fullName: 'Natalia Herrera', order: "23414"},
    {id:  6, paid: true, fullName: 'Samanta Natalie', order: "14414"},

]

const HistoryPage = () => {
  return (
    <ShopLayout title="Order History" pageDescription="User order history">
        <Typography variant="h1" component="h1">Order History</Typography>
        <Grid container>
            <Grid item xs={12} sx={{height: 650, width: '100%'}}>
                <DataGrid 
                    rows={row}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default HistoryPage
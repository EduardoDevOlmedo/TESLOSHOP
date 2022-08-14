import { ConfirmationNumberOutlined } from "@mui/icons-material"
import { Chip, Grid } from "@mui/material"
import { GridColDef, GridValueGetterParams, DataGrid } from "@mui/x-data-grid"
import useSWR from "swr"
import { AdminLayout } from "../../components/layouts"
import { IOrder, IUser } from "../../interfaces"


const OrdersPage = () => {
  

  const {data, error} = useSWR<IOrder[]>("/api/admin/orders")

  if(!data && !error) return <></>

  const rows = data!.map(order => ({
    id: order._id,
    email:(order.user as IUser).email,
    name: (order.user as IUser).name,
    total: order.total.toFixed(2),
    isPaid: order.isPaid,
    inStock: order.numberOfItems,
    createdAt: order.createdAt
  }))

  const columns: GridColDef[] = [
    {field: 'id', headerName: 'Order ID', width: 250},
    {field: 'email', headerName: 'Email', width: 250},
    {field: 'name', headerName: 'Fullname', width: 300},
    {field: 'total', headerName: 'Total', width: 200},
    {
      field: 'isPaid',
      headerName: 'Payment status',
      renderCell: ({row}: GridValueGetterParams) => {
        return row.isPaid 
          ? (<Chip variant="outlined" label="Paid" color="success"/>)
          : (<Chip variant="outlined" label="Not paid" color="error"/>)
      }
    }, 
    {field: 'inStock', headerName: 'Products amount', align: 'center'},
    {
      field: 'check',
      headerName: 'View order',
      renderCell: ({row}: GridValueGetterParams) => {
        return (
          <a href={` /admin/orders/${row.id} `} target="_blank" rel="noreferrer" >
            Order
          </a>
        )
      }
    },
    {field: 'createdAt', headerName: 'Created at', align: 'left'},
  ]

  
  return (
    <AdminLayout 
    icon={<ConfirmationNumberOutlined />} title={'Orders'} subTitle={'Order mantainance'}    
    >
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
    </AdminLayout>
  )
}

export default OrdersPage
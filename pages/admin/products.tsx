import { AddOutlined, CategoryOutlined } from "@mui/icons-material"
import { Box, Button, CardMedia, Chip, Grid, Link } from "@mui/material"
import { GridColDef, GridValueGetterParams, DataGrid } from "@mui/x-data-grid"
import useSWR from "swr"
import { AdminLayout } from "../../components/layouts"
import {  IProduct } from "../../interfaces"
import NextLink from "next/link"

const ProductsPage = () => {
  

  const {data, error} = useSWR<IProduct[]>("/api/admin/products")

  if(!data && !error) return <></>

  const rows = data!.map(product => ({
    id: product._id,
    img: product.images[0],
    title: product.title,
    gender: product.gender,
    type: product.type,
    inStock: product.inStock,
    price: product.price,
    sizes: product.sizes.join(" ,"),
    slug: product.slug
  }))

  const columns: GridColDef[] = [
    
    
    {
        field: 'title', 
        headerName: 'Product', 
        width: 300,
        renderCell: ({row}: GridValueGetterParams) => {
            return(
                <NextLink href={`/admin/products/${row.slug}`} passHref>
                    <Link underline="always">
                        {row.title}
                    </Link>
                </NextLink>
            )
        }
    },


    {field: 'img', headerName: 'Image',
        renderCell: ({row}: GridValueGetterParams) => {
            return (
                <a href={`/products/${row.slug}`} target="_blank" rel="noreferrer">
                    <CardMedia 
                        component="img"
                        className="fadeIn"
                        image={`/products/${row.img}`}
                    />
                </a>
            )
        } 
    },
    {field: 'gender', headerName: 'Gender', width: 200},
    {field: 'type', headerName: 'Type'},
    {field: 'sizes', headerName: 'Sizes', width: 250},
    {field: 'price', headerName: 'Price'},
    {field: 'inStock', headerName: 'Inventory'},

  ]

  
  return (
    <AdminLayout 
    icon={<CategoryOutlined />} title={`Products ${data?.length}`} subTitle={'Products inventory'}    
    >

    <Box display="flex" justifyContent="end" sx={{mb: 2}}>
        <Button 
            color="secondary"
            href="/admin/products/new"
            startIcon={<AddOutlined />}
        >
            Create product
        </Button>
    </Box>

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

export default ProductsPage
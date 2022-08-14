import React, { useEffect, useState } from 'react'
import { AccessTimeOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOffOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined } from '@mui/icons-material'
import { AdminLayout } from '../../components/layouts'
import { Grid, Typography } from '@mui/material'
import SummaryTile from '../../components/admin/SummaryTile'
import useSWR from 'swr'
import { Dashboard } from '../../interfaces'

const AdminPage = () => {
  
  const {data, error} = useSWR<Dashboard>('/api/admin/dashboard', {
    refreshInterval: 30 * 1000
  })
  
  const [refreshIn, setRefreshIn] = useState(30)

  useEffect(() => {

    const interval = setInterval(() => {
      setRefreshIn(refreshIn => refreshIn > 0 ? refreshIn - 1 : 30)
    }, 1000)

    return () => clearInterval(interval)

  }, [])


  if(!error && !data){
    return <></>
  }

  if(error){
    console.error(error)
  }

  const {
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
    notPaidOrders
  } = data!

  return (
    
    <AdminLayout title="Dashboard" 
        subTitle='General statistics'
        icon={<DashboardOutlined />}
    >
      
      <Grid container spacing={3}>
          <SummaryTile 
            title={numberOfOrders}
            subTitle="Total Orders"
            icon={<CreditCardOutlined color="secondary" sx={{fontSize: 40}} />}
          />
          <SummaryTile 
            title={paidOrders}
            subTitle="Paid Orders"
            icon={<AttachMoneyOutlined color="success" sx={{fontSize: 40}} />}
          />
          <SummaryTile 
            title={notPaidOrders}
            subTitle="Pending Orders"
            icon={<CreditCardOutlined color="error" sx={{fontSize: 40}} />}
          />
          <SummaryTile 
            title={numberOfClients}
            subTitle="Total clients"
            icon={<GroupOutlined color="primary" sx={{fontSize: 40}} />}
          />
          <SummaryTile 
            title={numberOfProducts}
            subTitle="Products"
            icon={<CategoryOutlined color="warning" sx={{fontSize: 40}} />}
          />
          <SummaryTile 
            title={productsWithNoInventory}
            subTitle="Out of stock"
            icon={<CancelPresentationOutlined color="error" sx={{fontSize: 40}} />}
          />
          <SummaryTile 
            title={lowInventory}
            subTitle="In low stock"
            icon={<ProductionQuantityLimitsOutlined color="warning" sx={{fontSize: 40}} />}
          />
          <SummaryTile 
            title={refreshIn}
            subTitle="Updating in ~30s"
            icon={<AccessTimeOutlined color="secondary" sx={{fontSize: 40}} />}
          />
      </Grid>
    
    </AdminLayout>

  )
}

export default AdminPage
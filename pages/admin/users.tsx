import React, { useEffect, useState } from 'react'
import { AdminLayout } from '../../components/layouts'
import { DataGrid, GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import { Grid, MenuItem, Select } from '@mui/material';
import useSWR from 'swr';
import { IUser } from '../../interfaces';
import tesloApi from '../../API/tesloApi';


const UsersPage = () => {
  
  const {data, error} = useSWR('/api/admin/users')


  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    
    if(data){
      setUsers(data)

      //usuarios === data
    }

  }, [data]) //cuando cambie la data cambian los usuarios

  const onRoleUpdated = async(userId: string, newRole: string) => {

    const previousUsers = users.map(user => ({...user}))

    const updatedUsers = users.map(user => ({
      ...user,
      role: userId === user._id ? newRole : user.role
    }))

    setUsers(updatedUsers)

    try {
      await tesloApi.put('/admin/users', {  userId, role: newRole });

    } catch (error) {
      setUsers(previousUsers)
      alert('Ocurrió un error.' )
      console.error(error)
    }

  }

  if(!data && !error) return <></>

  const columns: GridColDef[] = [
    {field: 'email', headerName: 'Email', width: 250},
    {field: 'name', headerName: 'Name', width: 300},
    {
      field: 'role', 
      headerName: 'Role', 
      width: 300,
      renderCell: ({row}: GridValueGetterParams) => {
        return (
          <Select
            value={row.role}
            label="Role"
            onChange={({target}) => onRoleUpdated(row.id, target.value)}
            sx={{width: '300px'}}
          >
            <MenuItem value='admin'>admin</MenuItem>
            <MenuItem value='client' >super-user</MenuItem>
            <MenuItem value='super-user'>SEO</MenuItem>
            <MenuItem value="SEO">client</MenuItem>
          </Select>
        )
      }}
  ];

  const rows = users.map((user: IUser) => ({
    id: user._id,
    email: user.email,
    role: user.role,
    name: user.name
  }))

  return (
    <AdminLayout icon={undefined} title={'Users page'} subTitle={'Change the user role.'} >
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

export default UsersPage
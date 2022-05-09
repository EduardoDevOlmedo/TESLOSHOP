import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { AuthLayout } from '../../components/layouts'
import NextLink from "next/link"

const Login = () => {
  return (
    <AuthLayout title="Log In">
            <Box sx={{width: 350, padding: '10px 20px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h1" component="h1">Login</Typography>
                    </Grid>
                    <Grid item xs={12}>
                            <TextField 
                                label="E-Mail"
                                variant="filled"
                                fullWidth
                            />
                             <TextField 
                                label="Password"
                                variant="filled"
                                fullWidth
                            />         
                    </Grid>
                    <Grid item xs={12}>
                       <Button color="secondary" className="circular-btn" size="large" fullWidth>
                            Login  
                        </Button>     
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="end">
                        <NextLink href="/auth/register" passHref>
                            <Link underline="always">
                                Don&apos; have an account? Register.
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
    </AuthLayout>
  )
}

export default Login
import { Button, Chip, Grid, Link, TextField, Typography} from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { AuthLayout } from '../../components/layouts'
import NextLink from "next/link"
import { useForm } from 'react-hook-form'
import { validations } from '../../utils'
import { teslOApi } from '../../API'
import { ErrorOutline } from '@mui/icons-material'

type FormData = {
    email: string;
    password: string;
}

const Login = () => {
  
 const { handleSubmit, register, formState: { errors } } = useForm<FormData>();

 const [showError, setShowError] = useState(false)

    const onLoginUser = async({email, password}: FormData) => {
      
        setShowError(false)

        try {
            const {data} = await teslOApi.post("/user/login", {email, password})
            const {token, user} = data
            console.log(data)
        } catch (error) {
            setShowError(true)
            setTimeout(() => {
                setShowError(false)                
            }, 3000);
        }
    }

return(
  <AuthLayout title="Log In">
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
            <Box sx={{width: 350, padding: '10px 20px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h1" component="h1">Login</Typography>
                        <Chip 
                            label="Email or password was not found"
                            color="error"
                            icon={<ErrorOutline />}
                            className="fadeIn"
                            sx={{display: showError ? 'flex' : 'none', mt: 2}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                            <TextField 
                                type="email"
                                label="E-Mail"
                                variant="filled"
                                fullWidth
                                {
                                    ...register('email', {
                                        required: 'This field is required.',
                                        validate: validations.isEmail
                                    })
                                }
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                             <TextField 
                                type="password"
                                label="Password"
                                variant="filled"
                                fullWidth
                                {
                                    ...register('password', {
                                        required: 'This field is required.'
                                    })
                                }
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />         
                    </Grid>
                    <Grid item xs={12}>
                       <Button
                       type="submit" 
                       color="secondary" className="circular-btn" size="large" fullWidth>
                            Login  
                        </Button>     
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="end">
                        <NextLink href="/auth/register" passHref>
                            <Link underline="always">
                                Don&apos;t have an account? Register.
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </form>
    </AuthLayout>
  )
}

export default Login
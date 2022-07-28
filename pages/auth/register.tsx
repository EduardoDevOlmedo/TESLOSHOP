
import { Button, Grid, Link, TextField, Typography, Chip } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useState } from 'react'
import { AuthLayout } from '../../components/layouts'
import NextLink from "next/link"
import { useForm } from 'react-hook-form'
import { teslOApi } from '../../API'
import { validations } from '../../utils'
import { ErrorOutline } from '@mui/icons-material'
import { AuthContext } from '../../context'
import { useRouter } from 'next/router'
import { getSession, signIn } from 'next-auth/react'


type FormData = {
    name: string;
    email: string;
    password:string;
}

const Register = () => {
  
    const router = useRouter()
    const {registerUser} = useContext(AuthContext)

    const { handleSubmit, register, formState: { errors } } = useForm<FormData>();

    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onRegisterUser = async({email, password, name}: FormData) => {
        setShowError(false)
        
        const {hasError, message} = await registerUser(name, email, password)

        if(hasError){
            setShowError(true)
            setErrorMessage(message!)
            setTimeout(() => {
                setShowError(false)                
            }, 3000);

            return;
        }

        await signIn('credentials', {email, password})
    }

  
  
    return (
    <AuthLayout title="Log In">
        <form onSubmit={handleSubmit(onRegisterUser)} noValidate>
            <Box sx={{width: 350, padding: '10px 20px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h1" component="h1">Register</Typography>
                        <Chip 
                            label={'Email or password was not found'}
                            color="error"
                            icon={<ErrorOutline />}
                            className="fadeIn"
                            sx={{display: showError ? 'flex' : 'none', mt: 2}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                            <TextField 
                                label="Name"
                                variant="filled"
                                fullWidth
                                {
                                    ...register('name', {
                                        required: 'This field is required'
                                    })
                                }
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />        
                    </Grid>
                    <Grid item xs={12}>
                         <TextField 
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
                    </Grid>
                    <Grid item xs={12}>
                         <TextField 
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
                       <Button color="secondary"
                        type="submit" className="circular-btn"
                         size="large" fullWidth>
                            Register
                        </Button>     
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="end">
                    <NextLink href={router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login'} passHref>
                            <Link underline="always">
                                Already have an account? Login.
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </form>
    </AuthLayout>
  )
}

import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
    const session = await getSession({req})  // your fetch function here 

    const { p = '/'} = query

    if(session){
        return {
            redirect: {
                destination: p.toString(), 
                permanent: false
            }
        }
    }

    return {
        props: {
            
        }
    }
}


export default Register
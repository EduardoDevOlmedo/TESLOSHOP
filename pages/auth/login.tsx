import { Button, Chip, Divider, Grid, Link, TextField, Typography} from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import { AuthLayout } from '../../components/layouts'
import NextLink from "next/link"
import { useForm } from 'react-hook-form'
import { validations } from '../../utils'
import { teslOApi } from '../../API'
import { ErrorOutline } from '@mui/icons-material'
import {AuthContext} from "../../context/auth"
import { useRouter } from 'next/router'
import { getProviders, getSession, signIn } from 'next-auth/react'

type FormData = {
    email: string;
    password: string;
}

const Login = () => {
  
    const router = useRouter()
  
    const {
      handleSubmit,
      register,
      formState: {
          errors
      }
  } = useForm < FormData > ();
  const {
      loginUser
  } = useContext(AuthContext)

  const [showError, setShowError] = useState(false)

  const [providers, setProviders] = useState<any>({})

  useEffect(() => {
    getProviders().then(prov => {
        setProviders(prov)
    })
  }, [])


  const onLoginUser = async ({
      email,
      password
  }: FormData) => {

  setShowError(false)
  
  await signIn('credentials', { email, password })


//   const isValidLogin = await loginUser(email, password);

//       if (!isValidLogin) {
//           setShowError(true)
//           setTimeout(() => {
//               setShowError(false)
//           }, 3000);
//         return;
//     }

//     const destination = router.query.p?.toString() || " "

//     router.replace(destination)
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
                        <NextLink href={router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'} passHref>
                            <Link underline="always">
                                Don&apos;t have an account? Register.
                            </Link>
                        </NextLink>
                    </Grid>
                    <Grid
                        display="flex" flexDirection="column"
                    >
                        <Divider 
                        sx={{
                            width: '100%', mb: 2}}
                        />
                        {
                            Object.values(providers).map((provider: any) => {

                                if(provider.id === 'credentials') return (
                                    <div key="credentials"></div>
                                )

                                return (
                                    <Button
                                        key={provider.id}
                                        variant="outlined"
                                        fullWidth
                                        color="primary" sx={{mb: 1}}
                                        onClick={() => signIn(provider.id)}
                                    >
                                        {provider.name}
                                    </Button>
                                )

                            })
                        }
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

export default Login
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { lightTheme } from '../themes'
import {SWRConfig} from "swr"
import UIProvider from '../context/ui/UIProvider'
import React from 'react'
import CartProvider from '../context/cart/CartProvider'
import AuthProvider from '../context/auth/AuthProvider'
import { SessionProvider } from "next-auth/react"
import { PayPalScriptProvider } from "@paypal/react-paypal-js";


function MyApp({ Component, pageProps }: any):JSX.Element {
  return (
<PayPalScriptProvider options={{'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || ' '}}>
      <SessionProvider>
        <SWRConfig 
        value={{
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >
      <AuthProvider>
      <CartProvider>
        <UIProvider >
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
        </UIProvider>
      </CartProvider>
      </AuthProvider>
        </SWRConfig>
        </SessionProvider>
</PayPalScriptProvider>
  )
}

export default MyApp


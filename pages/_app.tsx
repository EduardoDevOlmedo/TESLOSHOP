import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { lightTheme } from '../themes'
import {SWRConfig} from "swr"
import UIProvider from '../context/ui/UIProvider'
import React from 'react'
import CartProvider from '../context/cart/CartProvider'

interface IProps {
  Component: typeof React.Component;
  pageProps: any;
}

function MyApp({ Component, pageProps }: IProps):JSX.Element {
  return (
    <SWRConfig 
    value={{
      fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
    }}
  >
  <CartProvider>
    <UIProvider >
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
    </UIProvider>
  </CartProvider>
    </SWRConfig>
  )
}

export default MyApp


import React, { useEffect, useReducer } from 'react'
import { ICartProduct, IOrder, shippingAddress } from '../../interfaces';
import {CartContext, cartReducer} from "./"
import Cookie from "js-cookie";
import { teslOApi } from '../../API';
import tesloApi from '../../API/tesloApi';
import { ISODateString } from 'next-auth';
import axios from 'axios';

export interface CartState {
    isLoaded: boolean
    cart: ICartProduct[]
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
    shippingAddress?: shippingAddress;
}



const CART_INITIAL_STATE: CartState = {
    isLoaded: false,
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
    shippingAddress: undefined
}

interface Props {
    children: React.ReactNode
}

const CartProvider: React.FC<Props> = ({children}) => {

const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)

    

    
    useEffect(() => {
        const products = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
        dispatch({
            type: '[Cart] - LoadCart from cookies | storage',
            payload: products
        })

    }, [])
    
    useEffect(() => {

        if(Cookie.get('firstName') !== undefined) {
            const shippingAddress: shippingAddress = {
                firstName:   Cookie.get('firstName') || '',
                lastName :   Cookie.get('lastName') || '',
                address  :   Cookie.get('address') || '',
                address2 :   Cookie.get('address2') || '',
                zip      :   Cookie.get('zip') || '',
                city     :   Cookie.get('city') || '',
                country  :   Cookie.get('country') || '',
                phone    :   Cookie.get('phone') || ''
            }
            dispatch({type: '[Cart] - Load Address from cookies', payload: shippingAddress})
        }
    }, [])
    

    useEffect(() => {
        Cookie.set('cart', JSON.stringify( state.cart ), { expires: 365 });
    }, [state.cart]);

    useEffect(() => {
        const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0)
        const subTotal = state.cart.reduce((prev, current) => (current.price * current.quantity) + prev ,0)
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

        const orderSummary = {
            numberOfItems,
            subTotal,
            tax: subTotal * taxRate,
            total: (subTotal * (taxRate + 1))
        }

        dispatch({type: '[Cart] - Update cart summary', payload: orderSummary})

    }, [state.cart]);



    const addProductToCart = (product: ICartProduct) => {
        
        const productInCart = state.cart.some( p => p._id === product._id );
        if ( !productInCart ) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product ] })

        const productInCartButDifferentSize = state.cart.some( p => p._id === product._id && p.size === product.size );
        if ( !productInCartButDifferentSize ) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product ] })

        // Acumular
        const updatedProducts = state.cart.map( p => {
            if ( p._id !== product._id ) return p;
            if ( p.size !== product.size ) return p;

            // Actualizar la cantidad
            p.quantity += product.quantity;
            return p;
        });

        dispatch({ type: '[Cart] - Update products in cart', payload: updatedProducts });
    }

    const updateCartQuantity = (product: ICartProduct) => {
        dispatch({type: '[Cart] - Change cart quantity', payload: product})
    }

    const  removeCartProducts = (product: ICartProduct) => {
        dispatch({type: '[Cart] - Remove Product in Cart', payload: product})
    } 

    const updateAddress = (data: shippingAddress) => {
        Cookie.set('firstName', data.firstName)
        Cookie.set('lastName', data.lastName)
        Cookie.set('address', data.address)
        Cookie.set('address2', data.address2 || '')
        Cookie.set('zip', data.zip)
        Cookie.set('city', data.city)
        Cookie.set('country', data.country)
        Cookie.set('phone', data.phone)
        dispatch({type: '[Cart] - Update Address', payload: data
    })
    }

    const createOrder = async():Promise<{hasError: boolean; message: string}> => {
       
        if ( !state.shippingAddress ) {
            throw new Error('No hay dirección de entrega');
        }

        const body: IOrder = {
            orderItems: state.cart.map( p => ({
                ...p,
                size: p.size!
            })),
            shippingAddress: state.shippingAddress,
            numberOfItems: state.numberOfItems,
            subTotal: state.subTotal,
            tax: state.tax,
            total: state.total,
            isPaid: false
        }


        try {
         const { data } = await tesloApi.post<IOrder>('/orders', body);
         dispatch({type: '[Cart] - Order Complete'})     
        
         return {
            hasError: false,
            message: data._id!
        }

        } catch (error: any) {
            if(axios.isAxiosError(error)){
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }

            return {
                hasError: true,
                message: 'Error no controlado'
            }
        }

    }

    return (
        <CartContext.Provider value={{
            ...state, addProductToCart, updateCartQuantity, removeCartProducts, updateAddress, createOrder
        }}>
            {children}
        </CartContext.Provider>
    )
} 

export default CartProvider


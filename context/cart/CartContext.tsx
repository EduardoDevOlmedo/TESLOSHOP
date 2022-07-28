import { createContext } from 'react';
import { ICartProduct, shippingAddress } from '../../interfaces';

interface contextProps{
    isLoaded: boolean
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
    shippingAddress?: shippingAddress;
    addProductToCart: (product: ICartProduct) => void;
    updateCartQuantity: (product: ICartProduct) => void;
    removeCartProducts: (product: ICartProduct) => void;
    updateAddress: (address: shippingAddress) => void;
    createOrder: () => Promise<{ hasError: boolean; message: string; }>
}

export const CartContext = createContext({} as contextProps)
import { ItemCounter } from "../../components/ui";
import { ICartProduct, shippingAddress } from "../../interfaces";
import { CartState } from "./CartProvider";

type cartType = 
|{ type: "[Cart] - LoadCart from cookies | storage", payload: ICartProduct[]} 
|{ type: "[Cart] - Update products in cart", payload: ICartProduct[]}
|{ type: "[Cart] - Change cart quantity", payload: ICartProduct} 
|{ type: "[Cart] - Remove Product in Cart", payload: ICartProduct} 
|{ type: "[Cart] - Load Address from cookies", payload: shippingAddress}
|{ type: "[Cart] - Update Address", payload: shippingAddress} 
|{ 
    type: "[Cart] - Update cart summary", 
    payload: {
        numberOfItems: number;
        subTotal: number;
        tax: number;
        total: number;
    }
}
| {type: '[Cart] - Order Complete'} 





export const cartReducer = (state: CartState, action: cartType):CartState => {
    
    switch (action.type) {
        case '[Cart] - LoadCart from cookies | storage' :
            return {
                ...state, 
                isLoaded: true,
                cart: [...action.payload]
            }
        case '[Cart] - Update products in cart':
            return {
                ...state,
                 cart:  [...action.payload]
            }
        case '[Cart] - Change cart quantity':
            return {
                ...state,
                cart: state.cart.map(product => {
                    if(product._id !== action.payload._id){
                        return product
                    }
                    if(product.size !== action.payload.size){
                        return product
                    }

                    return action.payload
                })
            }
        case '[Cart] - Update cart summary':
            return {
                ...state,
                ...action.payload
            }
        case '[Cart] - Remove Product in Cart':
            return {
                ...state, 
                cart: state.cart.filter(product => {
                    return product.size === action.payload.size && product._id === action.payload._id
                })
            }
        case '[Cart] - Load Address from cookies':
            return {
                ...state,
                shippingAddress: action.payload
            }
        case '[Cart] - Order Complete':
            return {
                ...state,
                cart: [],
                numberOfItems: 0,
                subTotal: 0,
                tax: 0,
                total: 0
            }
        default:
            return state;
    }


}


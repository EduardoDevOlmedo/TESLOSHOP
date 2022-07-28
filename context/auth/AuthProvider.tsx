import { useEffect, useReducer } from 'react'
import { teslOApi } from '../../API';
import { IUser } from '../../interfaces';
import { AuthContext } from './AuthContext';
import { AuthReducer } from './AuthReducer';
import Cookies from "js-cookie"
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';

export interface AuthState {
    isLoggedIn: boolean;
    user: IUser | undefined
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined
}

interface Props {
    children: JSX.Element[] | JSX.Element;
}

const AuthProvider: React.FC<Props> = ({children}) => {

const [state, dispatch] = useReducer(AuthReducer, AUTH_INITIAL_STATE)
const { data, status } = useSession()
const router = useRouter()

useEffect(() => {
    if(status === 'authenticated'){
        console.log({user: data?.user})
        dispatch({type: 'Auth - Login', payload: data?.user as IUser})
    }
  
}, [status, data])



// useEffect(() => {
//   checkToken()  
// }, [])


const checkToken = async () => {
    
    if(!Cookies.get('token')){
        return;
    }
    
    try {
        const {data: {user}} = await teslOApi.get('/user/validate-token')
        dispatch({type: 'Auth - Login', payload: user})
    } catch (error) {
        console.log(error)
    }
}

const loginUser = async(email: string, password: string): Promise<boolean> => {
    try {  
        const {data} = await teslOApi.post('/user/login', {email, password});
        const {token, user} = data;
        Cookies.set('token', token);
        dispatch({type: 'Auth - Login', payload: user})
        return true;
    } catch (error) {
        return false;
    }
}

const registerUser = async (name:string, email: string, password: string): Promise<{hasError: Boolean, message?: string}>  => {
    try {
        const {data} = await teslOApi.post('/user/register', {name, email, password});
        const {token, user} = data;
        Cookies.set('token', token);
        dispatch({type: 'Auth - Login', payload: user})
        return {
            hasError: false
        }
    } catch (error) {
        if(axios.isAxiosError(error)){
            return {
                hasError: true,
                message: (error as any).response?.data.message 
            }
        }

        return {
            hasError: true,
            message: 'No se pudo crear el usuario.'
        }

    }
}

const logout = () => {
 Cookies.remove('cart');
 Cookies.remove('firstName')
  Cookies.remove('lastName')
  Cookies.remove('address')
  Cookies.remove('address2')
  Cookies.remove('zip')
  Cookies.remove('city')
  Cookies.remove('country')
  Cookies.remove('phone')

  signOut();
//   Cookies.remove('token');
//   router.reload();
}

return (
    <AuthContext.Provider value={{
        ...state,
        loginUser,
        registerUser,
        logout
        }}>
        {
            children
        }
    </AuthContext.Provider>
)
}
export default AuthProvider



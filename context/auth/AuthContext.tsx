import { createContext } from 'react';
import {IUser} from "../../interfaces"

interface contextProps{
    
    isLoggedIn: boolean;
    user?: IUser;
    registerUser: (name: string, email: string, password: string) => Promise<{ hasError: Boolean; message?: string }>;
    loginUser: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

export const AuthContext = createContext({} as contextProps)
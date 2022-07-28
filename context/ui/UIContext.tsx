import { createContext } from 'react';


interface contextProps{
    isMenuOpen: boolean; 
    toggleSideMenu: () => void;
}

export const UIContext = createContext({} as contextProps)
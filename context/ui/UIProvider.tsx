import { useReducer } from 'react'
import { UIContext } from './UIContext';
import { UIReducer } from './UIReducer';

export interface UIState {
  isMenuOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
    isMenuOpen: false,
}

interface Props {
    children: JSX.Element[] | JSX.Element
}


const UIProvider: React.FC<Props> = ({children}) => {

const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE)

const toggleSideMenu = () => {
  dispatch({
      type: "[UI] - ToggleMenu"
  })
}

return (
    <UIContext.Provider value={{...state, toggleSideMenu}}>
        {
            children
        }
    </UIContext.Provider>
)}

export default UIProvider
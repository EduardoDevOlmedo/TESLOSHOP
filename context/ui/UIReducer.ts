import { UIState } from "./UIProvider";

type NameType = 
|{ type: "[UI] - ToggleMenu"} 

export const UIReducer = (state: UIState, action: NameType): UIState => {
    switch (action.type) {
        case '[UI] - ToggleMenu' :
            return {
                ...state, 
                isMenuOpen: !state.isMenuOpen
            }
        default:
            return state;
    }
}

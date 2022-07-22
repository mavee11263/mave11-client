import { createContext, useReducer } from 'react'
import Cookies from 'js-cookie'

const initialState = {
    darkMode: false,
    mavee_11_user: Cookies.get('mavee_11_user') ? JSON.parse(Cookies.get('mavee_11_user')) : null,
    search_query: ''
}

export const Store = createContext();

function reducer(state, action) {
    switch (action.type) {

        // changing theme from  dark to light
        case 'DARK_MODE_ON':
            return { ...state, darkMode: true }
        case 'DARK_MODE_OFF':
            return { ...state, darkMode: false }
            // for loggin in
        case 'USER_LOGIN':
            return { ...state, mavee_11_user: action.payload }

            // for loggin out and emptying cart
        case 'USER_LOGOUT':
            return { ...state, mavee_11_user: null, cart: { cartItems: [] } }

            // set searchy query over all components
        case 'SET_SEARCH_QUERY':
            return { ...state, search_query: action.payload }

        default:
            return state
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const value = { state, dispatch };
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}
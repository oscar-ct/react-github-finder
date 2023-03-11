import { createContext, useReducer } from "react";
import alertReducer from "./AlertReducer";


const AlertContext = createContext();


export const AlertProvider = ({ children }) => {

    // functions, reducer
    const initialState = {
        message: null,
        alert: true,
    }

    const [state, dispatch] = useReducer(alertReducer, initialState);

    const handleAlert = () => {
        dispatch({

        })
    }


    return <AlertContext.Provider value={{
        // state, functions
        alert: state,
    }}>
        {children}
    </AlertContext.Provider>

}


export default AlertContext;
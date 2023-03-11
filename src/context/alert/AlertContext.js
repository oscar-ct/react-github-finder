import { createContext, useReducer } from "react";
import alertReducer from "./AlertReducer";


const AlertContext = createContext();


export const AlertProvider = ({ children }) => {

    // functions, reducer
    const initialState = {
        message: null,
        activeAlert: false,
    }

    const [state, dispatch] = useReducer(alertReducer, initialState);

    const setAlert = (message, type) => {
        dispatch({
            type: "SET_ALERT",
            payload: {message, type}
        });

        setTimeout(function() {
            dispatch({
                type: "REMOVE_ALERT"
            });
        }, 3000);
    }


    return <AlertContext.Provider value={{
        // state, functions
        activeAlert: state.activeAlert,
        message: state.message,
        setAlert,

    }}>
        {children}
    </AlertContext.Provider>

}


export default AlertContext;
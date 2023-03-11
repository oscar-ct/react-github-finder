

function alertReducer(state, action) {
    switch (action.type) {
        case "SET_ALERT":
            return {
                ...state,
                activeAlert: true,
                message: action.payload,
            }
        case "REMOVE_ALERT":
            return {
                ...state,
                activeAlert: false,
                message: null,
            }
        default:
            return state;

    }
}


export default alertReducer;
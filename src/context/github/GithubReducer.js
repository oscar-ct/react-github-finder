
function githubReducer (state, action) {

    switch (action.type) {
        case "GET_USERS":
            return {
                // ...state,
                ...state,
                users: action.payload,
                isLoading: false,
            }
        case "SET_LOADING":
            return {
                ...state,
                isLoading: true,
            }
        case "CLEAR_USERS":
            return {
                ...state,
                users: [],
                isLoading: false,
            }
        case "GET_USER":
            return {
                ...state,
                user: action.payload,
                isLoading: false,
            }
        case "GET_REPOS":
            return {
                ...state,
                repos: action.payload,
                isLoading: false,
            }
        case "GET_USER_AND_REPOS":
            return {
                ...state,
                repos: action.payload.repos,
                user: action.payload.user,
                isLoading: false,
            }
        default:
            return state;

    }
}

export default githubReducer;
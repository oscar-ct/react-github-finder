import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import githubReducer from "./GithubReducer"

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {

    // const [users, setUsers] = useState([]);
    // const [isLoading, setIsLoading] = useState(true)

    const initialState = {
        users: [],
        isLoading: false,
    }


    const [state, dispatch] = useReducer(githubReducer, initialState);

    // SETS isLoading to false from githubReducer
    const setIsLoading = () => {
        dispatch({
            type: "SET_LOADING"
        });
    }

    const clearUsers = () => {
        dispatch({
            type: "CLEAR_USERS",
        });

    }

    // const fetchUsers = async () => {
    //     setIsLoading();
    //     const response = await fetch(`${GITHUB_URL}/users`, {
    //         headers: {
    //             Authorization: `${GITHUB_TOKEN}`
    //         }
    //     });
    //     const data = await response.json();
    //
    //     // setUsers(data);
    //     // setIsLoading(false);
    //
    //     // SETS users as PAYLOAD to githubReducer
    //     dispatch({
    //         type: "GET_USERS",
    //         payload: data,
    //     });
    // }

    const fetchSearch = async (text) => {
        setIsLoading();
        // const params = new URLSearchParams({
        //     q: text
        // });
        const response = await fetch(`${GITHUB_URL}/search/users?q=${text}`, {
            headers: {
                Authorization: `${GITHUB_TOKEN}`
            }
        });
        const {items} = await response.json();
        dispatch({
            type: "GET_USERS",
            payload: items,
        });
    }

    return <GithubContext.Provider value={{
        users: state.users,
        isLoading: state.isLoading,
        fetchSearch,
        clearUsers,
    }}>
        {children}
    </GithubContext.Provider>
}

GithubProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default GithubContext;
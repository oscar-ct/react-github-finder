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
        user: {},
        isLoading: false,
        repos: [],
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




    const fetchUser = async (login) => {
        setIsLoading();
        const response = await fetch(`${GITHUB_URL}/users/${login}`, {
            headers: {
                Authorization: `${GITHUB_TOKEN}`
            }
        });

        if(response.status === 404) {
            window.location = "/notfound";
        } else {
            const data = await response.json();
            console.log(data);
            dispatch({
                type: "GET_USER",
                payload: data,
            });
        }
    }

    const fetchUserRepos = async (login) => {
        setIsLoading();
        const params = new URLSearchParams({
            sort: "created",
            per_page: 10,
        });
        const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
            headers: {
                Authorization: `${GITHUB_TOKEN}`
            }
        });

        if (response.status === 404) {
            window.location = "/notfound";
        } else {
            const data = await response.json();
            console.log(data);
            dispatch({
                type: "GET_REPOS",
                payload: data,
            });
        }
    }


    return <GithubContext.Provider value={{
        users: state.users,
        isLoading: state.isLoading,
        user: state.user,
        repos: state.repos,
        dispatch,
        clearUsers,
        fetchUser,
        fetchUserRepos,
    }}>
        {children}
    </GithubContext.Provider>
}

GithubProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default GithubContext;
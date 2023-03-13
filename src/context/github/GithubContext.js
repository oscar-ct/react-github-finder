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


    const fetchUserAndRepos = async (login) => {
        dispatch({
            type: "SET_LOADING"
        });
        const params = new URLSearchParams({
            sort: "created",
            per_page: 10,
        });
        const [repos, user] = await Promise.all([
            fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
                headers: {
                    Authorization: `${GITHUB_TOKEN}`
                }
            }),
            fetch(`${GITHUB_URL}/users/${login}`, {
                headers: {
                    Authorization: `${GITHUB_TOKEN}`
                }
            })
        ])
        if (user.status === 404 || repos.status === 404) {
            window.location = "/notfound";
        }
        const data = {user: await user.json(), repos: await repos.json()}
        console.log(data)
        dispatch({
            type: "GET_USER_AND_REPOS",
            payload: data,
        });
    }


    return <GithubContext.Provider value={{
        users: state.users,
        isLoading: state.isLoading,
        user: state.user,
        repos: state.repos,
        dispatch,
        fetchUserAndRepos,
    }}>
        {children}
    </GithubContext.Provider>
}

GithubProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default GithubContext;
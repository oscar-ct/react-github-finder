import {createContext, useState} from "react";
import PropTypes from "prop-types";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const fetchUsers2 = () => {
        fetch(`${GITHUB_URL}/users`, {
            headers: {
                Authorization: `${GITHUB_TOKEN}`
            }
        }).then(async data => {
            setUsers(await data.json());
            setIsLoading(false);
        });
    }

    return <GithubContext.Provider value={{
        users,
        isLoading,
        fetchUsers2
    }}>
        {children}
    </GithubContext.Provider>
}

GithubProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default GithubContext;
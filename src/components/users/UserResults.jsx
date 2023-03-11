import { useContext } from "react";

import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";
import GithubContext from "../../context/github/GithubContext";

const UserResults = () => {

    const { isLoading, users } = useContext(GithubContext);

    // This code was used for testing purposes
    // import { useEffect} from "react";
    // const { fetchUsers } = useContext(GithubContext);
    // useEffect(function () {
    //     fetchUsers();
    // }, []);

    if (!isLoading) {
        return (
            <div className="grid xs:grid-cols-2 sm:grid-cols-2 gap-2 xl:grid-cols-4 lg:grid-cols-3 md:grids-cols-2">
                {users.map(function(user) {
                    return <UserItem key={user.id} user={user}/>
                })}
            </div>
        );
    } else {
        return <Spinner/>
    }

};

export default UserResults;
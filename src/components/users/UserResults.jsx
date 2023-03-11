import {useEffect, useState} from "react";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";


const UserResults = () => {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true)


    useEffect(function () {
        fetchUsers2();
    }, []);

    // const fetchUsers = async () => {
    //     const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
    //         headers: {
    //             Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
    //         }
    //     });
    //     const data = await response.json();
    //     console.log(data);
    // }

    const fetchUsers2 = () => {
        fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
            headers: {
                Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
        }).then(async data => {
            setUsers(await data.json());
            setIsLoading(false);
        });
    }

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
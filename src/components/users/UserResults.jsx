import {useEffect, useState} from "react";


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
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grids-cols-2">
                {users.map(function(user) {
                    return <h3>{user.login}</h3>
                })}
            </div>
        );
    } else {
        return <h3>Loading</h3>
    }

};

export default UserResults;
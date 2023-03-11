import {useEffect, useContext} from "react";
import GithubContext from "../context/github/GithubContext";
import { useParams } from "react-router-dom";


const User = () => {

    const { fetchUser, user} = useContext(GithubContext);

    const params = useParams();

    useEffect(function (){
        fetchUser(params.login);
    }, [])


    return (
        <div>
            {user.login}
        </div>
    );
};

export default User;
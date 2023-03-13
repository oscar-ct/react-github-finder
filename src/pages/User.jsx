import {useEffect, useContext} from "react";
import GithubContext from "../context/github/GithubContext";
import {Link, useParams} from "react-router-dom";
import {FaCodepen, FaStore, FaUserFriends, FaUsers} from "react-icons/fa";
import Spinner from "../components/layout/Spinner";


const User = () => {

    const { fetchUser, user, isLoading} = useContext(GithubContext);

    const params = useParams();

    useEffect(function (){
        fetchUser(params.login);
    }, [])

    if (isLoading) {
        return <Spinner/>
    }

    const {name, type, avatar_url, location, bio, twitter_username, login, html_url, followers, following, public_repos, public_gists, hireable,} = user;

    return (
        <>
            <div className="w-full mx-auto lg:w10/12" >
                <div className="mb-4">
                    <Link to="/" className="btn btn-ghost">
                        Back To Search
                    </Link>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8">
                    <div className="custom-card-image mb-6 md:mb-0">
                        <div className="rounded-lg shadow-xl card image-full">
                            <figure>
                                <img src={avatar_url} alt="profile"/>
                            </figure>
                            <div className="card-body justify-end">
                                <div className="text-xl-3 font-bold mb-0">
                                    {name}
                                </div>
                                <p className="flex-grow-0">
                                    {login}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-2'>
                        <div className='mb-6'>
                            <h1 className='text-3-xl card-title'>
                                {name}
                                <div className='ml-2 mr-1 badge badge-success'>
                                    {type}
                                </div>
                                {/* this checks if hireable = true*/}
                            {hireable && (
                                <div className='mx-1 badge badge-info'>
                                    Hireable
                                </div>
                            )}
                            </h1>
                            <p>{bio}</p>
                            <mt-4 className="card-actions">
                                <a href={html_url} target="_blank" rel="noreferrer" className="btn btn-outline mt-4"> Visit Github Profile</a>

                            </mt-4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default User;
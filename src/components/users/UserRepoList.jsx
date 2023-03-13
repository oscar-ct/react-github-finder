import React from 'react';
import PropTypes from "prop-types";


const UserRepoList = ( {repos} ) => {
    return (
        <div className="rounded-lg shadow-lg card bg-base-200">
            <div className="card-body">
                <h2 className="text-3xl my-4 font-bold card-tile">
                    Latest Repositories
                </h2>
                {repos.map(function (repo){
                    return <h3>{repo.name}</h3>
                })}
            </div>
        </div>
    );
};

UserRepoList.propTypes = {
    repos: PropTypes.array.isRequired,
}

export default UserRepoList;
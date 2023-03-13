import React from 'react';
import {useState, useContext} from "react";
import GithubContext from "../../context/github/GithubContext";
import AlertContext from "../../context/alert/AlertContext";
import { fetchSearch } from "../../context/github/GithubActions";


const UserSearch = () => {

    const [text, setText] = useState("");

    // This context data is for the clear btn
    const { users, dispatch} = useContext(GithubContext);

    const { setAlert } = useContext(AlertContext);

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (text === "") {
            // using AlertContext here
            setAlert("Please enter something", "error")
        } else {
            dispatch({
                type: "SET_LOADING"
            });
            const data = await fetchSearch(text);
            setText("");
            dispatch({
                type: "GET_USERS",
                payload: data,
            });
        }
    }

    const handleClear = () => {
        dispatch({
            type: "CLEAR_USERS",
        });
    }

    const usersExist = () => {
        if (users.length > 0)
        return (
            <div>
                <button onClick={handleClear} className="btn btn-ghost btn-lg">
                    Clear
                </button>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 xl:grids-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <div className="relative">
                            <input
                                className="w-full pr-40 bg-gray-500 input input-lg text-white"
                                placeholder="Search"
                                value={text}
                                onChange={handleChange}
                            />
                            <button className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg">
                                Go
                            </button>
                        </div>
                    </div>

                </form>
            </div>
            {/* CLEAR button */}
            {usersExist()}
        </div>
    );
};

export default UserSearch;
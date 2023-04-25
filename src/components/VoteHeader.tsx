import React, {} from 'react';
import {Link} from "react-router-dom";

function VoteHeader(): JSX.Element {
    return (
        <div className={"bg-indigo-300 full p-4 flex items-center justify-center flex-col"}>
            <h1 className={"text-center text-white text-2xl"}>Who's funnier?</h1>
            <Link to={"/leaderboard"}><h1 className={"underline duration-300 hover:text-yellow-300 text-white text-2xl"}>View Leaderboard</h1>
            </Link>
        </div>
    )
}

export default VoteHeader;

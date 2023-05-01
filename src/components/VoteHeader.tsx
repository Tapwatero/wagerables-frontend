import React from 'react';
import VotePrompt from "./VotePrompt";
import {Link} from "react-router-dom";


function VoteHeader(): JSX.Element {
    return (
        <div className={"font-['Proxima_Nova'] border-b-white border-b-2 bg-sky-950 p-1.5 w-full flex items-center justify-center flex-col"}>
            <VotePrompt></VotePrompt>
            <Link to={"/leaderboard"}><h1 className={"font-['Proxima_Nova'] select-none underline duration-700 hover:text-indigo-200 text-white text-2xl"}>View Leaderboard</h1></Link>
        </div>
    )
}

export default VoteHeader;

import React from 'react';
import {Link} from "react-router-dom";

interface VoteHeaderProps {
    handleSkip: () => void
}

function VoteHeader(props: VoteHeaderProps): JSX.Element {
    return (
        <div className={"bg-indigo-300 full p-4 flex items-center justify-center flex-col"}>
            <h1 className={"text-center text-white text-2xl"}>Who's funnier?</h1>
            <div className={"flex flex-row gap-x-4"}>
                <Link to={"/leaderboard"}><h1 className={"select-none underline duration-300 hover:text-yellow-300 text-white text-2xl"}>View Leaderboard</h1>
                </Link>
                <h1 onClick={props.handleSkip} className={"select-none cursor-pointer underline duration-300 hover:text-blue-500 text-white text-2xl"}>Skip Matchup</h1>
            </div>
        </div>
    )
}

export default VoteHeader;

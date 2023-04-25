import React from "react";

interface LeaderboardHeaderProps {
    totalVotes: string
}


function LeaderboardHeader(props: LeaderboardHeaderProps): JSX.Element {
    return (
        <div>
            <h1 className={"text-2xl text-white text-center p-4 font-medium"}>Leaderboard - ({props.totalVotes} Votes)</h1>
        </div>
    )
}

export default LeaderboardHeader;

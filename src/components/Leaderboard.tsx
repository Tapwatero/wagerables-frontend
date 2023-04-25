import React, {useEffect, useState} from 'react';
import axios, {AxiosResponse} from "axios";
import LeaderboardHeader from "./LeaderboardHeader";



function Leaderboard(): JSX.Element {
    const [totalVotes, setTotalVotes] = useState<string>("0");
    const [leaderboard, setLeaderboard] = useState<string[][]>([[""]]);
    const [hasRendered, setHasRendered] = useState<boolean>(false);

    const fetchLeaderboard = () => {
        axios.get("https://rankings-tv51.onrender.com/rankings/leaderboard").then(function (response: AxiosResponse<string[][]>) {
            setTotalVotes(response.data[0][0])
            setLeaderboard(response.data.slice(1))
        });
    }

    useEffect(() => {
        if (!hasRendered) {
            fetchLeaderboard();
            setHasRendered(true);
        }
    }, [hasRendered]);

    useEffect(() => {

        setTimeout(() => {
            fetchLeaderboard();
        }, 2500)

    });


    const list = leaderboard.map((leaderboardPosition: string[], index: number) =>
        <ul className={"opacity-95 hover:bg-indigo-400 p-2 select-none hover:text-white duration-200 text-white text-center w-full text-center text-md md:text-2xl"} key={index}>{index + 1}. {leaderboardPosition[0]} ({leaderboardPosition[1]})</ul>
    );


    return (
            <div className={"select-none flex justify-center items-center h-screen min-h-fit w-screen pattern-rhombus pattern-sky-50 pattern-bg-indigo-400 pattern-size-8 pattern-opacity-40"}>
                <div className={"group py-0.5 scrollbar-hide overflow-y-scroll border-4 border-violet-200 flex-col bg-indigo-500 h-5/6 md:h-4/6 w-11/12 md:w-3/5 xl:w-2/5 rounded-2xl opacity-95"}>
                    <LeaderboardHeader totalVotes={totalVotes}></LeaderboardHeader>
                    <div className={"w-full grid grid-cols-1 gap-0 divide-y-2 border-y-2"}>
                        {list}
                    </div>
                </div>
        </div>

    )
}

export default Leaderboard;

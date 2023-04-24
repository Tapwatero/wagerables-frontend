import React, {useEffect, useState} from 'react';
import axios, {AxiosResponse} from "axios";
import {PropagateLoader, SkewLoader} from "react-spinners";

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


    const list = leaderboard.map((leaderboardPosition, index) =>
        <ul className={"select-none hover:opacity-100 opacity-80 duration-200 rounded-full text-white w-full text-center text-2xl"} key={index}>{index + 1}. {leaderboardPosition[0]} ({leaderboardPosition[1]})</ul>
    );


    return (
            <div className={"select-none flex justify-center items-center h-screen min-h-fit w-screen pattern-zigzag-3d pattern-blue-500 pattern-bg-white pattern-size-8 pattern-opacity-40"}>
                <div className={"p-4 flex-col bg-indigo-400 h-4/6 min-h-fit w-2/3 md:w-3/5 xl:w-2/5 rounded-3xl flex justify-center items-center opacity-90"}>
                    <h1 className={"text-center text-white text-3xl w-full"}>Rankings Leaderboard ({totalVotes} Votes)</h1>
                    <hr className="h-0.5 mt-2 bg-gray-200 w-full mb-4"></hr>
                    <div className={"h-5/6 min-h-fit w-full overflow-y-scroll rounded-xl flex justify-start items-center flex-col gap-y-2"}>
                        {list}
                    </div>
                </div>
        </div>

    )
}

export default Leaderboard;

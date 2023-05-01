import React, {useEffect, useState} from 'react';
import axios, {AxiosResponse} from "axios";
import {ClipLoader} from "react-spinners";
import FlipMove from "react-flip-move";


function Leaderboard(): JSX.Element {
    const [totalVotes, setTotalVotes] = useState<string>("0");
    const [leaderboard, setLeaderboard] = useState<string[][]>([[""]]);
    const [loading, setLoading] = useState<boolean>(true);


    const fetchLeaderboard = () => {
        axios.get("https://rankings-tv51.onrender.com/rankings/leaderboard").then(function (response: AxiosResponse<string[][]>) {
            setTotalVotes(response.data[0][0])
            setLeaderboard(response.data.slice(1))
            setTimeout(() => {
                setLoading(false);
            }, 325);
        });
    }

    useEffect(() => {
        if (loading) {
            fetchLeaderboard();
        }
    }, [loading, leaderboard]);



    useEffect(() => {

        setInterval(() => {
            fetchLeaderboard();
        }, 2500);

    }, []);

    const decorators: { [index: number]: string } = {
        0: "bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-orange-500 to-yellow-300",
        1: "bg-gradient-to-r from-gray-300 to-gray-400",
        2: "bg-gradient-to-r from-orange-300 to-amber-400"
    }

    const list = leaderboard.map((leaderboardPosition: string[], index: number) =>
        <tr className={`${index <= 2 ? decorators[index] + " text-xl text-white" : "text-gray-800 md:text-xl text-md"} drop-shadow-md hover:drop-shadow-lg drop-shadow-black/25 p-5 border-none cursor-pointer duration-300 min-h-4 rounded-md bg-white w-full grid grid-cols-3 justify-center items-center flex`}>
            <td key={index}
                className={"font-['Arial'] text-center opacity-95 select-none duration-200 text-center"}>{index + 1}</td>
            <td key={leaderboardPosition[0]}
                className={`${index <= 2 ? "opacity-100": ""}  w-full fex justify-center items-center font-['Arial'] text-center opacity-95 select-none duration-200`}>{leaderboardPosition[0]}
            </td>
            <td key={leaderboardPosition[1]}
                className={"font-['Arial'] text-center select-none duration-200 "}>{leaderboardPosition[1]}</td>
        </tr>
    );


    return (
        <div className={"h-screen overflow-scroll bg-slate-100"}>
            <div className={"flex justify-center items-center w-screen"}>
                {
                    !loading ? (
                        <div
                            className={"overflow-y-scroll scrollbar-hide w-full md:w-9/12 lg:w-7/12 p-4 flex flex-col justify-center items-center rounded-3xl"}>
                                <tr className={"p-3 border-none duration-300 rounded-md w-full grid grid-cols-3 justify-center items-center flex"}>
                                    <th className={"font-['Proxima_Nova'] font-medium text-center opacity-95 select-none duration-200 text-center text-md md:text-xl"}>{"Ranking"}</th>
                                    <th className={"font-['Proxima_Nova'] font-medium text-center opacity-95 select-none duration-200 text-gray-800 text-md md:text-xl"}>{"Name"}</th>
                                    <th className={"font-['Proxima_Nova'] font-medium text-center opacity-95 select-none duration-200 text-gray-800 text-md md:text-xl"}>{`Votes (${totalVotes})`}</th>
                                </tr>
                                <FlipMove className={"grid w-full border-y-white grid-rows-3 gap-y-4"}>{list}</FlipMove>
                        </div>
                    ) : (
                        <div className={"h-screen w-screen flex justify-center items-center"}>
                            <ClipLoader color={"#6495ED"} size={200}></ClipLoader>
                        </div>
                    )
                }

            </div>
        </div>

    )
}

export default Leaderboard;

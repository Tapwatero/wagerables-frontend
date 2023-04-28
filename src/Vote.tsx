import React, {useCallback, useEffect, useState} from 'react';
import VoteOption from "./components/VoteOption";
import axios, {AxiosResponse} from "axios";
import VoteHeader from "./components/VoteHeader";
import {ClipLoader} from "react-spinners";
import SkipButton from "./components/SkipButton";


function Vote(): JSX.Element {
    const [matchups, setMatchups] = useState<string[][]>();
    const [index, setIndex] = useState<number>(0);
    const [matchup, setMatchup] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const shuffleMatchups = (pMatchups: string[][]) => {
        // iterate backwards through the array
        for (let i = pMatchups.length - 1; i > 0; i--) {
            // pick a random index from 0 to i
            let j = Math.floor(Math.random() * (i + 1));
            // swap the current element with the random element
            [pMatchups[i], pMatchups[j]] = [pMatchups[j], pMatchups[i]];
        }
        return pMatchups;
    }

    const getMatchups = useCallback(() => {
        setLoading(false)
        axios.get("https://rankings-tv51.onrender.com/matchups/").then(function (response: AxiosResponse<string[][]>) {
            setMatchups(shuffleMatchups(response.data));
            setLoading(false);
            setIndex(0);
        });
    }, []);


    useEffect(() => {
        getMatchups();
    }, [getMatchups]);

    useEffect(() => {
        if (matchups) {
            setMatchup(matchups[index])
        }
    }, [index, matchups]);

    const handleVote = (id: number) => {
        setIndex(index + 1);

        if (matchups) {
            if (index >= (matchups?.length - 5)) {
                getMatchups();
            }
        }

        axios.post(`https://rankings-tv51.onrender.com/rankings/vote?name=${matchup[id]}`);
    }

    const handleSkip = () => {
        setIndex(index + 1);
    }


    return (
        loading ? (
            <div className={"flex flex-col md:flex-row items-center w-screen h-screen cursor-pointer duration-700"}>
                <div
                    className={`bg-rose-500 select-none hover:opacity-75 duration-300 h-1/2 w-full md:h-full md:w-1/2 flex items-center justify-center w-1/2 h-full`}>
                    <ClipLoader size={"100"} color={"white"}></ClipLoader>
                </div>
                <div
                    className={`bg-sky-500 select-none hover:opacity-75 duration-300 h-1/2 w-full md:h-full md:w-1/2 flex items-center justify-center w-1/2 h-full`}>
                    <ClipLoader size={"100"} color={"white"}></ClipLoader>
                </div>
            </div>
        ) : (
            <div className={"flex flex-col h-screen w-screen justify-center items-center"}>
                <VoteHeader></VoteHeader>
                <div className={"flex flex-col lg:flex-row items-center w-screen h-screen cursor-pointer duration-700"}>
                    <VoteOption id={0} handleVote={handleVote} matchup={matchup} colour={"bg-rose-500"}></VoteOption>
                    <SkipButton handleSkip={handleSkip}></SkipButton>
                    <VoteOption id={1} handleVote={handleVote} matchup={matchup} colour={"bg-sky-500"}></VoteOption>
                </div>
            </div>
        )
    );
}

export default Vote;

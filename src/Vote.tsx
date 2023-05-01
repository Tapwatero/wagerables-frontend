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
    const [loading, setLoading] = useState<boolean>(true);

    const shuffleMatchups = (pMatchups: string[][]) => {
        // iterate backwards through the array
        for (let i: number = pMatchups.length - 1; i > 0; i--) {
            // pick a random index from 0 to i
            let j: number = Math.floor(Math.random() * (i + 1));
            // swap the current element with the random element
            [pMatchups[i], pMatchups[j]] = [pMatchups[j], pMatchups[i]];
        }
        return pMatchups;
    }

    const getMatchups = useCallback(() => {
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
            <div className={"h-screen w-screen flex justify-center items-center"}>
                <ClipLoader color={"#6495ED"} size={200}></ClipLoader>
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

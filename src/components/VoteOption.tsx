import React, {useState} from 'react';
import Ripples from 'react-ripples'

interface VoteOptionProps {
    id: number
    matchup: String[]
    handleVote: (id: number) => void
    colour: String
}

function VoteOption(props: VoteOptionProps): JSX.Element {
    const [clicked, setClicked] = useState<boolean>(false);

    const handleClick = () => {
        if (clicked) {
            return
        }

        setClicked(true);

        props.handleVote(props.id);

        setTimeout(() => {
            setClicked(false);
        }, 10);
    }

    return (
        <Ripples onClick={handleClick} during={1200} className={`${props.colour} select-none text-center  hover:opacity-75 duration-300  hover:text-5xl h-1/2 w-full md:h-full md:w-1/2 flex items-center justify-center w-1/2 h-full text-4xl text-white`}>{props.matchup[props.id]}
        </Ripples>
    );
}

export default VoteOption;

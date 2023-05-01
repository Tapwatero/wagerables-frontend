import React, {useState} from 'react';
import Ripples from 'react-ripples'

interface VoteOptionProps {
    id: number
    matchup: string[]
    handleVote: (id: number) => void
    colour: string
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
        }, 500);
    }

    return (
        <Ripples onClick={handleClick} during={1200} className={`${props.colour} font-['Proxima_Nova'] select-none text-center hover:opacity-75 duration-300 lg:w-1/2 lg:h-full  w-full h-full md:text-4xl flex items-center justify-center h-full text-3xl text-white`}>{props.matchup[props.id]}
        </Ripples>
    );
}

export default VoteOption;

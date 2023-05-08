import Ripples from 'react-ripples'
import React from "react";

interface NewWagerButtonProps {
    handleOpen: () => void;
}


function CreateWagerButton(props: NewWagerButtonProps) {

    return (
        <div className={"select-none flex justify-center items-center"}>
            <Ripples className={"h-full w-full"} onClick={props.handleOpen}>
                <div className={"px-12 py-3 hover:opacity-75 duration-300 cursor-pointer rounded-lg font-['Proxima_Nova'] flex justify-center items-center bg-emerald-600 text-white text-2xl border-2"}>Levy Wager</div>
            </Ripples>
        </div>
    )

}

export default CreateWagerButton;

import React from "react";
import Ripples from "react-ripples";

function CreatePollButton() {

    return (
        <Ripples during={2500} color={"#F88379"}  className={"min-w-fit duration-300 border-2 border-white hover:border-rose-300 rounded-xl drop-shadow-rose-500 hover:drop-shadow-2xl drop-shadow-xl"}>
        <div className={"select-none cursor-pointer rounded-xl bg-white py-2 px-10"}>
            <h1 className={"text-center text-lg font-normal font-['Arial']"}>Create Poll</h1>
        </div>
        </Ripples>
    )

}

export default CreatePollButton;

import React from "react";
import {TypeAnimation} from "react-type-animation";

function VotePrompt() {

    return (
        <TypeAnimation
            sequence={[
                'Current Vote - Funniest Person',
                1000,
            ]}
            speed={25}
            className={"text-2xl p-3 text-center text-white font-roboto"}
            repeat={Infinity}>

        </TypeAnimation>
    )

}

export default VotePrompt;

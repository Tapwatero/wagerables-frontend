import Ripples from 'react-ripples'
import React, {useContext, useState} from "react";
import {ClipLoader} from "react-spinners";
import {useAuth0} from "@auth0/auth0-react";
import axios, {AxiosResponse} from "axios";
import {toast} from "react-hot-toast";
import WagerContext from "./WagerContext";

interface ClaimWagerButtonProps {
    wagerID: number,
}


function ClaimWagerButton(props: ClaimWagerButtonProps) {
    const [isClaiming, setClaiming] = useState<boolean>(false);
    const {fetchWagers} = useContext(WagerContext);
    const {user} = useAuth0();

    const data = {
        wager_id: props.wagerID,
        acceptor: { name: user?.name, uid: user?.sub },
    }


    const claimWager = () => {
        setClaiming(true);

        axios.post(`https://wagerables.onrender.com/api/wagers/claim`, data).then(function (response: AxiosResponse<AxiosResponse>) {
            setClaiming(false);
            toast.success(`${(response.data)}`);
            fetchWagers();
        }).catch(err => {
            setClaiming(false);
            console.log(err);
            toast.error(err.response !== undefined ? err.response.data : "Failed to claim wager");
            fetchWagers();
        });
    }



    return (
        <Ripples className={"rounded-md"}>
            <button onClick={claimWager} disabled={isClaiming} className={"duration-300 font-['Proxima_Nova'] hover:rounded-lg hover:bg-emerald-400  bg-emerald-500 text-white text-md flex px-10 py-2 justify-center items-center"}>{!isClaiming ? "Claim" : <ClipLoader size={25} color={"white"}></ClipLoader>}</button>
        </Ripples>
    );

}

export default ClaimWagerButton;

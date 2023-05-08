import React, {Fragment, useEffect, useState} from 'react';
import axios, {AxiosResponse} from "axios";
import {ClipLoader} from "react-spinners";
import Wager, {IParticipants} from "./Wager";
import {Toaster} from "react-hot-toast";
import CreateWagerModal from "./CreateWagerModal";
import WagerContext from "./WagerContext";
import Menu from "./Sidebar";
import {useAuth0} from "@auth0/auth0-react";
import {useNavigate} from "react-router-dom";
import Sidebar from "./Sidebar";
import CreateWagerButton from "./CreateWagerButton";


export interface IWager {
    id: number,
    statement: string,
    expires: string,
    stake: number,
    votes: number,
    participants: IParticipants,
}


function Marketplace() {
    const [loading, setLoading] = useState<boolean>(true);
    const [wagers, setWagers] = useState<IWager[]>([]);
    const navigate = useNavigate();
    const {isAuthenticated} = useAuth0();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const fetchWagers = () => {
        axios.get("https://wagerables.onrender.com/api/wagers/unclaimed").then(function (response: AxiosResponse<IWager[]>) {

            const data: IWager[] = response.data;
            setWagers(data);


            setTimeout(() => {
                setLoading(false);
            }, 750);

        }).catch(err => {
            console.log(`Error: ${err}`);
        });
    }


    useEffect(() => {
        fetchWagers();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchWagers();
        }, 2500);
        return () => {
            clearInterval(interval);
        }
    }, []);







    const unclaimedWagers = wagers.map((wager) => <Wager key={wager.id} wagerID={wager.id} statement={wager.statement} expires={wager.expires} stake={wager.stake} participants={wager.participants}></Wager>);


    return (
        <div className={"h-screen w-screen"}>
            <div className={"h-fit min-h-screen  bg-slate-900 flex justify-center items-start"}>
                <Toaster containerStyle={{fontFamily: "Proxima Nova"}} position="top-center" reverseOrder={false}/>

                <Sidebar></Sidebar>

                {!loading ? (
                    <Fragment>
                        <div className={"m-8 w-11/12 flex-col flex justify-center items-center"}>
                            <div className={"grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8"}><WagerContext.Provider value={{wagers: wagers, fetchWagers: fetchWagers, loading: loading}}>{unclaimedWagers}</WagerContext.Provider></div>
                        </div>
                    </Fragment>
                    ) :
                    <div className={"h-screen w-full flex justify-center items-center"}>
                        <ClipLoader size={175} color={"white"}></ClipLoader>
                    </div>
                }

            </div>
        </div>
    )
}

export default Marketplace;

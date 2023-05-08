import Sidebar from "./Sidebar";
import React, {Fragment, useCallback, useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {useNavigate} from "react-router-dom";
import axios, {AxiosResponse} from "axios";
import {IWager} from "./Marketplace";
import Wager from "./Wager";

function Marketplace() {
    const {user, isAuthenticated} = useAuth0();
    const [activeWagers, setActiveWagers] = useState<IWager[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const fetchActiveWagers = useCallback(() => {
            axios.get(`https://wagerables.onrender.com/api/users/${user?.sub}/claimed`).then(function (response: AxiosResponse<IWager[]>) {

                const data: IWager[] = response.data;


                setActiveWagers(data);
            });
        }, [user?.sub])

    useEffect(() => {
        fetchActiveWagers();
    }, [fetchActiveWagers])

    const activeWagersList = activeWagers.map((wager) => <Wager key={wager.id} wagerID={wager.id}
                                                                statement={wager.statement} expires={wager.expires}
                                                                stake={wager.stake}
                                                                participants={wager.participants}></Wager>);

    return (

        <Fragment>
            <div className={"flex flex-row h-screen w-screen"}>
                <Sidebar></Sidebar>
                <div className={"flex-col flex justify-start items-center h-full w-full bg-slate-900"}>
                    <h1 className={"font-['Questrial'] z-50 text-white text-3xl"}>{user?.nickname}'s Active Bets</h1>
                    <div className={"m-8 w-11/12 flex-col flex justify-center items-center"}>
                        <div
                            className={"grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8"}>{activeWagersList}</div>
                    </div>
                </div>
            </div>
        </Fragment>

    )
}

export default Marketplace;

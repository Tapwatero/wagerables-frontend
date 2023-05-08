import dayjs from "dayjs";
import {Form, Modal} from "antd";
import React, {Fragment, useState} from "react";
import ArchiveWagerButton from "./ArchiveWagerButton";
import ClaimWagerButton from "./ClaimWagerButton";
import {useAuth0} from "@auth0/auth0-react";


export interface IParticipants {
    initiator: { name: String, uid: String }
    acceptor: { name: String, uid: String }
}

interface WagerProps {
    wagerID: number,
    statement: string,
    expires: string,
    stake: number,
    participants: IParticipants
}


function Wager(props: WagerProps) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const {user} = useAuth0();

    const handleClose = () => {
        setIsModalOpen(false);
    };


    const handleOpen = () => {
        setIsModalOpen(true);
    };


    return (
        <Fragment>
            <div onClick={handleOpen} className={"gap-4 grid grid-rows-3 p-5 select-none cursor-pointer capitalize font-['Proxima_Nova'] text-white text-center rounded-md bg-gray-900 duration-300 border-2 border-slate-800 hover:border-slate-500 hover:border-2 hover:bg-gray-800"}>

                <h1 className={"overflow-hidden font-semibold flex justify-center max-h-14 text-ellipsis text-md md:text-lg"}>{props.statement}</h1>
                <div>
                    <h2 className={"font-medium text-lg"}>Stake: {props.stake} 🪙</h2>
                    <h2 className={"font-medium text-lg"}>Expires: {dayjs(props.expires).diff(dayjs(), 'days')} Days {Math.abs(dayjs(props.expires).diff(dayjs(), 'days') * 24 - dayjs(props.expires).diff(dayjs(), 'hours'))} Hours</h2>
                </div>

            </div>

            <Fragment>
                <Modal footer={<Fragment></Fragment>} destroyOnClose={true}
                       open={isModalOpen} onOk={handleClose} onCancel={() => handleClose()}>


                    <Form
                        name="basic"
                        layout={"vertical"}
                        className={"p-0"}
                        autoComplete="off">

                        <Form.Item>
                            <h1 className={"font-['Proxima_Nova'] text-xl font-semibold"}>Claim - <span className={"capitalize font-medium text-lg"}>{props.statement}</span></h1>
                            <h1 className={"font-['Proxima_Nova'] text-xl font-semibold"}>Stake - <span className={"capitalize font-medium text-lg"}>{props.stake} 🪙</span></h1>
                            <h1 className={"font-['Proxima_Nova'] text-xl font-semibold"}>Expires - <span className={"capitalize font-medium text-lg"}>{dayjs(props.expires).toDate().toLocaleString()}</span></h1>
                            <h1 className={"font-['Proxima_Nova'] text-xl font-semibold"}>Initiator - <a href={`/users/${props.participants.initiator.uid}`} className={"capitalize font-medium text-lg text-indigo-400"}>{props.participants.initiator.name}</a></h1>
                            {props.participants.acceptor.name.length > 1 ? <h1 className={"font-['Proxima_Nova'] text-xl font-semibold"}>Acceptor - <a href={`/users/${props.participants.acceptor.uid}`} className={"capitalize font-medium text-lg text-indigo-400"}>{props.participants.acceptor.name}</a></h1> : ""}
                        </Form.Item>

                        <div className={"flex flex-row gap-4"}>
                            {!(user?.sub === props.participants.initiator.uid) && props.participants.acceptor.uid.length === 0 ? <ClaimWagerButton wagerID={props.wagerID}></ClaimWagerButton> : ""}
                            {user?.sub === props.participants.initiator.uid ? <ArchiveWagerButton wagerID={props.wagerID} handleClose={handleClose}/> : ""}
                        </div>
                    </Form>


                </Modal>

            </Fragment>
        </Fragment>
    )

}

export default Wager;

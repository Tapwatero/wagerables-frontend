import Ripples from 'react-ripples'
import React, {useContext, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {toast} from "react-hot-toast";
import WagerContext from "./WagerContext";
import {ClipLoader} from "react-spinners";

interface DeleteWagerButtonProps {
    wagerID: number,
    handleClose: () => void,
}


function ArchiveWagerButton(props: DeleteWagerButtonProps) {
    const [isDeleting, setDeleting] = useState<boolean>(false);
    const {fetchWagers} = useContext(WagerContext);


    const deleteWager = () => {
        setDeleting(true);
        const data = {
            id: props.wagerID,
        }

        axios.post(`https://wagerables.onrender.com/api/wagers/archive`, data).then(function (response: AxiosResponse<AxiosResponse>) {
            setDeleting(false)
            toast.success(`${(response.data)}`);
            fetchWagers();
        }).catch(err => {
            console.log(err);
            toast.error(err.response !== undefined ? err.response.data : "Failed to archive wager");
            props.handleClose();
            fetchWagers();
        });
    }


    return (
        <Ripples onClick={deleteWager} className={"rounded-md"}>
            <button disabled={isDeleting} className={"duration-300 font-['Proxima_Nova'] hover:rounded-lg hover:bg-red-400  bg-red-500 text-white text-md flex px-10 py-2 justify-center items-center"}>{!isDeleting ? "Archive" : <ClipLoader size={25} color={"white"}></ClipLoader>}</button>
        </Ripples>
    );

}

export default ArchiveWagerButton;

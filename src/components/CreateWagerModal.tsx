import {Button, DatePicker, Form, Input, InputNumber, Modal} from "antd";
import dayjs from "dayjs";
import {ClipLoader} from "react-spinners";
import React, {useState} from "react";
import {RangePickerProps} from "antd/es/date-picker";
import axios, {AxiosResponse} from "axios";
import {toast} from "react-hot-toast";
import {useAuth0} from "@auth0/auth0-react";

const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current < dayjs().endOf('day');
};



interface CreateWagerModalProps {

    isModalOpen: boolean;
    fetchWagers: () => void;
    handleOpen: () => void;
    handleClose: () => void;
}

const CreateWagerModal = (props: CreateWagerModalProps) => {
    const [isWagerCreating, setWagerCreating] = useState<boolean>(false);
    const {user} = useAuth0();


    const onFinish = (values: { statement: string, stake: number, expires: Date }) => {
        setWagerCreating(true);

        console.log(user?.sub);

        const data = {
            statement: values.statement,
            stake: values.stake,
            expires: values.expires.toISOString(),
            initiator: user?.sub,
            participants: {initiator: {name: user?.nickname, uid: user?.sub}, acceptor: {name: "", uid: ""}}
        }

        axios.post(`https://wagerables.onrender.com/api/wagers/create`, data).then(function (response: AxiosResponse<AxiosResponse>) {
            setWagerCreating(false);
            props.handleClose();
            toast.success(`${(response.data)}`);
            props.fetchWagers();
        }).catch(err => {
            console.log(err);
            setWagerCreating(false);
            props.handleClose();
            toast.error(`${(err.data)}`);
            props.fetchWagers();
        });
    };

    return (
        <Modal footer={[]} destroyOnClose={true} title="Create Wager"
               okButtonProps={{style: {backgroundColor: '#6495ED'}}}
               open={props.isModalOpen} okText={"Create"} onCancel={props.handleClose}>


            <Form
                name="basic"
                layout={"vertical"}
                onFinish={onFinish}
                initialValues={{expires: dayjs().add(1, 'day'), stake: 5}}
                className={"p-0"}
                autoComplete="off">

                <Form.Item
                    label="Statement"
                    name="statement"
                    rules={[{required: true, message: '', max: 45, min: 10}]}>
                    <Input size={"large"}/>
                </Form.Item>

                <Form.Item
                    label="Stake"
                    name="stake"
                    rules={[{required: true, message: ''}]}>
                    <InputNumber className={"w-fit"} size={"large"}/>
                </Form.Item>

                <Form.Item
                    label="Expiry Date"
                    name="expires"
                    rules={[{required: true, message: ''}]}>

                    <DatePicker disabledDate={disabledDate}
                                size={"large"}></DatePicker>
                </Form.Item>


                <Form.Item className={"h-full pt-2"}>
                    <Button disabled={isWagerCreating} className={"bg-blue-400 text-lg flex px-12 py-5 justify-center items-center"}
                            type="primary" htmlType="submit">{isWagerCreating ? <ClipLoader color={"white"}></ClipLoader> : "Create"}</Button>
                </Form.Item>

            </Form>
        </Modal>
    )
}

export default CreateWagerModal;

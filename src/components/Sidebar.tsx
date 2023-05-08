import React, {Fragment, useContext} from 'react';
import type {MenuProps} from 'antd';
import {Menu} from 'antd';
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import CreateWagerModal from "./CreateWagerModal";
import WagerContext from "./WagerContext";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuProps['items'] = [
    getItem('🪙 Create Wager', 'new-wager'),
    getItem('🎲 Active Wagers', 'dashboard'),
    getItem('🎰 Wager Marketplace', 'marketplace'),
    getItem('🚫 Logout', 'logout'),
]

const Sidebar: React.FC = () => {
    const {logout} = useAuth0();
    const navigate = useNavigate();
    const location = useLocation();
    const context = useContext(WagerContext);
    const [isModalOpen, setIsModalOpen] = React.useState(false);





    //TODO --- Prevent Select For Creating Modals ---



    // const handleSelect: MenuProps['onSelect'] = (event) => {
    //     if (event.key === 'new-wager') {
    //         event.domEvent.preventDefault();
    //         event.domEvent.stopPropagation();
    //     }
    // }




    // --- Special Handling For Non-Page Options ---
    const onClick: MenuProps['onClick'] = (e) => {

        if (e.key.includes("new-wager")) {
            handleOpen();
            return;
        }

        if (e.key.includes("logout")) {
            logout();
            return;
        }

        navigate(`/${e.key}`);
    };

    // --- Creation Modal Handling ---

    const handleClose = () => {
        setIsModalOpen(false);
    };


    const handleOpen = () => {
        setIsModalOpen(true);
    };


    return (
        <Fragment>
            <Menu
                onClick={onClick}
                className={"duration-300 font-['Proxima_Nova'] text-lg w-3/6 lg:w-3/6 xl:w-3/12 h-screen text-white"}
                defaultSelectedKeys={[location.pathname.slice(1)]}
                theme={"dark"}
                mode="vertical"
                title={"test"}
                items={items}>
            </Menu>
            <CreateWagerModal isModalOpen={isModalOpen} handleOpen={handleOpen} handleClose={handleClose}
                              fetchWagers={context.fetchWagers}></CreateWagerModal>
        </Fragment>
    );
};

export default Sidebar;

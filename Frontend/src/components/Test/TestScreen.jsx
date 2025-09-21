import { useState } from 'react';
import axios from 'axios';


import { Menu, MenuButton, MenuItem, SubMenu } from '@szhsin/react-menu';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Navigate } from 'react-router-dom';

const Test = () => {
    const [isPresent, setisPresent] = useState(false);

    const handleClick = async () => {
        try {
            const res = await axios.get("user/validaterole", {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
                }
            });
            console.log(res); // You can access the actual role here
        } catch (error) {
            console.error("Role validation failed:", error.response?.data || error.message);
        }

    }

    return (
        <>
            <button onClick={() => { handleClick() }}>Test</button>
        </>
    )
}

export default Test;
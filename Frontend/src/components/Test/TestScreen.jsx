import { useState } from 'react';


import { Menu, MenuButton, MenuItem, SubMenu } from '@szhsin/react-menu';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Test = () => {
    const [isPresent, setisPresent] = useState(false);


    return (
        <>

            <Popup trigger={<button className="border rounded-sm m-5 p-5"> Open Popup </button>} position="right center">
                <div>Popup content here!</div>
            </Popup>

            <Menu menuButton={<MenuButton> Open Menu </MenuButton>}>
                <MenuItem className="menu"> New File </MenuItem>
                <MenuItem> Save </MenuItem>
                <SubMenu label="Edit">
                    <MenuItem> Cut </MenuItem>
                    <MenuItem onClick={() => console.log("Copy")}> Copy </MenuItem>
                    <MenuItem onClick={() => console.log("Paste")}> Paste </MenuItem>
                </SubMenu>
                <MenuItem> Print... </MenuItem>
            </Menu>

            <details>
                <summary>Hello</summary>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                        </tr>
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </details>

        </>
    )
}

export default Test;
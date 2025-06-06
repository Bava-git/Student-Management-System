import react, { useState } from 'react';
import AccountEnquiry from './AccountEnquiry'

const Admin = () => {

    const items = ["Account Enquiry"];
    const [linkContent, setLinkContent] = useState();

    const handleClick = (content) => {
        switch (content) {
            case "Account Enquiry":
                setLinkContent(<AccountEnquiry />);
                break;

            default:
                break;
        }
    };


    return (
        <div className="adminDivs">
            <div className="adminactionlist">
                <div className='adminactionlist-field'>
                    {items.map((item, index) => (
                        <a key={index} href="#" onClick={() => { handleClick(item) }} className='adminactionlist-field-item'>{item}</a>
                    ))}
                </div>
            </div>
            <div className='adminOutDisplay'>
                {linkContent}
            </div>
        </div>
    )
}

export default Admin;
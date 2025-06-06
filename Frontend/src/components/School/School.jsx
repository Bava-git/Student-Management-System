import { useState } from 'react';
import { AttendanceForm, AttendanceList } from '../Student/AttendanceEnquiry';
import Exam_Schedulle from './Exam_Schedulle';
import Leave_Management from './Leave_Management';

const School = () => {

    const items = ["Exam Schedulle", "Leave Management", "Attendance List", "Attendance Form"];
    const [linkContent, setLinkContent] = useState();

    const handleClick = (content) => {
        switch (content) {
            case "Exam Schedulle":
                setLinkContent(<Exam_Schedulle />);
                break;
            case "Leave Management":
                setLinkContent(<Leave_Management />);
                break;
            case "Attendance List":
                setLinkContent(<AttendanceList />);
                break;
            case "Attendance Form":
                setLinkContent(<AttendanceForm />);
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

export default School;
import react, { useState } from 'react';
import { StudentAdd } from './StudentAdmitionForm'
import { StudentOverAllView } from './StudentOverAll'
import { UpcomingAssessments, UpcomingExams } from './UpcomingEvents';

const Admin = () => {

    const items = ["New  Student", "Student Over All View", "Upcoming Exams", "Upcoming Assessments"];
    const [linkContent, setLinkContent] = useState();

    const handleClick = (content) => {
        switch (content) {
            case "New  Student":
                setLinkContent(<StudentAdd />);
                break;
            case "Student Over All View":
                setLinkContent(<StudentOverAllView />);
                break;
            case "Upcoming Exams":
                setLinkContent(<UpcomingExams />);
                break;
            case "Upcoming Assessments":
                setLinkContent(<UpcomingAssessments />);
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
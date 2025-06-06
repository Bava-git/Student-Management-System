import react, { useState } from 'react';
import { TeacherAdd, TeacherList } from './TeacherDash';
import { AssessmentForm, AssessmentSubmittedList } from './AssessmentForm';
import ExamList from '../ExamList';

const Admin = () => {

    const items = ["New  Teacher", "Teacher List", "Assessment Form", "Exam List"];
    const [linkContent, setLinkContent] = useState();

    const handleClick = (content) => {
        switch (content) {
            case "New  Teacher":
                setLinkContent(<TeacherAdd />);
                break;
            case "Teacher List":
                setLinkContent(<TeacherList />);
                break;
            case "Assessment Form":
                setLinkContent(<AssessmentForm />);
                break;
            case "Exam List":
                setLinkContent(<ExamList />);
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
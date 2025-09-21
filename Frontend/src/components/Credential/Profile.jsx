import { useEffect, useState } from 'react';
import * as ApiHub from '../../utilities/ApiHub';

const StudentProfile = () => {

    const [Student, setStudent] = useState({});
    const userId = sessionStorage.getItem("Id");

    useEffect(() => {
        ApiHub.GetOneById("student/search", userId).then((data) => {
            setStudent(data);
        });
    }, [])

    return (
        <div className="profilecontainer">
            <div className="profilepage">
                <h4>Profile</h4>
                <div className='profilepersonal-field'>
                    <p>ID</p>
                    <p>{Student.student_id}</p>
                </div>
                <div className='profilepersonal-field'>
                    <p>Name</p>
                    <p>{Student.student_name}</p>
                </div>
                <div className='profilepersonal-field'>
                    <p>Grade</p>
                    <p>{Student.student_level}</p>
                </div>
                <div className='profilepersonal-field'>
                    <p>Father Name</p>
                    <p>{Student.student_fathername}</p>
                </div>
                <div className='profilepersonal-field'>
                    <p>Mother Name</p>
                    <p>{Student.student_mothername}</p>
                </div>
                <div className='profilepersonal-field'>
                    <p>Parent Mobile</p>
                    <p>{Student.student_parentphone}</p>
                </div>
                <div className='profilepersonal-field'>
                    <p>Parent Email</p>
                    <p>{Student.student_parentemail}</p>
                </div>
            </div>
        </div>
    )
}

const TeacherProfile = () => {

    const [Teacher, setTeacher] = useState({});
    const userId = sessionStorage.getItem("Id");

    useEffect(() => {
        ApiHub.GetOneById("teacher/search", userId).then((data) => {
            setTeacher(data);
        });
    }, [])

    return (
        <div className="profilecontainer">
            <div className="profilepage">
                <div className='profilepersonal'>
                    <h4 className='profilepersonal-title'>Profile</h4>
                    <div className='profilepersonal-field'>
                        <p>ID</p>
                        <p>{Teacher.teacher_id}</p>
                    </div>
                    <div className='profilepersonal-field'>
                        <p>Name</p>
                        <p>{Teacher.teacher_name}</p>
                    </div>
                    <div className='profilepersonal-field'>
                        <p>Gender</p>
                        <p>{Teacher.teacher_gender}</p>
                    </div>
                    <div className='profilepersonal-field'>
                        <p>Mobile</p>
                        <p>{Teacher.teacher_phone_num}</p>
                    </div>
                    <div className='profilepersonal-field'>
                        <p>Email</p>
                        <p>{Teacher.teacher_email}</p>
                    </div>
                    <div className='profilepersonal-field'>
                        <p>Subject</p>
                        <p>{Teacher.teacher_subject}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { StudentProfile, TeacherProfile };


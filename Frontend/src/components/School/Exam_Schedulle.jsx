import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import * as ApiHub from '../../utilities/ApiHub';
import * as SharedUtilities from '../../utilities/SharedUtilities';
import * as importData from '../../utilities/DataMembers';

const Exam_Schedulle = () => {

    const [exam_ID, setexam_ID] = useState("");
    const [exam_type, setexam_type] = useState('');
    const [exam_date, setexam_date] = useState("");
    const [exam_subjectcode, setexam_subjectcode] = useState("EXM" + Math.floor(10000 + Math.random() * 90000));
    const [exam_grade, setexam_grade] = useState("");
    const [exam_time, setexam_time] = useState("");
    const [exam_subjectname, setexam_subjectname] = useState("");
    const [ExamTableData, setExamTableData] = useState([]);
    const [ActiveScreen, setActiveScreen] = useState(null);
    const InsertformRef = React.useRef(null);
    const DeleteformRef = React.useRef(null);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {

        ApiHub.GetAll("school/examschedule").then((data) => {
            CreateTable(data);
        });

    }

    const CreateTable = (data) => {

        data = SharedUtilities.safeSort(data, "exam_date");
        const LocalArr = [];
        data.map((element, index) => {
            LocalArr.push(
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{element.examId}</td>
                    <td>{element.exam_type}</td>
                    <td>{format(element.exam_date, "dd-MM-yyyy")}</td>
                    <td>{element.exam_time}</td>
                    <td>{element.exam_grade}</td>
                    <td>{element.exam_subjectcode}</td>
                    <td>{element.exam_subjectname}</td>
                </tr>
            );
        })
        setExamTableData(LocalArr);
    }

    const handleAdd = (event) => {
        event.preventDefault();

        const sendData = {
            examId: Math.floor(10000 + Math.random() * 90000),
            exam_date,
            exam_time,
            exam_grade,
            exam_subjectcode,
            exam_subjectname,
            exam_type
        };

        // console.log(sendData);

        const hasErrors = Object.keys(sendData).some((key) => sendData[key] === "");
        if (hasErrors) {
            toast.error("Please fill the form correctly", { duration: 2000 });
            return;
        }

        ApiHub.Save("school/examschedule/add", sendData).then((status) => {
            if (status === 200) {
                toast.success("Added Successfully", { duration: 2000 });
                setexam_subjectcode("EXM" + Math.floor(10000 + Math.random() * 90000));
                fetchData();
            }
        });

    }

    const handleDelete = (event) => {
        event.preventDefault();

        ApiHub.Delete("school/examschedule", exam_ID).then((status) => {
            if (status === 200) {
                toast.error("Deleted Successfully", { duration: 2000 });
                fetchData();
            }
        });

    }

    const resetFormElements = () => {
        fetchData();
        setexam_type("");
        setexam_date("");
        setexam_time("");
        setexam_grade("");
        setexam_subjectcode("EXM" + Math.floor(10000 + Math.random() * 90000));
        setexam_subjectname("");
    }

    return (
        <div className="leavemanagement">
            <div className="leavemanagement-table">
                <div className="leavemanagement-table-titleDiv">
                    <div>
                        <h1 className='leavemanagement-table-title'>Exam Schedule</h1>
                    </div>
                    <div className='leavemanagement-actionBn-div'>
                        <button className='leavemanagement-actionBn' onClick={() => { setActiveScreen("addscreen") }}>Add</button>
                        <button className='leavemanagement-actionBn' onClick={() => setActiveScreen("deletescreen")}>Delete</button>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Exam ID</th>
                            <th>Exam Type</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Grade</th>
                            <th>Subject Code</th>
                            <th>Subject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ExamTableData}
                    </tbody>
                </table>
            </div>
            {ActiveScreen === "addscreen" && (<div className="leavemanagement-add">
                <h1 className='leavemanagement-table-title'>Add Exam Schedule</h1>
                <form action="" ref={InsertformRef}>
                    <div className="leavemanagement-add-field">
                        <label htmlFor="exam_type">Exam Type: </label>
                        <select name="exam_type" id="exam_type" onChange={(e) => { setexam_type(e.target.value) }}>
                            <option value="">-- Choose a exam --</option>
                            {importData.exams.map((exam) => (
                                <option key={exam} value={exam}>{exam}</option>
                            ))}
                        </select>
                    </div>
                    <div className="leavemanagement-add-field">
                        <label htmlFor="sujectcode">Subject Code: </label>
                        <input type="text" name="sujectcode" id="sujectcode"
                            value={exam_subjectcode}
                            onChange={(e) => { setexam_subjectcode(e.target.value) }}
                        />
                    </div>
                    <div className="leavemanagement-add-field">
                        <label htmlFor="leavedate">Exam Date: </label>
                        <input type="date" name="leavedate" id="leavedate"
                            onChange={(e) => { setexam_date(e.target.value) }}
                        />
                    </div>
                    <div className="leavemanagement-add-field">
                        <label htmlFor="leavedate">Exam Time: </label>
                        <input type="time" name="leavedate" id="leavedate"
                            onChange={(e) => { setexam_time(e.target.value) }}
                        />
                    </div>
                    <div className="leavemanagement-add-field">
                        <label htmlFor="grade">Grade: </label>
                        <select name="grade" id="grade" onChange={(e) => { setexam_grade(e.target.value) }}>
                            <option value="">-- Choose a grade --</option>
                            {importData.grades.map((grade) => (
                                <option key={grade} value={grade}>{grade}</option>
                            ))}
                        </select>
                    </div>
                    <div className="leavemanagement-add-field">
                        <label htmlFor="subjectname">Subject Name: </label>
                        <select name="subjectname" id="subjectname" onChange={(e) => { setexam_subjectname(e.target.value) }}>
                            <option value="">-- Choose a subject --</option>
                            {importData.subjects.map((subject) => (
                                <option key={subject} value={subject}>{subject}</option>
                            ))}
                        </select>
                    </div>
                    <div className="leavemanagement-add-BnDiv">
                        <div>
                            <button className='leavemanagement-add-Bn' onClick={() => setActiveScreen(null)}>Cancel</button>
                            <button className='leavemanagement-add-Bn' onClick={() => {
                                InsertformRef.current.reset();
                                resetFormElements();
                            }}>Reset</button>
                        </div>
                        <button className='leavemanagement-add-Bn' onClick={handleAdd}>Insert</button>
                    </div>
                </form>
            </div>)}
            {ActiveScreen === "deletescreen" && (<div className="leavemanagement-add">
                <h1 className='leavemanagement-table-title'>Delete Exam</h1>
                <form action="" ref={DeleteformRef}>
                    <div className="leavemanagement-add-field">
                        <label htmlFor="leavereason">Exam ID: </label>
                        <input type="text" name="leavereason" id="leavereason"
                            onChange={(e) => { setexam_ID(e.target.value) }}
                        />
                    </div>
                    <div className="leavemanagement-add-BnDiv">
                        <div>
                            <button className='leavemanagement-add-Bn' onClick={() => setActiveScreen(null)}>Cancel</button>
                            <button className='leavemanagement-add-Bn' onClick={() => {
                                DeleteformRef.current.reset();
                                resetFormElements();
                            }}>Reset</button>
                        </div>
                        <button className='leavemanagement-add-Bn' onClick={handleDelete}>Delete</button>
                    </div>
                </form>
            </div>)}
        </div>
    )
}

export default Exam_Schedulle;
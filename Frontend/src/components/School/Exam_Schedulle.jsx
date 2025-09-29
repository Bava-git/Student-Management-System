import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import * as ApiHub from '../../utilities/ApiHub';
import * as SharedUtilities from '../../utilities/SharedUtilities';
import * as importData from '../../utilities/DataMembers';
import Popup from 'reactjs-popup';

const Exam_Schedulle = () => {

    const [exam_ID, setexam_ID] = useState("");
    const [exam_type, setexam_type] = useState('');
    const [exam_date, setexam_date] = useState("");
    const [exam_grade, setexam_grade] = useState("");
    const [exam_time, setexam_time] = useState("");
    const [exam_subjectcode, setexam_subjectcode] = useState("EXM" + Math.floor(10000 + Math.random() * 90000));
    const [exam_subjectname, setexam_subjectname] = useState("");
    const [ExamTableData, setExamTableData] = useState([]);
    const [ActiveScreen, setActiveScreen] = useState(null);
    const InsertformRef = React.useRef(null);
    const DeleteformRef = React.useRef(null);
    const ListOfExam = new Map(new Map([
        ['Mid Term 1', 'Mid Term 1'],
        ['Mid Term 2', 'Mid Term 2'],
        ['Mid Term 3', 'Mid Term 3'],
        ['Quarterly', 'Quarterly'],
        ['Half Yearly', 'Half Yearly'],
        ['Annual', 'Annual']
    ]));
    const [ExamIndex, setExamIndex] = useState("Mid Term 1");
    const [StudardIndex, setStudardIndex] = useState("Pre-LKG");
    const [RawCopy, setRawCopy] = useState([]);


    useEffect(() => {
        fetchData();
    }, [ExamIndex, StudardIndex])

    const fetchData = () => {

        ApiHub.GetAll(`school/examschedule/by?examGrade=${StudardIndex}&examType=${ExamIndex}`).then((data) => {
            setRawCopy(data);
            CreateTable(data);
        });

    };

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
                resetFormElements();
            } else {
                toast.error("Server Error", { duration: 2000 });
            }
        });

    }

    const handleDelete = (event) => {
        event.preventDefault();

        ApiHub.Delete("school/examschedule", exam_ID).then((status) => {
            if (status === 200) {
                toast.error("Deleted Successfully", { duration: 2000 });
                resetFormElements();
            }
        });

    }

    const resetFormElements = () => {
        setActiveScreen(null)
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
                </div>
                <div className="studentdash-topbar leavemanagement-adjustments">
                    <div className="standardlist">
                        {importData.grades.map((grade) => (
                            <button key={grade}
                                className={`standardlist-section ${StudardIndex === grade ? 'active' : ''}`}
                                onClick={(e) => { setStudardIndex(grade); }}
                            >{grade}</button>
                        ))}
                    </div>
                    <div className="studentdash-topbar-rightside">
                        <div className="studentdash-topbar-ExamSelector">
                            {[...ListOfExam.entries()].map(([key, value]) => (
                                <button key={key}
                                    className={ExamIndex === key ? "active" : ""}
                                    onClick={() => { setExamIndex(key); }}
                                >{value}</button>
                            ))}
                        </div>
                        <div className='leavemanagement-actionBn-div'>
                            <button className='leavemanagement-actionBn' onClick={() => { setActiveScreen("addscreen") }}>Add</button>
                            <button className='leavemanagement-actionBn' onClick={() => setActiveScreen("deletescreen")}>Delete</button>
                        </div>
                    </div>
                </div>
                <div className='leavemanagement-generalTable'>
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
                            {ExamTableData.length != 0 ? (ExamTableData)
                                :
                                <tr>
                                    <td colSpan={8} className='nodatatable'>No exam schedulled yet</td>
                                </tr>}
                        </tbody>
                    </table>
                </div>
            </div>
            <Popup open={ActiveScreen === "addscreen"} onClose={() => ActiveScreen === null} modal>
                <div className="leavemanagement-add">
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
                            <button className='leavemanagement-add-Bn' onClick={() => setActiveScreen(null)}>Cancel</button>
                            <button className='leavemanagement-add-Bn' onClick={handleAdd}>Insert</button>
                        </div>
                    </form>
                </div>
            </Popup>
            <Popup open={ActiveScreen === "deletescreen"} onClose={() => ActiveScreen === null} modal>
                <div className="leavemanagement-add">
                    <h1 className='leavemanagement-table-title'>Delete Exam</h1>
                    <form action="" ref={DeleteformRef}>
                        <div className="leavemanagement-add-field">
                            <label htmlFor="leavereason">Exam ID: </label>
                            <select name="examlist" id="examlist" defaultValue={""} onChange={(e) => { setexam_ID(e.target.value) }}>
                                <option value="">Select Exam</option>
                                {RawCopy.map((examlist) => (
                                    <option key={examlist.examId} value={examlist.examId}>{examlist.examId}</option>
                                ))}
                            </select>
                        </div>
                        <div className="leavemanagement-add-BnDiv">
                            <button className='leavemanagement-add-Bn' onClick={() => setActiveScreen(null)}>Cancel</button>
                            <button className='leavemanagement-add-Bn' onClick={handleDelete}>Delete</button>
                        </div>
                    </form>
                </div>
            </Popup>
        </div>
    )
}

export default Exam_Schedulle;
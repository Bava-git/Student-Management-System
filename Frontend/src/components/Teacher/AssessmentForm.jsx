import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import * as ApiHub from '../../utilities/ApiHub';
import * as SharedUtilities from '../../utilities/SharedUtilities';
import * as importData from '../../utilities/DataMembers';

const AssessmentForm = () => {

    const [assessmentId, setassessmentId] = useState("");
    const [student_level, setstudent_level] = useState("");
    const [finishbefore_date, setfinishbefore_date] = useState("");
    const [finishbefore_time, setfinishbefore_time] = useState("");
    const [assessmentNote, setassessmentNote] = useState("");

    const [assessmentRawData, setassessmentRawData] = useState([]);
    const [AssessmentTableData, setAssessmentTableData] = useState([]);
    const [ActiveScreen, setActiveScreen] = useState(null);
    const InsertformRef = React.useRef(null);
    const DeleteformRef = React.useRef(null);
    const [StudardIndex, setStudardIndex] = useState("Pre-LKG");

    useEffect(() => {
        fetchData();
    }, [StudardIndex])

    const fetchData = () => {

        ApiHub.GetAll(`studentreport/assessment/by?studentGrade=${StudardIndex}`).then((data) => {
            setassessmentRawData(data);
            CreateTable(data);
        });

    }

    const CreateTable = (data) => {

        data = SharedUtilities.safeSort(data, "finishBeforeDateTime");
        const LocalArr = [];
        data.map((element, index) => {
            LocalArr.push(
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{element.assessmentId}</td>
                    <td>{element.assessmentNote}</td>
                    <td>{element.student_level}</td>
                    <td>{format(element.finishBeforeDateTime, "dd-MM-yyyy hh:mm a")}</td>
                    <td>{element.teacher_name}</td>
                </tr>
            );
        })
        setAssessmentTableData(LocalArr);
    }

    const handleAdd = async (event) => {
        event.preventDefault();

        let teacher_id = sessionStorage.getItem("Id");
        let teacher_name = "";
        await ApiHub.GetOneById("teacher/search", teacher_id).then((data) => {
            teacher_name = data.teacher_name;
        }
        );

        const FormData = {
            assessmentId: "A" + Math.floor(1000 + Math.random() * 9000),
            finishBeforeDateTime: finishbefore_date + "T" + finishbefore_time + ":00",
            student_level,
            assessmentNote,
            teacher_id,
            teacher_name,
        };

        // console.log(FormData);

        ApiHub.Save("studentreport/assessment/add", FormData).then((status) => {
            if (status === 200) {
                toast.success("Added Successfully", { duration: 2000 });
                resetFormElements();
            }
        })

    }

    const handleDelete = (event) => {
        event.preventDefault();

        ApiHub.Delete("studentreport/assessment", assessmentId).then((status) => {
            if (status === 200) {
                toast.success("Deleted Successfully", { duration: 2000 });
                fetchData();
            }
        })
    }

    const resetFormElements = () => {
        fetchData();
        setassessmentId("");
        setstudent_level("");
        setfinishbefore_date("");
        setfinishbefore_time("");
        setassessmentNote("");
    }

    return (
        <div className="leavemanagement">
            <div className="leavemanagement-table">
                <div className="leavemanagement-table-titleDiv">
                    <div>
                        <h1 className='leavemanagement-table-title'>Assessments</h1>
                    </div>
                    <div className='leavemanagement-actionBn-div'>
                        <button className='leavemanagement-actionBn' onClick={() => { setActiveScreen("addscreen") }}>Add</button>
                        <button className='leavemanagement-actionBn' onClick={() => setActiveScreen("deletescreen")}>Delete</button>
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
                </div>
                <div className='leavemanagement-generalTable'>
                    <table>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>ID</th>
                                <th>Assessment</th>
                                <th>Grade</th>
                                <th>Dead Line</th>
                                <th>Assessed teacher</th>
                            </tr>
                        </thead>
                        <tbody>
                            {AssessmentTableData != 0 ? (AssessmentTableData) : (<tr><td colSpan={7}>No Assessment</td></tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
            {ActiveScreen === "addscreen" && (<div className="leavemanagement-add">
                <h1 className='leavemanagement-table-title'>Add Assessment</h1>
                <form action="" ref={InsertformRef}>
                    <div className="leavemanagement-add-field">
                        <label htmlFor="sujectcode">Assessment: </label>
                        <input type="text" name="sujectcode" id="sujectcode"
                            // value={exam_subjectcode}
                            onChange={(e) => { setassessmentNote(e.target.value) }}
                        />
                    </div>
                    <div className="leavemanagement-add-field">
                        <label htmlFor="leavedate">Exam Date: </label>
                        <input type="date" name="leavedate" id="leavedate"
                            onChange={(e) => { setfinishbefore_date(e.target.value) }}
                        />
                    </div>
                    <div className="leavemanagement-add-field">
                        <label htmlFor="leavedate">Exam Time: </label>
                        <input type="time" name="leavedate" id="leavedate"
                            onChange={(e) => { setfinishbefore_time(e.target.value) }}
                        />
                    </div>
                    <div className="leavemanagement-add-field">
                        <label htmlFor="grade">Grade: </label>
                        <select name="grade" id="grade" onChange={(e) => { setstudent_level(e.target.value) }}>
                            <option value="">-- Choose a grade --</option>
                            {importData.grades.map((month, index) => (
                                <option key={index} value={month}>{month}</option>
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
                <h1 className='leavemanagement-table-title'>Delete Assessment</h1>
                <form action="" ref={DeleteformRef}>
                    <div className="leavemanagement-add-field">
                        <label htmlFor="leavereason">Assessment ID: </label>
                        <select name="leavereason" id="leavereason" onChange={(e) => { setassessmentId(e.target.value) }}>
                            <option value="">-- Choose a Id --</option>
                            {assessmentRawData.map((element, index) => (
                                <option key={index} value={element.assessmentId}>{element.assessmentId}</option>
                            ))}
                        </select>
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

const AssessmentSubmittedList = () => {

    const [assessmentMark, setassessmentMark] = useState("");
    const [selectedAssessment, setselectedAssessment] = useState({});
    const [AssessmentTableData, setAssessmentTableData] = useState([]);
    const [ActiveScreen, setActiveScreen] = useState(null);
    const AssessmentMarkformRef = React.useRef(null);
    const [PreviousAssessments, setPreviousAssessments] = useState(true);
    const [StudardIndex, setStudardIndex] = useState("Pre-LKG");
    const [SubjectIndex, setSubjectIndex] = useState("Tamil");

    useEffect(() => {
        fetchData();
    }, [StudardIndex, SubjectIndex])

    const fetchData = () => {

        ApiHub.GetAll("studentreport/assessmentresult").then((data) => {
            data = SharedUtilities.groupingItems(data, "student_grade");
            handleTableData(data);
        });

    }

    const handleTableData = (data) => {
        const LocalArr = [];
        const groupedElement = data[StudardIndex]?.filter((item) => { return item.assessment.assessmentNote === SubjectIndex });
        const length = groupedElement?.length ?? 0;
        for (let j = 0; j < length; j++) {
            const singleElement = groupedElement[j];
            LocalArr.push(
                <tr key={StudardIndex + j}>
                    <td>{j + 1}</td>
                    <td>{singleElement.student.student_name}</td>
                    <td>{singleElement.student_grade}</td>
                    <td>{singleElement.assessment.assessmentNote}</td>
                    <td>{singleElement.teacher.teacher_name}</td>
                    <td>{singleElement.assessmentMark}</td>
                    <td>
                        <button className='assessment-updateBn' onClick={() => {
                            setActiveScreen("updatescreen");
                            setselectedAssessment(singleElement);
                        }}>Update</button>
                    </td>
                </tr>
            )
        }
        setAssessmentTableData(LocalArr);
    };

    const handleUpdateMark = async (event) => {
        event.preventDefault();

        if (assessmentMark > 5) {
            toast.success("Assessment mark must under 5 mark", { duration: 2000 });
            return
        }

        const sendData = {
            Id: selectedAssessment.id,
            teacher_id: selectedAssessment.teacher.teacher_id,
            student_id: selectedAssessment.student.student_id,
            assessmentId: selectedAssessment.assessment.assessmentId,
            student_grade: selectedAssessment.student_grade,
            assessmentMark
        }

        const hasErrors = Object.keys(sendData).some((key) => sendData[key] === '');
        if (hasErrors) {
            toast.error('Please fill the form correctly');
            return;
        }

        ApiHub.Update("studentreport/assessmentresult", sendData).then((status) => {
            if (status === 200) {
                toast.success("Assessment submited succussfuly", { duration: 2000 });
                resetFormElements();
            }
        });

    }

    const resetFormElements = () => {
        AssessmentMarkformRef.current.reset();
        fetchData();
        setassessmentMark("");
        setselectedAssessment({});
        setActiveScreen(null);
    }

    return (
        <div className="leavemanagement">
            <div className="leavemanagement-table">
                <div className="leavemanagement-table-titleDiv">
                    <h1 className='leavemanagement-table-title'>Update Assessments Mark</h1>
                    <p onClick={() => { setPreviousAssessments(!PreviousAssessments); }}>Old assessment</p>
                </div>
                <div className="standardlist">
                    {importData.subjects.map((subjects) => (
                        <button key={subjects}
                            className={`standardlist-section ${SubjectIndex === subjects ? 'active' : ''}`}
                            onClick={(e) => { setSubjectIndex(subjects); }}
                        >{subjects}</button>
                    ))}
                </div>
                <div className="standardlist">
                    {importData.grades.map((grade) => (
                        <button key={grade}
                            className={`standardlist-section ${StudardIndex === grade ? 'active' : ''}`}
                            onClick={(e) => { setStudardIndex(grade); }}
                        >{grade}</button>
                    ))}
                </div>
                <div className='assessmentMarkTable'>
                    <table>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Student</th>
                                <th>Grade</th>
                                <th>Assessment</th>
                                <th>Assessed teacher</th>
                                <th>Mark</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {AssessmentTableData.length != 0 ? (AssessmentTableData) : (<tr><td colSpan={7}>No Assessment submited yet</td></tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
            {ActiveScreen === "updatescreen" && (<div className="leavemanagement-add">
                <h1 className='leavemanagement-table-title'>Add Assessment</h1>
                <form action="" ref={AssessmentMarkformRef}>
                    <div className="leavemanagement-add-field">
                        <p>Student:</p>
                        <p>{selectedAssessment.student_id}</p>
                    </div>
                    <div className="leavemanagement-add-field">
                        <p>Grade:</p>
                        <p>{selectedAssessment.student_grade}</p>
                    </div>
                    <div className="leavemanagement-add-field">
                        <p>Assessment:</p>
                        <p>{selectedAssessment.assessmentNote}</p>
                    </div>
                    <div className="leavemanagement-add-field">
                        <p>Assessed teacher</p>
                        <p>{selectedAssessment.teacher_name}</p>
                    </div>
                    <div className="leavemanagement-add-field">
                        <label htmlFor="sujectcode">Assessment Mark: </label>
                        <input type="text" name="sujectcode" id="sujectcode"
                            onChange={(e) => { setassessmentMark(e.target.value) }}
                        />
                    </div>
                    <div className="leavemanagement-add-BnDiv">
                        <button className='leavemanagement-add-Bn' onClick={() => { setActiveScreen(null); resetFormElements(); }}>Cancel</button>
                        <button className='leavemanagement-add-Bn' onClick={(e) => handleUpdateMark(e)}>Update</button>
                    </div>
                </form>
            </div>)}
        </div>
    )
}
export { AssessmentForm, AssessmentSubmittedList };


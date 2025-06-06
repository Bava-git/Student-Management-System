import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import * as ApiHub from '../../utilities/ApiHub';
import * as SharedUtilities from '../../utilities/SharedUtilities';

const UpcomingExams = () => {
    const [TableData, setTableData] = useState([]);
    let StudentData = {};
    const Id = localStorage.getItem("Id") || "STU0259";

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        ApiHub.GetAll("school/examschedule").then((data) => CreateTable(data));
        ApiHub.GetOneById("student/search", Id).then((data) => { StudentData = data });
    }

    const CreateTable = (data) => {

        data = data.filter((element) => {
            return StudentData.student_level === element.exam_grade
        });

        data = SharedUtilities.safeSort(data, "exam_date");
        const LocalArr = [];
        let i = 1;
        data.map((element) => {
            LocalArr.push(
                <tr key={i}>
                    <td>{i}</td>
                    <td>{element.exam_type}</td>
                    <td>{element.exam_subjectcode}</td>
                    <td>{element.exam_grade}</td>
                    <td>{element.exam_subjectname}</td>
                    <td>{format(element.exam_date, "dd-MM-yyyy")}</td>
                    <td>{element.exam_time}</td>
                </tr>
            );
            i++;
        })
        setTableData(LocalArr);
    }

    return (
        <div className="filteredexamschedule">
            <div className='filteredexamschedule-examtable'>
                <h1 className='filteredexamschedule-examtable-title'>Exam Schedule</h1>
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Exam Type</th>
                            <th>Subject Code</th>
                            <th>Subject</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {TableData.length != 0 ? (TableData) :
                            (<tr><td colSpan={7} className='examerrormassage'>Exams are not yet scheduled</td></tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const UpcomingAssessments = () => {

    // const [isSubmitted, setisSubmitted] = useState([]);
    const [ActiveDataShow, setActiveDataShow] = useState([]);
    const [ResultPendingShow, setResultPendingShow] = useState([]);
    let StudentData = {};
    let isSubmitted = [];
    const Id = localStorage.getItem("Id") || "STU0259";

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {

        ApiHub.GetAll("studentreport/assessmentresult").then((data) => {
            // console.log(data);
            // setisSubmitted(data);
            isSubmitted = data;
            GenerateResultPedingLabel(data)
        });
        ApiHub.GetAll("studentreport/assessment").then((data) => {
            // console.log(data);
            GenerateActiveLabel(data)
        });
        ApiHub.GetOneById("student/search", Id).then((data) => {
            // console.log(data);
            StudentData = data;
        });

    }

    const GenerateActiveLabel = (data) => {

        const LocalArr = [];
        data = data.filter((element) => element.student_level === StudentData.student_level);
        const pendingAssessments = data.filter(
            (assessment) =>
                !isSubmitted.some(
                    (submitted) => submitted.student_id === Id && submitted.assessmentId === assessment.assessmentId
                )
        );

        // console.log(pendingAssessments);

        pendingAssessments.map((element, index) => {
            LocalArr.push(
                <div className="assessmentDetails-div" key={index}>
                    <div className="assessmentDetails-field">
                        <p>Assessment: </p>
                        <p>{element.assessmentNote}</p>
                    </div>
                    <div className="assessmentDetails-field">
                        <p>Time remaining</p>
                        <div className='deliverytime'>
                            <p>{format(element.finishBeforeDateTime, "dd-MMM-yyyy hh:mm a")}</p>
                            <img className='remainingtimeicon'
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACpklEQVR4nO2YzWoTURTHf4ZRSRZiqxFsxRfQndbUt3BR6lJFiRtRXEl0owvbrWhbX0BBrFmoT+GiGynS7qxWQUuLLSRGESIXjhAOd5I7d74cmB/czTDn3POfmTvnA0pKSpKgAkwDd4E2sArsAL9l7ci1V0ALaIhN7pwA5oHPQD/iMjZzwGQegR8BloBfHoHr1QMWgfGsgr8IbCUQuF7G52yagQfy1MMC+AE8A64CU0Ad2C+rLteuAc+B3SF+FmSvRKkCb0M2/ABclnui+LsCrIX4fBPR31CCkOA7wK2YTysAbgNdi//XSb2JpyF/kDMkx1lg07LPkyQOrHa6Ahx3sNV2o5gQ39puJs6vcsvy5F2C9xGAHPZ1ZfcNGMODJcs3H+Wz8RFgOC17Ddo+xiPD9pQTc2DJQIDhnrL9KZ+YM/OWX2WQoYAa8EXZP3Q1rlhqm0tEJ44AQ1PZb7gWgNOWDFvNQUAN2FM+TDYfSUsZmfKAHAQYXigfd3CgrYxMbZOXgKbysexitOrz2lIS0FA+3rsYbSujo56b9x3XMI6pe01iHYluUg6Qn4CD6t5e0QR48T99Ql7oQ3yOgtFWAkwbWChaSoDpYQtFQwnYTbI/zYKKpZgzDXihmFMC1tIYdaTJpKWhMdODQrGoBHRlelAYxoHvSsRXaTeTwJTGqSe6WYvDlRjZWXM/i0y9YHG6LtODLETEJpBZpXbckemBaf18qQEPgD9p10pVmVXaNjDTg+sRhRwGbgIfsyz2AplVhm20Jz1sU7J5XUpxI+wkcF5mS23L4KqfZbU6I+O+fsJrE7hgOROpMCbjPp3sfFYXeAQcGvA/KCJVJmRituER+CepfMN+yf9EZFYATklyWpbpwba0px0R+A54CdwATgH7HPwaESUlJYTzF9EW/381bL/1AAAAAElFTkSuQmCC"
                                alt="delivery-time"></img>
                        </div>
                    </div>
                    <div className="assessmentDetails-field">
                        <p>Assessed by: </p>
                        <p>{element.teacher_name}</p>
                    </div>
                    <div className="assessmentDetails-field">
                        <div></div>
                        <input className='uploadinput' type="file" accept="application/pdf" onChange={handleFileChange} />
                    </div>
                    <div className="assessmentDetails-field">
                        <div></div>
                        <button onClick={(e) => handleSubmition(element)} className='assessmentDetails-Bn'>Submit</button>
                    </div>
                </div>
            );
        })
        setActiveDataShow(LocalArr);
    }

    const GenerateResultPedingLabel = (data) => {

        const LocalArr = [];
        data = data.filter((element) => {
            return (element.student_grade === StudentData.student_level &&
                StudentData.student_id === element.student_id &&
                element.assessmentMark === null
            )
        })

        data.map((element, index) => {
            LocalArr.push(
                <div className="assessmentDetails-div" key={index}>
                    <div className="assessmentDetails-field">
                        <p>Assessment: </p>
                        <p>{element.assessmentNote}</p>
                    </div>
                    <div className="assessmentDetails-field">
                        <p>Assessed by: </p>
                        <p>{element.teacher_name}</p>
                    </div>
                    <div className="assessmentDetails-field">
                        <p>Result: </p>
                        <p>Pending</p>
                    </div>
                </div>
            );
        })
        setResultPendingShow(LocalArr);
    }

    let selectedFile = null;
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            selectedFile = file;
        } else {
            alert("Please upload a valid PDF file.");
        }
    };

    const handleSubmition = (element) => {

        // if (!selectedFile) {
        //     alert("No file selected!");
        //     return;
        // } else {
        //     const fileURL = URL.createObjectURL(selectedFile);
        // }

        const sendData = {
            teacher_id: element.teacher_id,
            teacher_name: element.teacher_name,
            student_id: Id,
            assessmentId: element.assessmentId,
            student_grade: element.student_level,
            assessmentNote: element.assessmentNote,
        }

        ApiHub.Save("studentreport/assessmentresult/add", sendData).then((status) => {
            if (status === 200) {
                toast.success("Assessment submited succussfuly", { duration: 2000 });
                fetchData();
            }
        });
    }

    return (
        <div className="filteredexamschedule-assessment">
            <h1 className='filteredexamschedule-examtable-title'>Assessment Task</h1>
            <div className="filteredexamschedule-assessment-topbar">
                <div className="filteredexamschedule-assessment-field">
                    <p className='assessment-subtitle active'>Active Assessment</p>
                    {ActiveDataShow.length != 0 ? (ActiveDataShow) :
                        (<p className='assessmenterrormsg'>Assessment are not yet scheduled</p>)}
                </div>
                <div className="filteredexamschedule-assessment-field">
                    <p className='assessment-subtitle pending'>Result Pending</p>
                    {ResultPendingShow.length != 0 ? (ResultPendingShow) :
                        (<p className='assessmenterrormsg'>No Assessment submitted</p>)}
                </div>
            </div>
        </div>
    )
}

export { UpcomingAssessments, UpcomingExams };


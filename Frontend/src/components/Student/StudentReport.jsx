import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import * as ApiHub from '../../utilities/ApiHub';
import * as importData from '../../utilities/DataMembers';
import * as url from '../../utilities/urlController';

const StudentReportUpload = () => {
    const [Grade, setGrade] = useState('');
    const [ExamName, setExamName] = useState('');
    const [file, setFile] = useState(null);
    const Navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        ApiHub.UploadData(`student/marksheet/upload/${ExamName.toLowerCase().replaceAll(" ", "")}/${Grade}`, formData).then((status) => {
            if (status === 200) {
                alert("File uploaded successfully");
                Navigate(url.studentreportupload);
            }
        });

    };

    return (
        <div className="studentreportadd">
            <div className='studentreportadd-grade'>
                <h1 className='studentreportadd-grade-title'>Upload Exam Results</h1>
                <div className="warning-box">
                    <h2><strong> CSV Upload Warning </strong></h2>
                    <p>Please ensure your CSV file is correctly formatted before uploading.</p>
                    <div className="warning-Checkboxs">
                        <input type="checkbox" id="check2" />
                        <p> CSV should contain the following columns in order: Student ID, Tamil Mark,
                            English Mark, Maths Mark, Science Mark, Social Mark</p>
                    </div>
                    <div className="warning-Checkboxs">
                        <input type="checkbox" id="check3" />
                        <p>CSV should not contain empty rows</p>
                    </div>
                    <div className="warning-Checkboxs">
                        <input type="checkbox" id="check4" />
                        <p>Ensure all data is accurate before uploading</p>
                    </div>
                </div>
                <div className="grade-container">
                    <label className="grade-label" htmlFor="grade">
                        <p className="grade-title">Grade</p>
                        <select className="grade-select" name="grade" id="grade"
                            onChange={(e) => { setGrade(e.target.value) }} defaultValue={""}>
                            <option value="">Select Grade</option>
                            {importData.grades.map((grade) => (
                                <option key={grade} value={grade}>{grade}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className="grade-container">
                    <label className="grade-label" htmlFor="exam">
                        <p className="grade-title">Grade</p>
                        <select className="grade-select" name="exam" id="exam"
                            onChange={(e) => { setExamName(e.target.value) }} defaultValue={""}>
                            <option value="">Select Exam</option>
                            {importData.exams.map((exam) => (
                                <option key={exam} value={exam.trim().toLowerCase()}>{exam}</option>
                            ))}
                            <option key={"Assessment"} value={"assessment"}>Assessment</option>
                        </select>
                    </label>
                </div>
                <div className='grade-container'>
                    <label htmlFor="file" className="grade-label">Upload file:</label>
                    <input type="file" id="file" name='file' className="grade-select uploadBn" onChange={handleFileChange} />
                </div>
                <div className='studentreportadd-grade-BnDiv'>
                    <button className='examlist-UploadBn' onClick={handleSubmit}>Upload</button>
                </div>
            </div>
        </div>
    )
}

import { addDays, addMonths, endOfMonth, format, startOfMonth, startOfWeek, subMonths } from "date-fns";
import { toast } from "sonner";

const StudentReportView = () => {

    const [ReportData, setReportData] = useState([]);
    const [AttendanceData, setAttendanceData] = useState([]);
    const [AssessmentData, setAssessmentData] = useState([]);
    const Params = useParams();
    const Navigate = useNavigate();
    const Student_ID = Params.id;
    const [CurrentMonth, setCurrentMonth] = useState(new Date());

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        getDaysInMonth();
    }, [CurrentMonth, AttendanceData]);

    const fetchData = async () => {

        let role = sessionStorage.getItem("role");

        if ((role === "ROLE_STUDENT") && (Student_ID != sessionStorage.getItem("Id"))) {
            toast.error('Warning: Unauthorized Attempt Detected',
                {
                    description: 'This system automatically reports illegal approaches to management. Do not attempt again.',
                    duration: 50000
                },);
            Navigate(`/`);
            return;
        }

        ApiHub.GetAll(`studentreport/${Student_ID}`).then((data) => {
            // console.log(data);
            setReportData(data);
            mainFilter(data);
        });
        ApiHub.GetAll(`studentreport/attendance/${Student_ID}`).then((data) => {
            // console.log(data);
            setAttendanceData(data);
            getDaysInMonth();
        });
        ApiHub.GetOneById(`studentreport/assessmentresult`, Student_ID).then((data) => {
            // console.log(data);
            setAssessmentData(data);
        });
    }

    const [TotalArr, setTotalArr] = useState([]);
    const [ShortListedExams, setShortListedExams] = useState([]);

    const mainFilter = (data) => {

        importData.exams.map((exam) => {
            const item = data[exam];
            if (item?.length === 1) {
                setShortListedExams(prev => {
                    if (!prev.includes(exam)) {
                        return [...prev, exam];
                    }
                    return prev;
                });

                const element = item[0];
                let total = parseInt(element.tamil) + parseInt(element.english) + parseInt(element.maths) +
                    parseInt(element.science) + parseInt(element.socialscience);
                setTotalArr(prev => [...prev, total]);
            }
        });

    }

    const handlePerformanceCategories = (score) => {
        if (score >= 450) return 'Excellent';
        if (score >= 400) return 'Very Good';
        if (score >= 350) return 'Good';
        if (score >= 300) return 'Average';
        return 'Needs Improvement';
    }


    const [SubjectPerArr, setSubjectPerArr] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);

    const toggleRow = (examName) => {
        setExpandedRow(expandedRow === examName ? null : examName);

        const element = ReportData[examName];
        if (element.length === 0) return;

        const newArr = [
            parseInt(element[0].tamil),
            parseInt(element[0].english),
            parseInt(element[0].maths),
            parseInt(element[0].science),
            parseInt(element[0].socialscience)
        ];
        setSubjectPerArr(newArr); // Update state
    };

    const [Calendar, setCalendar] = useState([]);

    const getDaysInMonth = () => {
        const AdsentCalender = [];

        let AbsentDates = [];

        // if (AttendanceData.length > 0) {
        for (let i = 0; i < AttendanceData.length; i++) {
            const element = AttendanceData[i];
            AbsentDates.push(format(element.absent_date, "yyyy-MM-dd"));
        }
        // }

        const startDate = startOfMonth(CurrentMonth);
        const endDate = endOfMonth(CurrentMonth);
        const startWeek = startOfWeek(startDate);
        const days = [];

        let day = startWeek;
        while (day <= endDate || format(day, "EEEE") != "Sunday") {
            days.push(format(day, "yyyy-MM-dd"));
            day = addDays(day, 1);
        }

        days.map((day) => {
            const formattedDay = format(day, "yyyy-MM-dd");
            const isHighlighted = AbsentDates.includes(day);
            AdsentCalender.push(
                <div className={isHighlighted ? "absent-day" : "present-day"} key={formattedDay}>
                    <span

                    >
                        {format(day, "d")}
                    </span>
                </div>
            );
        });
        setCalendar(AdsentCalender);
    };

    const nextMonth = () => {
        setCurrentMonth(addMonths(CurrentMonth, 1));
        getDaysInMonth();
    };

    const prevMonth = () => {
        setCurrentMonth(subMonths(CurrentMonth, 1));
        getDaysInMonth();
    };

    let NumOfWorkDays = 218;
    let TotalPresent = (NumOfWorkDays - AttendanceData?.length) || 0;
    let TotalAbents = AttendanceData?.length || 0;
    const daysInWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const AssessmentArr = [];
    if (AssessmentData?.length > 0) {
        AssessmentData.map((element, index) => {
            if (element.assessmentMark != null) {
                AssessmentArr.push(
                    <tr key={index + 123}>
                        <td>{index + 1}</td>
                        <td>{element.assessment.assessmentNote}</td>
                        <td>{element.assessmentMark}/5</td>
                        <td>{element.assessmentMark >= 3 ? "Pass" : "Fail"}</td>
                    </tr>
                )
            }
        })
    }

    return (
        <div className="studentReport">
            <h1 className="studentReport-title">Student Report - {Student_ID}</h1>
            <div className="acedemicRecord">
                <p className="acedemicRecord-examlist-title">Acedemic Records</p>
                <div className="acedemicRecord-table">
                    <table>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Exam</th>
                                <th>Mark</th>
                                <th>Feedback</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ShortListedExams.map((exam, index) =>
                            (
                                <React.Fragment key={index}>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{exam}</td>
                                        <td>{TotalArr[index]}/500</td>
                                        <td>{handlePerformanceCategories(TotalArr[index])}</td>
                                        <td><button className="acedemicRecord-showdetailsBn" onClick={() => toggleRow(exam)}>
                                            {expandedRow === exam ? 'Hide Details ↑' : 'Show Details ↓'}
                                        </button></td>
                                    </tr>

                                    {expandedRow === exam && (
                                        <tr className="acedemicRecord-SingleExamResult">
                                            <td colSpan={5} className="SingleExamResult-td">
                                                <table >
                                                    <caption>{expandedRow} - Subject List</caption>
                                                    <thead>
                                                        <tr>
                                                            <th>S.No</th>
                                                            <th>Subject</th>
                                                            <th>Mark</th>
                                                            <th>Result</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>Tamil</td>
                                                            <td>{SubjectPerArr[0]}/100</td>
                                                            <td>{SubjectPerArr[0] > 34 ? "Pass" : "Fail"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>2</td>
                                                            <td>English</td>
                                                            <td>{SubjectPerArr[1]}/100</td>
                                                            <td>{SubjectPerArr[1] > 34 ? "Pass" : "Fail"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>3</td>
                                                            <td>Maths</td>
                                                            <td>{SubjectPerArr[2]}/100</td>
                                                            <td>{SubjectPerArr[2] > 34 ? "Pass" : "Fail"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>4</td>
                                                            <td>Science</td>
                                                            <td>{SubjectPerArr[3]}/100</td>
                                                            <td>{SubjectPerArr[3] > 34 ? "Pass" : "Fail"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>5</td>
                                                            <td>Social Science</td>
                                                            <td>{SubjectPerArr[4]}/100</td>
                                                            <td>{SubjectPerArr[4] > 34 ? "Pass" : "Fail"}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="studentReport-betterview">
                <div className="studentReport-attendance">
                    <div className="studentReport-attendance-titleDiv">
                        <p className="studentReport-attendance-title">Attendance</p>
                    </div>
                    <div className="studentReport-attendance-calendarview">
                        <div className="calendar-main">
                            {/* Header */}
                            <div className="calendar-title">
                                <button onClick={prevMonth} className="calendar-movebn">
                                    &#60;
                                </button>
                                <span>{format(CurrentMonth, "MMMM yyyy")}</span>
                                <button onClick={nextMonth} className="calendar-movebn">
                                    &#62;
                                </button>
                            </div>

                            {/* Week Days */}
                            <div className="calendar-weektitle">
                                {daysInWeek.map((day) => (
                                    <div key={day}>{day}</div>
                                ))}
                            </div>

                            {/* Days */}
                            <div className="calendar-days">
                                {Calendar}
                            </div>
                        </div>
                        <div className="studentReport-attendance-textDiv">
                            <p className="studentReport-attendance-text">
                                <span className="present-circle">&#x26AC;</span> Present {TotalPresent}
                            </p>
                            <p className="studentReport-attendance-text">
                                <span className="absent-circle">&#x26AC;</span> Absent {TotalAbents}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="assessmentResult">
                    <p className="assessmentResult-title">Assessment Result</p>
                    <table className="acedemicRecord-table">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Assessment</th>
                                <th>Star</th>
                                <th>Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {AssessmentArr != 0 ? (AssessmentArr) : <tr><td colSpan={4}>No Assessment</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}

export { StudentReportUpload, StudentReportView };


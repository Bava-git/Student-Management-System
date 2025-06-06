import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import * as ApiHub from '../../utilities/ApiHub';
import * as importData from '../../utilities/DataMembers';

const StudentReportUpload = () => {
    const [Grade, setGrade] = useState('');
    const [ExamName, setExamName] = useState('');
    const [file, setFile] = useState(null);

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

        ApiHub.UploadData(`student/${ExamName}/upload`, formData).then((status) => {
            if (status === 200) {
                alert("File uploaded successfully: " + response.data.message);
            }
        });

    };

    return (
        <div className="studentreportadd">
            <div className='studentreportadd-grade'>
                <h1 className='studentreportadd-grade-title'>Exam Result</h1>
                <div className="warning-box">
                    <h2><strong>&#9888; CSV Upload Warning &#9888;</strong></h2>
                    <p>Please ensure your CSV file is correctly formatted before uploading. The file <strong>must</strong> adhere to the following structure:</p>
                    <ol type="1">
                        <li><strong>Student Grade</strong></li>
                        <li><strong>Student ID</strong></li>
                        <li><strong>Tamil Mark</strong></li>
                        <li><strong>English Mark</strong></li>
                        <li><strong>Maths Mark</strong></li>
                        <li><strong>Science Mark</strong></li>
                        <li><strong>Social Mark</strong></li>
                    </ol>
                    <p>✔ The file <strong>must NOT</strong> contain headers (titles) for each column.</p>
                    <p>✔ Data must be entered in the correct order to avoid errors during processing.</p>
                    <p>✔ Ensure no empty rows or missing values to maintain accuracy.</p>
                    <p>&#10060; <strong>Incorrect formatting may result in upload failure or data misalignment.</strong></p>
                </div>
                <div className='studentreportadd-grade-field'>
                    <label htmlFor="grade">Grade:</label>
                    <select name="grade" id="grade" onChange={(e) => { setGrade(e.target.value) }} defaultValue={""}>
                        <option value="">-- Choose a grade --</option>
                        {importData.grades.map((grade) => (
                            <option key={grade} value={grade}>{grade}</option>
                        ))}
                    </select>
                </div>
                <div className='studentreportadd-grade-field'>
                    <label htmlFor="exam">Exam:</label>
                    <select name="exam" id="exam" onChange={(e) => { setExamName(e.target.value) }} defaultValue={""}>
                        <option value="">-- Choose a exam --</option>
                        {importData.exams.map((exam) => (
                            <option key={exam} value={exam.trim().toLowerCase()}>{exam}</option>
                        ))}
                        <option key={"Assessment"} value={"assessment"}>Assessment</option>
                    </select>
                </div>
                <div className='studentreportadd-grade-field'>
                    <label htmlFor="file">Upload file:</label>
                    <input type="file" id="file" name='file' onChange={handleFileChange} />
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

        if (Student_ID != sessionStorage.getItem("Id")) {
            toast.error('Warning: Unauthorized Attempt Detected',
                {
                    description: 'This system automatically reports illegal approaches to management. Do not attempt again.',
                    duration: 60000
                },);
            Navigate(`/`);
            return;
        }

        ApiHub.GetAll(`studentreport/${Student_ID}`).then((data) => { setReportData(data); });
        ApiHub.GetAll(`studentreport/attendance/${Student_ID}`).then((data) => {
            setAttendanceData(data);
            getDaysInMonth();
        });
        ApiHub.GetOneById(`studentreport/assessmentresult`, Student_ID).then((data) => {
            // console.log(data);
            setAssessmentData(data);
        });
    }


    const TotalArr = [];
    if (ReportData.length > 0) {
        for (let i = 0; i < ReportData.length; i++) {
            const element = ReportData[i];
            let total = parseInt(element.tamil) + parseInt(element.english) + parseInt(element.maths) +
                parseInt(element.science) + parseInt(element.socialscience);
            TotalArr.push(total);
        }
    }

    const [SubjectPerArr, setSubjectPerArr] = useState([]);
    const [ExamName, setExamName] = useState('Exam');
    const [Visibility, setVisibility] = useState(false);

    const handletable = (e) => {
        e.preventDefault();
        const ExamNumber = e.target.dataset.value;
        setExamName(e.target.textContent);

        const element = ReportData[ExamNumber];
        if (!element) return;

        const newArr = [
            parseInt(element.tamil),
            parseInt(element.english),
            parseInt(element.maths),
            parseInt(element.science),
            parseInt(element.socialscience)
        ];
        setSubjectPerArr(newArr); // Update state
        setVisibility(true);
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
                    <tr key={element.assessmentNote}>
                        <td>{index + 1}</td>
                        <td>{element.assessmentNote}</td>
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
                <p className="acedemicRecord-title">Acedemic Records</p>
                <div className="acedemicRecord-view">
                    <div className="acedemicRecord-examlist">
                        <p className="acedemicRecord-examlist-title">Exam List</p>
                        <table className="acedemicRecord-table">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Exam</th>
                                    <th>Mark</th>
                                    <th>Result</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td><a href="#" data-value={0} onClick={handletable}>Mid Term l</a></td>
                                    <td>{TotalArr[0]}/500</td>
                                    <td>{TotalArr[0] >= 175 ? "Pass" : "Fail"}</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td><a href="#" data-value={3} onClick={handletable}>Quarterly (Term l)</a></td>
                                    <td>{TotalArr[1]}/500</td>
                                    <td>{TotalArr[1] >= 175 ? "Pass" : "Fail"}</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td><a href="#" data-value={1} onClick={handletable}>Mid Term ll</a></td>
                                    <td>{TotalArr[2]}/500</td>
                                    <td>{TotalArr[2] >= 175 ? "Pass" : "Fail"}</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td><a href="#" data-value={4} onClick={handletable}>Half Yearly (Term ll)</a></td>
                                    <td>{TotalArr[3]}/500</td>
                                    <td>{TotalArr[3] >= 175 ? "Pass" : "Fail"}</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td><a href="#" data-value={2} onClick={handletable}>Mid Term lll</a></td>
                                    <td>{TotalArr[4]}/500</td>
                                    <td>{TotalArr[4] >= 175 ? "Pass" : "Fail"}</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td><a href="#" data-value={5} onClick={handletable}>Annual (Term lll)</a></td>
                                    <td>{TotalArr[5]}/500</td>
                                    <td>{TotalArr[5] >= 175 ? "Pass" : "Fail"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {Visibility &&
                        <div className="acedemicRecord-subjectlist">
                            <p className="acedemicRecord-subjectlist-title">{ExamName} - Subject List</p>
                            <table className="acedemicRecord-table" >
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Subject</th>
                                        <th>Mark</th>
                                        <th>Result</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                                <tfoot>
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
                                </tfoot>
                            </table>
                        </div>}
                </div>
            </div>
            <div className="studentReport-betterview">
                <div className="studentReport-attendance">
                    <div className="studentReport-attendance-titleDiv">
                        <p className="studentReport-attendance-title">Attendance</p>
                    </div>
                    <div className="studentReport-attendance-calendarview">
                        <div className="studentReport-attendance-calender">
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
        </div>
    )
}

export { StudentReportUpload, StudentReportView };


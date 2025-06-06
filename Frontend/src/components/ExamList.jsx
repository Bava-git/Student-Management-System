import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import * as ApiHub from '../utilities/ApiHub';
import * as SharedUtilities from '../utilities/SharedUtilities';
import * as importData from '../utilities/DataMembers';

const ExamList = () => {
    const [RawData, setRawData] = useState([]);
    const [TableData, setTableData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        ApiHub.GetAll("school/examschedule").then((data) => {
            setRawData(SharedUtilities.safeSort(data, "exam_date"));

        });
    }

    const handleTable = (exam, filteredSchedule) => {

        const MyArr = [];
        filteredSchedule = SharedUtilities.groupingItems(filteredSchedule, "exam_grade");
        const grades = importData.grades;
        for (let i = 0; i < grades.length; i++) {
            const grade = grades[i];
            if (filteredSchedule[grade]) {
                MyArr.push(<div className='filteredexamschedule-examtable' key={i}>
                    <h1 className='filteredexamschedule-examtable-title'>{exam} Exam - {grade}</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Subject Code</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Grade</th>
                                <th>Subject</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSchedule[grade]?.map((element, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{element.exam_subjectcode}</td>
                                    <td>{format(new Date(element.exam_date), "dd-MM-yyyy")}</td>
                                    <td>{element.exam_time}</td>
                                    <td>{element.exam_grade}</td>
                                    <td>{element.exam_subjectname}</td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>)
            }
            setTableData(MyArr);
        }
    }

    const handleFilterExam = (exam) => {
        const filteredSchedule = RawData.filter((element) => element.exam_type === exam)
        handleTable(exam, filteredSchedule);
    }

    return (
        <div className="filteredexamschedule">
            <div className="examfilters">
                <p className='examfilters-title'>Exam List</p>
                <div className="exam-list">
                    {importData.exams.map((exam) => (
                        <button key={exam} className='exam-list-Bn' onClick={(e) => handleFilterExam(exam)}>{exam}</button>
                    ))}
                </div>
            </div>

            {TableData.length != 0 ? (TableData) : (
                <div className='errorBox'>
                    <p className='errorBox-massage'>Exams are not yet scheduled</p>
                </div>
            )}
        </div>
    )
}

export default ExamList;
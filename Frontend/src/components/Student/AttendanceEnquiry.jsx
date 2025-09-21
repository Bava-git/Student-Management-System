import { Menu, MenuButton } from '@szhsin/react-menu';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { toast } from 'sonner';
import * as ApiHub from '../../utilities/ApiHub';
import * as importData from '../../utilities/DataMembers';
import * as SharedUtilities from '../../utilities/SharedUtilities';
import * as url from '../../utilities/urlController';

const AttendanceList = () => {

    const months = [
        "July", "August", "September", "October", "November", "December",
        "January", "February", "March", "April", "May", "June"
    ];
    const [RawData, setRawData] = useState([]);
    const [StudentRawData, setStudentRawData] = useState([]);
    const [GradeFilter, setGradeFilter] = useState('');
    const [DateFilter, setDateFilter] = useState('');
    const [Content, setContent] = useState([]);
    const Navigate = useNavigate();
    const [AddMenu, setAddMenu] = useState(false);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        ApiHub.GetAll("studentreport/attendance").then((data) => {
            setRawData(data);
            handleFullTable(data);
        });
        ApiHub.GetAll("student").then((data) => { setStudentRawData(data) });
    }

    const groupByDate = (array) => {
        return array.reduce((groups, student) => {
            const grade = format(student.absent_date, "MMMM");
            if (!groups[grade]) {
                groups[grade] = [];
            }
            groups[grade].push(student);
            return groups;
        }, {});
    };

    let seperateDays = [];
    const groupByDay = (array) => {
        return array.reduce((groups, student) => {
            const grade = format(student.absent_date, "yyyy-MM-dd");

            if (!seperateDays.includes(grade)) {
                seperateDays.push(grade);
            }

            if (!groups[grade]) {
                groups[grade] = [];
            }
            groups[grade].push(student);
            return groups;
        }, {});
    };

    const groupByGrade = (array) => {
        return array.reduce((groups, student) => {
            const grade = student.student_level;
            if (!groups[grade]) {
                groups[grade] = [];
            }
            groups[grade].push(student);
            return groups;
        }, {});
    };

    const handleFullTable = (data) => {
        const HeaderContent = [];
        const BodyContent = [];

        HeaderContent.push(<tr key={1}>
            <th > Grades</th>
            {months.map((element) => (<th key={element}>{element}</th>))}
        </tr >);

        const GradeGrouped = groupByGrade(data);
        const grades = importData.grades;
        for (let i = 0; i < grades.length; i++) {
            const Row = [];
            const grade = grades[i];
            let SecricatedByGrade = GradeGrouped[grade];
            Row.push(<td key={grade + i}>{grade}</td>)

            for (let j = 0; j < months.length; j++) {
                const month = months[j];
                let MonthGrouped = groupByDate(SecricatedByGrade);
                let count = MonthGrouped[month]?.length ?? 0;
                Row.push(<td key={month}>{count}</td>)
            }

            BodyContent.push(<tr key={grade}>{Row}</tr>);
        }

        setContent(<><thead>{HeaderContent}</thead><tbody>{BodyContent}</tbody></>);
    }

    useEffect(() => {
        handleChanges(GradeFilter, DateFilter);
    }, [GradeFilter, DateFilter]);

    const handleChanges = (grade) => {
        const HeaderContent = [];
        const BodyContent = [];

        if (grade === "") {
            fetchData();
            return;
        }

        HeaderContent.push(
            <tr key={1}>
                <th>S No.</th>
                <th>Student ID</th>
                <th>Student Name</th>
                {DateFilter === "" ? (<th>Total Absent</th>) : (<th>Date</th>)}
            </tr>
        );

        let content = [];
        let GradeGrouped = groupByGrade(RawData);
        let DayGrouped = groupByDay(GradeGrouped[grade]);

        if (grade != "" && DateFilter != "") {
            if (seperateDays.includes(DateFilter)) {
                content = DayGrouped[DateFilter];
                content = SharedUtilities.safeSort(content, "student_name");
            }
        } else {
            content = StudentRawData.filter((element) => {
                return element.student_level === grade;
            })
            content = SharedUtilities.safeSort(content, "student_name");
        }


        content.forEach((element, index) => {
            let i = 0;
            RawData.map((student) => {
                if (student.student_id === element.student_id) {
                    i++;
                }
            })
            BodyContent.push(
                <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td>{element.student_id}</td>
                    <td>{element.student_name}</td>
                    {DateFilter === "" ? (<td>{i}</td>) : (<td>{DateFilter}</td>)}
                </tr >
            )
        })

        setContent(<><thead>{HeaderContent}</thead><tbody>{BodyContent}</tbody></>);
    }

    return (
        <div className="attendancepage">
            <div className="attendancepage-attendancelist">
                <h1 className="attendancepage-attendancelist-title">Attendance Dashboard</h1>
                <div className="attendancepage-selectors">
                    <div className='attendancepage-BnLeft'>
                        <div className="attendancepage-selectors-div">
                            <button className='selectors-common' onClick={() => Navigate(url.attendanceform)}>New Attendance</button>
                        </div>
                    </div>
                    <div className='attendancepage-BnLeft'>
                        <div className="attendancepage-selectors-div">
                            <select name="grade" id="grade" className='selectors-common'
                                onChange={(e) => { setGradeFilter(e.target.value) }} value={GradeFilter}>
                                <option value="">Select Grade</option>
                                {importData.grades.map((grade, index) => (
                                    <option key={index} value={grade}>{grade}</option>
                                ))}
                            </select>
                        </div>
                        {GradeFilter && <div className="attendancepage-selectors-div">
                            <input type="date" name="date" id="date" className='selectors-common'
                                onChange={(e) => { setDateFilter(e.target.value) }} value={DateFilter} />
                        </div>}
                        <div className="attendancepage-selectors-div">
                            <button onClick={() => { setGradeFilter(""); setDateFilter(""); }}>
                                <img className="icons"
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAE1klEQVR4nO2dTWhVRxiGn0SailbaRsVasC2WiG7VRQXNohvpQrH7QroRQbC4sBbdRPxFkcatf9eFmyIWF12IaIm1XSqKFdNWQauVVuO/i2rRnDI4F8Ihueebe+/JmZ/vhdkd5sx87zf3vO83MwkoFAqFQqFQKBQKhUKhUCgU4yPTRqMYlA4lACUg8zgRdAWgBFSehZmugOoDkelPUPXByCpo+g0gcgLyOCEY1E9AB2HhtGBeZu6VYw7wVDDYPsJBn2A+T+3cvcB6wYDvAzPxH93AXcF8zJy9wSTgvGDQNfxHTTCP83bOXmER8LJg4CPAp/iLXjvGRnN4aefqJQYE2fM7MBn/0AVcFYzfzNFbTANuCSbRj3/oF4z7lp2j11glmMhzYAH+oAf4VzBuM7cgIPEGZz3yBmdC0fwxeoO+0DR/TN6gO0TNH5M3qIWq+WPwBr2ha/6QvUFXDJo/ZG/QH4vmD9Eb9MSm+UPzBmdi0/wheYO+WDV/CN6gO2bNH4I3OBK75vfZG/Smovl99AZdKWl+H73BltQ0v0/eoCdVze+DN+hIWfP74A2+TF3zV+kNpgP3Utf8VXqDI6r5q/MGvar5y/MGvwn6Mc+o5i/RGxRBNX/J3qAIqvlbRFYyAYqKCHgBrNPol5/B2RjtL2CJBr8aAm4CH2vwqyHgjxZKDaaQtxrYDwzavsxKugNcs/feDgBrgHkxEZy1iYBhYK7ju98BNgC/CsaRb1eAjXbrk9QJeA4sc3jnVGA78KSJwI9V4NsJvEXCBHzl8L7lQgPo2m4Dn5EgAWeBTuF+gcn6VyUEf3T9apdwPNEQMFfwzBvA0RIDn2/f2b3pJAiQZL6kXN3udiKUIy9ZyQTsqCD49baXxAlY7vCbP+wQ2GGHb8JKEiVgCnBDGKiaLY8PCp41+w/vA98I+/7H+o3kCNghDNDhUarFaPmfGzw7BLzneAbJtG9JjIC3gcfCzO8cw6QNNsj8PCQrwZxVmk1CBHztmPl55FdCPvPzkKyErSREwOUmMp9xVsJ4me+6Em56dFG9VALmFfT3CJgh7MushFnCZyfbqmmjdy8kAQLWCPq8aA9ztQvG9f4geK+pvEZPwEFBn+0kQRr8eokiegLOCYPRDhJcgl9/X/QEXHMISCskuAY/s+dXoyfgb8egNENCM8Gv+wHvkDk2U1puNwFFOj+PIsfc6KiMd8gcW9HVouuO/Ul1PkLHXHTsPngCPiro75cSM7/VlWA28oMnYGlBf4dLzvxWVsJxIiBgdUF/aycg85tdCZuIgIBaQX/zBaWI2Q7lhXcdSCiSwJ8QAQFDgj6HCvoYEBTG6lJTKlGL7r7d8XWPOHNsI4LTaJtbvClvMv/kqGcvFLxTcvFwDwlhOvBMSEKH0GSNtxIkwf8P+JDEsEe4ogYaZH6+5VeCJPiZPfCbHKbZ081SEt4UlhfqK0Ea/IeB/B+FUrBCcIW13v50+A65nC39gsSx1/Ej3852qOrJ+4BO4FgFwf/R/qwpeB2I7ycw+KdCvi9QFibZj+3IBPzsBHMyugp8bo8LtjvwD/SDK4c5q7lP+Ne1JJss+1OWmq3AVES32UNTroE3HmM38EFLI1BgYMoRi+2RRqOYLtndK3P5z5QRjJkyNylNPd+UlE1Vs6lrSP8DRX17vYrfRxIAAAAASUVORK5CYII="
                                    alt="clear-filters"></img>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="attendancepage-attendancelist-table">
                    <table border={1}>
                        {Content}
                    </table>
                </div>
            </div>
        </div>
    )
}

const AttendanceForm = () => {

    const [StudentRawData, setStudentRawData] = useState([]);
    const [Content, setContent] = useState(<select name="student" id="student" key={0}>
        <option value="">-- Choose a student --</option>
    </select>);
    const [FormData, setFormData] = useState({
        student_id: "",
        student_name: "",
        teacher_id: "",
        student_level: "",
        absent_date: "",
    });


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        ApiHub.GetAll("student").then((data) => { setStudentRawData(data) });
    }

    const handleStudent = (e) => {
        if (e.target.value) {
            const absentStudent = JSON.parse(e.target.value);
            setFormData((prevData) => ({
                ...prevData,
                student_id: absentStudent.student_id,
                student_name: absentStudent.student_name,
                student_level: absentStudent.student_level,
                // teacher_id: localStorage.getItem("Id"),
                teacher_id: 12345,
            }));
        }
    }

    const handleChanges = (event) => {
        const { name, value } = event.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    };

    const handleStudentList = (grade) => {

        if (grade === "") {
            setContent(<select name="student" id="student" key={0}>
                <option value="">-- Choose a student --</option>
            </select>);
            return;
        }

        const GradeGrouped = SharedUtilities.groupingItems(StudentRawData, "student_level");
        const AfterSort = SharedUtilities.safeSort(GradeGrouped[grade], "student_name");
        const StudentList = [];

        StudentList.push(<select name="student" id="student" onChange={handleStudent} key={2}>
            <option value="">-- Choose a student --</option>
            {AfterSort.map((student, index) => (
                <option key={index} value={JSON.stringify(student)}>{student.student_name}</option>
            ))}
        </select>);
        setContent(StudentList);
    }

    const [TableData, setTableData] = useState([]);

    const handleData = (e) => {
        e.preventDefault();

        // console.log(FormData);

        const hasErrors = Object.keys(FormData).some((key) => FormData[key] === "");
        if (hasErrors) {
            toast.error("Please fill the form correctly");
            return;
        }

        setTableData(prevData => [...prevData, { ...FormData }]);

        // console.log(TableData);

    }

    const handleDelete = (targetIndex) => {
        setTableData(prevData => prevData.filter((_, index) => index !== targetIndex));
    }

    const handleSendData = (e) => {
        e.preventDefault();

        if (TableData.length === 0) {
            toast.error("Please fill the form correctly");
            return;
        }

        ApiHub.SaveAll("studentreport/attendance/addall", TableData).then((status) => {
            if (status === 200) {
                toast.success("Uploaded sucussfully");
            }
        });

        setTableData([]);
    }

    const handleClear = () => {
        setTableData([]);
        toast.success("cleared", { duration: 2000 });
    }


    return (
        <div className="attendancepage">
            <div className="attendancepage-attendancelist">
                <header>
                    <h1 className="attendancepage-attendancelist-title">Update Absent Students</h1>
                    <div className='attendancepage-addBn'>
                        <Menu menuClassName="attendancepage-addmenu"
                            align={"start"}
                            arrow={true}
                            viewScroll={"close"}
                            position={"auto"}
                            direction='left'
                            menuButton={<MenuButton className="userprofileBn updateattendance-Bn">Add</MenuButton>} >

                            <div className="updateattendance-options">
                                <div className="attendancepage-updateattendance-field">
                                    <label htmlFor="date">Absent date</label>
                                    <input type="date" name="absent_date" id="absent_date" onChange={handleChanges} />
                                </div>
                                <div className="attendancepage-updateattendance-field">
                                    <label htmlFor="date">Grade</label>
                                    <select name="grade" id="grade" onChange={(e) => { handleStudentList(e.target.value) }} key={1}>
                                        <option value="">-- Choose a grade --</option>
                                        {importData.grades.map((grade, index) => (
                                            <option key={index} value={grade}>{grade}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="attendancepage-updateattendance-field">
                                    <label htmlFor="date">Student name</label>
                                    {Content}
                                </div>
                                <div className="attendancepage-updateattendance-Bnfield">
                                    <div></div>
                                    <button className='updateattendance-Bn' onClick={(e) => handleData(e)}>Insert</button>
                                </div>
                            </div>
                        </Menu >
                    </div>
                </header>
                <div className="attendancepage-table">
                    <table border={1}>
                        <thead>
                            <tr>
                                <th>S No.</th>
                                <th>Grade</th>
                                <th>Student Name</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {TableData.length != 0 ?
                                (TableData.map((element, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{element.student_level}</td>
                                        <td>{element.student_name}</td>
                                        <td>{element.absent_date}</td>
                                        <td><button className='redBn' onClick={() => handleDelete(index)}>Delete</button></td>
                                    </tr>
                                )))
                                :
                                <tr>
                                    <td colSpan={5} className='nodatatable'>No student added</td>
                                </tr>}
                        </tbody>
                        <tfoot></tfoot>
                    </table>
                </div>
                <div className="attendancepage-updateattendance">
                    <div className="attendancepage-updateattendance-field">
                        <Popup trigger={<button className='normalBn'>Clear All</button>}
                            modal nested contentStyle={{
                                width: "max-content", height: "max-content",
                                backgroundColor: "transparent", border: "none", boxShadow: "none"
                            }} >
                            {(close) => (
                                <div className='popmenu'>
                                    <h2>Are you sure?</h2>
                                    <p>This action cannot be undone.</p>
                                    <button onClick={() => { handleClear(); close() }} style={{ marginRight: "10px" }} className='normalBn'>
                                        Confirm
                                    </button>
                                    <button onClick={close} className='normalBn'>Cancel</button>
                                </div>
                            )}
                        </Popup>
                        <button className='normalBn' onClick={(e) => handleSendData(e)}>Upload</button>
                    </div>
                </div>
            </div >
        </div >
    )
}

export { AttendanceForm, AttendanceList };


import { useEffect, useState } from 'react';
import { toast } from "sonner";
import * as ApiHub from '../../utilities/ApiHub';
import * as SharedUtilities from '../../utilities/SharedUtilities';
import * as importData from '../../utilities/DataMembers';
import Popup from 'reactjs-popup';

const AccountEnquiry = () => {

    const [TableData, setTableData] = useState([]);
    const [WhichPage, setWhichPage] = useState('teacher');
    const [UserId, setUserId] = useState('');
    const [ShowActionSide, setShowActionSide] = useState(false);


    useEffect(() => {
        fetchData(WhichPage);
    }, []);

    const handleChange = (value) => {
        fetchData(value);
        setWhichPage(value);
    }

    const fetchData = (user) => {
        setTableData([]);
        ApiHub.GetAll(user).then((data) => setTableData(data));
    }

    const handleSearch = (searchkeys) => {
        if (!searchkeys) {
            fetchData(WhichPage);
            return;
        }

        const filteredData = TableData.filter((item) =>
        (
            WhichPage === "teacher" ?
                (
                    item.teacher_id.toString().includes(searchkeys) ||
                    item.teacher_name.toLowerCase().includes(searchkeys.toLowerCase())
                ) : (
                    item.student_id.toString().toLowerCase().includes(searchkeys.toLowerCase()) ||
                    item.student_name.toLowerCase().includes(searchkeys.toLowerCase())
                )
        )
        );

        // console.log(filteredData);
        setTableData(filteredData);
    }

    return (
        <div className="adminbackspace">
            <div className="listofusers">
                <div className="listofusers-topbar">
                    <div className='listofusers-searchbar'>
                        <input type="text" name="search" id="search" placeholder='Search'
                            onChange={(e) => { handleSearch(e.target.value); }} />
                    </div>
                    <select name="member" id="member" defaultValue={"teacher"}
                        onChange={(e) => { handleChange(e.target.value) }}>
                        <option value="teacher">Teacher</option>
                        <option value="student">Student</option>
                    </select>
                </div>
                {WhichPage === "teacher" &&
                    <TeacherTable TableData={TableData} setUserId={setUserId} ShowActionSide={ShowActionSide} setShowActionSide={setShowActionSide} />}
                {WhichPage === "student" &&
                    <StudentTable TableData={TableData} setTableData={setTableData} setUserId={setUserId} ShowActionSide={ShowActionSide} setShowActionSide={setShowActionSide} />}
            </div>
            <ActionSide UserId={UserId} WhichPage={WhichPage} ShowActionSide={ShowActionSide} setShowActionSide={setShowActionSide} />
        </div>
    )
}

const TeacherTable = ({ TableData, setUserId, ShowActionSide, setShowActionSide }) => {

    const sortedPeople = SharedUtilities.safeSort(TableData, "teacher_name");
    const TableArr = sortedPeople.map((element) => (
        <tr key={element.teacher_id}>
            <td>
                <a href="#"
                    onClick={(event) => {
                        event.preventDefault();
                        setUserId(element.teacher_id);
                        setShowActionSide(!ShowActionSide);
                    }}>
                    {element.teacher_id}
                </a>
            </td>
            <td>
                <a href="#"
                    onClick={(event) => {
                        event.preventDefault();
                        setUserId(element.teacher_id);
                        setShowActionSide(!ShowActionSide);
                    }}>
                    {element.teacher_name}
                </a>
            </td>
            <td>{element.teacher_subject}</td>
        </tr>
    ));

    return (
        <div className="listofusers-table">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Teacher Name</th>
                        <th>Teacher Subject</th>
                    </tr>
                </thead>
                <tbody>{TableArr}</tbody>
            </table>
        </div>
    )
}

const StudentTable = ({ TableData, setTableData, setUserId, ShowActionSide, setShowActionSide }) => {

    const [filterStudent, setfilterStudent] = useState([]);
    const [SelectedGrade, setSelectedGrade] = useState('Pre-LKG');
    const groupedByGrade = SharedUtilities.groupingItems(TableData, "student_level");
    useEffect(() => {
        displayGradeGroup(SelectedGrade);
    }, [TableData]);


    let TableArr = [];
    const displayGradeGroup = (grade) => {
        let GroupGrade = groupedByGrade[grade];
        if (GroupGrade) {
            GroupGrade = SharedUtilities.safeSort(GroupGrade, "student_name");
            GroupGrade.map((element) => {
                TableArr.push(
                    <tr key={element.student_id}>
                        <td>
                            <a href="#"
                                onClick={(event) => {
                                    event.preventDefault();
                                    setUserId(element.student_id);
                                    setShowActionSide(!ShowActionSide);
                                }}>
                                {element.student_id}
                            </a>
                        </td>
                        <td>
                            <a href="#"
                                onClick={(event) => {
                                    event.preventDefault();
                                    setUserId(element.student_id);
                                    setShowActionSide(!ShowActionSide);
                                }}>
                                {element.student_name}
                            </a>
                        </td>
                        <td>{element.student_level}</td>
                    </tr>
                );
            })
            setfilterStudent(TableArr);
        }
    };

    return (
        <div className="listofusers-table">
            <div className="listofusers-table-selectorDiv">
                <div></div>
                <select name="grade" id="grade" className='listofusers-table-selector' defaultValue={SelectedGrade}
                    onChange={(e) => {
                        displayGradeGroup(e.target.value);
                        setSelectedGrade(e.target.value);
                    }}>
                    <option value="">--Choose Grade--</option>
                    {importData.grades.map((grade) => (
                        <option key={grade} value={grade}>{grade}</option>
                    ))}
                </select>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Student Name</th>
                        <th>Student Grade</th>
                    </tr>
                </thead>
                <tbody>{filterStudent.length != 0 ? (filterStudent) : (<tr><td colSpan={3}>No Student</td></tr>)}</tbody>
            </table>
        </div >

    )
}

const ActionSide = ({ UserId, WhichPage, ShowActionSide, setShowActionSide }) => {

    const [SelectedUser, setSelectedUser] = useState([]);
    const [UserRole, setUserRole] = useState('');
    const [isRegistered, setisRegistered] = useState(false);

    useEffect(() => {
        getUser();
    }, [UserId, WhichPage])

    const getUser = () => {
        if (UserId === "" || (typeof UserId === 'string' && WhichPage === "teacher")) {
            return;
        }

        ApiHub.GetOneById(`${WhichPage}/search`, UserId).then((data) => {
            if (data) {
                setSelectedUser(data);
            }
        })

    }

    const generateUsername = (name) => {
        const cleanedName = name.toLowerCase().replace(/\s+/g, ""); // Remove spaces & lowercase
        const randomNum = Math.floor(Math.random() * 1000); // Random number (0-999)
        return `${cleanedName}${randomNum}`;
    };

    const generateTempPassword = (length = 8) => {
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
        let tempPassword = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            tempPassword += characters[randomIndex];
        }
        return tempPassword;
    };

    const UnblockUser = async () => {
        const sendData = {
            userid: SelectedUser.teacher_id || SelectedUser.student_id,
            acc_blockstatus: false,
        }

        // console.log(sendData);

        const hasErrors = Object.keys(sendData).some((key) => sendData[key] === "");
        if (hasErrors) {
            toast.error("Please fill the form correctly", { duration: 2000 });
            return;
        }

        ApiHub.Save("user/unblock", sendData).then((status) => {
            if (status === 200) {
                toast.success(`User unblock successfully`, { duration: 2000 });
                setisRegistered(true);
            }
        });
    }

    const ResetPassword = () => {
        let temppass = generateTempPassword(8);

        // console.log(temppass);

        const sendData = {
            userid: SelectedUser.teacher_id || SelectedUser.student_id,
            tempPassword: temppass,
        }

        // console.log(regData);

        const hasErrors = Object.keys(sendData).some((key) => sendData[key] === "");
        if (hasErrors) {
            toast.error("Please fill the form correctly", { duration: 2000 });
            return;
        }

        ApiHub.Save("user/temppassword", sendData).then((status) => {
            if (status === 200) {
                toast.success(`Temp password generated successfully`, { duration: 2000 });
                setisRegistered(true);
            }
        });

    }

    const NewUser = () => {

        if (WhichPage === "teacher") {
            setUserRole("ROLE_TEACHER");
        } else if (WhichPage === "student") {
            setUserRole("ROLE_STUDENT");
        }

        const regData = {
            userid: SelectedUser.teacher_id || SelectedUser.student_id,
            password: "pass",
            username: generateUsername(SelectedUser.student_name || SelectedUser.teacher_name),
            user_role: UserRole,
            acc_blockstatus: false,
        }

        // console.log(regData);

        const hasErrors = Object.keys(regData).some((key) => regData[key] === "");
        if (hasErrors) {
            if (regData.user_role === "") {
                toast.info("Please confirm again", { duration: 2000 });
            } else {
                toast.error("Please fill the form correctly", { duration: 2000 });
            }
            return;
        }

        ApiHub.Save("user/register", regData).then((status) => {
            if (status === 201) {
                toast.success(`User registered Successfully`, { duration: 2000 });
                setisRegistered(true);
            } else if (status === 409) {
                toast.error(`Credentials already generated for ID: ` + regData.userid, { duration: 2000 });
                setisRegistered(true);
            }
        });

    }

    return (
        <>
            <Popup open={ShowActionSide} onClose={() => ShowActionSide} modal>
                {WhichPage === "student" && <div className="actionside-teacher">
                    <h1 className='actionside-teacher-title'>Student Permission</h1>
                    <div className="teacher-field">
                        <span>Student ID:</span>
                        <span>{SelectedUser.student_id}</span>
                    </div>
                    <div className="teacher-field">
                        <span>Student Name:</span>
                        <span>{SelectedUser.student_name}</span>
                    </div>
                    <div className="teacher-field">
                        <span>Student Grade:</span>
                        <span>{SelectedUser.student_level}</span>
                    </div>
                </div>}
                {WhichPage === "teacher" && <div className="actionside-teacher">
                    <h1 className='actionside-teacher-title'>Teacher Permission</h1>
                    <div className="teacher-field">
                        <span>Teacher ID:</span>
                        <span>{SelectedUser.teacher_id}</span>
                    </div>
                    <div className="teacher-field">
                        <span>Teacher Name:</span>
                        <span>{SelectedUser.teacher_name}</span>
                    </div>
                    <div className="teacher-field">
                        <span>Teacher Subject:</span>
                        <span>{SelectedUser.teacher_subject}</span>
                    </div>
                    <div className='actionside-roleDiv'>
                        <label htmlFor="role">Role</label>
                        <select name="role" id="role" defaultValue={""} onChange={(e) => { setUserRole(e.target.value) }}>
                            <option value="">--Choose Role--</option>
                            <option value="ROLE_TEACHER">HOD</option>
                            <option value="ROLE_TEACHER">Teacher</option>
                        </select>
                    </div>
                </div>}
                <div className='actionside-Controllers'>
                    <div className='actionside-buttonDiv'>
                        <button className='actionside-button' onClick={() => { NewUser() }}>Create User</button>
                        <button className='actionside-button' onClick={() => { UnblockUser() }}>Unblock User</button>
                        <button className='actionside-button' onClick={() => { ResetPassword() }}>Reset Password</button>
                        <button className='actionside-button' onClick={() => { setShowActionSide(!ShowActionSide) }}>Cancel</button>
                    </div>
                </div>
            </Popup>
        </ >

    )
}

export default AccountEnquiry;
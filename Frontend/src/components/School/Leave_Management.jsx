import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import * as ApiHub from '../../utilities/ApiHub';
import * as SharedUtilities from '../../utilities/SharedUtilities';

const Leave_Management = () => {

    const [leave_ID, setleave_ID] = useState("");
    const [leave_date, setleave_date] = useState("");
    const [leave_reason, setleave_reason] = useState("");
    const [LeaveTableData, setLeaveTableData] = useState([]);
    const [ActiveScreen, setActiveScreen] = useState(null);
    const InsertformRef = React.useRef(null);
    const DeleteformRef = React.useRef(null);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        ApiHub.GetAll("school/leavemanagement").then((data) => { CreateTable(data); });
    }

    const CreateTable = (data) => {

        data = SharedUtilities.safeSort(data, "leave_date");
        const LocalArr = [];
        data.map((element, index) => {
            LocalArr.push(
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{element.leaveId}</td>
                    <td>{format(element.leave_date, "dd-MM-yyyy")}</td>
                    <td>{element.leave_reason}</td>
                </tr>
            );
        })
        setLeaveTableData(LocalArr);
    }

    const handleAdd = (event) => {
        event.preventDefault();

        const sendData = {
            leaveId: Math.floor(10000 + Math.random() * 90000),
            leave_date: leave_date,
            leave_reason: leave_reason
        }

        const hasErrors = Object.keys(sendData).some((key) => sendData[key] === '');
        if (hasErrors) {
            toast.error('Please fill the form correctly');
            return;
        }

        ApiHub.Save("school/leavemanagement/add", sendData).then((status) => {
            if (status === 200) {
                InsertformRef.current.reset();
                setleave_date("");
                setleave_reason("");
                fetchData();
                toast.success("Added Successfully", { duration: 2000 });
            }
        });

    }

    const handleDelete = (event) => {
        event.preventDefault();

        if (!leave_ID) {
            toast.error("Invaild Data", { duration: 2000 });
            return;
        }

        ApiHub.Delete("school/leavemanagement", leave_ID).then((status) => {
            if (status === 200) {
                DeleteformRef.current.reset();
                fetchData();
                toast.error("Deleted Successfully", { duration: 2000 });
            }
        });

    }

    return (
        <div className="leavemanagement">
            <div className="leavemanagement-table">
                <div className="leavemanagement-table-titleDiv">
                    <div>
                        <h1 className='leavemanagement-table-title'>Leave Management</h1>
                    </div>
                    <div className='leavemanagement-actionBn-div'>
                        <button className='leavemanagement-actionBn' onClick={() => setActiveScreen("addscreen")}>Add</button>
                        <button className='leavemanagement-actionBn' onClick={() => setActiveScreen("deletescreen")}>Delete</button>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {LeaveTableData}
                    </tbody>
                </table>
            </div>
            {ActiveScreen === "addscreen" && (<div className="leavemanagement-add">
                <form action="" ref={InsertformRef}>
                    <h1 className='leavemanagement-table-title'>Add Leave</h1>
                    <div className="leavemanagement-add-field">
                        <label htmlFor="leavedate">Leave Date: </label>
                        <input type="date" name="leavedate" id="leavedate"
                            onChange={(e) => { setleave_date(e.target.value) }}
                        />
                    </div>
                    <div className="leavemanagement-add-field">
                        <label htmlFor="leavereason">Leave Reason: </label>
                        <input type="text" name="leavereason" id="leavereason"
                            onChange={(e) => { setleave_reason(e.target.value) }}
                        />
                    </div>
                    <div className="leavemanagement-add-BnDiv">
                        <button className='leavemanagement-add-Bn' onClick={() => setActiveScreen(null)}>Cancel</button>
                        <button className='leavemanagement-add-Bn' onClick={handleAdd}>Insert</button>
                    </div>
                </form>
            </div>)}
            {ActiveScreen === "deletescreen" && (<div className="leavemanagement-add">
                <form action="" ref={DeleteformRef}>
                    <h1 className='leavemanagement-table-title'>Delete Leave</h1>
                    <div className="leavemanagement-add-field">
                        <label htmlFor="leavereason">Leave ID: </label>
                        <input type="text" name="leavereason" id="leavereason"
                            onChange={(e) => { setleave_ID(e.target.value) }}
                        />
                    </div>
                    <div className="leavemanagement-add-BnDiv">
                        <button className='leavemanagement-add-Bn' onClick={() => setActiveScreen(null)}>Cancel</button>
                        <button className='leavemanagement-add-Bn' onClick={handleDelete}>Delete</button>
                    </div>
                </form>
            </div>)
            }
        </div >
    )
}

export default Leave_Management;
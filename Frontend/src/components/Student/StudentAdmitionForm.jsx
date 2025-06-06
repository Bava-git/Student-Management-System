import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as ApiHub from '../../utilities/ApiHub';
import * as importData from '../../utilities/DataMembers';
import * as url from '../../utilities/urlController';

const StudentAdd = () => {
    const [CurrentPage, setCurrentPage] = useState(1);
    const Navigate = useNavigate();

    const [formData, setformData] = useState({
        student_id: "",
        student_level: "",
        student_name: "",
        student_fathername: "",
        student_mothername: "",
        student_parentphone: "",
        student_parentemail: "",
        student_emergencycontact: "",
        student_dob: "",
        student_streetname: "",
        student_city: "",
        student_zipcode: "",
        student_bloodgroup: "",
    });

    const [Style, setStyle] = useState({
        student_id: { borderColor: "black", borderWidth: "1px", borderStyle: "solid" },
        student_level: { borderColor: "black", borderWidth: "1px", borderStyle: "solid" },
        student_name: { borderColor: "black", borderWidth: "1px", borderStyle: "solid" },
        student_fathername: { borderColor: "black", borderWidth: "1px", borderStyle: "solid" },
        student_mothername: { borderColor: "black", borderWidth: "1px", borderStyle: "solid" },
        student_parentphone: { borderColor: "black", borderWidth: "1px", borderStyle: "solid" },
        student_parentemail: { borderColor: "black", borderWidth: "1px", borderStyle: "solid" },
        student_emergencycontact: { borderColor: "black", borderWidth: "1px", borderStyle: "solid" },
        student_dob: { borderColor: "black", borderWidth: "1px", borderStyle: "solid" },
        student_streetname: { borderColor: "black", borderWidth: "1px", borderStyle: "solid" },
        student_city: { borderColor: "black", borderWidth: "1px", borderStyle: "solid" },
        student_zipcode: { borderColor: "black", borderWidth: "1px", borderStyle: "solid" },
        student_bloodgroup: { borderColor: "black", borderWidth: "1px", borderStyle: "solid" },
    });

    const [MedicalformData, setMedicalformData] = useState({
        Medical_Issue1: "",
        Medical_Issue2: "",
        Medical_Issue3: "",
        Medical_Symptom1: "",
        Medical_Symptom2: "",
        Medical_Symptom3: "",
        Medical_Medicine1: "",
        Medical_Medicine2: "",
        Medical_Medicine3: "",

    });

    const prevStep = () => {
        setCurrentPage((prevStep) => prevStep - 1);
    }
    const nextStep = () => {
        const hasErrors = Object.keys(formData).some((key) => formData[key] === "");
        if (hasErrors) {
            validateAllFields();
            return;
        }
        setCurrentPage((prevStep) => prevStep + 1);
    }

    const renderPage = () => {
        switch (CurrentPage) {
            case 1:
                return <StudentAdd_Personal
                    formData={formData} setformData={setformData}
                    Style={Style} setStyle={setStyle} />;
            case 2:
                return <StudentAdd_Medical
                    formData={formData} setformData={setformData}
                    Style={Style} setStyle={setStyle}
                    MedicalformData={MedicalformData} setMedicalformData={setMedicalformData} />;
            case 3:
                return <StudentAdd_Review
                    formData={formData} MedicalformData={MedicalformData} />;
            default:
                return <StudentAdd_Personal
                    formData={formData} setformData={setformData}
                    Style={Style} setStyle={setStyle} />;
        }
    }

    const validateAllFields = () => {

        let updatedStyles = { ...Style };
        Object.keys(formData).forEach((key) => {
            updatedStyles[key] = {
                ...updatedStyles[key],
                borderColor: formData[key] === "" ? "red" : "green", // Red for empty fields
                borderWidth: "2px",
                borderStyle: "solid"
            };
        });
        setStyle(updatedStyles); // Update the style state

    };


    const SubmitData = () => {
        const hasErrors = Object.keys(formData).some((key) => formData[key] === "");
        if (hasErrors) {
            validateAllFields();
            return;
        }
        console.log(formData);
        // console.log(MedicalformData);
        ApiHub.Save("student/add", formData).then((status) => {
            if (status === 200) {
                ApiHub.Save("studentreport/medical", MedicalformData).then((status) => {
                    if (status === 200) {
                        toast.success("New Student details uploaded", { duration: 2000 });
                        Navigate(url.studentlist);
                    }
                });
            }
        });
    }

    return (
        <div className="renderPageview">
            <div className="renderPageDiv">
                {renderPage()}
            </div>
            <div className="studentadd-ActionBnContainerDiv">
                <div className="studentadd-ActionBnContainer">
                    {CurrentPage === 2 && (<button onClick={prevStep} className="studentadd-bns">Previous</button>)}
                    {CurrentPage === 1 && (<div></div>)}
                    {CurrentPage === 1 && (<button onClick={nextStep} className="studentadd-bns">Next</button>)}
                    {CurrentPage === 2 && (<button onClick={nextStep} className="studentadd-bns">Review</button>)}
                    {CurrentPage === 3 && (<button onClick={prevStep} className="studentadd-bns">Previous</button>)}
                    {CurrentPage === 3 && (<button onClick={SubmitData} className="studentadd-bns">Submit</button>)}
                </div>
            </div>
        </div>
    )
};

const StudentAdd_Personal = ({ formData, setformData, Style, setStyle }) => {

    const generateRandomNumber = () => {
        const number = Math.floor(1000 + Math.random() * 9000);
        setformData((prevData) => ({
            ...prevData,
            ["student_id"]: "STU" + number,
        }));
    };

    useEffect(() => {
        generateRandomNumber();
    }, [])

    const handleChanges = (event) => {
        const { name, value } = event.target;

        setformData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        setStyle((prevStyle) => ({
            ...prevStyle,
            [name]: {
                ...prevStyle[name],
                borderColor: value === "" ? "red" : "green",
                borderWidth: "2px",
                borderStyle: "solid"
            },
        }));
    };

    return (
        <div className="studentadd">
            <div className="studentadd-personalDiv">
                <h1 className="studentadd-title">New Student</h1>
                <div className="studentadd-field">
                    <label htmlFor="student_id">Student ID:</label>
                    <input type="text" name="student_id" id="student_id"
                        value={formData.student_id} style={Style.student_id} onChange={handleChanges} disabled />
                </div>
                <div className="studentadd-field">
                    <label htmlFor="student_level">Student Level:</label>
                    <select name="student_level" id="student_level"
                        value={formData.student_level} style={Style.student_level} onChange={handleChanges} >
                        <option value="">--Choose Grade--</option>
                        {importData.grades.map((grade) => (
                            <option key={grade} value={grade}>{grade}</option>
                        ))}
                    </select>
                </div>
                <div className="studentadd-field">
                    <label htmlFor="student_name">Student Name:</label>
                    <input type="text" name="student_name" id="student_name"
                        value={formData.student_name} style={Style.student_name} onChange={handleChanges} />
                </div>
                <div className="studentadd-field">
                    <label htmlFor="student_fathername">Father Name:</label>
                    <input type="text" name="student_fathername" id="student_fathername"
                        value={formData.student_fathername} style={Style.student_fathername} onChange={handleChanges} />
                </div>
                <div className="studentadd-field">
                    <label htmlFor="student_mothername">Mother Name:</label>
                    <input type="text" name="student_mothername" id="student_mothername"
                        value={formData.student_mothername} style={Style.student_mothername} onChange={handleChanges} />
                </div>
                <div className="studentadd-field">
                    <label htmlFor="student_parentphone">Parent Phone Number:</label>
                    <input type="text" name="student_parentphone" id="student_parentphone"
                        value={formData.student_parentphone} style={Style.student_parentphone} onChange={handleChanges} />
                </div>
                <div className="studentadd-field">
                    <label htmlFor="student_parentemail">Parent Email Id:</label>
                    <input type="text" name="student_parentemail" id="student_parentemail"
                        value={formData.student_parentemail} style={Style.student_parentemail} onChange={handleChanges} />
                </div>
                <div className="studentadd-field">
                    <label htmlFor="student_emergencycontact">Emergency Contact:</label>
                    <input type="text" name="student_emergencycontact" id="student_emergencycontact"
                        value={formData.student_emergencycontact} style={Style.student_emergencycontact} onChange={handleChanges} />
                </div>
                <div className="studentadd-field">
                    <label htmlFor="student_dob">Student DOB:</label>
                    <input type="date" name="student_dob" id="student_dob"
                        value={formData.student_dob} style={Style.student_dob} onChange={handleChanges} />
                </div>
                <div className="studentadd-field">
                    <label htmlFor="student_streetname">Room num and Street Name:</label>
                    <input type="text" name="student_streetname" id="student_streetname"
                        value={formData.student_streetname} style={Style.student_streetname} onChange={handleChanges} />
                </div>
                <div className="studentadd-field">
                    <label htmlFor="student_city">City:</label>
                    <input type="text" name="student_city" id="student_city"
                        value={formData.student_city} style={Style.student_city} onChange={handleChanges} />
                </div>
                <div className="studentadd-field">
                    <label htmlFor="student_zipcode">Zipcode:</label>
                    <input type="text" name="student_zipcode" id="student_zipcode"
                        value={formData.student_zipcode} style={Style.student_zipcode} onChange={handleChanges} />
                </div>
                <div className="studentadd-field">
                    <label htmlFor="student_bloodgroup">Blood Type:</label>
                    <select name="student_bloodgroup" id="student_bloodgroup"
                        value={formData.student_bloodgroup}
                        style={Style.student_bloodgroup} onChange={handleChanges} >
                        <option value="" disabled></option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

const StudentAdd_Medical = ({ MedicalformData, setMedicalformData, formData, setformData, Style, setStyle }) => {

    const handleChanges = (event) => {
        const { name, value } = event.target;

        setMedicalformData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    };

    return (
        <div className="studentadd">
            <div className="studentadd-personalDiv">
                <h1 className="studentadd-title">New Student Medical Details</h1>
                <div className="studentadd-table">
                    <table border={1}>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Medical Issue</th>
                                <th>Symptoms</th>
                                <th>Medicine</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1.</td>
                                <td><input type="text" name="Medical_Issue1"
                                    value={MedicalformData.Medical_Issue1} onChange={handleChanges}
                                /></td>
                                <td><input type="text" name="Medical_Symptom1"
                                    value={MedicalformData.Medical_Symptom1} onChange={handleChanges}
                                /></td>
                                <td><input type="text" name="Medical_Medicine1"
                                    value={MedicalformData.Medical_Medicine1} onChange={handleChanges}
                                /></td>
                            </tr>
                            <tr>
                                <td>2.</td>
                                <td><input type="text" name="Medical_Issue2"
                                    value={MedicalformData.Medical_Issue2} onChange={handleChanges}
                                /></td>
                                <td><input type="text" name="Medical_Symptom2"
                                    value={MedicalformData.Medical_Symptom2} onChange={handleChanges}
                                /></td>
                                <td><input type="text" name="Medical_Medicine2"
                                    value={MedicalformData.Medical_Medicine2} onChange={handleChanges}
                                /></td>
                            </tr>
                            <tr>
                                <td>3.</td>
                                <td><input type="text" name="Medical_Issue3"
                                    value={MedicalformData.Medical_Issue3} onChange={handleChanges}
                                /></td>
                                <td><input type="text" name="Medical_Symptom3"
                                    value={MedicalformData.Medical_Symptom3} onChange={handleChanges}
                                /></td>
                                <td><input type="text" name="Medical_Medicine3"
                                    value={MedicalformData.Medical_Medicine3} onChange={handleChanges}
                                /></td>
                            </tr>
                        </tbody>
                        <tfoot></tfoot>
                    </table>
                </div>
            </div>
        </div>
    )
}

const StudentAdd_Review = ({ MedicalformData, formData }) => {

    return (
        <div className="studentadd-reviewCover">
            <div className="studentadd">
                <div className="studentadd-personalDiv">
                    <h1 className="studentadd-title">Review Details</h1>
                    <div className="studentadd-field">
                        <label htmlFor="student_id">Student ID:</label>
                        <label htmlFor="student_id">{formData.student_id}</label>
                    </div>
                    <div className="studentadd-field">
                        <label htmlFor="student_level">Student Level:</label>
                        <label htmlFor="student_level">{formData.student_level}</label>
                    </div>
                    <div className="studentadd-field">
                        <label htmlFor="student_name">Student Name:</label>
                        <label htmlFor="student_name">{formData.student_name}</label>
                    </div>
                    <div className="studentadd-field">
                        <label htmlFor="student_fathername">Father Name:</label>
                        <label htmlFor="student_fathername">{formData.student_fathername}</label>
                    </div>
                    <div className="studentadd-field">
                        <label htmlFor="student_mothername">Mother Name:</label>
                        <label htmlFor="student_mothername">{formData.student_mothername}</label>
                    </div>
                    <div className="studentadd-field">
                        <label htmlFor="student_parentphone">Parent Phone Number:</label>
                        <label htmlFor="student_parentphone">{formData.student_parentphone}</label>
                    </div>
                    <div className="studentadd-field">
                        <label htmlFor="student_parentemail">Parent Email Id:</label>
                        <label htmlFor="student_parentemail">{formData.student_parentemail}</label>
                    </div>
                    <div className="studentadd-field">
                        <label htmlFor="student_emergencycontact">Emergency Contact:</label>
                        <label htmlFor="student_emergencycontact">{formData.student_emergencycontact}</label>
                    </div>
                    <div className="studentadd-field">
                        <label htmlFor="student_dob">Student DOB:</label>
                        <label htmlFor="student_dob">{formData.student_dob}</label>
                    </div>
                    <div className="studentadd-field">
                        <label htmlFor="student_streetname">Room num and Street Name:</label>
                        <label htmlFor="student_streetname">{formData.student_streetname}</label>
                    </div>
                    <div className="studentadd-field">
                        <label htmlFor="student_city">City:</label>
                        <label htmlFor="student_city">{formData.student_city}</label>
                    </div>
                    <div className="studentadd-field">
                        <label htmlFor="student_zipcode">Zipcode:</label>
                        <label htmlFor="student_zipcode">{formData.student_zipcode}</label>
                    </div>
                    <div className="studentadd-field">
                        <label htmlFor="student_bloodgroup">Blood Type:</label>
                        <label htmlFor="student_bloodgroup">{formData.student_bloodgroup}</label>
                    </div>
                </div>
            </div>
            <div className="studentadd">
                <div className="studentadd-personalDiv medical-review">
                    <h1 className="studentadd-title">Review Medical Details</h1>
                    <div className="studentadd-table">
                        <table border={1}>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Medical Issue</th>
                                    <th>Symptoms</th>
                                    <th>Medicine</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1.</td>
                                    <td>
                                        {MedicalformData.Medical_Issue1}</td>
                                    <td>
                                        {MedicalformData.Medical_Symptom1}</td>
                                    <td>
                                        {MedicalformData.Medical_Medicine1}</td>
                                </tr>
                                <tr>
                                    <td>2.</td>
                                    <td>
                                        {MedicalformData.Medical_Issue2}</td>
                                    <td>
                                        {MedicalformData.Medical_Symptom2}</td>
                                    <td>
                                        {MedicalformData.Medical_Medicine2}</td>
                                </tr>
                                <tr>
                                    <td>3.</td>
                                    <td>
                                        {MedicalformData.Medical_Issue3}</td>
                                    <td>
                                        {MedicalformData.Medical_Symptom3}</td>
                                    <td>
                                        {MedicalformData.Medical_Medicine3}</td>
                                </tr>
                            </tbody>
                            <tfoot></tfoot>
                        </table>
                    </div>
                </div>
            </div >
        </div>
    )
}

export { StudentAdd, StudentAdd_Medical, StudentAdd_Personal };


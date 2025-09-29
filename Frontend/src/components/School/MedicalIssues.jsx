import { useEffect, useState } from 'react';
import * as ApiHub from '../../utilities/ApiHub';

const MedicalIssues = () => {

    const [MedicalTableData, setMedicalTableData] = useState([]);

    useEffect(() => {
        ApiHub.GetAll("student/medical").then((data) => {
            CreateTable(data);
        });
    }, [])

    const CreateTable = async (data) => {
        const fetchStudentDetails = async (studentId) => {
            const response = await ApiHub.GetOneById("student/search", studentId);
            return `${response.student_id} | ${response.student_name} | ${response.student_level}`;
        };

        const tableData = await Promise.all(
            data.map(async (element, index) => {
                const studentDetails = await fetchStudentDetails(element.student_id);
                return (
                    <details key={index}>
                        <summary>{studentDetails}</summary>
                        <table>
                            <thead>
                                <tr>
                                    <th>Medical Issue</th>
                                    <th>Symptom</th>
                                    <th>Medicine</th>
                                </tr>
                            </thead>
                            <tbody>
                                {element.Medical_Issue1 != "" &&
                                    <tr>
                                        <td>{element.Medical_Issue1}</td>
                                        <td>{element.Medical_Symptom1}</td>
                                        <td>{element.Medical_Medicine1}</td>
                                    </tr>}
                                {element.Medical_Issue2 != "" &&
                                    <tr>
                                        <td>{element.Medical_Issue2}</td>
                                        <td>{element.Medical_Symptom2}</td>
                                        <td>{element.Medical_Medicine2}</td>
                                    </tr>}
                                {element.Medical_Issue3 != "" &&
                                    <tr>
                                        <td>{element.Medical_Issue3}</td>
                                        <td>{element.Medical_Symptom3}</td>
                                        <td>{element.Medical_Medicine3}</td>
                                    </tr>}
                            </tbody>
                        </table>
                    </details>
                );
            })
        );

        setMedicalTableData(tableData);
    };

    return (
        <div className="leavemanagement">
            <div className="medicaldetails">
                <div className="leavemanagement-table-titleDiv">
                    <h1 className='leavemanagement-table-title'>Student Medical Issues</h1>
                </div>
                <div className='medicaldetails-table'>
                    {MedicalTableData}
                </div>
            </div>
        </div>
    )
}

export default MedicalIssues;
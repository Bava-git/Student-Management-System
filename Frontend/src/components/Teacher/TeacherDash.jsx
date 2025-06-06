import { useEffect, useState } from 'react';
import { toast } from "sonner";
import * as ApiHub from '../../utilities/ApiHub';

const TeacherAdd = () => {

  const [teacher_id, setteacher_id] = useState("");
  const [teacher_name, setteacher_name] = useState("");
  const [teacher_dob, setteacher_dob] = useState('');
  const [teacher_gender, setteacher_gender] = useState('');
  const [teacher_street_name, setteacher_street_name] = useState('');
  const [teacher_city, setteacher_city] = useState('');
  const [teacher_marital_status, setteacher_marital_status] = useState('');
  const [teacher_phone_num, setteacher_phone_num] = useState('');
  const [teacher_email, setteacher_email] = useState('');
  const [teacher_education, setteacher_education] = useState('');
  const [teacher_course, setteacher_course] = useState('');
  const [teacher_aadhar_num, setteacher_aadhar_num] = useState('');
  const [teacher_date_of_hire, setteacher_date_of_hire] = useState('');
  const [teacher_previous_employer, setteacher_previous_employer] = useState('');
  const [teacher_experience, setteacher_experience] = useState('');
  const [teacher_salary, setteacher_salary] = useState('');
  const [teacher_background_check, setteacher_background_check] = useState(true);
  const [teacher_subject, setteacher_subject] = useState("");
  const [Error, setError] = useState('Error');
  const [Style, setStyle] = useState({});

  const generateRandomNumber = () => {
    const number = Math.floor(100000 + Math.random() * 900000);
    setteacher_id(number);
  };

  useEffect(() => {
    generateRandomNumber();
  }, [])

  const sendData = (event) => {
    event.preventDefault();
    setError("");

    if (Error === "Error") {
      setStyle({ borderColor: "red", borderWidth: "2px", borderStyle: "solid" });
    }

    const sendData = {
      teacher_id, teacher_aadhar_num, teacher_background_check,
      teacher_city, teacher_course, teacher_dob, teacher_date_of_hire,
      teacher_education, teacher_email, teacher_experience, teacher_gender,
      teacher_marital_status, teacher_name, teacher_phone_num,
      teacher_previous_employment: teacher_previous_employer, teacher_salary, teacher_street_name, teacher_subject
    }

    ApiHub.Save("teacher/add", sendData).then((status) => {
      if (status === 200) {
        toast.success("New teacher details upload successfuly", { duration: 2000 });
      }
    });
  }

  return (
    <div className="teacherDiv">
      <div className="addteacherDiv">
        <h3 className="addteacher-title">New Recruitment details</h3>
        {/* <form action=""> */}
        <div className="addteacher-field">
          <label htmlFor="teacherid">ID:</label>
          <input type="text" className="teacherid" autoComplete="off" id="teacherid"
            value={teacher_id} onChange={(e) => setteacher_id(e.target.value)}
          />
        </div>
        {!teacher_id && !Error && <span className='Error-Message'>empty</span>}
        <div className="addteacher-field">
          <label htmlFor="teachername">Full Name:</label>
          <input type="text" className="teachername" id="teachername"
            value={teacher_name} onChange={(e) => setteacher_name(e.target.value)}
          />
        </div>
        {!teacher_name && !Error && <span className='Error-Message'>empty</span>}
        <div className="addteacher-field">
          <label htmlFor="teacherage">DOB:</label>
          <input type="date" className="teacherage" id="teacherage"
            value={teacher_dob} onChange={(e) => setteacher_dob(e.target.value)} />
        </div>
        {!teacher_dob && !Error && <span className='Error-Message'>empty</span>}
        <div className="addteacher-field">
          <label htmlFor="teachergender">Gender:</label>
          <select name="" id="teachergender" className="teachergender"
            defaultValue={teacher_gender} onChange={(e) => setteacher_gender(e.target.value)}>
            <option value="" disabled></option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        {!teacher_gender && !Error && <span className='Error-Message'>empty</span>}
        <div className="addteacher-field">
          <label htmlFor="teacherstreetname">Flat Num & Street Name:</label>
          <input type="text" className="teacherstreetname" id="teacherstreetname"
            value={teacher_street_name} onChange={(e) => setteacher_street_name(e.target.value)} />
        </div>
        {!teacher_street_name && !Error && <span className='Error-Message'>empty</span>}
        <div className="addteacher-field">
          <label htmlFor="teachercity">City:</label>
          <input type="text" className="teachercity" id="teachercity"
            value={teacher_city} onChange={(e) => setteacher_city(e.target.value)} />
        </div>
        {!teacher_city && !Error && <span className='Error-Message'>empty</span>}
        <div className="addteacher-field">
          <label htmlFor="teachermaritalstatus">Marital status:</label>
          <select name="" id="teachermaritalstatus" className="teachermaritalstatus"
            defaultValue={teacher_marital_status} onChange={(e) => setteacher_marital_status(e.target.value)}>
            <option value="" disabled></option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
          </select>
        </div>
        {!teacher_marital_status && !Error && <span className='Error-Message'>empty</span>}
        <div className="addteacher-field">
          <label htmlFor="teacherphonenumber">Phone number:</label>
          <input type="text" className="teacherphonenumber" id="teacherphonenumber" value={teacher_phone_num} onChange={(e) => setteacher_phone_num(e.target.value)} />
        </div>
        {!teacher_phone_num && !Error && <span className='Error-Message'>empty</span>}
        <div className="addteacher-field">
          <label htmlFor="teacheremailaddress">Email Address:</label>
          <input type="text" className="teacheremailaddress" id="teacheremailaddress" value={teacher_email} onChange={(e) => setteacher_email(e.target.value)} />
        </div>
        {!teacher_email && !Error && <span className='Error-Message'>empty</span>}
        <div className="addteacher-field">
          <label htmlFor="teachereducation">Education:</label>
          <input type="text" className="teachereducation" id="teachereducation" value={teacher_education} onChange={(e) => setteacher_education(e.target.value)} />
        </div>
        {!teacher_education && !Error && <span className='Error-Message'>empty</span>}
        <div className="addteacher-field">
          <label htmlFor="teacheradditionalcourse">Additional Course:</label>
          <input type="text" className="teacheradditionalcourse" id="teacheradditionalcourse" value={teacher_course} onChange={(e) => setteacher_course(e.target.value)} />
        </div>
        {!teacher_course && !Error && <span className='Error-Message'>empty</span>}
        <div className="addteacher-field">
          <label htmlFor="teacheraadharnumber">Aadhar Number:</label>
          <input type="text" className="teacheraadharnumber" id="teacheraadharnumber" value={teacher_aadhar_num} onChange={(e) => setteacher_aadhar_num(e.target.value)} />
        </div>
        {!teacher_aadhar_num && !Error && <span className='Error-Message'>empty</span>}
        <div className="addteacher-field">
          <label htmlFor="teacherdateofhire">Date of Hire:</label>
          <input type="date" className="teacherdateofhire" id="teacherdateofhire" value={teacher_date_of_hire} onChange={(e) => setteacher_date_of_hire(e.target.value)} />
        </div>
        {!teacher_date_of_hire && !Error && <span className='Error-Message'>empty</span>}
        <div className="addteacher-field">
          <label htmlFor="teacherpreviousemployment">Previous Employer:</label>
          <input type="text" className="teacherpreviousemployment" id="teacherpreviousemployment" value={teacher_previous_employer} onChange={(e) => setteacher_previous_employer(e.target.value)} />
        </div>
        {!teacher_previous_employer && !Error && <span className='Error-Message'>empty</span>}
        <div className="addteacher-field">
          <label htmlFor="teacheryearsofexperience">Years of Experience:</label>
          <input type="text" className="teacheryearsofexperience" id="teacheryearsofexperience" value={teacher_experience} onChange={(e) => setteacher_experience(e.target.value)} />
        </div>
        {!teacher_experience && !Error && <span className='Error-Message'>empty</span>}
        <div className="addteacher-field">
          <label htmlFor="teachersalary">Salary Information:</label>
          <select name="" id="teachersalary" className="teachersalary"
            defaultValue={teacher_salary} onChange={(e) => setteacher_salary(e.target.value)}>
            <option value="" disabled></option>
            <option value="10000">10,000</option>
            <option value="15000">15,000</option>
            <option value="20000">20,000</option>
            <option value="25000">25,000</option>
          </select>
        </div>
        {!teacher_salary && !Error && <span className='Error-Message'>empty</span>}
        <div className="addteacher-field">
          <label htmlFor="teachersubject">Area of knowledge:</label>
          <select name="" id="teachersubject" className="teachersubject"
            defaultValue={teacher_subject} onChange={(e) => setteacher_subject(e.target.value)}>
            <option value="" disabled></option>
            <option value="Tamil">Tamil</option>
            <option value="English">English</option>
            <option value="Maths">Maths</option>
            <option value="Science">Science</option>
            <option value="Social Science">Social Science</option>
          </select>
        </div>
        {!teacher_subject && !Error && <span className='Error-Message'>empty</span>}
        <div className="addteacher-bnDiv">
          <button className="addteacher-Bn" onClick={sendData}>Submit</button>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};


const TeacherList = () => {
  const [TableRow, setTableRow] = useState([]);

  useEffect(() => {

    ApiHub.GetAll("teacher").then((data) => { filterrow(data); });

  }, []);

  const filterrow = (myarr) => {
    let rows = [];
    for (let i = 0; i < myarr.length; i++) {
      const element = myarr[i];

      rows.push(
        <tr key={element.id}>
          <td>{element.teacher_id}</td>
          <td>{element.teacher_name}</td>
          <td>{element.teacher_subject}</td>
          <td>{element.teacher_email}</td>
          <td>{element.teacher_phone_num}</td>
        </tr>);
    }
    setTableRow(rows);
  }

  return (
    <div className="teacherlistDiv">
      <h3 className="teacherlistDiv-title">Teacher List</h3>
      <table className="teacherlisttable" border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Department</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>{TableRow}</tbody>
      </table>
    </div>
  );
};

export { TeacherAdd, TeacherList };


import { useEffect, useState } from "react";
import Pagination from '../../utilities/Pagination';
import * as XLSX from "xlsx";
import * as ApiHub from '../../utilities/ApiHub';
import * as importData from '../../utilities/DataMembers';
import * as SharedUtilities from '../../utilities/SharedUtilities';

const StudentOverAllView = () => {

  const [Key, setKey] = useState([]);
  const [MarkSheet, setMarkSheet] = useState([]);
  const [WhichToShow, setWhichToShow] = useState('');
  const ListOfExam = new Map(new Map([
    ['Personal Details', 'Personal Details'],
    ['midterm1', 'Mid Term l'],
    ['midterm2', 'Mid Term ll'],
    ['midterm3', 'Mid Term lll'],
    ['quarterly', 'Quarterly'],
    ['halfyearly', 'Half Yearly'],
    ['annual', 'Annual']
  ]));
  const [ExamIndex, setExamIndex] = useState("Personal Details");
  const [StudardIndex, setStudardIndex] = useState("Pre-LKG");



  useEffect(() => {
    handleStudentList("Pre-LKG");
    handleChange("Personal Details");
  }, []);

  const handleStudentList = async (standard) => {

    ApiHub.GetAll("student").then((data) => {
      setKey(data.filter((student) => {
        return student.student_level.toLowerCase() === standard.toLowerCase();
      }));
    })

  }

  const handleChange = (page) => {
    setWhichToShow(page);
  }

  const exportToExcel = () => {
    let TableData = "";
    let SheetName = "";
    let FileName = "";
    if (WhichToShow === "Personal Details") {
      TableData = Key;
      SheetName = "StudentDetails"
      FileName = "StudentDetails " + Date();
    } else if (WhichToShow != "Personal Details" && MarkSheet.length > 0) {
      TableData = MarkSheet;
      SheetName = "StudentMarkSheet"
      FileName = "StudentMarkSheet " + Date();
    }

    const worksheet = XLSX.utils.json_to_sheet(TableData); // Convert JSON to sheet
    const workbook = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, SheetName); // Append the sheet
    XLSX.writeFile(workbook, `${FileName}.xlsx`); // Download the file
  };

  const [TempStorage, setTempStorage] = useState([]);

  const handleSearch = (searchkeys) => {
    if (!searchkeys) {
      setKey(TempStorage);
      return;
    }

    if (TempStorage.length === 0) {
      setTempStorage(Key);
    }

    const filteredData = TempStorage.filter((student) => (
      student.student_id.toString().toLowerCase().includes(searchkeys.toLowerCase()) ||
      student.student_name.toLowerCase().includes(searchkeys.toLowerCase())
    ));

    setKey(filteredData);
  };


  return (
    <div className="studentdash">
      <div className="studentdash-topbar">
        <div className="standardlist">
          {importData.grades.map((grade) => (
            <button key={grade}
              className={`standardlist-section ${StudardIndex === grade ? 'active' : ''}`}
              onClick={(e) => { setStudardIndex(grade); handleStudentList(grade); }}
            >{grade}</button>
          ))}
        </div>
        <div className="studentdash-topbar-rightside">
          <div className="studentdash-topbar-ExamSelector">
            {[...ListOfExam.entries()].map(([key, value]) => (
              <button key={key}
                className={ExamIndex === key ? "active" : ""}
                onClick={() => { setExamIndex(key); handleChange(key); }}
              >{value}</button>
            ))}
          </div>
          <div className="studentdash-EndSide">
            <div className="studentdash-searchDiv">
              <input type="text" name="search" id="search"
                className="studentdash-topbar-search" placeholder="Search" onChange={(e) => handleSearch(e.target.value)} />
            </div>
            <div className="studentdash-topbar-downloadBnDiv">
              <button className="studentdash-topbar-downloadBn" onClick={exportToExcel}>Download</button>
            </div>
          </div>
        </div>
      </div>
      <div className="Container_grid">
        <div className="Container_grid2">
          {WhichToShow === "Personal Details" ?
            (<Student_PersonalData students={Key} examname={WhichToShow} />)
            : (<Student_ExamResults students={Key} examname={WhichToShow} setMarkSheet={setMarkSheet} />)}
        </div>
      </div>
    </div>
  )
}

const Student_PersonalData = ({ students, examname }) => {

  const [paginatedItems, setPaginatedItems] = useState([]);
  students = SharedUtilities.safeSort(students, "student_name");

  return (
    <div className="studentlist">
      <h3 className="studentlist-title">Student List - {students[0]?.student_level}</h3>
      <div className="studentlist-TableContainer">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Father Name</th>
              <th>Mother Name</th>
              <th>Parent Email</th>
              <th>Parent Phone</th>
              <th>Emergency Contact</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((element) => (
              <tr key={element.student_id}>
                <td>{element.student_id}</td>
                <td><a href={`studentreport/${element.student_id}`}>{element.student_name}</a></td>
                <td>{element.student_fathername}</td>
                <td>{element.student_mothername}</td>
                <td>{element.student_parentemail}</td>
                <td>{element.student_parentphone}</td>
                <td>{element.student_emergencycontact}</td>
              </tr>
            ))}
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
      <div className="pagination-container">
        <Pagination itemsPerPage={10} items={students} onPageChange={setPaginatedItems} />
      </div>
    </div >
  )
}

const Student_ExamResults = ({ students, examname, setMarkSheet }) => {

  const [Filter, setFilter] = useState([]);
  let tempexamname = examname;
  const [paginatedItems, setPaginatedItems] = useState([]);
  students = SharedUtilities.safeSort(students, "student_name");

  if (examname === "") {
    tempexamname = "midterm1";
  }

  useEffect(() => {
    handleStudentList(tempexamname);
  }, [examname, students])

  const handleStudentList = async (tempexamname) => {

    ApiHub.GetAll(`student/by?examName=${tempexamname}&studentGrade=${students[0]?.student_level.toLowerCase()}`).then((data) => {
      setFilter(data);
      setMarkSheet(data);
    });

  }

  let MyArr = [];
  let titlegrade = "";

  let length = paginatedItems?.length ?? 0;
  for (let i = 0; i < length; i++) {
    const element1 = paginatedItems[i];
    const element2 = Filter[i];

    if (!element2) return;

    MyArr.push(
      <tr key={element1.student_id}>
        <td>{element1.student_id}</td>
        <td>{element1.student_name}</td>
        <td>{element2.tamil}</td>
        <td>{element2.english}</td>
        <td>{element2.maths}</td>
        <td>{element2.science}</td>
        <td>{element2.socialscience}</td>
        <td>{(element2.tamil > 34 && element2.english > 34 &&
          element2.maths > 34 && element2.science > 34 && element2.socialscience > 34) ? "Pass" : "Fail"}</td>
      </tr>
    );
    titlegrade = element1.student_level;
  }
  titlegrade = titlegrade.substring(0, 1).toUpperCase() + titlegrade.substring(1, titlegrade.length).toLowerCase();

  return (
    <div className="studentlist">
      <h3 className="studentlist-title">Student List - {titlegrade}</h3>
      <div className="studentlist-TableContainer">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Tamil</th>
              <th>English</th>
              <th>Maths</th>
              <th>Science</th>
              <th>Social Science</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {MyArr}
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
      <div className="pagination-container">
        <Pagination itemsPerPage={10} items={students} onPageChange={setPaginatedItems} />
      </div>
    </div>
  )
}




export { Student_ExamResults, Student_PersonalData, StudentOverAllView };

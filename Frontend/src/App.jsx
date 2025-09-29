import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";

// import URL
import * as url from "./utilities/urlController";

// Admin pages
import Admin from "./components/Admin/Admin";
import School from "./components/School/School";
import Student from "./components/Student/Student";
import Teacher from "./components/Teacher/Teacher";

// Credential
import ChangePassword from "./components/Credential/ChangePassword";
import Login from "./components/Credential/Login";
import { StudentProfile, TeacherProfile } from './components/Credential/Profile';

// import PAGES
import ExamList from "./components/ExamList";
import { Homepage } from "./components/HomePageFooter";
import LeftSliter from "./components/LeftSliter";
import Header from "./components/NavBar";
import PrivateComponents from "./components/PrivateComponents";
import MedicalIssues from './components/School/MedicalIssues';
import Exam_Schedulle from './components/School/Exam_Schedulle';
import { AttendanceForm, AttendanceList } from "./components/Student/AttendanceEnquiry";
import { StudentAdd } from "./components/Student/StudentAdmitionForm";
import { StudentOverAllView } from "./components/Student/StudentOverAll";
import { StudentReportUpload, StudentReportView } from "./components/Student/StudentReport";
import { UpcomingAssessments, UpcomingExams } from "./components/Student/UpcomingEvents";
import { AssessmentForm, AssessmentSubmittedList } from "./components/Teacher/AssessmentForm";
import { TeacherAdd, TeacherList } from "./components/Teacher/TeacherDash";
import TestScreen from './components/Test/TestScreen';

// import CSS
import "./assets/css/Admin.css";
import "./assets/css/Assessment.css";
import "./assets/css/AttendanceEnquiry.css";
import "./assets/css/Credential.css";
import "./assets/css/HomePageFooter.css";
import "./assets/css/LeftSliter.css";
import "./assets/css/Login.css";
import "./assets/css/MedicalIssues.css";
import "./assets/css/NavBar.css";
import './assets/css/Pagination.css';
import "./assets/css/School.css";
import "./assets/css/StudentOverAll.css";
import "./assets/css/StudentReport.css";
import "./assets/css/TeacherDash.css";
import './components/Test/TestScreen.css';

function App() {

  return (
    <>
      <Toaster expand={true} richColors position='top-right' />
      <BrowserRouter>
        <Header />
        <LeftSliter />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path={url.login} element={<Login />} />

          <Route element={<PrivateComponents allowedRoles={["ROLE_TEACHER", "ROLE_ADMIN"]} />}>
            <Route path={url.teacherprofile} element={<TeacherProfile />} />
            <Route path={url.teacherlist} element={<TeacherList />} />
            <Route path={url.assessmentform} element={<AssessmentForm />} />
            <Route path={url.studentlist} element={<StudentOverAllView />} />
            <Route path={url.attendancelist} element={<AttendanceList />} />
            <Route path={url.attendanceform} element={<AttendanceForm />} />
            <Route path={url.assessmentsubmittedlist} element={<AssessmentSubmittedList />} />
            <Route path={url.studentadd} element={<StudentAdd />} />
            <Route path={url.studentreportupload} element={<StudentReportUpload />} />
            <Route path={url.examlist} element={<ExamList />} />
            <Route path={url.examschedulle} element={<Exam_Schedulle />} />
            <Route path={url.medicalssues} element={<MedicalIssues />} />
          </Route>

          <Route element={<PrivateComponents allowedRoles={["ROLE_STUDENT", "ROLE_ADMIN"]} />}>
            <Route path={url.studentprofile} element={<StudentProfile />} />
            <Route path={url.upcomingexams} element={<UpcomingExams />} />
            <Route path={url.upcomingassessments} element={<UpcomingAssessments />} />
          </Route>

          <Route element={<PrivateComponents allowedRoles={["ROLE_TEACHER", "ROLE_STUDENT", "ROLE_ADMIN"]} />}>
            <Route path={url.studentreportview} element={<StudentReportView />} />
            <Route path={url.changepassword} element={<ChangePassword />} />
          </Route>

          <Route element={<PrivateComponents allowedRoles={["ROLE_ADMIN"]} />}>
            <Route path="/testscreen" element={<TestScreen />} />
            <Route path={"/admin"} element={<Admin />} />

            <Route path={url.school} element={<School />} />
            <Route path={url.teacher} element={<Teacher />} />
            <Route path={url.teacheradd} element={<TeacherAdd />} />
            <Route path={url.student} element={<Student />} />
          </Route>
        </Routes>
      </BrowserRouter >
    </>
  );
}

export default App;

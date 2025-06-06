//Admin
export const login = "/login";
export const admin = "/admin";
export const teacher = "/teacher"
export const student = "/student";
export const school = "/school";

// School
export const attendancelist = "/studentreport/attendance";
export const attendanceform = "/studentreport/attendance/update";

// Teacher CRUD
export const teacheradd = "/teacher/add"
export const teacherlist = "/teacherlist";
export const studentreportupload = "/studentreport/upload";

// Student
export const studentlist = "/studentlist";
export const studentadd = "/student/add";
export const studentreportview = "/studentreport/:id";
export const upcomingexams = "/student/upcoming/exams";
export const upcomingassessments = "/student/upcoming/assessments";
export const medicalssues = "/student/medicalssues";

// Exam & Assessments
export const examlist = "/student/examschedulelist";
export const assessmentform = "/studentreport/assessment";
export const assessmentsubmittedlist = "/studentreport/assessment/update";

// Profile
export const teacherprofile = "/teacher/profile"
export const studentprofile = "/student/profile";
export const changepassword = "/changepassword";
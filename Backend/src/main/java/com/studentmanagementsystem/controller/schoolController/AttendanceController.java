package com.studentmanagementsystem.controller.schoolController;

import com.studentmanagementsystem.model.schoolModel.Attendance;
import com.studentmanagementsystem.service.schoolService.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("studentreport/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @GetMapping("/{studentId}")
    public List<Attendance> listattendancebystudentid(@PathVariable String studentId) {
        return attendanceService.listattendancebystudentid(studentId);
    }

    @GetMapping
    public List<Attendance> fullattendancelist() {
        return attendanceService.fullattendancelist();
    }

    @PostMapping("/add")
    public Attendance saveAttendance(@RequestBody Attendance attendance) {
        return attendanceService.saveAttendance(attendance);
    }

    @PostMapping("/addall")
    public List<Attendance> saveAllAttendance(@RequestBody List<Attendance> attendance) {
        return attendanceService.saveAllAttendance(attendance);
    }

    @DeleteMapping("/delete/{Id}")
    private void deleteAttendance(@PathVariable long Id) {
        attendanceService.deleteAttendance(Id);
    }


}

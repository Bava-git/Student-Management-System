package com.studentmanagementsystem.service.schoolService;

import com.studentmanagementsystem.model.schoolModel.Attendance;
import com.studentmanagementsystem.repository.schoolRepository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    public List<Attendance> listattendancebystudentid(String Student_id) {
        return attendanceRepository.listattendancebystudentid(Student_id);
    }

    public List<Attendance> fullattendancelist() {
        return attendanceRepository.findAll();
    }

    public Attendance saveAttendance(Attendance attendance) {
        return attendanceRepository.save(attendance);
    }

    public List<Attendance> saveAllAttendance(List<Attendance> attendance) {
        return attendanceRepository.saveAll(attendance);
    }

    public void deleteAttendance(long Id) {
        attendanceRepository.deleteById(Id);
    }

}

package com.studentmanagementsystem.repository.schoolRepository;

import com.studentmanagementsystem.model.schoolModel.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    @Query(value = "Select * from attendancedb where student_id = :studentId", nativeQuery = true)
    List<Attendance> listattendancebystudentid(@Param("studentId") String StudentID);
}

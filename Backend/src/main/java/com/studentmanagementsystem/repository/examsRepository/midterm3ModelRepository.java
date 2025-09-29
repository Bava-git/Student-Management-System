package com.studentmanagementsystem.repository.examsRepository;

import com.studentmanagementsystem.model.examsModel.Midterm_Three;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface midterm3ModelRepository extends JpaRepository<Midterm_Three, Long> {

    @Query(value = "SELECT * FROM midterm_3 WHERE student_id = :studentId", nativeQuery = true)
    List<Midterm_Three> findbystudentId(@Param("studentId") String StudentID);

    List<?> findByStudentGrade(String studentGrade);
}

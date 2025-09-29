package com.studentmanagementsystem.repository.examsRepository;

import com.studentmanagementsystem.model.examsModel.Midterm_One;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface midterm1ModelRepository extends JpaRepository<Midterm_One, Long> {

    @Query(value = "SELECT * FROM midterm_1 WHERE student_id = :studentId", nativeQuery = true)
    List<Midterm_One> findbystudentId(@Param("studentId") String StudentID);

    List<?> findByStudentGrade(String studentGrade);
}

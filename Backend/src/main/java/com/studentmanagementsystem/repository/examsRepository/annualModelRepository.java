package com.studentmanagementsystem.repository.examsRepository;

import com.studentmanagementsystem.model.examsModel.Annual;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface annualModelRepository extends JpaRepository<Annual, Long> {

    @Query(value = "SELECT * FROM annual WHERE student_id = :studentId", nativeQuery = true)
    List<Annual> findbystudentId(@Param("studentId") String StudentID);

    List<?> findByStudentGrade(String studentGrade);
}

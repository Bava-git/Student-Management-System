package com.studentmanagementsystem.repository.examsRepository;

import com.studentmanagementsystem.model.examsModel.Quarterly;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface quarterlyModelRepository extends JpaRepository<Quarterly, Long> {

    @Query(value = "SELECT * FROM quarterly WHERE student_id = :studentId", nativeQuery = true)
    List<Quarterly> findbystudentId(@Param("studentId") String StudentID);

    List<?> findByStudentGrade(String studentGrade);
}

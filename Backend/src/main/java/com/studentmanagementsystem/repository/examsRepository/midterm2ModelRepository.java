package com.studentmanagementsystem.repository.examsRepository;

import com.studentmanagementsystem.model.examsModel.Midterm_Two;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface midterm2ModelRepository extends JpaRepository<Midterm_Two, Long> {

    @Query(value = "SELECT * FROM midterm_2 WHERE student_id = :studentId", nativeQuery = true)
    List<Midterm_Two> findbystudentId(@Param("studentId") String StudentID);
}

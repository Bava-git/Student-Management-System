package com.studentmanagementsystem.repository.examsRepository;

import com.studentmanagementsystem.model.examsModel.Half_yearly;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface halfyearlyModelRepository extends JpaRepository<Half_yearly, Long> {

    @Query(value = "SELECT * FROM halfyearly WHERE student_id = :studentId", nativeQuery = true)
    List<Half_yearly> findbystudentId(@Param("studentId") String StudentID);
}

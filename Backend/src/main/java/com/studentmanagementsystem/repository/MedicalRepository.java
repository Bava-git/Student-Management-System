package com.studentmanagementsystem.repository;

import com.studentmanagementsystem.model.Medical;
import com.studentmanagementsystem.model.schoolModel.AssessmentResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MedicalRepository extends JpaRepository<Medical, Long> {
    List<Medical> findByStudentID(String studentID);

    Optional<Medical> findBystudentIDAndId(String studentID, long Id);
}

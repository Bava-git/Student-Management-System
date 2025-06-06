package com.studentmanagementsystem.repository;

import com.studentmanagementsystem.model.schoolModel.AssessmentResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AssessmentResultRepository extends JpaRepository<AssessmentResult, Long> {

    Optional<AssessmentResult> findBystudentIDAndAssessmentId(String studentID, String assessmentId);

    List<AssessmentResult> findByStudentID(String studentID);
}

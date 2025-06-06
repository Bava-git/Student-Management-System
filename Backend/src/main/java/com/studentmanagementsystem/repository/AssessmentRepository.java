package com.studentmanagementsystem.repository;

import com.studentmanagementsystem.model.schoolModel.Assessment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssessmentRepository extends JpaRepository<Assessment, Long> {

    void deleteByassessmentId(String assessmentId);

    Assessment findByassessmentId(String assessmentId);
}

package com.studentmanagementsystem.repository.schoolRepository;

import com.studentmanagementsystem.model.schoolModel.Assessment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssessmentRepository extends JpaRepository<Assessment, Long> {

    void deleteByassessmentId(String assessmentId);

    Assessment findByassessmentId(String assessmentId);

    List<Assessment> findByStudentGrade(String studentGrade);
}

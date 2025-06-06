package com.studentmanagementsystem.service;

import com.studentmanagementsystem.model.schoolModel.Assessment;
import com.studentmanagementsystem.repository.AssessmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AssessmentService {

    @Autowired
    private AssessmentRepository assessmentRepository;

    public List<Assessment> listAS() {
        return assessmentRepository.findAll();
    }

    public Assessment addAS(Assessment assessment) {
        return assessmentRepository.save(assessment);
    }

    public Assessment findByAssessmentId(String assessmentId) {
        return assessmentRepository.findByassessmentId(assessmentId);
    }

    @Transactional
    public void deleteByAssessmentId(String assessmentId) {
        assessmentRepository.deleteByassessmentId(assessmentId);
    }
}

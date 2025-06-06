package com.studentmanagementsystem.service;

import com.studentmanagementsystem.model.schoolModel.AssessmentResult;
import com.studentmanagementsystem.repository.AssessmentRepository;
import com.studentmanagementsystem.repository.AssessmentResultRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AssessmentResultService {

    @Autowired
    private AssessmentResultRepository assessmentResultRepository;

    public List<AssessmentResult> listARS() {
        return assessmentResultRepository.findAll();
    }

    public AssessmentResult addARS(AssessmentResult assessmentResult) {
        return assessmentResultRepository.save(assessmentResult);
    }

    public List<AssessmentResult> findByStudentID(String studentID) {
        return assessmentResultRepository.findByStudentID(studentID);
    }

    @Transactional
    public AssessmentResult updateARS(AssessmentResult updateassessmentResult) {
        Optional<AssessmentResult> assessmentResult =
                assessmentResultRepository.findBystudentIDAndAssessmentId(updateassessmentResult.getStudentID(), updateassessmentResult.getAssessmentId());

        if (assessmentResult.isPresent()) {
            AssessmentResult assessment = assessmentResult.get();
            assessment.setAssessmentMark(updateassessmentResult.getAssessmentMark());
            return assessmentResultRepository.save(assessment);
        } else {
            throw new EntityNotFoundException("Assessment not found for student: " + updateassessmentResult.getStudentID());
        }

    }

}

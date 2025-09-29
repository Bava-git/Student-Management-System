package com.studentmanagementsystem.service.schoolService;

import com.studentmanagementsystem.model.schoolModel.AssessmentResult;
import com.studentmanagementsystem.repository.schoolRepository.AssessmentResultRepository;
import com.studentmanagementsystem.repository.StudentRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AssessmentResultService {

    @Autowired
    private AssessmentResultRepository assessResRep;
    @Autowired
    private StudentRepository studentRep;

    public List<AssessmentResult> listARS() {
        return assessResRep.findAll();
    }

    public AssessmentResult addARS(AssessmentResult assessmentResult) {
        return assessResRep.save(assessmentResult);
    }

    public List<AssessmentResult> findByStudentID(String studentID) {
        return assessResRep.findByStudentID(studentID);
    }

    @Transactional
    public AssessmentResult updateARS(AssessmentResult updateassessmentResult) {
        Optional<AssessmentResult> assessmentResult =
                assessResRep.findBystudentIDAndAssessmentId(updateassessmentResult.getStudentID(), updateassessmentResult.getAssessmentId());

        if (assessmentResult.isPresent()) {
            AssessmentResult assessment = assessmentResult.get();
            assessment.setAssessmentMark(updateassessmentResult.getAssessmentMark());
            return assessResRep.save(assessment);
        } else {
            throw new EntityNotFoundException("Assessment not found for student: " + updateassessmentResult.getStudentID());
        }

    }


}

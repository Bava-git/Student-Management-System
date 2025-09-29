package com.studentmanagementsystem.controller.schoolController;

import com.studentmanagementsystem.model.schoolModel.AssessmentResult;
import com.studentmanagementsystem.service.schoolService.AssessmentResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("studentreport/assessmentresult")
public class AssessmentResultController {

    @Autowired
    private AssessmentResultService assessmentResultService;

    @GetMapping
    public List<AssessmentResult> listARS() {
        return assessmentResultService.listARS();
    }

    @PostMapping("/add")
    public AssessmentResult addARS(@RequestBody AssessmentResult assessmentResult) {
        return assessmentResultService.addARS(assessmentResult);
    }

    @GetMapping("/{studentID}")
    public List<AssessmentResult> findByStudentID(@PathVariable String studentID) {
        return assessmentResultService.findByStudentID(studentID);
    }

    @PutMapping
    public AssessmentResult updateARS(@RequestBody AssessmentResult assessmentResult) {
        return assessmentResultService.updateARS(assessmentResult);
    }


}

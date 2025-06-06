package com.studentmanagementsystem.controller.schoolController;

import com.studentmanagementsystem.model.schoolModel.Assessment;
import com.studentmanagementsystem.service.AssessmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("studentreport/assessment")
public class AssessmentController {

    @Autowired
    private AssessmentService assessmentSer;

    @GetMapping
    public List<Assessment> listAS() {
        return assessmentSer.listAS();
    }

    @PostMapping("/add")
    public Assessment addAS(@RequestBody Assessment attendance) {
        return assessmentSer.addAS(attendance);
    }

    @GetMapping("/{assessmentId}")
    public Assessment findByAssessmentId(@PathVariable String assessmentId) {
        return assessmentSer.findByAssessmentId(assessmentId);
    }

    @DeleteMapping("/delete/{assessmentId}")
    private void deleteByAssessmentId(@PathVariable String assessmentId) {
        assessmentSer.deleteByAssessmentId(assessmentId);
    }


}

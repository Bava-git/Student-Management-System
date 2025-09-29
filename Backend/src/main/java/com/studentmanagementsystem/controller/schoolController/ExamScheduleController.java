package com.studentmanagementsystem.controller.schoolController;

import com.studentmanagementsystem.model.schoolModel.Exam;
import com.studentmanagementsystem.service.schoolService.ExamScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("school/examschedule")
public class ExamScheduleController {

    @Autowired
    private ExamScheduleService examScheduleService;

    @GetMapping
    public List<Exam> FullExamList() {
        return examScheduleService.fullExamSchedule();
    }

    @GetMapping("/by")
    public ResponseEntity<?> getByGradeAndType(@RequestParam String examGrade, @RequestParam String examType) {

        List<Exam> data = examScheduleService.getByGradeAndType(examGrade, examType);
        if (data != null) {
            return ResponseEntity.ok(data);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please check the request");
        }
    }

    @PostMapping("/add")
    private ResponseEntity<?> addExam(@RequestBody Exam exam) {

        Optional<Exam> data = examScheduleService.addExam(exam);
        if (data.isPresent()) {
            return ResponseEntity.ok(Map.of(
                    "displayMessage", "Exam Schedule added successfully",
                    "data", data));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please check the request");
        }

    }

    @DeleteMapping("/delete/{ExamId}")
    private ResponseEntity<?> deleteExam(@PathVariable String ExamId) {
        if (examScheduleService.deleteExam(ExamId)) {
            return ResponseEntity.ok(Map.of(
                    "displayMessage", "Exam Schedule deleted successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please check the request");
        }
    }

}

package com.studentmanagementsystem.controller.schoolController;

import com.studentmanagementsystem.model.schoolModel.Exam;
import com.studentmanagementsystem.service.schoolService.ExamScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping("/add")
    private Exam addExam(@RequestBody Exam exam) {
        return examScheduleService.addExam(exam);
    }

    @DeleteMapping("/delete/{ExamId}")
    private String deleteExam(@PathVariable String ExamId) {
        return examScheduleService.deleteExam(ExamId);
    }

}

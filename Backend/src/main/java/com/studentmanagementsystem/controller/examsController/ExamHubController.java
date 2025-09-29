package com.studentmanagementsystem.controller.examsController;

import com.studentmanagementsystem.service.examsService.ExamHubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("student")
@CrossOrigin(origins = "http://localhost:5173")
public class ExamHubController {

    @Autowired
    private ExamHubService examHubService;

    @GetMapping("/by-examName")
    public ResponseEntity<?> getAllData(@RequestParam String examName) {

        List<?> data = examHubService.getAllData(examName);
        if (data != null) {
            return ResponseEntity.ok(data);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please check the request");
        }
    }

    @GetMapping("/by")
    public ResponseEntity<?> getAllDataByGrade(@RequestParam String examName, @RequestParam String studentGrade) {

        List<?> data = examHubService.getAllDataByGrade(examName, studentGrade);
        if (data != null) {
            return ResponseEntity.ok(data);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please check the request");
        }
    }


}

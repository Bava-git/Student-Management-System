package com.studentmanagementsystem.controller;

import com.studentmanagementsystem.model.Medical;
import com.studentmanagementsystem.model.schoolModel.Teacher;
import com.studentmanagementsystem.repository.MedicalRepository;
import com.studentmanagementsystem.service.MedicalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("student/medical")
public class MedicalController {

    @Autowired
    private MedicalService medicalService;

    @GetMapping
    public List<Medical> getAllMS() {
        return medicalService.getAllMS();
    }

    @GetMapping("/{studentId}")
    public List<Medical> findByStudentID(@PathVariable String studentID) {
        return medicalService.findByStudentID(studentID);
    }

    @PostMapping("/add")
    public Medical saveTeacher(@RequestBody Medical medical) {
        return medicalService.addMedicalDetails(medical);
    }

}

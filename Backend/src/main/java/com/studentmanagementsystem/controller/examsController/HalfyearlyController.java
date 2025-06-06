package com.studentmanagementsystem.controller.examsController;

import com.studentmanagementsystem.model.examsModel.Half_yearly;
import com.studentmanagementsystem.service.examsService.HalfyearlyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("student/halfyearly")
@CrossOrigin(origins = "http://localhost:5173")
public class HalfyearlyController {

    @Autowired
    private HalfyearlyService halfyearlyService;

    @GetMapping
    public List<Half_yearly> listTeachers() {
        return halfyearlyService.listStudents();
    }

    @GetMapping("/{id}")
    public Optional<Half_yearly> getTeacherByID(@PathVariable long StudentID) {
        return halfyearlyService.getStudentById(StudentID);
    }

    @PostMapping("/add")
    public Half_yearly saveTeacher(@RequestBody Half_yearly report) {
        System.out.println(report);
        return halfyearlyService.addStudent(report);
    }

    @PutMapping("/{id}")
    public void updateTeacher(@PathVariable long StudentID, @RequestBody Half_yearly report) {
        halfyearlyService.updateTeacher(StudentID, report);
    }

    @DeleteMapping("/{id}")
    public void deleteTeacher(@PathVariable long StudentID) {
        halfyearlyService.deleteStudent(StudentID);
    }

}

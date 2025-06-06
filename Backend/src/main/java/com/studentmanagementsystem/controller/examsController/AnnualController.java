package com.studentmanagementsystem.controller.examsController;

import com.studentmanagementsystem.model.examsModel.Annual;
import com.studentmanagementsystem.service.examsService.AnnualService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("student/annual")
@CrossOrigin(origins = "http://localhost:5173")
public class AnnualController {

    @Autowired
    private AnnualService annualService;

    @GetMapping
    public List<Annual> listTeachers() {
        return annualService.listStudents();
    }

    @GetMapping("/{id}")
    public Optional<Annual> getTeacherByID(@PathVariable long StudentID) {
        return annualService.getStudentById(StudentID);
    }

    @PostMapping("/add")
    public Annual saveTeacher(@RequestBody Annual report) {
        System.out.println(report);
        return annualService.addStudent(report);
    }

    @PutMapping("/{id}")
    public void updateTeacher(@PathVariable long StudentID, @RequestBody Annual report) {
        annualService.updateTeacher(StudentID, report);
    }

    @DeleteMapping("/{id}")
    public void deleteTeacher(@PathVariable long StudentID) {
        annualService.deleteStudent(StudentID);
    }

}

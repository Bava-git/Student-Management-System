package com.studentmanagementsystem.controller.examsController;

import com.studentmanagementsystem.model.examsModel.Midterm_One;
import com.studentmanagementsystem.service.examsService.Midterm1Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("student/midterm1")
@CrossOrigin(origins = "http://localhost:5173")
public class Midterm1Controller {

    @Autowired
    private Midterm1Service midterm1Service;

    @GetMapping
    public List<Midterm_One> listTeachers() {
        return midterm1Service.listStudents();
    }

    @GetMapping("/{id}")
    public Optional<Midterm_One> getTeacherByID(@PathVariable long StudentID) {
        return midterm1Service.getStudentById(StudentID);
    }

    @PostMapping("/add")
    public Midterm_One saveTeacher(@RequestBody Midterm_One report) {
        System.out.println(report);
        return midterm1Service.addStudent(report);
    }

    @PutMapping("/{id}")
    public void updateTeacher(@PathVariable long StudentID, @RequestBody Midterm_One report) {
        midterm1Service.updateTeacher(StudentID, report);
    }

    @DeleteMapping("/{id}")
    public void deleteTeacher(@PathVariable long StudentID) {
        midterm1Service.deleteStudent(StudentID);
    }

}

package com.studentmanagementsystem.controller.examsController;

import com.studentmanagementsystem.model.examsModel.Midterm_Two;
import com.studentmanagementsystem.service.examsService.Midterm2Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("student/midterm2")
@CrossOrigin(origins = "http://localhost:5173")
public class Midterm2Controller {

    @Autowired
    private Midterm2Service midterm2Service;

    @GetMapping
    public List<Midterm_Two> listTeachers() {
        return midterm2Service.listStudents();
    }

    @GetMapping("/{id}")
    public Optional<Midterm_Two> getTeacherByID(@PathVariable long StudentID) {
        return midterm2Service.getStudentById(StudentID);
    }

    @PostMapping("/add")
    public Midterm_Two saveTeacher(@RequestBody Midterm_Two report) {
        System.out.println(report);
        return midterm2Service.addStudent(report);
    }

    @PutMapping("/{id}")
    public void updateTeacher(@PathVariable long StudentID, @RequestBody Midterm_Two report) {
        midterm2Service.updateTeacher(StudentID, report);
    }

    @DeleteMapping("/{id}")
    public void deleteTeacher(@PathVariable long StudentID) {
        midterm2Service.deleteStudent(StudentID);
    }

}

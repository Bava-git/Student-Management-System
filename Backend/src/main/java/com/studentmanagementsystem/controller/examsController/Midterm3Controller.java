package com.studentmanagementsystem.controller.examsController;

import com.studentmanagementsystem.model.examsModel.Midterm_Three;
import com.studentmanagementsystem.service.examsService.Midterm3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("student/midterm3")
@CrossOrigin(origins = "http://localhost:5173")
public class Midterm3Controller {

    @Autowired
    private Midterm3Service midterm3Service;

    @GetMapping
    public List<Midterm_Three> listTeachers() {
        return midterm3Service.listStudents();
    }

    @GetMapping("/{id}")
    public Optional<Midterm_Three> getTeacherByID(@PathVariable long StudentID) {
        return midterm3Service.getStudentById(StudentID);
    }

    @PostMapping("/add")
    public Midterm_Three saveTeacher(@RequestBody Midterm_Three report) {
        System.out.println(report);
        return midterm3Service.addStudent(report);
    }

    @PutMapping("/{id}")
    public void updateTeacher(@PathVariable long StudentID, @RequestBody Midterm_Three report) {
        midterm3Service.updateTeacher(StudentID, report);
    }

    @DeleteMapping("/{id}")
    public void deleteTeacher(@PathVariable long StudentID) {
        midterm3Service.deleteStudent(StudentID);
    }

}

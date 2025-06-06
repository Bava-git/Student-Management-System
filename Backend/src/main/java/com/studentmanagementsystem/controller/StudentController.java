package com.studentmanagementsystem.controller;

import com.studentmanagementsystem.model.*;
import com.studentmanagementsystem.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("student")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping
    public List<Student> listTeachers() {
        return studentService.listStudents();
    }

    @GetMapping("search/{StudentID}")
    public Student findbystudentId(@PathVariable String StudentID) {
        return studentService.findbystudentId(StudentID);
    }

    @PostMapping("/add")
    public Student saveTeacher(@RequestBody Student student) {
        return studentService.addStudent(student);
    }

    @PutMapping("/{id}")
    public void updateTeacher(@PathVariable long StudentID, @RequestBody Student student) {
        studentService.updateTeacher(StudentID, student);
    }

    @DeleteMapping("/{id}")
    public void deleteTeacher(@PathVariable long StudentID) {
        studentService.deleteStudent(StudentID);
    }

}

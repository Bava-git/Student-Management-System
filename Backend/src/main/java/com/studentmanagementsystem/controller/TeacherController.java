package com.studentmanagementsystem.controller;

import com.studentmanagementsystem.model.Teacher;
import com.studentmanagementsystem.service.TeacherService;
import com.studentmanagementsystem.config.jwtconfig.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/teacher")
@CrossOrigin(origins = "http://localhost:5173")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public List<Teacher> listTeachers() {
        return teacherService.listTeachers();
    }

    @GetMapping("/{id}")
    public Optional<Teacher> getTeacherByID(@PathVariable long id) {
        return teacherService.getTeacherById(id);
    }

    @PostMapping("/add")
    public Teacher saveTeacher(@RequestBody Teacher teacher) {
        return teacherService.addTeacher(teacher);
    }

    @PutMapping("/{id}")
    public void updateTeacher(@PathVariable long TeacherID, @RequestBody Teacher teacher) {
        teacherService.updateTeacher(TeacherID, teacher);
    }

    @DeleteMapping("/{id}")
    public void deleteTeacher(@PathVariable long TeacherID) {
        teacherService.deleteTeacher(TeacherID);
    }

    @GetMapping("search/{TeacherID}")
    public Teacher getteacherbyteacherid(@PathVariable long TeacherID) {
        return teacherService.getteacherbyteacherid(TeacherID);
    }

}

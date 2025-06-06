package com.studentmanagementsystem.controller.examsController;

import com.studentmanagementsystem.model.examsModel.Quarterly;
import com.studentmanagementsystem.service.examsService.QuarterlyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("student/quarterly")
@CrossOrigin(origins = "http://localhost:5173")
public class QuarterlyController {

    @Autowired
    private QuarterlyService quarterlyService;

    @GetMapping
    public List<Quarterly> listTeachers() {
        return quarterlyService.listStudents();
    }

    @GetMapping("/{id}")
    public Optional<Quarterly> getTeacherByID(@PathVariable long StudentID) {
        return quarterlyService.getStudentById(StudentID);
    }

    @PostMapping("/add")
    public Quarterly saveTeacher(@RequestBody Quarterly report) {
        System.out.println(report);
        return quarterlyService.addStudent(report);
    }

    @PutMapping("/{id}")
    public void updateTeacher(@PathVariable long StudentID, @RequestBody Quarterly report) {
        quarterlyService.updateTeacher(StudentID, report);
    }

    @DeleteMapping("/{id}")
    public void deleteTeacher(@PathVariable long StudentID) {
        quarterlyService.deleteStudent(StudentID);
    }

}

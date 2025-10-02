package com.studentmanagementsystem.service;

import com.studentmanagementsystem.model.Student;
import com.studentmanagementsystem.repository.StudentRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public List<Student> listStudents() {
        return studentRepository.findAll();
    }

    public List<Student> getByGrade(String studentLevel){
        return studentRepository.findByStudentLevel(studentLevel);
    }

    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }

    public void deleteStudent(long StudentID) {
        studentRepository.deleteById(StudentID);
    }

    public void updateTeacher(long StudentID, Student updatestudent) {
        Student existTeacher = studentRepository.findById(StudentID).orElse(null);

        if (existTeacher != null) {
//            existTeacher.setStudentID(updatestudent.getStudentID());
//            existTeacher.setStudentName(updatestudent.getStudentName());
//            existTeacher.setStudentFatherName(updatestudent.getStudentFatherName());
//            existTeacher.setStudentMotherName(updatestudent.getStudentMotherName());

            BeanUtils.copyProperties(updatestudent, existTeacher);
            studentRepository.save(existTeacher);
        } else {
            throw new RuntimeException("Teacher is not exist");
        }
    }

    public Student findbystudentId(String StudentID) {
        return studentRepository.findbystudentId(StudentID);
    }
}

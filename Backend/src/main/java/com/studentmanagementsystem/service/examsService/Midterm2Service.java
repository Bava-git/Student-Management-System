package com.studentmanagementsystem.service.examsService;

import com.studentmanagementsystem.model.examsModel.Midterm_Two;
import com.studentmanagementsystem.repository.examsRepository.midterm2ModelRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Midterm2Service {

    @Autowired
    private midterm2ModelRepository midterm2ModelRepository;

    public Optional<Midterm_Two> getStudentById(long StudentID) {
        return midterm2ModelRepository.findById(StudentID);
    }

    public List<Midterm_Two> listStudents() {
        return midterm2ModelRepository.findAll();
    }

    public Midterm_Two addStudent(Midterm_Two midterm2Report) {
        return midterm2ModelRepository.save(midterm2Report);
    }

    public void deleteStudent(long StudentID) {
        midterm2ModelRepository.deleteById(StudentID);
    }

    public void updateTeacher(long StudentID, Midterm_Two updatestudent) {
        Midterm_Two existTeacher = midterm2ModelRepository.findById(StudentID).orElse(null);

        if (existTeacher != null) {
//            existTeacher.setStudentID(updatestudent.getStudentID());
//            existTeacher.setStudentName(updatestudent.getStudentName());
//            existTeacher.setStudentFatherName(updatestudent.getStudentFatherName());
//            existTeacher.setStudentMotherName(updatestudent.getStudentMotherName());

            BeanUtils.copyProperties(updatestudent, existTeacher);
            midterm2ModelRepository.save(existTeacher);
        } else {
            throw new RuntimeException("Teacher is not exist");
        }
    }
}

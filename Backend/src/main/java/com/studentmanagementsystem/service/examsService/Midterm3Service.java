package com.studentmanagementsystem.service.examsService;

import com.studentmanagementsystem.model.examsModel.Midterm_Three;
import com.studentmanagementsystem.repository.examsRepository.midterm3ModelRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Midterm3Service {

    @Autowired
    private midterm3ModelRepository midterm3ModelRepository;

    public Optional<Midterm_Three> getStudentById(long StudentID) {
        return midterm3ModelRepository.findById(StudentID);
    }

    public List<Midterm_Three> listStudents() {
        return midterm3ModelRepository.findAll();
    }

    public Midterm_Three addStudent(Midterm_Three midterm3Report) {
        return midterm3ModelRepository.save(midterm3Report);
    }

    public void deleteStudent(long StudentID) {
        midterm3ModelRepository.deleteById(StudentID);
    }

    public void updateTeacher(long StudentID, Midterm_Three updatestudent) {
        Midterm_Three existTeacher = midterm3ModelRepository.findById(StudentID).orElse(null);

        if (existTeacher != null) {
//            existTeacher.setStudentID(updatestudent.getStudentID());
//            existTeacher.setStudentName(updatestudent.getStudentName());
//            existTeacher.setStudentFatherName(updatestudent.getStudentFatherName());
//            existTeacher.setStudentMotherName(updatestudent.getStudentMotherName());

            BeanUtils.copyProperties(updatestudent, existTeacher);
            midterm3ModelRepository.save(existTeacher);
        } else {
            throw new RuntimeException("Teacher is not exist");
        }
    }
}
